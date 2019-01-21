--- 
draft: false
date: 2016-12-09T22:31:20+01:00
title: "The Pure Functions experiment"
categories: general
description: "The Pure Functions experiment"
---

Today I would like to talk about **pure functions** and how they help to write better and maintainable code. I tried it myself as an experiment and it went pretty well, good news is that you can apply it in whatever language you like, no matter if it supports Functional Programming or not. This is not a new conclusion you might say, but for me it was. You hear lots of stuff from functional programming nowadays you cannot pay attention to everything but this one is particularly important, I will try to convince you why.

## Wait!, what it is a Pure function?

A **pure function** is a function which:

* Given the same input, will always return the same output.

* Produces no side effects.

* Relies on no external state.

![](images/pure-function.png)

## What should I care?


1- **Encourages the KISS principle** (**K**eep **I**t **S**imple **S**tupid): Writing pure functions enforces you to write simpler understandable code and to think more in orchestrating functions, making happy the Single Responsibility Principle and Demeter’s Law advocates and friends.

> “…Perhaps the most important design principle in computer science is KISS…” Eric Elliott

2- **Improves Testability:** Definitely if your functions don’t mutate state, it is much easier to write tests, just set inputs and expected outputs: be welcome determinism and Immutability. BTW, I’m convinced that mutating state is never the answer, is OK to mutate state just in the constructor of classes, this should be a stated as another Law in software design, I’d call it **D**on’t **F**u..ing **M**utate **S**tate **L**aw.

3- **Helps to Embrace Concurrency:** You are set to go if you don’t mutate state, it will be easier in OO languages to write thread-safe code, immutability is the base to concurrent and distributed programming in FP languages and that is not by accident.

4- **Promotes Determinism:** As mentioned before:

*non-determinism = parallel processing + mutable state*

Everything is moving to multi-threaded or parallel programming now, you need to adhere to safer practices, non-determinism is evil and goes against concurrency and sanity.

**Last but not least**

5- **Memoization and Laziness:** Because pure functions are referentially transparent, we can compute their output once for given inputs and cache the results *(memoization)*, also, you can invoke the computation just when the outputs are being used *(laziness).*


6- **Separation of side effects**: Helps you architect your application separating side effects, seems simple but it is very useful.

I’ve been trying new FP concepts on daily basis in Ruby and Javascript and so far it’s been a delightful experience, I will continue sharing these ideas, and hopefully improving my writing skills. If you are interested and this post has helped somehow, please recommend it to reach out more people.
