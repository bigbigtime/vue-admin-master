import { reactive } from "@vue/composition-api";
// API
import { GetListData } from "@/api/common";
export function tableList(){
    const tableData = reactive({
        data: [],
        total: 0
    });
    const loadData = (data) => {
        if(!data.url) { return false; }
        const requestData = {
            url: data.url,
            data: data.data
        }
        GetListData(requestData).then(response => {
            const responseData = response.data;
            if(responseData.data) { 
                tableData.data = responseData.data;
                tableData.total = responseData.total;
            }
        }).catch(error => {})
    }

    return {
        tableData, loadData
    }
}