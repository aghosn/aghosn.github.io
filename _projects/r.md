---
layout: page
title: OSR for R
description: 2015 (Master Thesis, Northeastern University)
img: assets/img/r_logo.png
importance: 1
category: Masters 
---

## Efficient Runtime Deoptimization for R 
---

I did my Master Thesis at Northeastern, with Prof. Jan Vitek, as part of my degree at EPFL.

I worked on speculative optimizations and On-stack-replacement (OSR) for an R JIT compiler, using LLVM.

## Abstract

R is a dynamic programming language that combines functional and object-oriented features.
R has become a popular language for statistical computing, with more than 2 million users worldwide.

However, R suffers from poor performances.
As a dynamic and reflective language, any R construct can be modified or redefined at runtime.
It is thus hardly amenable to many common compiler optimizations.
To make matters worse, R performance bottlenecks seem to be inherent to its semantics.

This thesis presents RJIT OSR, an on-stack replacement prototype for runtime deoptimization in R.
On-stack replacement refers to a compiler technique that dynamically transfers execution between different programs, while propagating the execution state.
RJIT OSR relies on on-stack replacement to preserve an R program’s correctness while enabling aggressive, speculative and unsound compiler optimizations.
RJIT OSR allows the compiler to target R performance bottlenecks, by locally breaking R semantics

## Publication

<a href='https://github.com/aghosn/master-thesis/blob/master/MasterThesis/main.pdf'>Master Thesis</a>
