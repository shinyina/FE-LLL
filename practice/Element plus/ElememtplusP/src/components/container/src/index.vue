<template>
    <el-container>
        <el-aside width="200px">
            <el-menu  class="el-menu-demo" mode="horizontal" >
                <el-menu-item index="1">Processing Center</el-menu-item>
                <el-menu-item index="1">Processing Center</el-menu-item>
                <el-menu-item index="1">Processing Center</el-menu-item>
                <el-menu-item index="1">Processing Center</el-menu-item>
                <el-menu-item index="1">Processing Center</el-menu-item>
                <el-menu-item index="1">Processing Center</el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>Header</el-header>
            <router-view></router-view>
        </el-container>
    </el-container>
</template>

<script lang='ts'>

</script>

<style lang='scss' scoped>
.el-container{
    height: 100%;
}
</style>