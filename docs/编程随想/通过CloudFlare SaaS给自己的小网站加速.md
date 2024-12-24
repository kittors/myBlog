---
title: 通过CloudFlare SaaS给自己的小网站加速
tags:
  - cloudflare
  - SaaS
  - CDN
createTime: 2024/12/06 11:58:32
permalink: /article/svunhckd/
---

## 背景

我的个人网站一直部署在Vercel上。然而最近Vercel被防火墙屏蔽，导致网站无法正常访问。为了解决这个问题，我尝试为网站添加了Cloudflare CDN，但访问速度仍然不尽如人意。更糟糕的是，如果分配到的Cloudflare节点IP也被屏蔽，网站就完全无法访问。

面对这种情况，我开始寻找更好的网站加速方案。首先考虑的是购买国内的CDN服务，但对于一个简单的静态文档网站来说，这些服务的费用实在太高。而且，如果网站遭受恶意的DDoS攻击，可能会产生巨额费用。事实上，已经有不少个人网站因此遭受损失的案例。

## 解决方案

好在我找到了一个免费的解决方案：利用Cloudflare提供的SaaS服务，通过配置公共CNAME的Cloudflare节点来加速网站访问。

以下是优化后的访问效果：

![优化后的效果](https://syncoss.07230805.xyz/1731733637171_.pic.jpg "优化后的效果")

### 优化原理图

![流程图](https://syncoss.07230805.xyz/cloudflare_SaaS.png "流程图")

这个访问流程可能初看会让人困惑。让我来详细解释一下这个优化方案：

1. 为什么要使用公共CNAME？
- 这些公共CNAME节点经过了特殊优化，具有更好的网络连通性
- 它们通常部署在全球各地的优质节点上，包括中国大陆
- 使用这些节点可以避免直接连接到可能被屏蔽的IP地址

2. 工作原理
- 当用户访问网站时，DNS首先解析到公共CNAME地址
- CNAME服务器会根据用户的地理位置，选择最优的CDN节点
- 通过这种方式，既提升了访问速度，又提高了可用性

3. 优势
- 完全免费，无需担心高额CDN费用
- 自动优化路由，提供更好的访问体验
- 提供基本于无限流量的DDoS防护能力，即使遭受大规模攻击也能保持稳定
- 避免了直接使用可能被屏蔽的Cloudflare节点

至于cloudFlare 边缘节点 对于SaaS回流，这是官方的翻译，大家不喜欢看就当没看到
1. 智能路由选择
- 边缘节点会自动选择最优的回源路径
- 利用Argo Smart Routing技术，实时监测网络状况
- 动态调整路由以避开拥堵或故障节点

2. 多级缓存机制
- 边缘节点设有本地缓存
- 针对静态资源实现就近访问
- 减少回源请求，降低源站压力

3. 回源链路优化
- 使用专用的回源网络通道
- 支持多协议优化（如HTTP/3、QUIC）
- 实现源站与边缘节点间的高效通信

4. 安全防护
- 在回源过程中提供SSL/TLS加密
- 防止源站IP暴露
- 过滤恶意流量，确保源站安全

主要就是在这种多层次的优化机制确保了即使在复杂的网络环境下，也能提供稳定可靠的访问体验。

而我们实际使用的就是借助 Cloudflare SaaS 的回源机制，通过 CNAME 记录将域名解析指向 Cloudflare 的 SaaS 节点。当用户请求到达 Cloudflare 边缘节点后，边缘节点会通过优化后的网络路径回源获取内容，从而实现全局加速和防护。这种方式不仅提供了更好的访问性能，还能有效规避网络封锁的问题。

### 实际操作
要完成这个优化方案，你需要准备：
1. 一张支持外币支付的信用卡（推荐招商银行的全币种 VISA 卡，审批速度快）
2. 两个域名：
   - 主域名：建议选择 .xyz 等价格合理的域名（支持多年期购买）
   - 辅助域名：可以选择首年优惠的域名（比如首年 1 元的活动）
3. 域名注册商推荐：[Spaceship](https://www.spaceship.com/)
   - 提供稳定的 DNS 解析服务
   - 价格实惠
   - 操作界面友好

#### 操作开始
进入cloudflare页面登录你的账号，[点击](https://dash.cloudflare.com/c7eb0898bb161f0101a28e745372ca12/websites)进入网站管理页面,将你购买的域名托管在cloudflare中。
另一个域名托管在[DNSPod](https://console.dnspod.cn)中，为啥要使用两个dns解析服务？ 因为cloudFlare已经限制了同名的主机记录了，为了实现分流效果，所以需要还是还是将另一个域名解析在DNSPod中。

在cloudflare 的网站DNS解析服务中选择将一个域名进行A类型的解析，记住要开启cloudFlare的DNS代理哦！
例如我操作的是
![DNS解析](https://syncoss.07230805.xyz/cloudflare_dns_202412241044.jpg "DNS解析")
可以找个[站长工具](https://www.itdog.cn)检查下解析的结果
![解析结果](https://syncoss.07230805.xyz/DNS_result_20241224.pic.jpg "解析结果")

然后在cloudflare的SSL/TTS -> 自定义主机名下 中添加回退源
![添加回退源](https://syncoss.07230805.xyz/1881735009442_.pic.jpg "添加回退源")

等待出现回退源状态为有效为止
![回退源状态](https://syncoss.07230805.xyz/1861735008954_.pic.jpg "回退源状态")

在DNSPod中添加一个子域名 blog.31415.online
![添加子域名](https://syncoss.07230805.xyz/1871735009130_.pic.jpg "添加子域名")
别问，不知道怎么添加子域名，你自己Google下就懂了

在cloudflare的SSL/TTS-> 自定义主机名下 添加主机名
![添加自定义主机名](https://syncoss.07230805.xyz/1891735009544_.pic.jpg "添加自定义主机名")

等待添加的自定义主机名初始化完成
![自定义主机名初始化](https://syncoss.07230805.xyz/1901735009682_.pic.jpg "自定义主机名初始化")

获得需要添加的TXT记录
![获得需要添加的TXT记录](https://syncoss.07230805.xyz/1911735009768_.pic.jpg)
将TXT记录添加到你的DNS解析的二级域名中,注意不需要带上你的二级域名内容，只需要带上_cf-custom-hostname即可
![添加TXT解析](https://syncoss.07230805.xyz/1921735009969_.pic.jpg)
回到cloudflare页面去检查下 出现有效就是已经添加记录成功了
![检查状态](https://syncoss.07230805.xyz/1931735010070_.pic.jpg)

到目前为止所有的物料都是已经准备好了，接下来就是使用公共CNAME
有一个网站可以找到比较合适的公共CNAME [www.wetest.vip](https://www.wetest.vip/page/cloudflare/cname.html)

找一个你觉得不错的
![公共CNAME](https://oss.07230805.xyz/files/1941735010597_.pic.jpg)

在DNSPod 添加两条记录一条处理境内的，设置默认的CNAME添加,另一条设置为境外使用1.0.0.5，设置A记录添加
![添加记录](https://oss.07230805.xyz/files/1951735010996_.pic.jpg)

为二级域名blog.31415.online添加一个@的CNAME记录，记录值就是cdn.31415.online
![添加cdn记录值](https://oss.07230805.xyz/files/1961735011155_.pic.jpg)

这样你的回流服务算是完成啦！

## 接下来我们部署一个web服务
我的博客网站是部署在vercel上的，主要是因为可以通过vercel监听github的push从而实现网站的自动化部署

进入我自己的服务器，我在上面使用docker搭建了一个nginx服务，通过nginx服务反向代理vercel链接到blog.31415.online。这样我们就可以直接访问vercel的内容，并且走了cloudflare的优化线路以及代理服务，避免了vercel在大陆被封锁的问题。
我的服务器使用的是[clawCloud](https://claw.cloud),我检查过路由,上游是阿里云，配置极高价格十分的便宜，并且不需要实名以及备案。
推荐使用 科技lion脚本工具箱
``` bash
curl -sS -O https://kejilion.pro/kejilion.sh && chmod +x kejilion.sh && ./kejilion.sh
```
直接通过他安装nginx服务，或者通过nginx manager管理
设置nginx反向代理
![设置反向代理](https://oss.07230805.xyz/files/1971735014643_.pic.jpg)