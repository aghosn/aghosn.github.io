---
layout: page
title: Pts
description: A generic page-table walker/mapper 
img: assets/img/page_table.png
importance: 1
category: work 
---

## Description 

I had to write page-table walking, mapping, unmapping so many times in my life...
Sometimes for 3 levels, sometimes 4 or 5, sometimes for regular page-tables, sometimes extended or I/O mmu ones...
Sometimes in C, sometimes in Rust or Go...
Sometimes for x86, sometimes for Risc-V...

To make my life easier, and as part of my `C-Stem` project, I decided to write a generic walker/mapper in C, that can compile without any `libc` dependency (very useful if you wanna use it inside a driver).
The library defines profiles for x86 and Risc-V right now, i.e., specific implementations for these two data-structures.
It could easily be extended to support other page-table formats/other architectures.

I might add a Rust and Go implementation in the future... 

## Code

<a href='https://github.com/aghosn/c-stem/tree/main/pts'>Github repository</a>
