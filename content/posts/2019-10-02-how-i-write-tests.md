---
draft: true
title: "How I write tests"
date: 2019-10-02T18:29:58+02:00
description: "my testing practices"
categories: general
keywords: "tdd, ruby, javascript"
---

I have been asked several times about my testing practices so I decided to write them down for future reference, also looking for feedback.

I don't take responsibility if you decide to apply these practices, in that case, you are on your own 😱😱😱😱😱

Without further ado

## The tests I write are:

- Verbose
- Do not use shared state
- Do have these 4 clear phases 1) Setup 2) Exercise 3) Verify 4) Teardown
- All the 4 test phases are co-located

### Why you ask?

- I like `verbosity` in tests because tests are documentation, the more context and less magic the better.
- I don't like `shared state` in tests because I prefer duplication in favor of readability. Yes, I'm looking at you shared `before` and `beforeEach` and friends.
- I like to think always on having these `test phases` and make them pretty clear for readability matters as well.
- I like to have all the 4 `test phases` `co-located` in consecutive lines, yeah, for readability again.

Across the years I have realized that it is very valuable for individuals and for teams to write tests in a way that are self-expressive, where everything is there put together like a paragraph, no need to analyzing shared globals or scrolling up and down to look for more context. How many times have you been bitten by a chain of `before` or `beforeEach` with overlapping declarations? Now you get my point, I suppose...

## How I use mocks, stubs

These are my rules for mocking and stubbing (in unit tests):

- Don't `mock` what you don't own
- `Stub` query messages performed by the unit under test
- `Mock` command messages performed by the unit under test

The last two are self-explanatory but I will care to explain with a simple phrase. You should only care about the `queries` `responses` and the `commands` `side effects`, nothing more.

## Parting thoughts

As a Ruby programmer who values a lot of principles like `DRY` it has been a long way to get to this point, but then I realized that it is OK to write tests using a different approach because aren't tests a different kind of code? These practices intend is to ultimately optimize for readability and maintainability and if you ask me if this the right thing to optimize or if this gets the ROI we should be expecting from tests? - As for `now, Oct 2, 2019` my answer is a hard `YES`.

What do you think? who do you write your tests? what practices do you use and why? 
Looking forward to hearing your feedback

Till the next time :}
