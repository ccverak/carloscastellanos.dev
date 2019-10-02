---
draft: true
title: "How I write tests"
date: 2019-10-02T18:29:58+02:00
description: "my testing practices"
categories: general
keywords: "tdd, ruby, javascript"
---

I have been asked several times about my testing practices so I decided to write them down for future reference, also looking for feedback.

I don't take responsibility if you decide to apply this practices, in that case you are on your own :smile:

Without further ado

## I write tests that are:

- Verbose
- Do not use shared state
- Do have this clear phases 1) Setup 2) Exercise 3) Verify 4) Teardown
- Co-locate all the 4 test phases

### Why you ask?

- I like verbosity in tests because tests are documentation, the more context and less magic the better.
- I don't like shared state in tests because in I prefer duplication in favor of readibility. Yes I'm looking at you shared `befores` and `afters`.
- I like to always think on this phases and make them pretty clear, for readibility as well.
- Co-location of all the 4 test phases for readibility matters as well again.

Across the years I have realized that is very valuable for individuals and for teams, to write tests in a way that are self expressive where everything is there, no need to analyzing shared globals which overlap in certain contexts before the certain test execution or scrolling up and down to look for more context.

## How I use mocks, stubs

- Stubs for query messages performed by the unit under test
- Mocks for command messages performed by the unit under test

This is self explanatory but I will care to explain with a simple phrase. You should only care about the `queries` `responses` and the `commands` `side effects`, nothing more.

## Parting thoughts

As a Ruby programmer has been a long way to get to this point, I only allow my self this rules in test code, because test code is another type of code right? I like to think that writting the tests this way I'm optimizing for readibility and maintainibility but is this the right thing to optimize, does this provides the ROI we should be looking in tests? - As for `now` my answer is a hard `YES.`

What do you think? what do you write your tests? what practices do you use and why? 
Looking forward to hear your feedback

Till the next time :}
