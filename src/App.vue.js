import Plants from "./components/Plants.vue";
import Tools from "./components/Tools.vue";
import Card from "./components/Card.vue";
import gsap from "gsap";
import { ref, nextTick, reactive } from "vue";
import { ElMessage } from "element-plus";
import { getPlantDetail, judgePeriod } from "./utls/utl";
const tool = reactive({
    image: "",
    index: 0,
    name: null,
});
const plant = reactive({
    image: "",
    index: -1, //该植物图片的种类 从 1 开始  1-5
    name: "",
    title: "",
    detail: "",
});
const data = reactive({
    ferti: 0, //施肥
    pest: 0, //农药
    sun: 0, //阳光
    tempr: 0, //温度
    water: 0, //水分
});
/**
 * 工具选择函数，会进入动画函数
 * @param index
 * @param image
 */
function handleToolSelected(index, image) {
    if (!plant.image) {
        ElMessage.info("you can't use tool before selected any plant");
        return;
    }
    tool.image = image;
    tool.index = index;
    switch (index) {
        case 0:
            data.sun++;
            tool.name = "sun";
            break;
        case 1:
            data.tempr++;
            tool.name = "tempr";
            break;
        case 2:
            data.water++;
            tool.name = "water";
            break;
        case 3:
            data.ferti++;
            tool.name = "ferti";
            break;
        case 4:
            data.pest++;
            tool.name = "pest";
            break;
    }
    useAnimation();
    const number2 = plant.image.split("/").pop()?.split(".")[0];
    const res = judgePeriod(data, tool.name, plant.index, parseInt(number2, 10)); //判断植物下一个阶段
    console.log(res, "judge");
    if (res.pest) {
        //bug 动画
        useBug();
    }
    if (res.shiny) {
        //shiny 动画
        useShiny();
    }
    plant.image = res.plantUrl;
    if (String(res.plantUrl).indexOf('4.jpg') !== -1) {
        ElMessage.info('sorry but the plant deaded...maybe you can start plant again');
    }
}
/**
 * 植物选择
 * @param index
 * @param image
 */
function handlePlantSelected(index, image) {
    console.log("plant url:", image);
    plant.image = image;
    plant.index = index;
    initData();
    const res = getPlantDetail(plant.index);
    if (res) {
        data.tempr = res.lowestTempr - 1;
        data.sun = res.lowestSun - 1;
        plant.detail = res?.detail ?? "";
        plant.title = res?.title ?? "";
        plant.name = res?.name ?? "";
    }
}
function initData() {
    data.ferti = 0;
    data.pest = 0;
    data.sun = 0;
    data.water = 0;
    data.tempr = 0;
    bug.value = false;
    const el = document.querySelector(".pest-img");
    gsap.killTweensOf(el); // 停止所有正在运行的动画
    gsap.set(el, { clearProps: "all" });
    gsap.set(el, { opacity: 0 });
}
const bug = ref(false);
function useBug() {
    nextTick(() => {
        bug.value = !bug.value;
        const el = document.querySelector(".pest-img");
        gsap.killTweensOf(el); // 停止所有正在运行的动画
        if (bug.value) {
            //需要显示bug pest-img
            gsap.set(el, { opacity: 0 });
            gsap.to(el, {
                delay: 3,
                opacity: 1,
                duration: 1,
                repeat: -1,
                scale: 1.03,
                yoyo: true,
            });
        }
        else {
            gsap.to(el, {
                delay: 1,
                duration: 0,
                onComplete: () => {
                    gsap.set(el, { clearProps: "all" });
                    gsap.set(el, { opacity: 0 });
                },
            });
            setTimeout(() => {
                useShiny();
                ElMessage.success(plant.name + " is perfert !!");
            }, 1000);
        }
    });
}
function useShiny() {
    nextTick(() => {
        const el = document.querySelector(".plant-img");
        const el3 = document.querySelector(".shiny-img");
        if (!el || !el3) {
            console.error("Element not found!");
            return;
        }
        // 1. 先重置所有动画状态
        gsap.killTweensOf([el, el3]); // 停止所有正在运行的动画
        gsap.set(el, { scale: 1 }); // 强制重置 scale
        gsap.set(el3, { opacity: 0 }); // 强制重置 opacity
        // 2. 执行 plant-img 的动画
        gsap.to(el, {
            scale: 1.1,
            duration: 1.5,
            yoyo: true,
            repeat: 1,
        });
        // 3. 执行 shiny-img 的闪烁动画
        const tl = gsap.timeline();
        tl.to(el3, { opacity: 1, delay: 1, duration: 0.5, repeat: 4, yoyo: true }) // 闪烁 5 次
            .to(el3, { opacity: 0, duration: 0.8 }); // 最后消失
    });
}
//实现工具动画的函数
function useAnimation() {
    nextTick(() => {
        // 动画逻辑
        console.log(tool, "tool data");
        if (tool.name == "sun") {
            const el = document.querySelector(".animated-img");
            gsap.killTweensOf(el); // 清理之前的动画
            gsap.set(el, { opacity: 0 });
            //太阳动画
            const el2 = document.querySelector(".sun-img");
            if (el2) {
                gsap.set(el2, { clearProps: "all" }); // 清除所有内联样式
                gsap.killTweensOf(el2); // 清理之前的动画
                gsap.to(el2, {
                    rotate: 360,
                    duration: 1,
                });
            }
        }
        else if (tool.name == "pest") {
            const el = document.querySelector(".animated-img");
            if (el) {
                gsap.set(el, { clearProps: "all" }); // 清除所有内联样式
                gsap.killTweensOf(el); // 清理之前的动画
                gsap.set(el, { opacity: 0.8, y: -100, rotate: -40 });
                const tl = gsap.timeline();
                tl.from(el, {
                    opacity: 0,
                    x: -300,
                    y: tool.index * 100,
                    width: 0,
                    height: 0,
                });
                // 旋转动画序列
                tl.to(el, { rotate: -140, duration: 0.3 })
                    .to(el, { rotate: 0, duration: 0.7 })
                    .to(el, { rotate: -140, duration: 0.3 })
                    .to(el, { rotate: 0, duration: 0.7, opacity: 0 });
            }
        }
        else if (tool.name == "tempr") {
            const el2 = document.querySelector(".animated-img");
            gsap.killTweensOf(el2); // 清理之前的动画
            gsap.set(el2, { opacity: 0 });
            // 温度计动画
            const el = document.querySelector(".temper-img");
            if (el) {
                gsap.set(el, { clearProps: "all" }); // 清除所有内联样式
                gsap.killTweensOf(el); // 清理之前的动画
                gsap.to(el, {
                    scale: 1.5, // 放大1.5倍
                    duration: 0.5,
                    yoyo: true, // 往返动画
                    repeat: 3, // 重复3次
                });
            }
        }
        else {
            //其他动画
            const el = document.querySelector(".animated-img");
            if (el) {
                gsap.set(el, { clearProps: "all" }); // 清除所有内联样式
                gsap.killTweensOf(el); // 清理之前的动画
                gsap.set(el, { opacity: 0.8, y: -100 });
                const tl = gsap.timeline();
                tl.from(el, {
                    opacity: 0,
                    x: -300,
                    y: tool.index * 100,
                    width: 0,
                    height: 0,
                });
                // 旋转动画序列
                tl.to(el, { rotate: 90, duration: 0.3 })
                    .to(el, { rotate: 0, duration: 0.7 })
                    .to(el, { rotate: 90, duration: 0.3 })
                    .to(el, { rotate: 0, duration: 0.7, opacity: 0 });
            }
        }
    });
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['declear-img']} */ ;
/** @type {__VLS_StyleScopedClasses['plant-img']} */ ;
/** @type {__VLS_StyleScopedClasses['animated-img']} */ ;
/** @type {__VLS_StyleScopedClasses['shiny-img']} */ ;
/** @type {__VLS_StyleScopedClasses['image-layout']} */ ;
/** @type {__VLS_StyleScopedClasses['sun-img']} */ ;
/** @type {__VLS_StyleScopedClasses['temper-img']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "common-layout bg-green-50" },
});
const __VLS_0 = {}.ElContainer;
/** @type {[typeof __VLS_components.ElContainer, typeof __VLS_components.elContainer, typeof __VLS_components.ElContainer, typeof __VLS_components.elContainer, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
const __VLS_4 = {}.ElAside;
/** @type {[typeof __VLS_components.ElAside, typeof __VLS_components.elAside, typeof __VLS_components.ElAside, typeof __VLS_components.elAside, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    width: "20vw",
    ...{ class: "flex flex-row justify-start items-start mt-10" },
}));
const __VLS_6 = __VLS_5({
    width: "20vw",
    ...{ class: "flex flex-row justify-start items-start mt-10" },
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
/** @type {[typeof Tools, ]} */ ;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(Tools, new Tools({
    ...{ 'onImageSelected': {} },
}));
const __VLS_9 = __VLS_8({
    ...{ 'onImageSelected': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
let __VLS_11;
let __VLS_12;
let __VLS_13;
const __VLS_14 = {
    onImageSelected: (__VLS_ctx.handleToolSelected)
};
var __VLS_10;
var __VLS_7;
const __VLS_15 = {}.ElContainer;
/** @type {[typeof __VLS_components.ElContainer, typeof __VLS_components.elContainer, typeof __VLS_components.ElContainer, typeof __VLS_components.elContainer, ]} */ ;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({}));
const __VLS_17 = __VLS_16({}, ...__VLS_functionalComponentArgsRest(__VLS_16));
__VLS_18.slots.default;
const __VLS_19 = {}.ElHeader;
/** @type {[typeof __VLS_components.ElHeader, typeof __VLS_components.elHeader, typeof __VLS_components.ElHeader, typeof __VLS_components.elHeader, ]} */ ;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
    height: "30vh",
    ...{ class: "flex flex-row justify-center items-center mt-4" },
}));
const __VLS_21 = __VLS_20({
    height: "30vh",
    ...{ class: "flex flex-row justify-center items-center mt-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
__VLS_22.slots.default;
/** @type {[typeof Card, ]} */ ;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(Card, new Card({
    description: (__VLS_ctx.plant.detail),
    title: (__VLS_ctx.plant.title),
    imageIndex: (__VLS_ctx.plant.index),
}));
const __VLS_24 = __VLS_23({
    description: (__VLS_ctx.plant.detail),
    title: (__VLS_ctx.plant.title),
    imageIndex: (__VLS_ctx.plant.index),
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
var __VLS_22;
const __VLS_26 = {}.ElMain;
/** @type {[typeof __VLS_components.ElMain, typeof __VLS_components.elMain, typeof __VLS_components.ElMain, typeof __VLS_components.elMain, ]} */ ;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({}));
const __VLS_28 = __VLS_27({}, ...__VLS_functionalComponentArgsRest(__VLS_27));
__VLS_29.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "image-layout" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: "/image/sun.png",
    alt: "sun",
    ...{ class: "sun-img absolute top-0 left-0 object-contain rounded" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: "/image/temper.png",
    alt: "tempr",
    ...{ class: "temper-img absolute top-5 right-5 object-contain rounded" },
});
if (__VLS_ctx.plant.image) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (__VLS_ctx.plant.image),
        alt: "plant",
        ...{ class: "image plant-img absolute top-2/5 left-1/4 object-contain rounded" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: (__VLS_ctx.tool.image),
    alt: "tool",
    ...{ class: "animated-img absolute top-1/5 left-1/4 z-100 object-contain rounded opacity-0" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    alt: "shiny",
    ...{ class: "image shiny-img absolute top-2/5 left-1/4 z-20 object-contain rounded opacity-0" },
    src: "/effect/shiny-2.png",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    alt: "bugs",
    ...{ class: "pest-img image absolute top-2/5 left-1/4 z-30 object-contain rounded opacity-0" },
    src: "/effect/bugs.png",
});
var __VLS_29;
var __VLS_18;
const __VLS_30 = {}.ElAside;
/** @type {[typeof __VLS_components.ElAside, typeof __VLS_components.elAside, typeof __VLS_components.ElAside, typeof __VLS_components.elAside, ]} */ ;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
    width: "20vw",
    ...{ class: "mt-10" },
}));
const __VLS_32 = __VLS_31({
    width: "20vw",
    ...{ class: "mt-10" },
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
__VLS_33.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "w-full flex flex-col justify-start gap-1.5" },
});
/** @type {[typeof Plants, ]} */ ;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent(Plants, new Plants({
    ...{ 'onImageSelected': {} },
    ...{ class: "absolute" },
}));
const __VLS_35 = __VLS_34({
    ...{ 'onImageSelected': {} },
    ...{ class: "absolute" },
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
let __VLS_37;
let __VLS_38;
let __VLS_39;
const __VLS_40 = {
    onImageSelected: (__VLS_ctx.handlePlantSelected)
};
var __VLS_36;
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "mt-40 declear-img p-1.5 pl-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.br)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.br)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
(__VLS_ctx.data.sun);
__VLS_asFunctionalElement(__VLS_intrinsicElements.br)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
(__VLS_ctx.data.tempr);
__VLS_asFunctionalElement(__VLS_intrinsicElements.br)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
(__VLS_ctx.data.water);
__VLS_asFunctionalElement(__VLS_intrinsicElements.br)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
(__VLS_ctx.data.ferti);
__VLS_asFunctionalElement(__VLS_intrinsicElements.br)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
(__VLS_ctx.data.pest);
var __VLS_33;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['common-layout']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-green-50']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-start']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-10']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['image-layout']} */ ;
/** @type {__VLS_StyleScopedClasses['sun-img']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['object-contain']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['temper-img']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-5']} */ ;
/** @type {__VLS_StyleScopedClasses['right-5']} */ ;
/** @type {__VLS_StyleScopedClasses['object-contain']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['image']} */ ;
/** @type {__VLS_StyleScopedClasses['plant-img']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-2/5']} */ ;
/** @type {__VLS_StyleScopedClasses['left-1/4']} */ ;
/** @type {__VLS_StyleScopedClasses['object-contain']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['animated-img']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-1/5']} */ ;
/** @type {__VLS_StyleScopedClasses['left-1/4']} */ ;
/** @type {__VLS_StyleScopedClasses['z-100']} */ ;
/** @type {__VLS_StyleScopedClasses['object-contain']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-0']} */ ;
/** @type {__VLS_StyleScopedClasses['image']} */ ;
/** @type {__VLS_StyleScopedClasses['shiny-img']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-2/5']} */ ;
/** @type {__VLS_StyleScopedClasses['left-1/4']} */ ;
/** @type {__VLS_StyleScopedClasses['z-20']} */ ;
/** @type {__VLS_StyleScopedClasses['object-contain']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-0']} */ ;
/** @type {__VLS_StyleScopedClasses['pest-img']} */ ;
/** @type {__VLS_StyleScopedClasses['image']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-2/5']} */ ;
/** @type {__VLS_StyleScopedClasses['left-1/4']} */ ;
/** @type {__VLS_StyleScopedClasses['z-30']} */ ;
/** @type {__VLS_StyleScopedClasses['object-contain']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-0']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-10']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-start']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-40']} */ ;
/** @type {__VLS_StyleScopedClasses['declear-img']} */ ;
/** @type {__VLS_StyleScopedClasses['p-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-4']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Plants: Plants,
            Tools: Tools,
            Card: Card,
            tool: tool,
            plant: plant,
            data: data,
            handleToolSelected: handleToolSelected,
            handlePlantSelected: handlePlantSelected,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=App.vue.js.map