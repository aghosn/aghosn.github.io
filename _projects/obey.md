---
layout: page
title: Obey
description: 2015 - Master semester project, EPFL 
img: assets/img/obey.jpg
importance: 2
category: Past Projects 
---

## Obey: Linter for scalameta
---
The code is obviously completely out-of-date and was just a prototype, but I think it came before scala's default linter.

Another usage for this project was to integrate it directly in CI to update library APIs without developer's intervention, apply coding-style rules etc.

## Abstract

Obey is a user-friendly tool that helps programmers enforce code health requirements in their projects.
Requirements are expressed as rules, written with the TQL library combinators used to traverse scala.meta trees, that generate compiler warnings and can automatically correct the source code.
Programmers are provided with a set of basic rules and can easily implement and use their own. Obey can be used to systematically enforce user-defined requirements, to automate migration between different library versions or simply to format source code.
In this paper, we will present the user interface, the implementation details and the results we obtained during this semester project.

## Artefact

<a href='https://github.com/aghosn/Obey'>Github repository</a>

<a href='https://infoscience.epfl.ch/record/204804?ln=en'>Student Report</a>
