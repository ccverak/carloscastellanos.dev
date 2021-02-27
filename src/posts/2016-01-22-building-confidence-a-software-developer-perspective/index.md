--- 
draft: false
date: "2016-01-22"
title: "Building confidence - A software developer perspective"
tags: general
description: "This is my take on how to approach professional software development. I describe tools and practices I have used across the years. #TDD #BDD."
keywords: ["tdd, bdd, software development, ruby"]
---

> "It works" 🙌

Words from your customer after some random clicking on the app you build for them. Deep breath and relax shoulders right? Get paid and move on. The end. Finito. Buuuut... as you may know this is not how to works in real life if you want to stay in business. Deliver and forget doesn't work as a business model for anybody. You always go beyond the first delivery, real applications evolve with time, so it's not a matter of writing shitty code to deliver "On Time", you need to work for your future self making things good enough with a more long term vision.

Not compromising the future is one of the hardest things in software development, it requires experience and business context. What makes you go fast now, will slow you down in the future? Are you accumulating too much tech-debt? Does your code expresses the real business rules in a clear way? My endeavors on becoming a better professional have led me to think about my process and how it scales. Let me introduce you to how I think of it.

## The Process

I think of **developing software** as a process, part of a bigger system, comparable with creating and selling iPhones, and as it, one should worry about optimizing it by reducing time, costs and improving speed and consistency; at the end, it's your name on git logs and and your reputation at stake. Every small piece of code you write may lead to good or bad opinion about your professionalism. All I'm talking about is about gaining confidence and consistency so you can say "this f*cking works" and be confident about it. At the end, isn't removing stress, anxiety, and uncertainty what everybody is looking in life? So, you need a process but how you define it? First let's see what are the systems of having a dis-functional process.

## Symptoms of a dis-functional process

- Master gets unstable frequently

- Production breaks frequently

- "Works in my computer" phenomenon

- Things are complex and hard to change

- Simple things take too long to implement

- Features need to be tested manually

- Fixes in one area break things elsewhere

- Being uncertain if everything it's works fine

## The problems

If you experience any of these symptoms can mean that you are having issues in the product definition, software design, development or delivery processes stages.

## How do I deal with it?

You can't leave it to luck, pick practices and make a consistent system for yourself, team or company. I encourage you to think first to become a *confident programmer*, a ***confident engineer***, by applying good practices to your development process.

## Practices

1- **Automated Testing**: Number 1, no doubt. Through automated testing, you ensure that every piece of code does what it has to do and it helps you to detect defects while creating or refactoring your code specifically **Unit Testing** and **Mutation Testing** will help on smaller contexts of your code. When it comes to test if the system works as expected you can use **Acceptance Testing** and **BDD**. This will bring you the **95%** confident you are looking for.

Here are some tools you can use to apply this practice if you are in the Ruby ecosystem:

* [rspec](https://github.com/rspec/rspec) (Behavior Driven Development library, works for Unit and Acceptance Testing)

* [mutant](https://github.com/mbj/mutant) (Mutation testing library)

* [cucumber](https://github.com/cucumber/cucumber) or [spinach](http://codegram.github.com/spinach) (Acceptance testing frameworks, pro BDD & natural language)

2- **Software design**: Not talking about graphical design here but it may include it, I'm talking in a broader scope. Do not write a single line of code without thinking and designing first. [Build quality-in](https://leanpub.com/buildqualityin). Helps to avoid maintainability issues, potential bugs, potential performance, and security problems and increase readability and self explanatory-ness of code. Here are some principles commonly applied to build better software:

Learning materials:

[**SOLID**](https://en.wikipedia.org/wiki/SOLID_%28object-oriented_design%29) (*Single responsibility, Open-closed, Liskov substitution, Interface segregation, and Dependency inversion*)

[**Design patterns**](https://en.wikipedia.org/wiki/Design_Patterns) A set of proven practices from experienced programmers which help to deal with certain situations programmer usually encounter in their tasks.

Here are a couple of tools that can help you build quality-in in Ruby:

* [reek](https://github.com/troessner/reek): Detects code smells

* [flog](http://ruby.sadi.st/Flog.html): Analyzes code complexity.

* [flay](https://github.com/seattlerb/flay): Detects code duplication and structural similarity.

* [brackeman](http://brakemanscanner.org/): Static security analyzer for Rails apps.

* [bullet](https://github.com/flyerhzm/bullet): Detects N+1 queries.

* [cane](https://github.com/square/cane): Will fail your build if quality thresholds are not met.

* [metric_fu](https://github.com/jscruggs/metric_fu): It used to be kind of old, props if you get it to run, an aggregator for many of the tools we’ve mentioned and more.

* [gemnasium](https://gemnasium.com): Hosted, analysis project for old dependencies and known vulnerabilities.

3- **Automate Everything**: Optimize for reproducibility, putting less effort and saving time by no repeating work.

4- **Everything as source code:** Translate every resource you use to source code, even infrastructure definitions, your source is your main and most important asset. 

     *Tools to come on next posts (take Docker as a good representative of this practice)*

5- **Continuos integration and Continuos delivery (CI/CD)**: Making sure you integrate and deliver the software you want continuously without breaking things in small chunks. The aim is to make things go faster and reliable.

     *More details in new posts*

6- **Manage your time**: Avoid procrastination, gain productivity, schedule only what you are able to do, reduce stress by putting apart pending stuff. Do only one thing at the time. Take notes. Learn to say no.



There are a lot more on practices but these are basic for me. If you are interested in the topic, you should go deeper in the following topics: Agile Development and Continuous Delivery, I plan to write more on that on later posts.

I hope this post helps you to see things differently. Here are some references you might be interested:

[Growing Object-Oriented Software, Guided by Tests](http://www.amazon.com/Growing-Object-Oriented-Software-Guided-Tests/dp/0321503627)

[Practical Object-Oriented Design in Ruby](http://www.poodr.com/)

[The RSpec Book: Behaviour Driven Development with RSpec, Cucumber, and Friends (The Facets of Ruby Series)](http://www.amazon.com/The-RSpec-Book-Behaviour-Development/dp/1934356379)

[The Pragmatic Programmer: From Journeyman to Master](http://www.amazon.com/The-Pragmatic-Programmer-Journeyman-Master/dp/020161622X)

[The Single Biggest Mistake Programmers Make Every Day](https://medium.com/javascript-scene/the-single-biggest-mistake-programmers-make-every-day-62366b432308#.bu4q1fxmb)

[Continuous Delivery](http://continuousdelivery.com/)

[Manifesto for Agile Software Development](http://www.agilemanifesto.org/)

[Build Quality In](https://leanpub.com/buildqualityin)

Stay tuned and happy coding!
