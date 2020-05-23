<template>
    <svg class="svg-icon" :class="className" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>
<script>
import { ref, computed, onMounted } from '@vue/composition-api';
export default {
    name: "SvgIcon",
    setup(props){
        return {}
    }
}
</script>
<style lang="scss" scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
}
</style>