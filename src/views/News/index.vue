<template>
  <div class="news-list">
    <el-row>
      <el-col :span="18">
      <div class="filter-wrap">
        <div class="inline">
          <div class="filter-item">
            <label>类型：</label>
            <el-select v-model="data.category" style="width: 160px;">
              <el-option v-for="item in data.category_opacity" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </div>
        </div>
        <div class="inline">关键字</div>
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
      ]
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
</style>