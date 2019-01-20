--- 
draft: true
date: 2016-08-27T22:31:20+01:00
title: "From monolith to microservices."
slug: "monolith to microservices" 
categories: general
description: "From monolith to microservices."
---

This is not another post about application architectures but a software design instead. I bet you are a bit lost with the heading, keep reading, I will take you there.

First I want to let clear that by no means I intend to make this a reference to software design, I just want to address how it’s been natural for me to adopt practices that in my opinion had lead me to write better code. Here you will find just the pieces and the most important references, I will try to cover as much as I can.

## Stage 1 — Plain OO

![](https://cdn-images-1.medium.com/max/4000/1*8LEXrs-56k9FLSzhfY_t5A.jpeg)

My beginnings on serious programming were with Java and Object Oriented Programming (OOP or OO), it was challenging to start thinking in matters of objects, Encapsulation, Polymorphism, Inheritance, translating real life concepts into computers language, creating Abstractions. Somehow there is a moment when you control or even master it, but life is rich and so it is OO, then a moment comes when you don’t feel quite happy with results, and you tend to think everything needs refactor, that’s a code smell you can’t obviate, you need to improve your strategy.

Working and maintainable software leads to quality in software, that simple, some will argue but those are root cause, I mean, aren’t self-reading, well structured and organized, easy to understand and to modify code, means to the same end: Maintainability?. That’s what Object Oriented Design is about (I will refer to it as OOD or just design indistinctly from now on) let’s dig into details.

As mentioned, I just started with plain OO, in my code there were lots of objects interacting each other without following rules (or a couple of ones but nothing serious), I had “Monoliths”, yeah, non-modular programs, rigid code bases with shared responsibilities everywhere.

<iframe src="https://medium.com/media/b27c6f145524920d3d48dbe7ed61aba3" frameborder=0></iframe>

## Stage 2 — Improved collaboration between objects

It felt good for a while but some bittersweet taste after finishing some medium/large projects encouraged me to improve. For instance I found some materials speaking about [Dependency Injection — DI](https://en.wikipedia.org/wiki/Dependency_injection) (Or [Inversion Of Control — IoC](https://en.wikipedia.org/wiki/Inversion_of_control)), it was incredible how sophisticated the concept was for me, I mean, after understanding OO concepts, that was the next big thing in programming for me, it’s funny how new concepts shock me, I know….., whatever, your mind changes after using IoC, “Hollywood Principle” was like addiction.

![](https://cdn-images-1.medium.com/max/2000/1*awhx8ZLsnlgieF6wC4j_tg.png)
> It is called Hollywood Principle “(…) Inversion of control is sometimes facetiously referred to as the “[Hollywood Principle](https://en.wikipedia.org/wiki/Hollywood_Principle): Don’t call us, we’ll call you”. (…)”

You can read more and see examples on [this](http://martinfowler.com/articles/injection.html) article from [Martin Fowler](http://martinfowler.com/aboutMe.html) or on this [tutorial](http://www.tutorialspoint.com/spring/spring_dependency_injection.htm). That will give you an idea if you don’t know the concept.

## Stage 3 — There is a lot more on object collaboration than you think

After a few years working with [Java](https://www.java.com/en/), [Spring Framework](https://projects.spring.io/spring-framework/), [Google Guice](https://github.com/google/guice) and friends using IoC, I moved to different languages mostly dynamically typed such as [Python](https://www.python.org/) and [Ruby](https://www.ruby-lang.org/en/) for several reasons that I will discuss on future posts. On these languages DI is easier, most of the times you don’t even need a IoC container; anyways, one day I discovered [SOLID](https://en.wikipedia.org/wiki/SOLID_(object-oriented_design)), thanks to [Sandi Metz](http://www.sandimetz.com/) and her presentations and books, big fan of her work. I just realized that there were lots of more practices than just DI, great right?

![](https://cdn-images-1.medium.com/max/2600/1*1w_0A5uNQHpyGP1mAyXBSQ.jpeg)

SOLID stands for **SOLID** (**single responsibility, open-closed, Liskov substitution, interface segregation and dependency inversion**), The term was introduced for [Michael Feathers](https://en.wikipedia.org/w/index.php?title=Michael_Feathers&action=edit&redlink=1), referring to [Robert C. Martin](https://en.wikipedia.org/wiki/Robert_C._Martin) principles.

SOLID covers a lot of design along with [Demeter Law](https://en.wikipedia.org/wiki/Law_of_Demeter). It’s a complete tool-set, in theory, you would be able to write better code using it, but it’s hard, in practice, you are always trying. At least it will open your mind to the “art of software design”, any improvement you do according to these will have a big impact on your application.

Some SOLID and Demeter’s examples: The first is from T[houghbot](https://robots.thoughtbot.com/back-to-basics-solid) guys [here](https://robots.thoughtbot.com/back-to-basics-solid) and the other I want to share is a practical Rails [example](http://rails-bestpractices.com/posts/2010/07/24/the-law-of-demeter/). That will give you context.

### How did I get to “Microservices”?

I see the transition from plain OO to OO Design (OOD) as a homology to Monolith to Microservices one, both are related to move to independent, easy to manage smaller units talking through messages according to contracts, isn’t this what we call Micro-services on application architectures?. I just made my point. Let’s answer the most common question on the subject:

**Which is better for you?** this is subjective and context dependent, so it depends, in some cases are better concise Monolith on other cases modular and loosely coupled Units of Work, both have pros and cons. I like to think as the second as an evolution of the first. To pick one just research what are doing people with similar problems, try both approaches to understand which one is adequate for the problem and your brain capacity, yes different people deal and react differently to disperse or concrete systems and the same with levels of abstractions. Don’t try do it perfect from the beginning, spent time in the process so you can form an opinion.

### TDD: Induce good or bad design?

Testing. If I don’t speak of testing this post would be incomplete. Of course is related to Design, there are a lot of discussions about how testing can induce good or bad design to your app, I won’t go deeper on this, I just will drop my opinion: Yes testing helps, even more for beginners, it will help a lot in this case to write tests first in order to discover how to Design in a way that works for them. After years of experience you can design in your head and write code first or last whatever, sometimes tests will remember you why you are doing things in a particular way, also, there are moments where you need to write code first to get the gist of the problem, whether you do it, don’t be hard with yourself regarding those tenets of TDD, just focus on the most important thing, as soon as you write the tests, is not big deal if you do it first or last [you will get confident anyways](https://medium.com/@ccverak/getting-confidence-a-software-developer-perspective-1b7fee3bd643#.2decw3lfy), and you will learn lots of insights on Design.

## Stage 4 — Play with SOLID and choose your tools, use it as it works for you

Lately I’ve been using lots of [Service Object](http://stevelorek.com/service-objects.html). I see Service Objects everywhere, collaborating to solve problems, lately I tend to write single method classes like this:

<iframe src="https://medium.com/media/7f2efe8c415aee87ab2b1857c1ba8eb2" frameborder=0></iframe>

Here you will find details: [Gourmet service objects](http://brewhouse.io/blog/2014/04/30/gourmet-service-objects.html) and [Callable services](http://www.rubytapas.com/2012/12/12/episode-035-callable/).

I also use practices like [**East Oriented Code](http://www.saturnflyer.com/blog/jim/2015/02/10/the-4-rules-of-east-oriented-code-rule-1/)** discussed as well on this [book](http://clean-ruby.com/) both references from [Jim Ga](https://twitter.com/saturnflyer)y, [**Tell don’t ask Principle](https://pragprog.com/articles/tell-dont-ask)** and [**Command Query separation](https://pragprog.com/articles/tell-dont-ask)** , **“UseCase classes”** to orchestrate several services that conform a real application Use Case, **Extract Configuration** and **Strategy patterns **as addressed by Sandi Metz in [Practical Object Oriented Design](http://www.poodr.com/). I use these as well: [**Null Object Pattern](https://robots.thoughtbot.com/rails-refactoring-example-introduce-null-object)** and [**Maybe Pattern](https://robots.thoughtbot.com/if-you-gaze-into-nil-nil-gazes-also-into-you)**, if you want to read more on both research on [Monads](https://en.wikipedia.org/wiki/Monad_(functional_programming)); [here](https://github.com/avdi/naught) is a nice Ruby gem for it with fantastic documentation.

It has worked for me so far, don’t be afraid to try some, you won’t regret it.

## Stage 5 — Functional programming languages and functional principles along with SOLID

I want to make one last point: There are some cross-cutting concerns on OOD you need to take care of: multithreading and/or parallelism; you need deal with thread safety on your code. Lately, there is a trend for distributed computing, multithreading, multi-processing to overcome massive volumes of data applications usually handle nowadays, yes, you need to take care of it even if you are on [Rails](https://bearmetal.eu/theden/how-do-i-know-whether-my-rails-app-is-thread-safe-or-not/) world. Using immutable state and predictable behavior is a solution I know for thread safety or race conditions, to achieve that on OO you need yo avoid side effects and modify attributes just on constructors, forget about side effect methods or setters, period, sometimes you will have to deal also with [Locks](https://en.wikipedia.org/wiki/Lock_(computer_science)) or if you use modern technologies with [Actor Models](https://en.wikipedia.org/wiki/Actor_model), but immutability is always the center.

Let’s consider these facts: I use immutable state as addressed above, Service Objects are actionable through one public method which avoids side effects, I chain several of them to accomplish tasks; so here comes an intriguing question: isn’t this style getting closer to [Functional Programming (FP) principles](https://en.wikipedia.org/wiki/Functional_programming)?, Yes, as for me concerns I like to use some functional programming styles on my OO code, sounds wired but is true, even I’m eager to learn some FP languages such as [Elixir](http://elixir-lang.org/) and [Elm](http://elm-lang.org/), it seems that the functional approach works for me, it provides me valuable resources to write better code even on OO languages, there is a trend to adopt FP languages in the programming world, now I understand it. I have guided you on my journey this far, if you are at this stage too, [I encourage you to go and try a functional language](https://www.youtube.com/watch?v=bmFKEewRRQg), do it or not you should be aware of main benefits explained here, whatever language you use.

## Conclusion

Consider strategies to migrate your code from Monolith to a Micro-services design, it will improve your code base, it’s been successful for application architectures so let’s extrapolate the concept. Don’t ever think you got it perfect and polished, there is always room for improvement, don’t get stuck, never freeze, self-improvement is rewarding.

I hope this post has helped somehow, if so, please recommend it to reach out more people.
