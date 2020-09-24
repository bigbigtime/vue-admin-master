<template>
    <div>
        <el-table :data="data.tableData" border style="width: 100%" class="table-ui" @selection-change="changeCheckbox">
            <el-table-column v-if="config.checkbox" type="selection" width="40"></el-table-column>
            <template v-for="item in config.thead" >
                <!-- 格式化 -->
                <el-table-column v-if="item.type === 'function'" :key="item.prop" :label="item.label" :width="item.width">
                    <template slot-scope="scope">
                        <div v-html="item.callback && item.callback(scope.row)"></div>
                    </template>
                </el-table-column>
                <!-- switch -->
                <el-table-column v-else-if="item.type === 'switch'" :key="item.prop" :label="item.label" :width="item.width">
                    <template slot-scope="scope">
                        <el-switch 
                            v-model="scope.row[item.prop]"
                            :active-value="item.activeValue || true" 
                            :inactive-value="item.inactiveValue || false" 
                            @change="item.callback && item.callback($event, scope.row)"
                        >
                        </el-switch>
                    </template>
                </el-table-column>
                <!-- 插槽 -->
                <el-table-column v-else-if="item.type === 'slot'" :key="item.prop" :label="item.label" :width="item.width">
                    <template slot-scope="scope">
                        <slot :name="item.slotName" :data="scope.row"></slot>
                    </template>
                </el-table-column>
                <!-- 操作 -->
                <el-table-column v-else-if="item.type === 'operation'" :key="item.prop" :label="item.label" :width="item.width">
                    <template slot-scope="scope">
                        <slot :name="item.slotName" :data="scope.row"></slot>
                        <el-button v-if="config.deleteButton" size="mini" @click="deleteConfirm(scope.row[config.deleteKey])">删除</el-button>
                    </template>
                </el-table-column>
                <!-- 默认输入文本 -->
                <el-table-column v-else :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width"></el-table-column>
            </template>
        </el-table>
        <div class="spacing-30"></div>
        <el-row>
            <el-col :span="6">
            <el-button size="small" :disabled="!data.row_data_id" @click="deleteConfirm(data.row_data_id)">批量删除</el-button>
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
import { onMounted, onBeforeMount, reactive } from "@vue/composition-api";
// API
import { GetListData, DeleteData } from "@/api/common";
export default {
    name: "BasisTable",
    props: {
        configTable: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props, context){
        const config = reactive({
            onload: false,      // 加载完成回调
            isRequest: true,    // 接口请求关开
            url: "",            // 请求地址
            urlDelete: "",      // 删除接口
            data: {},           // 请求参数
            checkbox: true,    // 列表复选框
            thead: [],         // 表头
            pagination: false, // 页码
            deleteButton: true, // 是否需要删除按钮
            deleteKey: "id"     // 删除接口的唯一标识
        })
        const data = reactive({
            tableData: [],
            row_data_id: "",
            // 当前页码
            currentPage: 1,
            // 页码统计
            total: 0,
        })
        const initConfig = () => {
            // 获取 config 对象的所有 key（键名）
            const keys = Object.keys(config); 
            // 获取传入的配置数据
            for(let key in props.configTable) {
                // 非实例属性，则跳过此次循环
                if(!props.configTable.hasOwnProperty(key)) { continue; }
                // 匹配 key，存在则替换
                if(keys.includes(key)) {
                    config[key] = props.configTable[key]
                }
            }
        }
        // 接口请求
        const loadData = () => {
            // 判断是否存在 url
            if(!config.url) { return false; }
            const requestData = {
                url: config.url,
                data: config.data
            }
            GetListData(requestData).then(response => {
                const responseData = response.data;
                if(responseData.data) { 
                    data.tableData = responseData.data;
                }
                // 页码统计
                data.total = responseData.total;
                // 判断是否回调
                config.onload && context.emit("onload", data.tableData);
            })
        }
        /** 删除确认提示 */
        const deleteConfirm = (id) => {
            context.root.gComfirm({
                msg: "确认删除此信息吗？",
                thenFun: () => {
                    data.row_data_id = id;
                    handlerDelete();
                }
            })
        }
        const handlerDelete = () => {
            const requestData = {
                url: config.url,
                data: {
                    [config.deleteKey]: data.row_data_id
                }
            }
            DeleteData(requestData).then(response =>{
                context.root.gMessage({
                    msg: response.message
                })
                data.row_data_id = ""; // 清除ID
                loadData()             // 请求接口加开列表
            }).catch(error => {
                // 清除ID
                data.row_data_id = "";
            })
        }
        /** 复选框 */
        const changeCheckbox = (val) => {
            if(val && val.length > 0) {
                const idItem = val.map(item => item.id);
                data.row_data_id = idItem.join();
            }else{
                data.row_data_id = ""
            }
        }
        // 页码下拉选项
        const handleSizeChange = (val) => {
            config.data.pageSize = val;
            config.data.pageNumber = 1;
            loadData();
        }
        // 点击页码
        const handleCurrentChange = (val) => {
            config.data.pageNumber = val;
            loadData();
        }
        // 挂载完成时
        onBeforeMount(() => {
            // 初始化配置
            initConfig()
            // 是否请求接口
            config.isRequest && loadData();
        })
        return { data, config, deleteConfirm, handleSizeChange, handleCurrentChange, changeCheckbox }
    }
}
</script>