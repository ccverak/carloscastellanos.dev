---
draft: false
title: "My take on writing better code"
date: 2020-07-11T09:29:58+02:00
description: "This is how I use conceptual compression to better express my intent and make my code more readable and understandable."
categories: general
keywords: "clean code, ruby, javascript"
---

## MOTIVATION

I've been thinking a lot about how to create better programs, with clearer interactions, and easier to understand while communicating my intent without affecting readers. I consider this to be an important part of my skills because it is what makes me able to express what code is doing without requiring too much effort from the reader. 

Let's extrapolate for a second to a different context, imagine you are in a discussion of a technical problem. Do you find it easy to follow when someone jumps between different concepts, mixing its details and high-level things in a non-structured way? Such a discussion becomes hard to follow.

Coming back to our context, don't you think it happens the same with code?

If you are interested in the subject, I would like to talk about some ideas on how to get better at this. As a developer article, this would be mainly about code but I'm sure you'll think about how to discuss technical things or run meetings with this philosophy (or not, and that's OK)

DISCLAIMER: Bear in mind that this is my current mental state about the subject but this is something that I'm sure it will evolve with time. Take this as an intent to spark your interest in the topic and also as some sort of feedback request to readers.

## COMMUNICATING INTENT

In my opinion, writing programs should be more about communicating your intent, not only to the computer but to your fellow developers who are going to read the code at some point. Computers are very smart understanding what you tell them to do, they don't care if the variables have descriptive names or if you used this many files to express your intent. But guess what? Humans do care a lot about that. A lot. People come and go but the code stays. That is why I think you have to make it really easy for the reader to understand your code. But, how can the code be more understandable? Let me give it a shot:

What makes a code fragment more understandable?

- Knowledge of programming and its essentials
- Knowledge of the programming language
- Understanding of the business domain
- Understanding of the problem
- How the code transmits its intent

After the basics that should be taken for granted such as programming essentials and programming language knowledge, business domain and the problem take special importance. As you may know it is not only about using good variable names, you should ask yourself how your code expresses the connections between the business domain and the solution of the problem, so it's easier read by others.

Here is Conceptual Compression can help, let's see how.

## CONCEPTUAL COMPRESSION WHAT?

**Conceptual compression** is all about **abstraction**. It's a mapping of multiple different pieces related to a concept into a single piece. Take for example this definition *Gardening is the practice of growing and cultivating plants as part of horticulture*. Now you know what Gardening means, I can use it in a conversation without explaining its meaning.

## COMPRESSING CONCEPTS IN SOFTWARE DEVELOPMENT

We, the software developers, are prone to create complexity on the top of the existing problem complexity, this tends to accumulate with the time waiting to bite you in the worst moment ever. This is why I think that Conceptual Compression can be a good tool to help you sail through the complexity and time. It will force you to structure your concepts allowing you to create programs composing them without exposing details that aren't important. This helps also to minimize the interference of the accidental complexity created by developers. 

{{< hl data-options="language-javascript line-numbers" data-line-options="">}}
  // Top-level orchestration
function program() {
   doThis()
   doThisOtherThing()
}

// elsewhere

function doThis() { /* details implementation */ }

// somewhere else

function doThisOtherThing() { /* details implementation */ }
{{< /hl >}}


### LET'S TALK ABOUT CODE

First and foremost, I'm talking about application code, not about library code. Bear this in mind from now own, this may or may not apply to all the contexts.

**GETTING STARTED**

How we can communicate our intent and make use of Conceptual Compressions?

Let's see some example with different language constructs:

### With variable names

Given this piece of code

{{< hl data-options="language-javascript line-numbers" data-line-options="">}}
  const u = getCurrentUser()

// ...

if (
    project.ownerId === req.session.userId ||
    userPermission.name === 'MANAGE_PROJECTS'
) {
  // ...
}
{{< /hl >}}

What if we instead implement it like this?

{{< hl data-options="language-javascript line-numbers" data-line-options="">}}
  const currentUser = getCurrentUser()

// ...

const hasPermission = userPermission.name === 'MANAGE_PROJECTS'
const isProjectOwner = project.ownerId === req.session.userId

if (hasPermission || isProjectOwner) {
  // ...
}
{{< /hl >}}

Isn't the second example much better? isn't the `if` statement much understandable? The main reason is that it uses concepts that encapsulates its meaning in variable names. This becomes more useful as the number or complexity of the concepts increases.

### With functions (or classes)

{{< hl data-options="language-javascript line-numbers" data-line-options="">}}
  app.put('/project/:projectId', async ({ req, res }) => {
  const project = await Projects.find(req.projectId)
  if (!project) throw ProjectNotFoundError()
  const userPermission = await ProjectPermissions.find({
    currentUserId,
    userId
  })
  if (
    project.ownerId !== req.session.userId ||
    userPermission.name !== 'MANAGE_PROJECTS'
  ) {
    throw new ForbiddenError()
  }
  const pr = await Projects.update({ projectId, params: req.params })
  return res.json(pr)
})
{{< /hl >}}

Using concept compression now: 

{{< hl data-options="language-javascript line-numbers" data-line-options="">}}
function canUpdateProject ({ project, requesterId }) {
  const isOwner = project.ownerId === requesterId

  return isOwner
    ? true
    : hasUpdatePermission({ id: project.id, userId: requesterId })
}

//----------------

async function ensurePermissions ({ project, requesterId }) {
  const canUpdateProject = await canUpdateProject({ project, requesterId })

  if (!canUpdateProject) throw new AuthorizationError()
}

//----------------

async function updateProject (id, requesterId, params) {
  const project = Projects.find(id)

  await ensurePermissions({ project, requesterId })

  return Projects.update(id, params)
}

//-----------------

app.put('/project/:projectId', async ({ request, response }) => {
  const { projectId } = request.params
  const { name, description, category } = request.projectParams

  const currentUserId = currentUserId(request)

  const updatedProject = await updateProject(projectId, currentUserId, {
    name,
    description,
    category
  })

  const presentedProject = presentProject(updatedProject)
  response.json(presentedProject)
})
{{< /hl >}}

Notice that the proposed implementation is longer and probably would involve more files, but it is better structured, several concepts were extracted such as `canUpdateProject`, `updateProject`, `ensurePermissions` or `presentProject`. The main idea is that if you want to understand the `app.put` logic you don't see irrelevant details.

### With modules

Modules provide a way to encapsulate common functionality exposing what is done while abstracting how is done.

Defining clearer interfaces and keeping internal details separated from the callers have many benefits. It lowers the cognitive load required to understand and use the functionality, it provides a compressed concept that can be orchestrated in a higher level of abstraction without polluting it with details. From the insider point of view, you have more freedom to change the implementation details of the module without risking too much. Also, since the public interface is clearly defined, you will know better when you introducing a breaking change. It helps a lot to construct a well-structured application if you want more details [read this other article of mine](https://carloscastellanosvera.com/posts/thoughts-on-simplicity-in-software-development/).

Let's see an example with the same `updateProject` endpoint:

{{< hl data-options="language-javascript line-numbers" data-line-options="">}}
  //----------------- src/projects/commands/index.js
import ensurePermissions from 'not-relevant-now'
import Projects from 'not-relevant-now'

const updateProject = async function updateProject (id, requesterId, params) {
  const project = Projects.find(id)

  await ensurePermissions({ project, requesterId })

  return Projects.update(id, params)
}

export default {
  updateProject
}

//----------------- src/projects/web/index.js

import commands from 'src/projects/commands'
import presentRole from 'not-relevant-now'
import currentUserId from 'not-relevant-now'

app.put('/project/:projectId', async ({ request, response }) => {
  const { projectId } = request.params
  const { name, description, category } = request.projectParams

  const currentUserId = currentUserId(request)

  const updatedProject = await commands.updateProject(projectId, currentUserId, {
    name,
    description,
    category
  })

  const presentedProject = presentProject(updatedProject)
  response.json(presentedProject)
})
{{< /hl >}}

Notice that the `updateProject` action was compressed and moved into a `commands` module which encapsulates the actions in a way that the external dependencies of this module don't need to be aware of its details. The `app.put` action it's more cleaner, is easier to understand, and easier to debug. When an error occurs you will be taken to the required context following the stack-trace not having unnecessary details.

**Things to notice**

- It's longer and it requires more files
- Web related actions (`src/projects/web/index.js`) are separated from application logic (`commands.updateProject`)
- The interactions and components are more explicit
- The module `commands` exposes its public API including a way to update projects (it can include more commands, probably separated into different files)
- It communicates the intent in a better way

**WHEN YOU SHOULD USE CONCEPTUAL COMPRESSION**

I'm a web developer and primarily I had had web applications in mind while writing this article. Web applications are more about expressing business rules and interaction between different concepts. 

I'm totally aware that for example algorithms, protocols, Systems Programming, Critical Systems, etc. are in a different game where abstractions play a point against performance, I would say that in those cases as long as you empathize enough with the reader to meet the requirements it is more than enough.   

Having said that I think that given the context of the problem you are trying to solve, you need to answer these basic questions to know what path to take

A) Do you need the implementation details in the surface?

B) Do you need the interactions in the surface?

## CONCLUSION

I hope I caught your attention in the topic and gave you some food for thought. Here are some take aways

Concept Compression in application development:

- Uses business wording for concepts
- Helps you to communicate your intent though code
- Provides a path to create better interactions in your code

Business domain problems are responsible of the hardest problems and bugs I've seen, the real-life is hard to model and that makes difficult not to make mistakes in the interactions not only in the details. I don't know if you agree but the hardest problems I've seen are related to the interaction and flow of programs solving business problems.  Don't you think that Conceptual compression takes a step in the right direction to make better and reliable interactions.

Till the next time :}

PS: I would like to share also a how I write Ruby code using conceptual compression, here is a sample class that clones a project from a git repository and then deploys it and a module that exposes it.

{{< hl data-options="language-ruby line-numbers" data-line-options="">}}
  class Projects::Deploy
  # follows the callable interface of blocks
  def self.call(*args)
    new(*args).call
  end

  def initialize(project)
    @project = project
  end

  def call
    return unless deployable?

    clone

    deploy
  end

  private

  def git_repository
    project.git_repository
  end

  def deployment_config
    project.deployment_config
  end

  def clone
    # clones using git_repository
  end

  def deploy
    # deploys using deployment_config
  end

  def deployable?
    # ...
  end

  attr_reader :project
end

# module and public interface
module Projects

  def deploy(project)
    Deploy.call(project)
  end

end
{{< /hl >}}
