--- 
draft: false
date: 2016-01-22T22:31:20+01:00
title: "Getting confident. A software developer perspective."
categories: general
description: "Getting confident. A software developer perspective."
---

## "It works"

"It works", says the customer after clicking 5 or 6 times on the app, deep breath and relax shoulders right? what's next? payment, are we done here? as you may guess, **no**, it doesn't end here. There is always more in the ways because applications evolve with time, software development is not only about bringing things to life but also about evolving them through time. Optimizing for a first delivery can be risky, you always have to think and what comes next.

Optimizing for deliveries without compromising the future is one of the hardest things in software development, it requires experience and business context. Whatever is the context think twice before saying: *“this works”*, what does your inner voice tells you about it? do you mean every letter? and every pixel? does it work by a mix of luck and lots of manual checks or because you have applied trusted engineering practices? Have you ever stopped to think how confident do you feel about the software you have written and the process you have followed? How easy is to add new things to it? Will other people understand what you've done? My endeavors on becoming a better professional have led me to think about my process and how it scales. Let me introduce you to how I think of it.

## The Process

I think of **developing software** as a process, a complex one, part of a bigger system, comparable with creating and selling iPhones, and as it, one should worry about optimizing it, reducing time and costs and improving speed and consistency; it's your name on the papers, it's your competence and your reputation under evaluation. Every small piece of code you write might lead to good or bad opinion about your professionality. You lose nothing here, all I'm talking about gaining confidence and consistency so you can say every time "this works" and be confident about it, or at least move the bar closer to a higher level of confidence away from stress, anxiety, and uncertainty. It has worked me in personal and professional projects for some time, I don't think I'm an expert on it, but I've gotten incredible results.

## Symptoms of the problem (you might not be aware of them)

* Wondering - Will these changes break the master branch?

* Wondering  - Will this break production?

* Breaks elsewhere but works in your PC

* Constantly wanting to rewrite things out

* Manually testing everything after simple and small changes

* Fixing here but breaking elsewhere in the code base

* Being uncertain if everything works fine

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

*Tools to come on next posts*

5- **Manage your time**: Avoid procrastination, gain productivity, schedule only what you are able to do, reduce stress by putting apart pending stuff. Learn to say no.


*There are a lot more on practices but these are basic for me. I are interested in the topic, you should take a look at the following topics: Agile Development and Continuous Delivery, I plan to write more on that on later posts.*

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
