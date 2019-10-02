---
draft: false
title: "How I write my tests"
date: 2019-10-02T18:29:58+02:00
description: "my testing practices"
categories: general
keywords: "tdd, ruby, javascript"
---

Here is a quick summary on how I write my tests and why I do it this way.

I tend to write tests that are:

- Verbose
- Structured

They do not:
- Use globals 
- Use shared state
- Separate setup from the test body

Writing tests is very different than writing bussines code. There
