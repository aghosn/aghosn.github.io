---
layout: page
title: Tyche
description: 2021 - PostDoc, Microsoft
img: assets/img/tyche.jpg
importance: 8
category: Research 
---

# Rethinking the confidential cloud through a unified low-level abstraction for composable isolation

## Abstract

Securing sensitive cloud workloads requires composing confidential virtual machines (CVMs) with nested enclaves or sandboxes.
Unfortunately, each new isolation boundary adds ad-hoc access control mechanisms, hardware extensions, and trusted software.
This escalating complexity bloats the TCB, complicates end-to-end attestation, and leads to fragmentation across platforms and cloud service providers (CSP).

We introduce a unified isolation model that delegates enforceable, composable, and attestable isolation to a single trusted security monitor: Tyche.
Tyche provides an API for partitioning, sharing, attesting, and reclaiming resources through its core abstraction, trust domains (TDs).
To provide fine-grain isolation, TDs can recursively create and manage sub-TDs.
Tyche captures these relationships in attestations, allowing cloud tenants to reason about end-to-end security.
TDs serve as the building blocks for constructing composable enclaves, sandboxes, and CVMs.

Tyche runs on commodity x86_64 without hardware security extensions and can maintain backward compatibility with existing software. We provide an SDK to run and compose unmodified workloads as sandboxes, enclaves, and CVMs with minimal overhead compared to native Linux execution. Tyche supports complex cloud scenarios, such a confidential inference with mutually distrustful users, model owners, and CSP. An additional RISC-V prototype demonstrates Tyche’s portability across platforms.

## Paper

{% pdf "/assets/pdf/rethinking.pdf" %}

---

# Tyche: Creating Trust by Abolishing Hierarchies

## Description

At the end of my PhD, I applied and received the Swiss JRC grant to work on confidential computing solutions for legacy hardware.
The goal was to come up with a unified isolation mechanism for compartmentalization and confidential computing, without confidiential computing hardware extensions.

This is an ongoing project with a first publication at HotOS 23.

## Abstract

Software is going through a trust crisis.
Privileged code is no longer trusted and processes insufficiently protect user code from unverified libraries. While usually treated separately, confidential computing and program compartmentalization are both symptoms of the same problem, deeply rooted in hierarchical commodity systems: privileged software’s monopoly over isolation.

This paper proposes a separation of powers: to decouple trust and isolation from privilege hierarchies.
It introduces an isolation monitor, which delivers verifiable isolation, confidentiality, and integrity to all software, independent of existing system abstractions and privilege hierarchies.

Tyche, our prototype isolation monitor, runs on commodity hardware without relying on complex and emerging hardware security extensions.
It enables any software component to create, compose, and nest isolation abstractions, including user and kernel sandboxes, enclaves, as well as confidential virtual machines.

## Paper

{% pdf "/assets/pdf/tyche_aghosn.pdf" %}

## Presentations

<a href='https://youtu.be/pXv3IU9DJAM?t=1153'>Early stage presentation at AMLD EPFL</a>
