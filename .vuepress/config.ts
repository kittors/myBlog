import { defineConfig } from "vuepress/config";
import navbar from "./navbar";
import sidebar from './sidebar';
const author = "Kittors";
const domain = "https://blog.07230805.xyz";
const tags = ["程序员", "编程", "计算机", "网络"];

export default defineConfig({
    title: "Kittors的学习之路",
    description: "开启全栈之路",
    head: [
        // 站点图标
        ["link", { rel: "icon", href: "/favicon.ico" }],
        // SEO
        [
            "meta",
            {
                name: "keywords",
                content:
                    "编程学习路线, 编程知识百科, Java, 编程导航, 前端, 开发, 编程分享, 项目, IT, 求职, 面经, AI, Python, TypeScript, JavaScript, CSS, HTML, Vue, React, 机器学习, 神精网络",
            },
        ],
    ],
    //开启永久链接 蛞蝓化文件路径 (不带扩展名)
    permalink: "/:slug",
    // 监听文件变化，热更新
    extraWatchFiles: [".vuepress/*.ts", ".vuepress/sidebars/*.ts"],
    markdown: {
        // 开启代码块的行号
        lineNumbers: true,
        // 支持 4 级以上的标题渲染
        extractHeaders: ["h2", "h3", "h4", "h5", "h6"],
    },
    //插件
    // @ts-ignore
    plugins: [
        ["@vuepress/back-to-top"],
        ["@vuepress/medium-zoom"],
        // https://github.com/ekoeryanto/vuepress-plugin-sitemap
        [
            "sitemap",
            {
                hostname: domain,
            },
        ],
        // https://github.com/IOriens/vuepress-plugin-baidu-autopush
        ["vuepress-plugin-baidu-autopush"],
        // https://github.com/zq99299/vuepress-plugin/tree/master/vuepress-plugin-tags
        ["vuepress-plugin-tags"],
        // https://github.com/znicholasbrown/vuepress-plugin-code-copy
        [
            "vuepress-plugin-code-copy",
            {
                successText: "代码已复制",
            },
        ],
        // https://github.com/webmasterish/vuepress-plugin-feed
        [
            "feed",
            {
                canonical_base: domain,
                count: 10000,
                // 需要自动推送的文档目录
                posts_directories: [],
            },
        ],
        // https://github.com/tolking/vuepress-plugin-img-lazy
        ["img-lazy"],
    ],
    //主题配置
    themeConfig: {
        logo: "/logo.png",
        nav: navbar,
        sidebar,
        lastUpdated: "最近更新",

        // 编辑链接
        editLinks: true,
        editLinkText: "完善页面",
    }
})