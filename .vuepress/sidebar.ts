import { SidebarConfig4Multiple } from "vuepress/config";
import frontEndLearn from "./sidebars/frontEndLearn";

// @ts-ignore
export default {
    "/ProgrammingLearning/": frontEndLearn,
    // 降级，默认根据文章标题渲染侧边栏
    "/": "auto",
} as SidebarConfig4Multiple;