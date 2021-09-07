<template>
  <div>
    <el-dialog
      title="物资详情"
      v-model="dialogTable"
      @close="$emit('changeStatus', false)"
    >
      <el-descriptions :data="nowInfo">
        <el-descriptions-item label="物品的序列号">{{
          nowInfo.item_id
        }}</el-descriptions-item>
        <el-descriptions-item label="物品的名字">{{
          nowInfo.item_name
        }}</el-descriptions-item>
        <el-descriptions-item label="物品的图片">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else>无</i>
        </el-descriptions-item>
        <el-descriptions-item label="物品的价格">{{
          nowInfo.item_price + "元"
        }}</el-descriptions-item>
        <el-descriptions-item label="物品的备注">{{
          nowInfo.item_remark
        }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script>
import Qs from "qs";
import { post, get } from "../../../server/base";

export default {
  props: {
    nnInfo: {},
    dialogTable: {
      type: Boolean,
    },
    imageUrl: {},
  },
  data() {
    return {
      nowInfo: this.nnInfo,
      dialogTableVisible: this.dialogTable,
      formLabelWidth: "120px",
    };
  },
  methods: {
    submitEditItem() {
      //this.nowInfo.item_pic = this.sendImgUrl;
      let data = Qs.stringify(this.nowInfo);
      post("edit-item", data)
        .then((res, req) => {
          console.log(res);
          console.log(req);
        })
        .catch((e) => {
          console.log(e);
        });
      this.dialogTableVisible = false;
      console.log(this.dialogTableVisible);
      this.$emit("changeStatus", this.dialogTableVisible);
    },
    // handleAvatarSuccess(res, file) {
    //   this.sendImgUrl = this.imageUrl;
    //   this.imageUrl = URL.createObjectURL(file.raw);
    // },

    // beforeAvatarUpload(file) {
    //   const isJPG = file.type === "image/jpeg";
    //   const isLt2M = file.size / 1024 / 1024 < 2;
    //   if (!isJPG) {
    //     this.$message.error("上传头像图片只能是 JPG 格式!");
    //   }
    //   if (!isLt2M) {
    //     this.$message.error("上传头像图片大小不能超过 2MB!");
    //   }
    //   console.log(this.itemsInfo.item_pic);
    //   return isJPG && isLt2M;
    // },
  },
  mounted() {
    console.log(this.dialogTableVisible);

    this.nowInfo = this.nnInfo;
  },
  updated() {
    console.log(this.dialogTableVisible);

    console.log(this.nnInfo);
    console.log(this.nowInfo);
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