---
layout: page
title: Tyche
description: 2021 (PhD)
img: assets/img/tyche.png
importance: 8
category: Published 
---

# TEEs on Legacy hardware

Confidential Computing is getting traction and various solutions have appeared on different hardware platforms.
While it is not clear yet what the right abstraction is, i.e., whether we should provide sub-process confidential compartments, like enclaves, or full confidential VMs, in the likes of AMD-SEV SNP or Intel TDX, this short talk presents our approach:

We take a step back and attempt to define exactly what it is we need to support confidential computing.
Whether it really requires new hardware, or simply a system re-design.

My personal belief is that confidential computing should become the norm and thus be supported in a similar fashion on all platforms, all devices, and be orthogonal to existing system abstractions (process & VMs).
The right solution should support enclaves, confidential VMs, but also any combination and nesting of both.

<a href='https://youtu.be/pXv3IU9DJAM?t=1153'>This</a> is the first short talk I gave, at AMLD EPFL, in that direction at the very early stages of our project called Tyche.

Since then, we have made progress toward a full implementation and published our early prototype at HotOS 23.
