<template>
  <div id="DemoPage" class="pd-15">
    <div style="margin-bottom:15px;">
      <el-button type="primary" @click="insert">新增</el-button>
    </div>
    <ry-edit-table
      ref="editTable"
      :listConfig="listConfig"
      :listData="tableData"
      :rowButtons="rowButtons"
      :operationsConfig="{ width: 160 }"
      :action="'action'"
      :cellStyle="{ color: 'orange' }"
      :cellClassName="'custom-cell-class'"
      trigger="onChange"
    >
      <el-table-column type="selection" width="55px" fixed="left" />
      <el-table-column type="index" label="序号" width="100px" fixed="left" />
    </ry-edit-table>
  </div>
</template>

<script setup>
// 更多用法请查看 https://gitee.com/RYANLLL/ry-edit-table 文档
import { onMounted, ref } from 'vue'
onMounted(() => {
  // console.log('dom',editTable.value)
})
const editTable = ref(null)
function insert() {
  editTable.value.insert({
    name: "",
    age: "",
    job: "",
    date: "",
    items: [],
  });
}
const listConfig = ref([
  {
    mode: "text",
    label: "姓名",
    prop: "name",
    minWidth: "100px",
    disabled(row) {
      return row.name === "cherry" ? true : false;
    },
    change: (v, row, index) => {
      console.log("v, row, index: ", v, row, index);
    },
    blur: (v) => {
      console.log("name blur");
    },
    rules: [
      {
        type: "string",
        required: true,
        message: "姓名不能为空",
      },
    ],
  },
  {
    mode: "text",
    label: "年龄",
    prop: "age",
    minWidth: "100px",
    sortable: true,
    change: (v, row) => (row.job = v <= 22 ? "2" : ""),
    rules: [
      {
        type: "number",
        asyncValidator: (rule, value) => {
          return new Promise((resolve, reject) => {
            if (value < 1) {
              reject("年龄需要大于1岁");
            } else {
              resolve();
            }
          });
        },
      },
    ],
  },
  {
    mode: "date",
    label: "出生日期",
    prop: "date",
    minWidth: "150px",
    inputConfig: {
      "value-format": "YYYY-MM-DD",
    },
    rules: [
      {
        type: "date",
        required: true,
        message: "出生日期不能为空",
      },
    ],
  }
]);
const tableData = ref([
  {
    name: "Time1",
    age: "26",
    pkid: 1,

    date: "1998-01-30",
    job: "0",
    job$view: "运动员",
    items$view: "羽毛球，游泳",
    items: ["0", "3"],
  },
  {
    name: "cherry",
    age: "13",
    pkid: 2,

    date: "1996-01-30",
    job: "2",
    job$view: "学生",
    items$view: "羽毛球，游泳",
    items: ["0", "3"],
  },
  {
    name: "alex",
    age: "28",
    pkid: 3,

    date: "1992-01-30",
    job: "0",
    job$view: "运动员",
    items$view: "羽毛球，游泳",
    items: ["0", "3"],
  }
])
const rowButtons = ref([
  {
    name: "编辑",
    type: "primary",
    vIf: (row) => !row.isEdit,
    click: (ref) => {
      ref.edit();
    },
  },
  {
    name: "保存",
    type: "success",
    vIf: (row) => row.isEdit,
    click: (ref, row) => {
      console.log("保存", row);
      ref.validate((valid, fields) => {
        if (valid) {
          console.log("校验通过");
          ref.cancel();
        } else {
          console.log("校验不通过", fields);
        }
      });
    },
  },
  {
    name: "取消",
    type: "danger",
    vIf: (row) => row.isEdit,
    click: (ref) => {
      ref.cancel();
    },
  },

  {
    name: "删除",
    type: "danger",
    vIf: (row) => !row.isEdit,
    disabled(row, index) {
      return row.name === "ryan";
    },
    click: (ref, row, index) => {
      ref.delete();
    },
  },
])


</script>