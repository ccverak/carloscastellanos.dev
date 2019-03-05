--- 
draft: false
date: 2017-05-07T22:31:20+01:00
title: "Thoughts on simplicity in software development"
categories: general
description: "Thoughts on simplicity in software development"
aliases:
  - /2017/05/thoughts-on-simplicity-in-software-development/
  - /2017-05-07-thoughts-on-simplicity-in-software-development/

---

## The software developer's view of products

It’s remarkably satisfying to see a nice idea becoming an amazing Product, a successful machinery, probably from the non-technical point of view a fully functional black box. Technical people think different, especially software developers and engineers, we try to understand the working parts of every product we know or use, we need to discover the atoms.

Not few times during the product development you find developers going too technical and taking the wrong decisions because they are missing the whole picture; — been there, done that, it’s common, let’s not forget it; tech and business are food and salt.

My purpose with this post is to express some ideas about how developers should approach technical decisions without losing perspective, and how the understanding of your domain is fundamental. Mainly, I want this to be a reminder for the future me but I suppose this will be valuable for most software developers.

> If you can’t explain it simply, you don’t understand it well enough.

> Albert Einstein

Translating thoughts into materialized representations is underestimated. Drawing diagrams, discussing, writing notes in a pad, writing users stories or high level technical tests describing the product are very simple ways of discovering and understanding, think of this: How many times did happened to you that just commenting an idea with a coworker helped you to realize what was wrong with your thoughts? Many times right? This process of translation helps you to think about the problem first so you can derive technical decisions from it and not viceversa which is most of the time the cause of uncountable hours in front of your computer.

Doing this kind of system thinking about the **very start**, will let you alienate into the very technical stuff for a while and be confident about it, you know programmers, our minds go to very wired places in the creating-developing process.

## Mental models for the software development stage

Complexity is the enemy. It’s common to see developer advocating “Simplicity” while creating systems that are nothing but Complex. Even though having “Simplicity” in mind is a good thing, not applying it’s a waste, but even worst is not considering it all.

Simplicity is the main key to understanding, not only in architectures but in the source code. The code needs it. The things is that is not only about experience is about a mix of discovery, understanding, and awareness.

### “Beautifully designed” vs Beautifully designed.

Digging into more technical details, let’s analyze a couple of ideas regarding coding and the way we choose to design our software.

**Dependencies**

Dependencies are means to communication which is the core of any software. Let’s discuss how do we use internal dependencies to address communication.

![No comments...](/images/simplicity-mess.jpeg)

*No comments….*

Yeah! Dependencies are a 2 edged sword. You could easily end up having something similar to the image.

My take on this would be the following: beyond [Bounded Context](https://martinfowler.com/bliki/BoundedContext.html), defining what’s **public API and private API** at every abstraction level is paramount.

Loosely coupled approach for inter-package communication and high cohesion communication inside packages is a common speech in Design Pattern books, based on this, if we define a **Facade** for each package with its **public API** and communication to that package is enforced to be done using its public API, then and only then, we’d have proper boundaries and encapsulation, having simpler dependency graphs to map into our heads. Stable and explicit communication lead to a fully organized system.

![](/images/simplicity-order.jpeg)

This is much better. Advantages are innumerable.

**Trees vs flats**

As the product evolves always some kind of complexity is induced by new features, using the approach mentioned above, a good strategy to scale would be to split modules into smaller ones as it’s public API becomes messy. **Divide and conquer** is the answer but only if you grow horizontally building **flat structures** and not **deep structures**, creating messy dependencies goes against sanity, these two interdependency diagrams will convince you:

![](/images/simplicity-flat-packages.png)

**vs**

![](/images/simplicity-messy-packages.png)

No discussion, brain health is my choice.

Simple as it seems, understanding and controlling your dependencies are must in software development and it’s often underestimated, think about it! It should be addressed along with your technical debt otherwise you are already going down the road. Technical people should pay more attention to it, sometimes we alienate too much in the details.

## Some closing thoughts

A deep understanding of your domain is fundamental to start and fundamental to evolve. With understanding, you are able to create the correct abstractions dependencies and communications. Building software is not about writing classes, packages, libraries or functions, it’s about integrating them. It’s preferable to design integrations that fit into our brains when focusing in a context.

*Let your minds to conquer the tools* so you can create awesome and **Simple** software but not otherwise. Let’s keep the “Design smell alarm” constantly activated because our techie brains are prone to create complexity.

I’m 100% sure this would solve most of the programming challenges we face every day.
