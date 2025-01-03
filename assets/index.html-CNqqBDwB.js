import{_ as i,c as e,f as a,o as t}from"./app-BN96JEDe.js";const s={};function r(o,l){return t(),e("div",null,l[0]||(l[0]=[a('<h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景"><span>背景</span></a></h2><p>我的个人网站一直部署在Vercel上。然而最近Vercel被防火墙屏蔽，导致网站无法正常访问。为了解决这个问题，我尝试为网站添加了Cloudflare CDN，但访问速度仍然不尽如人意。更糟糕的是，如果分配到的Cloudflare节点IP也被屏蔽，网站就完全无法访问。</p><p>面对这种情况，我开始寻找更好的网站加速方案。首先考虑的是购买国内的CDN服务，但对于一个简单的静态文档网站来说，这些服务的费用实在太高。而且，如果网站遭受恶意的DDoS攻击，可能会产生巨额费用。事实上，已经有不少个人网站因此遭受损失的案例。</p><h2 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案"><span>解决方案</span></a></h2><p>好在我找到了一个免费的解决方案：利用Cloudflare提供的SaaS服务，通过配置公共CNAME的Cloudflare节点来加速网站访问。</p><p>以下是优化后的访问效果：</p><p><img src="https://syncoss.07230805.xyz/1731733637171_.pic.jpg" alt="优化后的效果" title="优化后的效果"></p><h3 id="优化原理图" tabindex="-1"><a class="header-anchor" href="#优化原理图"><span>优化原理图</span></a></h3><p><img src="https://syncoss.07230805.xyz/cloudflare_SaaS.png" alt="流程图" title="流程图"></p><p>这个访问流程可能初看会让人困惑。让我来详细解释一下这个优化方案：</p><ol><li>为什么要使用公共CNAME？</li></ol><ul><li>这些公共CNAME节点经过了特殊优化，具有更好的网络连通性</li><li>它们通常部署在全球各地的优质节点上，包括中国大陆</li><li>使用这些节点可以避免直接连接到可能被屏蔽的IP地址</li></ul><ol start="2"><li>工作原理</li></ol><ul><li>当用户访问网站时，DNS首先解析到公共CNAME地址</li><li>CNAME服务器会根据用户的地理位置，选择最优的CDN节点</li><li>通过这种方式，既提升了访问速度，又提高了可用性</li></ul><ol start="3"><li>优势</li></ol><ul><li>完全免费，无需担心高额CDN费用</li><li>自动优化路由，提供更好的访问体验</li><li>提供基本于无限流量的DDoS防护能力，即使遭受大规模攻击也能保持稳定</li><li>避免了直接使用可能被屏蔽的Cloudflare节点</li></ul><p>至于cloudFlare 边缘节点 对于SaaS回流，这是官方的翻译，大家不喜欢看就当没看到</p><ol><li>智能路由选择</li></ol><ul><li>边缘节点会自动选择最优的回源路径</li><li>利用Argo Smart Routing技术，实时监测网络状况</li><li>动态调整路由以避开拥堵或故障节点</li></ul><ol start="2"><li>多级缓存机制</li></ol><ul><li>边缘节点设有本地缓存</li><li>针对静态资源实现就近访问</li><li>减少回源请求，降低源站压力</li></ul><ol start="3"><li>回源链路优化</li></ol><ul><li>使用专用的回源网络通道</li><li>支持多协议优化（如HTTP/3、QUIC）</li><li>实现源站与边缘节点间的高效通信</li></ul><ol start="4"><li>安全防护</li></ol><ul><li>在回源过程中提供SSL/TLS加密</li><li>防止源站IP暴露</li><li>过滤恶意流量，确保源站安全</li></ul><p>主要就是在这种多层次的优化机制确保了即使在复杂的网络环境下，也能提供稳定可靠的访问体验。</p><p>而我们实际使用的就是借助 Cloudflare SaaS 的回源机制，通过 CNAME 记录将域名解析指向 Cloudflare 的 SaaS 节点。当用户请求到达 Cloudflare 边缘节点后，边缘节点会通过优化后的网络路径回源获取内容，从而实现全局加速和防护。这种方式不仅提供了更好的访问性能，还能有效规避网络封锁的问题。</p><h3 id="实际操作" tabindex="-1"><a class="header-anchor" href="#实际操作"><span>实际操作</span></a></h3><p>要完成这个优化方案，你需要准备：</p><ol><li>一张支持外币支付的信用卡（推荐招商银行的全币种 VISA 卡，审批速度快）</li><li>两个域名： <ul><li>主域名：建议选择 .xyz 等价格合理的域名（支持多年期购买）</li><li>辅助域名：可以选择首年优惠的域名（比如首年 1 元的活动）</li></ul></li><li>域名注册商推荐：<a href="https://www.spaceship.com/" target="_blank" rel="noopener noreferrer">Spaceship</a><ul><li>提供稳定的 DNS 解析服务</li><li>价格实惠</li><li>操作界面友好</li></ul></li></ol><h4 id="操作步骤" tabindex="-1"><a class="header-anchor" href="#操作步骤"><span>操作步骤</span></a></h4><ol><li>域名配置</li></ol><ul><li>登录 <a href="https://dash.cloudflare.com/" target="_blank" rel="noopener noreferrer">Cloudflare 控制台</a>，进入网站管理页面</li><li>将主域名托管到 Cloudflare</li><li>将辅助域名托管到 <a href="https://console.dnspod.cn" target="_blank" rel="noopener noreferrer">DNSPod</a><blockquote><p>注：使用两个 DNS 解析服务是因为 Cloudflare 限制了同名主机记录，为实现分流效果需要将另一个域名解析在 DNSPod</p></blockquote></li></ul><ol start="2"><li>Cloudflare DNS 配置</li></ol><ul><li>在 Cloudflare 的 DNS 解析服务中添加 A 记录解析</li><li>确保开启 Cloudflare 的 DNS 代理（橙色云朵图标） 示例配置： <img src="https://syncoss.07230805.xyz/cloudflare_dns_202412241044.jpg" alt="DNS解析" title="DNS解析"></li></ul><ol start="3"><li>验证解析结果</li></ol><ul><li>使用<a href="https://www.itdog.cn" target="_blank" rel="noopener noreferrer">站长工具</a>检查解析结果 <img src="https://syncoss.07230805.xyz/DNS_result_20241224.pic.jpg" alt="解析结果" title="解析结果"></li></ul><ol start="4"><li>配置回退源</li></ol><ul><li>进入 Cloudflare 的 SSL/TLS -&gt; 自定义主机名</li><li>添加回退源配置 <img src="https://syncoss.07230805.xyz/1881735009442_.pic.jpg" alt="添加回退源" title="添加回退源"></li><li>等待回退源状态变为&quot;有效&quot; <img src="https://syncoss.07230805.xyz/1861735008954_.pic.jpg" alt="回退源状态" title="回退源状态"></li></ul><ol start="5"><li>DNSPod 配置</li></ol><ul><li>添加子域名（如：blog.31415.online） <img src="https://syncoss.07230805.xyz/1871735009130_.pic.jpg" alt="添加子域名" title="添加子域名"></li></ul><ol start="6"><li>配置自定义主机名</li></ol><ul><li>在 Cloudflare 的 SSL/TLS -&gt; 自定义主机名中添加配置 <img src="https://syncoss.07230805.xyz/1891735009544_.pic.jpg" alt="添加自定义主机名" title="添加自定义主机名"></li><li>等待初始化完成 <img src="https://syncoss.07230805.xyz/1901735009682_.pic.jpg" alt="自定义主机名初始化" title="自定义主机名初始化"></li></ul><ol start="7"><li>TXT 记录配置</li></ol><ul><li>获取需要添加的 TXT 记录 <img src="https://syncoss.07230805.xyz/1911735009768_.pic.jpg" alt="获得需要添加的TXT记录"></li><li>在 DNSPod 中添加 TXT 记录（仅需添加 _cf-custom-hostname 部分） <img src="https://syncoss.07230805.xyz/1921735009969_.pic.jpg" alt="添加TXT解析"></li><li>等待 Cloudflare 验证完成 <img src="https://syncoss.07230805.xyz/1931735010070_.pic.jpg" alt="检查状态"></li></ul><ol start="8"><li>配置公共 CNAME</li></ol><ul><li>访问 <a href="https://www.wetest.vip/page/cloudflare/cname.html" target="_blank" rel="noopener noreferrer">www.wetest.vip</a> 选择合适的公共 CNAME <img src="https://syncoss.07230805.xyz/1941735010597_.pic.jpg" alt="公共CNAME"></li></ul><ol start="9"><li>DNSPod 最终配置</li></ol><ul><li>添加境内外解析记录： <ul><li>境内：添加默认 CNAME 记录</li><li>境外：添加 A 记录（1.0.0.5） <img src="https://syncoss.07230805.xyz/1951735010996_.pic.jpg" alt="添加记录"></li></ul></li><li>为二级域名添加 CNAME 记录 <img src="https://syncoss.07230805.xyz/1961735011155_.pic.jpg" alt="添加cdn记录值"></li></ul><h3 id="web-服务部署" tabindex="-1"><a class="header-anchor" href="#web-服务部署"><span>Web 服务部署</span></a></h3><p>我选择将博客部署在 Vercel 上，主要是看中其可以监听 GitHub 的 push 实现自动化部署。为解决访问问题，我采用以下方案：</p><ol><li>在服务器上使用 Docker 部署 Nginx</li><li>通过 Nginx 反向代理 Vercel 内容到 blog.31415.online</li><li>实现通过 Cloudflare 优化线路访问 Vercel 内容</li></ol><p>服务器选用 <a href="https://claw.cloud" target="_blank" rel="noopener noreferrer">clawCloud</a>：</p><ul><li>使用阿里云上游</li><li>高配置低价格</li><li>无需实名和备案</li></ul><p>Nginx 部署推荐使用科技 lion 脚本工具箱：</p><div class="language-bash line-numbers-mode" data-ext="bash" data-title="bash"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">bash</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &lt;(</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">curl</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -sL</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> kejilion.sh</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>配置 Nginx 反向代理： <img src="https://syncoss.07230805.xyz/1971735014643_.pic.jpg" alt="设置反向代理"></p><p>至此，网站加速优化完成。</p>',58)]))}const p=i(s,[["render",r],["__file","index.html.vue"]]),c=JSON.parse('{"path":"/article/svunhckd/","title":"通过CloudFlare SaaS给自己的小网站加速","lang":"zh-CN","frontmatter":{"title":"通过CloudFlare SaaS给自己的小网站加速","tags":["cloudflare","SaaS","CDN"],"createTime":"2024/12/06 11:58:32","permalink":"/article/svunhckd/"},"headers":[{"level":2,"title":"背景","slug":"背景","link":"#背景","children":[]},{"level":2,"title":"解决方案","slug":"解决方案","link":"#解决方案","children":[{"level":3,"title":"优化原理图","slug":"优化原理图","link":"#优化原理图","children":[]},{"level":3,"title":"实际操作","slug":"实际操作","link":"#实际操作","children":[]},{"level":3,"title":"Web 服务部署","slug":"web-服务部署","link":"#web-服务部署","children":[]}]}],"readingTime":{"minutes":5.58,"words":1674},"git":{"createdTime":1733464073000,"updatedTime":1735274990000,"contributors":[{"name":"Kittors","email":"364299311@qq.com","commits":1}]},"filePathRelative":"编程随想/2024年12月/通过CloudFlare SaaS给自己的小网站加速.md","categoryList":[{"id":"b19947","sort":10000,"name":"编程随想"},{"id":"364a0b","sort":10001,"name":"2024年12月"}],"bulletin":false}');export{p as comp,c as data};
