<template>
  <div class="news-list">
    <el-row>
      <el-col :span="18">
      <div class="filter-wrap">
        <div class="inline">
          <div class="filter-item mr-25">
            <label>类别：</label>
            <el-select v-model="data.category" class="width-160">
              <el-option v-for="item in data.category_opacity" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </div>
        </div>
        <div class="inline">
          <div class="filter-item">
            <label>关键字：</label>
            <el-select v-model="data.key" class="width-100 mr-15">
              <el-option v-for="item in data.keyword_opacity" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
            <el-input v-model="keyword" placeholder="请输入关键字按enter搜索" class="width-200 mr-15"></el-input>
            <el-button type="danger">搜索</el-button>
          </div>
        </div>
      </div>
      </el-col>
      <el-col :span="6">
        <div class="text-right"><el-button type="danger">新增</el-button></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive, ref, onMounted, watch } from "@vue/composition-api";
export default {
  name: "NewsIndex",
  components: {},
  props: {},
  setup(props, { root }){
    const data = reactive({
      category: 0,
      category_opacity: [
        { label: "人工智能", value: 0 },
        { label: "技术", value: 1 }
      ],
      key: "title",
      keyword_opacity: [
        { label: "标题", value: "title" },
        { label: "ID", value: "id" }
      ],
      keyword: ""
    });
    return { data }
  }
}
</script>
<style lang="scss" scoped>
.filter-wrap {
  .inline { display: inline-block; }
}
.filter-item {
  height: 40px;
  label {
    float: left;
    padding-right: 10px;
    line-height: 40px;
    font-size: 14px;
  }
}
.width-160 { width: 160px; }
.width-100 { width: 100px; }
.width-200 { width: 200px; }
</style>