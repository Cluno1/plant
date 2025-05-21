<!--
 * @Author: zld 17875477802@163.com
 * @Date: 2025-05-20 22:23:02
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-05-21 23:44:49
 * @FilePath: \plant\README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# gsap

- nextTick
- const el = document.querySelector('.animated-image') as HTMLElement;
- gsap.set(el, { clearProps: 'all' }); // 清除所有内联样式
- gsap.killTweensOf(el); // 清理之前的动画
- const tl = gsap.timeline(); 时间线



## image  
- public
    - effect // 效果图
        - 1.png//闪亮
        - 2.png //虫子
    - image //tool
        - ferti: 0,//施肥
        - pest: 0,//农药
        - sun: 0,//阳光
        - tempr: 0,//温度
        - water: 0,//水分
    - plants
        - 1 // 1- 代表植物种类
            - 1.png   // 1- 代表植物种类 后 1-5代表植物状态
        - 2
            1.png

```ts
const data = reactive({
  ferti: 0,//施肥
  pest: 0,//农药
  sun: 0,//阳光
  tempr: 0,//温度
  water: 0,//水分
})
```
