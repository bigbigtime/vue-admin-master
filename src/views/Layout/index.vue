<template>
    <el-container id="layout-container">
        <el-aside id="layout-aside">侧栏菜单</el-aside>
        <el-container>
            <el-header id="layout-header">头部信息</el-header>
            <el-main id="layout-main">数据内容</el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
    name: "Layout"
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