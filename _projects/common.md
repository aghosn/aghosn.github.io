---
layout: page
title: Common
description: 2021 - ongoing, C-Stem
img: assets/img/log.jpg
importance: 10
category: Tools 
---

## Common: Logging and return values
---

When you work at several layers of the stack, e.g., user code and driver code, and on top of that might share libraries between the two, it is useful to have a single logging library that works in both environments.

The `common` library is a very simple logging code written in C macros that can be used in both modes and defines universal `SUCCESS` and `FAILURE` values. 

My plan is to add logging levels at some point and improve support for asserts.

## Code 

<a href='https://github.com/aghosn/c-stem/tree/main/common'>Github Repository</a>
