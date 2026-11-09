---
layout: base.njk
title: Tyche
tags: project
navSection: projects
summary: Composable isolation for mutually distrustful cloud components, built on a Rust security monitor and simple capability primitives.
description: Tyche provides composable, attestable isolation on commodity hardware for mutually distrustful cloud workloads.
permalink: /research/tyche/
---
<div class="project-page">

[&larr; All projects](/projects/)

<p class="eyebrow">Research / EuroS&amp;P 2026</p>

# Tyche

## Composable Isolation as a Foundation to Manage Trust in the Cloud

Tyche is a Rust security monitor that makes composable isolation a first-class cloud abstraction. It uses capabilities to control access to machine resources, allowing mutually distrustful components to build nested, attestable isolation boundaries.

The prototype runs on commodity x86 hardware, with a RISC-V prototype demonstrating portability.

[Read the EuroS&P 2026 publication](https://doi.org/10.1109/EuroSP68448.2026.00055) &nbsp; [Read the author PDF](https://arxiv.org/pdf/2507.12364) &nbsp; [EuroS&P 2026 slides](/slides/tyche_eurosp2026_slides.pdf)

The earlier position paper, [Creating Trust by Abolishing Hierarchies](https://doi.org/10.1145/3593856.3595900), appeared at HotOS 2023. [Download that PDF](/papers/tyche_aghosn.pdf).

---

### A future hands-on playground

An interactive capabilities terminal could live on this page, loaded only when a visitor chooses to launch it.

**The interactive demo is not available yet.** The planned integration is a browser terminal connected to a separate service running a fresh capabilities CLI session per visitor, with reset and crash recovery.

</div>
