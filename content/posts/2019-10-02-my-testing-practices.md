---
draft: false
title: "My testing practices"
date: 2019-10-02T18:29:58+02:00
description: "my testing practices"
categories: general
keywords: "tdd, ruby, javascript"
---

I have been asked several times about my testing practices so I decided to spend some time and write them down for future reference and feedback.

I don't take responsibility if you decide to apply these practices, in that case, you are on your own. You are warned :joy: :joy: :joy:

Without further ado, let's start

## How they look?

In structure, something like this:

{{< hl data-options="language-ruby line-numbers" data-line-options="">}}
 'some test' do
 setup
 exercise
 verify
 teardown
end
{{< /hl >}}

## The tests I write are:

- Verbose
- Do not use shared state
- Do have these 4 clear steps 1) Setup 2) Exercise 3) Verify 4) Teardown
- All the 4 test steps are co-located

### Why you ask?

- I like `verbosity` in tests because tests are documentation, the more context and less magic the better.
- I don't like `shared state` in tests because I prefer duplication in favor of readability. Yes, I'm looking at you shared `before` and `beforeEach` and friends.
- I like to think always on having these `test steps` and make them pretty clear for readability matters as well.
- I like to have all the 4 `test steps` `co-located` in consecutive lines, yeah, for readability again.

Across the years I have realized that it is very valuable to write tests in a self-expressive way, where everything is there put together like a paragraph, no need to analyzing shared globals or scrolling up and down to look for more context. How many times have you been bitten by a chain of `before` or `beforeEach` with overlapping declarations? Now you get my point, I suppose... Another benefit is that while keeping things simple for tests if it starts hurting, it's most likely because you may have design problems in your application code.

## How I use mocks, stubs

These are my rules for mocking and stubbing (in unit tests):

- Don't `mock` what you don't own
- `Stub` query messages performed by the unit under test
- `Mock` command messages performed by the unit under test

The last two are self-explanatory but I will care to explain with a simple phrase. You should only care about the `queries` `responses` and the `commands` `side effects`, nothing more.

## Parting thoughts

As a Ruby programmer who values a lot of principles like `DRY` it has been a long way to get to this point, but then I realized that it is OK to write tests using a different approach because aren't tests a different kind of code? These practices intend is to ultimately optimize for readability and maintainability and if you ask me if this the right thing to optimize or if this gets the ROI we should be expecting from tests? - As for `now, Oct 2, 2019` my answer is a resounding `YES`.

What do you think? how do you write your tests? what practices do you use and why? 
Looking forward to hearing your feedback

Till the next time :}
