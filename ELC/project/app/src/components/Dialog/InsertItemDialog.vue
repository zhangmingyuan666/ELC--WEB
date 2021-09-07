<template>
  <div>
    <el-dialog
      title="增加物品"
      v-model="dialogInsert"
      @close="$emit('changeStatus', false)"
    >
      <el-form
        :model="nowInfo"
        :rules="rules"
        ref="nowInfo"
        class="demo-ruleForm"
      >
        <el-form-item
          label="物品的名字"
          :label-width="formLabelWidth"
          prop="item_name"
        >
          <el-input v-model="nowInfo.item_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="物品的价格"
          :label-width="formLabelWidth"
          prop="item_price"
        >
          <el-input
            v-model.number="nowInfo.item_price"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="物品的备注" :label-width="formLabelWidth">
          <el-input
            v-model="nowInfo.item_remark"
            autocomplete="off"
            plac
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="$emit('changeStatus', false)">取 消</el-button>
          <el-button type="primary" @click="submitInsertItem('nowInfo')"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import Qs from "qs";
import { post, get } from "../../../server/base";
export default {
  props: {
    dialogInsert: {
      type: Boolean,
    },
    imageUrl: {},
  },
  data() {
    return {
      nowInfo: {},
      formLabelWidth: "120px",
      dialogInsertFormVisible: this.dialogInsert,

      rules: {
        item_name: [
          { required: true, message: "请输入物资名字", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],

        item_price: [
          { required: true, message: "物资单价不能为空" },
          {
            type: "number",
            message: "单价范围： 1 - 9999 ",
            min: 1,
            max: 9999,
          },
        ],
      },
    };
  },
  methods: {
    submitInsertItem(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("此操作将提交订单, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              let data = Qs.stringify(this.nowInfo);
              post("insert-item", data)
                .then((res, req) => {
                  console.log(res);
                  console.log(req);
                  this.$message({
                    type: "success",
                    message: "成功新增物资",
                  });
                })
                .catch((e) => {
                  console.log(e);
                });

              this.dialogInsertFormVisible = false;
              console.log(this.dialogInsertFormVisible);
              this.$emit("changeStatus", this.dialogInsertFormVisible);
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消新增物资",
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },

  mounted() {
    console.log(this.dialogInsertFormVisible);
    console.log(this.dialogInsert);
  },
  updated() {
    console.log(this.dialogInsertFormVisible);
    console.log(this.dialogInsert);
    console.log(this.nnInfo);
    console.log(this.nowInfo);
  },
  destroyed() {
    this.$emit("changeStatus", false);
  },
};
</script>