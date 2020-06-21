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
        <el-input v-model="data.keyword" placeholder="请输入关键字按enter搜索" class="width-200 mr-15"></el-input>
        <el-button type="danger">搜索</el-button>
      </div>
    </div>
    </div>
    </el-col>
    <el-col :span="6">
      <div class="text-right">
        <router-link to="/newsDetailed"><el-button type="danger">新增</el-button></router-link>
      </div>
    </el-col>
  </el-row>
  <div class="spacing-30"></div>
  <el-table ref="table" border :data="data.tableData" v-loading="data.loading_table" style="width: 100%" @selection-change="handleSelectionChange" class="table-ui">
    <el-table-column type="selection" width="40"></el-table-column>
    <el-table-column prop="title" label="标题"></el-table-column>
    <el-table-column prop="categoryName" width="120" label="类别"></el-table-column>
    <el-table-column width="220" label="日期">
      <template slot-scope="scoped">
        {{ scoped.row.createDate | formatToDate}}
      </template>
    </el-table-column>
    <el-table-column prop="user_name" width="220" label="编辑人员"></el-table-column>
    <el-table-column label="操作" width="200">
      <template>
        <el-button type="danger" size="mini">编辑</el-button>
        <el-button  size="mini">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="spacing-30"></div>
  <el-row>
    <el-col :span="6">
      <el-button size="small">批量删除</el-button>
    </el-col>
    <el-col :span="18">
      <el-pagination 
        class="pull-right" 
        sizs="small" 
        background 
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="data.currentPage"
        :page-size="10"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data.total">
      </el-pagination>
    </el-col>
  </el-row>

  </div>
</template>

<script>
import { reactive, ref, onMounted, watch, onBeforeMount } from "@vue/composition-api";
// API
import { GetList } from "@/api/news"
// common
import { timestampToDate } from "@/utils/common"
export default {
  name: "NewsIndex",
  components: {},
  props: {},
  filters: {
    formatToDate(val){
      return timestampToDate(val);
    }
  },
  setup(props, { root }){
    const requestParams = {
      pageNumber: 1,
      pageSize: 10
    }
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
      keyword: "",
      // table data
      tableData: [],
      // table loading
      loading_table: false,
      // 当前页码
      currentPage: 1,
      // 总条数
      total: 0
    });
    /** 获取列表 */
    const getData = () => {
      const requestData = {
        pageNumber: requestParams.pageNumber,
        pageSize: requestParams.pageSize
      }
      // 加载状态
      data.loading_table = true;
      GetList(requestData).then(response => {
        const responseData = response.data;
        if(responseData.data) { data.tableData = responseData.data; }
        // 总条数赋值
        data.total = responseData.total;
        // 清除状态
        data.loading_table = false;
      }).catch(error => {
        // 清除状态
        data.loading_table = false;
      })
    }
    // 复选框
    const handleSelectionChange = (val) => {}
    // 页码方法
    const handleSizeChange = (val) => {}
    const handleCurrentChange = (val) => {}

    /** 生命周期 */
    onBeforeMount(() => {
      getData();
    })

    return { 
      data,
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    }
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