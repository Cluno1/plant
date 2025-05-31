/*
 * @Author: 张连登 17875477802@163.com
 * @Date: 2025-05-15 22:48:24
 * @LastEditors: 张连登 17875477802@163.com
 * @LastEditTime: 2025-05-18 23:33:08
 * @FilePath: \plant\src\main.ts
 * @Description:
 *
 * Copyright 2025 xingye/'zld', All Rights Reserved.
 */
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.use(ElementPlus);
app.mount("#app");
//# sourceMappingURL=main.js.map