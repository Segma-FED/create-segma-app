<!-- 封装iconfont图标 -->
<template>
    <svg class="icon"
         aria-hidden="true">
        <use :xlink:href="`#icon-${name}`"></use>
    </svg>
</template>
<script>
import './index';

export default {
    name: 'IconFont',
    props: {
        name: {
            type: String,
            default: '',
        },
    },
};
</script>
<style lang="less"
       scoped>
.icon {
    overflow: hidden;
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
}
</style>
