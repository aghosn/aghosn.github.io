---
tags: section
sectionId: home
order: 0
permalink: false
---
I'm a Senior Researcher at Microsoft Azure Research in Cambridge, working on virtualization, confidential computing, and how to manage trust in cloud deployments.

I'm particularly interested in composable isolation and system design: finding simple primitives that compose to provide strong security guarantees. A recurring goal is to decouple confidentiality from trust in the functional correctness of workloads that process sensitive data—AI agents are a motivating example. In [Tyche](/research/tyche/), we explore this through a Rust-based security monitor that lets mutually distrustful components create, compose, and nest isolation boundaries on commodity hardware, from individual libraries to virtual machines. [MICA](https://arxiv.org/abs/2603.03403), accepted at [ATC 2026](https://atc.sigops.org/2026/accepted.html), takes a complementary approach to confidential cloud workflows by controlling and attesting how confidential components communicate.

I completed my PhD at EPFL with Edouard Bugnion, James R. Larus, and Mathias Payer. My doctoral research explored isolation through programming abstractions, extending Go and Python to restrict untrusted libraries and protect confidential computations. Along the way (and before LLMs), I've written operating systems from scratch, Linux kernel drivers, hypervisors, virtualization stacks, compilers, and ELF parsers, linkers, and loaders.
