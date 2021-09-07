
<template>
  <div>
    <el-dialog
      title="编辑我的物品"
      v-model="dialogForm"
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
            :disabled="true"
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
          <el-button type="primary" @click="submitEditItem('nowInfo')"
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
    nnInfo: {},
    dialogForm: {
      type: Boolean,
    },
    imageUrl: {},
  },
  data() {
    return {
      nowInfo: this.nnInfo,
      formLabelWidth: "120px",
      dialogFormVisible: this.dialogForm,
      disabled: true,
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
    submitEditItem(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("此操作将提交编辑, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              let data = Qs.stringify(this.nowInfo);
              post("edit-item", data)
                .then((res, req) => {
                  console.log(res);
                  console.log(req);
                  this.dialogFormVisible = false;
                  console.log(this.dialogFormVisible);
                  this.$emit("changeStatus", this.dialogFormVisible);
                  this.$message({
                    type: "success",
                    message: "成功编辑物资",
                  });
                })
                .catch((e) => {
                  console.log(e);
                  this.$message({
                    type: "success",
                    message: "编辑物资失败",
                  });
                });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消编辑物资",
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
    this.nowInfo = this.nnInfo;
  },
  updated() {
    this.nowInfo = this.nnInfo;
  },
};
</script>














<!-- <el-form-item label="物品的图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            action="http://localhost:3000/get_user"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>-->