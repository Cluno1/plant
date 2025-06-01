import { ref } from "vue";
const emit = defineEmits();
const images = [
    "image/sun.png",
    "image/temper.png",
    "image/water.png",
    "image/ferti.png",
    "image/bug.png",
];
const selectedImage = ref("");
function handleSelect(index) {
    selectedImage.value = images[index];
    emit("image-selected", index, selectedImage.value);
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['image']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tool mx-auto mt-10 flex flex-col gap-4" },
});
const __VLS_0 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    type: "primary",
}));
const __VLS_2 = __VLS_1({
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
var __VLS_3;
for (const [image, index] of __VLS_getVForSourceType((__VLS_ctx.images))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.handleSelect(index);
            } },
        key: (index),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (image),
        alt: "Option",
        ...{ class: "image object-cover rounded" },
    });
}
/** @type {__VLS_StyleScopedClasses['tool']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-10']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['image']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            images: images,
            handleSelect: handleSelect,
        };
    },
    __typeEmits: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=Tools.vue.js.map