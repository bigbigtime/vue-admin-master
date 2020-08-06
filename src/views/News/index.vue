<template>
  <div class="news-list">
    <el-row>
      <el-col :span="18">
        <el-form :inline="true" label-width="80px">
          <el-form-item label="类别：">
            <el-select v-model="data.category" placeholder="请选择" class="width-160">
              <el-option v-for="item in data.category_options" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关键字：">
            <el-select placeholder="请选择" class="width-100"></el-select>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请输入关键字" class="width-180"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6">
        <el-button type="danger" class="pull-right">新增</el-button>
      </el-col>
    </el-row>
    <el-table ref="table" border :data="data.tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column prop="name" label="标题" width="500"></el-table-column>
      <el-table-column prop="address" label="类别"></el-table-column>
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="address" label="操作" width="200">
        <template>
          <el-button type="danger" size="mini">编辑</el-button>
          <el-button  size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
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
      category_options: [
        { label: "人工智能", value: 0 },
        { label: "技术", value: 1 }
      ],
      tableData: [
        { name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', date: "2020-06-05 12:00:00" },
        { name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', date: "2020-06-05 12:00:00" }
      ]
    });
    // 多选事件
    const handleSelectionChange = (val) => {}
    return { data, handleSelectionChange }
  }
}
</script>
<style lang="scss" scoped>
.width-160 { width: 160px; }
.width-100 { width: 100px; }
.width-180 { width: 180px; }
</style>