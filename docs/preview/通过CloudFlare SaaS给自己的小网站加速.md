---
title: 通过CloudFlare SaaS给自己的小网站加速
icon: book
order: 2
category:
  - 网络技术
tag:
  - cloudflare
  - SaaS
  - CDN
navbar: true
sidebar: false
breadcrumb: false
pageInfo: false
contributors: false
editLink: false
lastUpdated: true
prev: true
next: true
comment: false
footer: false
backtotop: true
createTime: 2024/12/06 11:58:32
permalink: /article/svunhckd/
---

## 缘故

我的小网站一直是部署在vercel上，可是vercel竟然在最近被防火墙给墙了，部署的网站无法正常访问，所以我就给它套了一层cloudflare的cdn，但是访问速度也十分感人，如果被分配的cloudflare节点ip也是被墙的，那么将会出现网站访问失败的情况

基于以上的原因，我开始找寻怎么加速我的小网站的方式，当然最好是免费的方式，首先想到的是通过购买国内的CDN服务，可是服务费用对我来说还是太贵了，毕竟我只是部署了一个文档静态网站，如果被别有意图的人，疯狂的DDOS攻击的话，可能会让我花很多钱，而且已经有这样的悲惨案例，个人的小网站被攻击的情况。

## 解决方案

现在已经有了免费的方案，就是通过cloudflare自己的SaaS服务，去白嫖一些公共CNAME的cloudflare节点配置，从而加速自己的网站的访问。

以下是原理图


