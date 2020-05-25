<template>
    <el-container id="layout-container">
        <el-aside id="layout-aside" width="250px"><LayoutAside/></el-aside>
        <el-container>
            <el-header id="layout-header" height="75px"><LayoutHeader/></el-header>
            <el-main id="layout-main"><LayoutMain/></el-main>
        </el-container>
    </el-container>
</template>
<script>
import LayoutAside from "./components/aside";
import LayoutHeader from "./components/header";
import LayoutMain from "./components/main";
export default {
    name: "Layout",
    components: { LayoutAside, LayoutHeader, LayoutMain }
}
</script>
<style lang="scss" scpoed>
#layout-container { height: 100vh; }
#layout-aside { background-color: #344a5f; }
#layout-header {
    position: relative;
    z-index: 10;
    background-color: $color_main;
    @include webkit(box-shadow, 0 0 10px 0 rgba(0, 0, 0, .5));
}
#layout-main { background-color: #bc77a1; }
</style>