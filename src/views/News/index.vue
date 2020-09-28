<template>
  <div class="news-list">
  <el-row>
    <el-col :span="18">
    <div class="filter-wrap">
      <div class="inline">
        <div class="filter-item mr-25">
          <label>类别：</label>
          <el-cascader v-model="data.category_id" :options="data.category_option" :props="data.cascader_props"></el-cascader>
        </div>
      </div>
    <div class="inline">
      <div class="filter-item">
        <label>关键字：</label>
        <el-select v-model="data.key" class="width-100 mr-15">
          <el-option v-for="item in data.keyword_opacity" :key="item.value" :value="item.value" :label="item.label"></el-option>
        </el-select>
        <el-input v-model="data.keyword" placeholder="请输入关键字按enter搜索" class="width-200 mr-15"></el-input>
        <el-button type="danger" @click="search">搜索</el-button>
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
  <BasisTable :configTable="configTableData" @onload="onloadList" :checkboxId.sync="data.checkout_id">
    <template v-slot:operation="slotData">
      <router-link :to="{path: '/newsDetailed', query: { id: slotData.data.id}}">
        <el-button type="danger" size="mini">编辑</el-button>
      </router-link>
    </template>
  </BasisTable>
  </div>
</template>

<script>
import { reactive, ref, onMounted, watch, onBeforeMount } from "@vue/composition-api";
// API
import { GetList, Status, Delete } from "@/api/news";
import { getDateTime } from "@/utils/common";
// table component
import BasisTable from "@/components/table";
export default {
  name: "NewsIndex",
  components: { BasisTable },
  props: {},
  setup(props, { root }){
    const configTableData = reactive({
      onload: true,
      url: "infoList",
      batchDelete: false,
      data: {
        pageNumber: 1,
        pageSize: 10
      },
      thead: [
        { label: "标题", prop: "title", width: "500" },
        { label: "类别", prop: "category_name", width: "200" },
        { 
          label: "日期", 
          prop: "createDate",
          type: "function",
          callback: (data) => {
            return getDateTime(data.createDate * 1000)
          }
        },
        { 
          label: "发布状态", 
          prop: "status",
          type: "switch",
          activeValue: "2",
          inactiveValue: "1",
          callback: ($event, scope) => changeStatus($event, scope)
        },
        { 
          label: "操作", 
          type: "operation",
          slotName: "operation",
          width: "200"
        },
      ]
    })
    const form_search = reactive({
      filter: {},
    });
    const data = reactive({
      checkout_id: [],
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
      category_option: [],
			cascader_props: {
				label: "category_name",
				value: "id"
      },
      category_id: ""
    });
    // 搜索
    const search = () => {
      console.log(data.checkout_id)
      form_search.filter = {};
      // 重置页码为1
      requestParams.pageNumber = 1;
      // 类别
      if(data.category_id) {
        form_search.filter.categoryId = data.category_id[data.category_id.length - 1];
      }
      // 关键字
      if(data.key && data.keyword) {
        form_search.filter[data.key] = data.keyword;
      }
      loadData();
    }
    /** 获取分类 */
		const getCategory = () => {
			root.$store.dispatch("news/categoryAction").then(response => {
				data.category_option = response;
			});
    };
    /** 发布状态 */
    const changeStatus = (event, data) => {
      Status({id: data.id, status: data.status}).then(response => {
        root.gMessage({
          msg: response.message
        })
      }).catch(error => {
        data.status = event == "2" ? "1" : "2";
      })
    }
    const formatDate = (row) => {
      return getDateTime(row.createDate * 1000)
    }
    const onloadList = (data) => {
      console.log(data)
    }
    
    /** 生命周期 */
    onBeforeMount(() => {
      getCategory();
    })

    return { 
      data,
      formatDate,
      search,
      configTableData,
      onloadList
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./news.scss";
</style>