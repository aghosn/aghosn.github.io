---
layout: page
title: AST-Persist.
description: 2014 - Master semester project, EPFL 
img: assets/img/scalameta.jpg
importance: 3
category: Past Projects 
---

## AST-Persistence for Scalameta 

---

Back during my master at EPFL, I worked on a few plugins for the Scala compiler.

## Abstract

The Scala compiler uses ASTs (abstract syntax trees) as an intermediate representation before generating bytecode. With the development of Scala macros which expand trees at compile time, being able to access, modify and recompose ASTs within the same compilation scope is becoming more and more important. One of the common scenarios of using macros is inspecting abstract syntax trees within reach in order to learn more about the code being transformed, to apply more powerful optimizations, etc. However, arguments to macros can depend on third-party libraries, which are precompiled as bytecode and don't have their ASTs available. It would therefore be great to have a way to publish ASTs along with the bytecode. The publishing of those ASTs should be a choice of the programmer and should take as little space as possible in order to be transparent to the user.


## Code 

<a href='https://github.com/aghosn/ASTpersistence'>Github repository</a>

<a href='https://infoscience.epfl.ch/record/200050?ln=en'>Student report</a>
