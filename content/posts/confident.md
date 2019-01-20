--- 
draft: true
date: 2016-01-22T22:31:20+01:00
title: "Getting confident. A software developer perspective."
slug: "getting confident" 
categories: general
description: "Getting confident. A software developer perspective."
---

### "It works"

"It works" — the client says after 5 or 6 clicks on the software you have created, deep breath and relax shoulders right?, next?: payment or some arrangement, after?: improvement, fixing some details, maybe change the way things look here or there or change some business rule, or… Situation apart let's think what says you inner voice about what you did and what comes next, this time getting more real.

Let's suppose you were lucky and sold what you did, or perhaps you got a contract or you created an online app and you got the users engaged. The other side thinks: good programmer that guy, hum!? reputation and recognition of your work, great, you can't ask for more.
> Good software is software that works…

**But,** what says your inner voice about your work?, are you confident enough on what you did?, when you say “it works”, do you mean every letter? Have you ever stopped to think how confident do you feel about the software you have written and the process you have followed?. I have. My endeavours on becoming a better professional have taken me there. Keep reading to see how I have found enough confidence using good practices from some books and IT influencers.

### The Process

I think of **developing software **as a process, a complex one, part of a bigger system, comparable with creating and selling Iphones, and as it, one should worry on optimizing it, reducing time and costs and improving speed and consistency; it's your name on the papers, it's your competence and your reputation under evaluation, every small piece of code you write might lead to good or bad opinion about your professionality. You lose nothing here, all I'm talking about gaining confidence and consistency so you can say every time "it works" and be confident about it, or at least move the bar closer to a higher level of confidence away from stress, anxiety and uncertainty. It has worked for me so far, I don't think I'm an expert on it, but I've gotten incredible results, that's enough for me; experience will come with time, it's been just a few years for me.

### Symptoms of the problem (you might not be aware of them)
> Will this changes break the master branch?,
> Will this break production?,
> It works on my PC…
> I will have to rewrite this out….,
> Write code and test manually cycle,
> Fix here and break there,
> Fix here, but, (not tests at all?)

### How to deal with these

You can't leave it to luck, pick practices and make a consistent system for yourself, team or company. I encourage you to think first to become a *confident programmer*, a ***confident engineer***, with good practices, let the judgements come later.

### Practices (and tools)

Let's get our hands dirty. Find next my list of practices and tools (Ruby tools mostly which is my current language of choice) from my humble point of view, which had helped me on my search of confidence. Focus on practices, **no matter the language you use always remember**:
> … tools aren't the most important asset, practices are.

1- **Automated Testing**: Number 1, no doubt. Through automated testing you ensure that every piece of code does what it has to do (**Unit Testing** and **Mutation Testing**) and it helps you to detect defects while creating or refactoring your code; besides of testing pieces you also have to test the system behavior (**Acceptance Testing & BDD**) to ensure the **system works as the customer described (this is one of the most important subjects to take care of)**. You got **95%** confident of your code by just adopting automated testing and if you are a reducer you can do it by just using **Acceptance Testing** if you are Ok on losing some details on tests detections.

Tools:

* [rspec](https://github.com/rspec/rspec) (Behavior Driven Development library, works for Unit and Acceptance Testing)

* [mutant](https://github.com/mbj/mutant) (Mutation testing library)

* [cucumber](https://github.com/cucumber/cucumber) or [spinach](http://codegram.github.com/spinach) (Acceptance testing frameworks, pro BDD & natural language)

2- **Software design**, C**ode analysis**: Do not write code without thinking architect and design first. [Build quality-in](https://leanpub.com/buildqualityin). Helps to avoid maintainability issues, potential bugs, potential performance and security problems and increase readability and self explanatory-ness of code.

Principles:

[**SOLID**](https://en.wikipedia.org/wiki/SOLID_%28object-oriented_design%29) (*Single responsibility, Open-closed, Liskov substitution, Interface segregation and Dependency inversion*)

[**KISS**](https://en.wikipedia.org/wiki/KISS_principle) — *Keep It Simple, Stupid*

Tools:

* [Code climate ](https://codeclimate.com/)(Free for open source projects, hosted)

* [Rubocop](http://batsov.com/rubocop/) (Encourages Ruby style guide and Rails style guides or your own)

* [rails_best_practices](https://github.com/railsbp/rails_best_practices) (If you are in a Rails project)

* [Pronto](https://github.com/mmozuras/pronto) (code analysis between branch diffs, used to review increments, locally or on pull requests)

other tools:

While they might not be essentials, I by no means intend to give the impression that they’re either not necessary or of lesser quality, they certainly provide more analysis tools and metrics, metrics, metrics.

* [reek](https://github.com/troessner/reek): Detects code smells

* [flog](http://ruby.sadi.st/Flog.html): Analyzes code complexity.

* [flay](https://github.com/seattlerb/flay): Detects code duplication and structural similarity.

* [brackeman](http://brakemanscanner.org/): Static security analyzer for Rails apps.

* [bullet](https://github.com/flyerhzm/bullet): Detects N+1 queries.

* [cane](https://github.com/square/cane): Will fail your build if quality thresholds are not met.

* [metric_fu](https://github.com/jscruggs/metric_fu): It used to be kind of old, props if you get it to run, an aggregator for many of the tools we’ve mentioned and more.

* [gemnasium](https://gemnasium.com): Hosted, analysis project for old dependencies and known vulnerabilities.

3- **Automate Everything**: Practice makes the monkey. Since is automated you can do it every minute…. so, test, analyze, deploy, install every change.

*Tools to come on next posts*

4- **Everything as source code:** Translate every resource you use to source code, even infrastructure description, your source is your main and most important resource.

*Tools to come on next posts*

5- **Manage your time: **Avoid procrastination, gain productivity, schedule only what you are able to do, reduce stress by putting pending stuff else where: paper, tools or whatever. Learn to say no.


*There are a lot more on practices, these are basic for me. I you like this, you should take a look to the following topics: Agile Development and Continuous Delivery, I plan to write more on that on later posts.*

I hope this post help you to see things different. Here are some references you might be interested:

[Growing Object-Oriented Software, Guided by Tests](http://www.amazon.com/Growing-Object-Oriented-Software-Guided-Tests/dp/0321503627)

[Practical Object-Oriented Design in Ruby](http://www.poodr.com/)

[The RSpec Book: Behaviour Driven Development with RSpec, Cucumber, and Friends (The Facets of Ruby Series)](http://www.amazon.com/The-RSpec-Book-Behaviour-Development/dp/1934356379)

[The Pragmatic Programmer: From Journeyman to Master](http://www.amazon.com/The-Pragmatic-Programmer-Journeyman-Master/dp/020161622X)

[The Single Biggest Mistake Programmers Make Every Day](https://medium.com/javascript-scene/the-single-biggest-mistake-programmers-make-every-day-62366b432308#.bu4q1fxmb)

[Continuous Delivery](http://continuousdelivery.com/)

[Manifesto for Agile Software Development](http://www.agilemanifesto.org/)

[Build Quality In](https://leanpub.com/buildqualityin)

Stay tuned and happy coding!
