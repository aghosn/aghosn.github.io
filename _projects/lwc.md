---
layout: page
title: LWC on Dune
description: bringing light-weight contexts to Dune 
img: assets/img/lwc.jpg
importance: 1
category: work 
---

## Year

2016 (PhD)

## Description 

At the begining of my PhD, in 2016, I implemented <a href='https://www.usenix.org/conference/osdi16/technical-sessions/presentation/litton'>Light-weight-contexts</a>, i.e., a sub-process compartmentalization, inside <a href='http://dune.scs.stanford.edu/'>Dune</a>, a process-virtualization project.

The advantage of this approach was that, unlike the original LWC, it didn't require to modify the Operating system.

This was a few months worth of work, quite fun, and allowed me to learn how Intel VT-x works (it is also one of the numerous times where I had to write code to manipulate page-tables and vmas, eventually leading to my `C-Stem` library).


## Artefact

<a href='https://github.com/epfl-dcsl/gotee'>Github repository</a>

<a href='https://github.com/aghosn/HotOs/blob/master/aghosn_main.pdf'>A terribly written attempt at publishing it (I was young)</a>
