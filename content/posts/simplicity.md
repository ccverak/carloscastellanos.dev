--- 
draft: false
date: 2017-05-07T22:31:20+01:00
title: "Thoughts on simplicity in software development"
slug: "Thoughts on simplicity in software development" 
categories: general
description: "Thoughts on simplicity in software development"
---

The software developers view of products

It’s remarkably satisfying to see a nice idea becoming an amazing Product, a successful machinery, probably from the non-technical point of view a fully functional black box. Technical people think different, specially software developers an engineers, we try understand the working parts of every product we know or use, we need to discover the atoms.

Not few times during the product development you find developers going too technical and taking the wrong decisions because they are missing the whole picture; — been there, done that, it’s common, let’s not forget it; tech and business are food and salt.

My purpose with this post is to express some ideas about how developers should approach technical decisions without loosing perspective and how understanding your domain is fundamental. Mainly, I want this to be a reminder for the future me but I suppose this will be valuable for most of software developers.
> # If you can’t explain it simply, you don’t understand it well enough.
> # Albert Einstein

Translating thoughts into materialized representations is underestimated. Drawing diagrams, discussing, writing notes in a pad, writing users stories or technical high level tests describing the product are very simple ways if discovering and understanding, think of this: How many times did happened to you that just commenting an idea with a coworker helped you to realize what was wrong with your thoughts?. Valuable right?, and so it is to doing it in the right direction, because you’d be deriving technical details from real problems and not otherwise.

Doing this kind of system thinking at the very start, will let you alienate into the very technical stuff for a while and be confident about it, you know programmers, our minds go to very wired places in the creating-developing process.

## Mental models for the software development stage

Complexity is the enemy. It’s common to see developer advocating “Simplicity” while creating systems that are nothing but Complex. Even though having “Simplicity” in mind is a good thing not applying it’s a waste, but even worst is not considering it all.

Simplicity is the main key to understanding, not only in architectures but in source code. Code needs it. The things is that is not only about experience is about a mix of discovery, understanding and awareness.

### “Beautifully designed” vs Beautifully designed.

Digging into more technical details, let’s analyze a couple of ideas regarding coding and the way we choose to design our software.

**Dependencies**

Dependencies are means to communication which is the core of any software. Let’s discuss how do we use internal dependencies to address communication.

![No comments….](https://cdn-images-1.medium.com/max/2000/1*wLiLF-w00fyrnMgc5cWuHA.jpeg)*No comments….*

Dependencies are a 2 edged sword. You could easily end up having something similar to the image.

My take on this would be the following: beyond [Bounded Context](https://martinfowler.com/bliki/BoundedContext.html), defining what’s **public API and private API** at all abstraction levels is the paramount.

Loosely coupled approach for inter package communication and high cohesion communication inside packages is a common speech in Design Pattern books, based on this, if we define a ***Facade* for each package with it’s public API** and **communication to that package is enforced to be done using it’s public API, **then and only then we’d have proper boundaries and encapsulation, having simpler dependency graphs to map into our heads. Stable and explicit communication lead to a fully organized systems.

![](https://cdn-images-1.medium.com/max/2000/1*bZ_q9_0IEM8yE5D8J8CZNw.jpeg)

This is much better. Advantages are innumerable.

**Trees vs flats**

As the product evolves always some kind of complexity is induced by new features, using the approach mentioned above, a good strategy to scale would be to split modules into smaller ones as it’s public API becomes messy. **Divide and conquer** is the answer but only splitting into a **flat structures is the key**, forming big dependency trees is against sanity, a picture will convince you:

![](https://cdn-images-1.medium.com/max/4598/1*sGvsLaDuw87nUT3H3NEIUQ.png)

![Focus in the shape instead of names.](https://cdn-images-1.medium.com/max/4082/1*Rd6kjxxcs2PkbrzfEst8fA.png)*Focus in the shape instead of names.*

No discussion, brain health is my choice.

Simple as it seems, understanding and controlling your dependencies are must in software development and it’s often underestimated, think about it. It should be addressed along with your technical debt otherwise you are already going down the road. Technical people should pay more attention to it, sometimes we alienate too much in the details.

## Some closing thoughts

A deep understanding of your domain is fundamental to start and fundamental to evolve. With understanding you are able to create the correct abstractions dependencies and communications. Building software is not about writing classes, packages, libraries or functions, it’s about integrating them. It’s preferable to design integrations that fit into our brains when focusing a context.

As programmers, *let’s our minds to conquer the tools* to create awesome and **Simple** software but not otherwise. Let’s keep the “Design smell alarm” constantly activated because our techie brains are prone to create complexity.

I’m 100% sure this would solve most of the programming challenges we face everyday.
