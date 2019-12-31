---
draft: false
title: "My testing practices"
date: 2019-10-02T18:29:58+02:00
description: "my testing practices"
categories: general
keywords: "tdd, ruby, javascript"
---

I have been asked several times about my testing practices so I decided to spend some time and write them down for future reference and feedback.

Let's get into it

## My tests

### How do they look like?

In structure, something like this:

{{< hl data-options="language-ruby line-numbers" data-line-options="">}}
 'some test' do
 setup
 exercise
 verify
 teardown
end
{{< /hl >}}

### Characteristics

- Verbose
- Do not use shared global state
- Do have these 4 clear steps:
1) Setup 
2) Exercise 
3) Verify 
4) Teardown
- All the 4 test steps are co-located

### And here's why

Before going into details let's first analyze how are the modfication patterns for test files. In my experience it's very common that once the tests are written, it's very likely that future modifications are made in very few specific places in a file, isn't it better if you don't have to read or refactor unrelated tests or setups of the file to do your change? Do you agree?
That's why:

- I like `verbosity` in tests because tests are documentation, the more context the better for the reader.
- I don't like using `shared state` in tests because they favor mutability and coupling, instead I prefer to isolate the contexts for every case which makes the code easier to change. Yes, I'm looking at you shared `before` and `beforeEach` and friends.
- I like to make each `test step` as clear and semantic as possible so there is a clear distinction between the phases, for the same purpose as before: readability.
- I like to have all the 4 `test steps` `co-located`, yeah, this helps by providing better context for every test in large and complex scenarios.

Across the years I have realized that it is very valuable to write tests this way, where everything is there put together like a paragraph, no magic tricks, no need to analyzing shared globals or scrolling up and down looking for more context just to do your thing. How many times have you been bitten by a chain of `before` or `beforeEach` with overlapping declarations or with `subject` and `let` crazy combos? (some Rubyists will understand)... Now you get my point, I suppose... Another benefit is that while keeping things simple for tests if it starts hurting, it's most likely because you may have design problems in your application code.

### What about mocks & stubs?

These are my "rules" for mocking and stubbing (in unit tests):

- Don't `mock` what you don't own
- `Stub` query messages performed by the unit under test
- `Mock` command messages performed by the unit under test

The last two are self-explanatory but I will care to explain with a simple phrase. You should only care about the `query responses` and the `command side effects`, nothing more.

## Parting thoughts

As a Ruby programmer who values a lot of principles like `DRY` it has been a long way to get to this point, but then I realized that it is OK to write tests using a different approach because aren't tests a different kind of code? These practices intend is to optimize for readability and maintainability and if you ask me if this the right thing to optimize or if this gets the ROI we should be expecting from tests - As for `today, Oct 2, 2019` my answer is a resounding `YES`.

What do you think? how do you write your tests? what practices do you use and why? 
Looking forward to hearing your feedback

Till the next time :}
