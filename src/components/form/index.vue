<template>
<<<<<<< HEAD
    <el-form :label-width="labelWidth">
=======
    <el-form ref="form">
>>>>>>> lesson10.5.6-field
        <template v-for="item in formItem">
            <!-- cascader -->
            <el-form-item v-if="item.type === 'cascader'" :key="item.prop" :label="item.label" :prop="item.prop">
                <CascaderVue :value.sync="formData[item.prop]" :url="item.url" />
            </el-form-item>
            <!-- input -->
            <el-form-item v-if="item.type === 'input'" :key="item.prop" :label="item.label" :prop="item.prop">
                <el-input v-model="formData[item.prop]" :maxlength="item.max" :minlength="item.min" :style="`width: ${item.width}`" :placeholder="item.placeholder" />
            </el-form-item>
            <!-- upload -->
            <el-form-item v-if="item.type === 'upload'" :key="item.prop" :label="item.label" :prop="item.prop">
                <UploadVue :value.sync="formData[item.prop]" :requestData="item.requestData" :url="item.url" />
            </el-form-item>
            <!-- date -->
            <el-form-item v-if="item.type === 'date'" :key="item.prop" :label="item.label" :prop="item.prop">
                <el-date-picker 
                    :type="item.mode || 'date'" 
                    :placeholder="item.placeholder" 
                    :style="`width: ${item.width}`"
                    :range-separator="item.range || '至'"
                    :start-placeholder="item.startLabel || '开始日期'"
                    :end-placeholder="item.endLabel || '结束日期'" 
                    v-model="formData[item.prop]"
                ></el-date-picker>
            </el-form-item>
            <!-- radio -->
            <el-form-item v-if="item.type === 'radio'" :key="item.prop" :label="item.label" :prop="item.prop">
                <el-radio-group v-model="formData[item.prop]">
                    <el-radio v-for="item in item.options" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <!-- checkbox -->
            <el-form-item v-if="item.type === 'checkbox'" :key="item.prop" :label="item.label" :prop="item.prop">
                <el-checkbox-group v-model="formData[item.prop]">
                    <el-checkbox v-for="item in item.options" :key="item.value" :label="item.value">{{ item.label }}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <!-- select -->
            <el-form-item v-if="item.type === 'select'" :key="item.prop" :label="item.label" :prop="item.prop">
                <el-select v-model="formData[item.prop]" :placeholder="item.placeholder">
                    <el-option v-for="item in item.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <!-- wangeditor -->
            <el-form-item v-if="item.type === 'wangeditor'" :key="item.prop" :label="item.label" :prop="item.prop">
                <WangEditor :value.sync="formData[item.prop]" />
            </el-form-item>
        </template>
        <!-- button -->
        <el-form-item>
            <el-button :type="formConfig.submitType" @click="formConfig.submitFunction && formConfig.submitFunction()">{{ formConfig.submitLabel || "确定" }}</el-button>
            <el-button v-if="formConfig.resetButton" :type="formConfig.resetType" @click="reset">{{ formConfig.resetLabel || "重置" }}</el-button>
            <el-button v-if="formConfig.backButton" :type="formConfig.backType" @click="back">{{ formConfig.backLabel || "返回" }}</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
// components
import CascaderVue from "@c/cascader";
import UploadVue from "@c/upload";
import WangEditor from "@c/wangEditor";
import { ref } from "@vue/composition-api";
export default {
    name: 'BasisForm',
    components: { CascaderVue, UploadVue, WangEditor },
    props: {
        formItem: {
            type: Array,
            default: () => ([])
        },
        formData: {
            type: Object,
            default: () => ({})
        },
        labelWidth: {
            type: String,
            default: "100px"
        },
        formConfig: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props, { root, refs }){
        // 返回
        const back = () => {
            root.$router.go(-1);
        }
        // 重置
        const reset = () => {
            refs.form.resetFields()
        }
        return { back, reset }
    }
}
</script>
<style lang="scss" scoped>
</style>