---
layout: page
title: Enclosure
description: 2021 - PhD, EPFL
img: assets/img/sandbox.jpg
importance: 9
category: Research 
---

# Enclosure: language-based restriction of untrusted libraries 

## Abstract

Programming languages and systems have failed to address the security implications of the increasingly frequent use of public libraries to construct modern software.
Most languages provide tools and online repositories to publish, import, and use libraries; however, this double-edged sword can incorporate a large quantity of unknown, unchecked, and unverified code into an application.
The risk is real, as demonstrated by malevolent actors who have repeatedly inserted malware into popular open-source libraries.

This paper proposes a solution: enclosures, a new programming language construct for library isolation that provides a developer with fine-grain control over the resources that a library can access, even for libraries with complex inter-library dependencies.
The programming abstraction is language-independent and could be added to most languages.
These languages would then be able to take advantage of hardware isolation mechanisms that are effective across language boundaries.

The enclosure policies are enforced at run time by LitterBox, a language-independent framework that uses hardware mechanisms to provide uniform and robust isolation guarantees, even for libraries written in unsafe languages.
LitterBox currently supports both Intel VT-x (with general-purpose extended page tables) and the emerging Intel Memory Protection Keys (MPK).

We describe an enclosure implementation for the Go and Pythonlanguages.
Our evaluation demonstrates that the Go implementation can protect sensitive data in real-world applications constructed using complex untrusted libraries with deep dependencies.
It requires minimal code refactoring and incurs acceptable performance overhead.
The Python implementation demonstrates LitterBox’s ability to support dynamic languages.

## Publication

<a href='https://dl.acm.org/doi/10.1145/3445814.3446728'>ASPLOS 21</a>

## Artefacts

<a href='https://github.com/aghosn/enclosures'>Code Snapshot</a>