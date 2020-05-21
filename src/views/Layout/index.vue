<template>
    <el-container id="layout-container">
        <el-aside id="layout-aside"><LayoutAside/></el-aside>
        <el-container>
            <el-header id="layout-header"><LayoutHeader/></el-header>
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
#layout-aside {
    width: 200px;
    background-color: #77acbc;
}
#layout-header { background-color: #77bc99; }
#layout-main { background-color: #bc77a1; }
</style>