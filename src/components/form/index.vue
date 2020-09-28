<template>
    <el-form>
        <el-form-item label="信息类别：" prop="categoryId">
            <el-cascader v-model="form.field.categoryId" :options="data.category_option" :props="data.cascader_props"></el-cascader>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
  name: "BasisForm",
  components: {},
  props: {}
};
</script>
<style lang="scss" scoped>
</style>