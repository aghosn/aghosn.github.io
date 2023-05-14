---
layout: page
title: LWC on Dune
description: 2016 (PhD) 
img: assets/img/lwc.jpg
importance: 5
category: Tools 
---

# LWC on Dune: bringing light-weight contexts to Dune 

---

At the begining of my PhD, in 2016, I implemented <a href='https://www.usenix.org/conference/osdi16/technical-sessions/presentation/litton'>Light-weight-contexts</a>, i.e., a sub-process compartmentalization, inside <a href='http://dune.scs.stanford.edu/'>Dune</a>, a process-virtualization project.

The advantage of this approach was that, unlike the original LWC, it didn't require to modify the Operating system.

This was a few months worth of work, quite fun, and allowed me to learn how Intel VT-x works (it is also one of the numerous times where I had to write code to manipulate page-tables and vmas, eventually leading to my `C-Stem` library).

## Abstract

We believe programmers would greatly benefit from an OS abstraction for memory isolation within a process.
We further argue that leveraging recent architecture’s hardware support for virtualizaiton would, unlike previous attempts, yield a solution that is both safe and maintainable.
Hardware support for virtualization provides direct access to hardware features, such as ring protection mechanism and page tables, required to provide such an abstraction, while providing flexibility in terms of the implementation’s specifics.
We improve upon previous solutions by both relying on hardware mechanisms to enforce memory isolation and being completely decoupled from an existing kernel.


## Artefact

<a href='https://github.com/epfl-dcsl/gotee'>Github repository</a>

<a href='https://github.com/aghosn/HotOs/blob/master/aghosn_main.pdf'>A terribly written attempt at publishing it</a>
