<template>
  <div>
    <el-dialog
      title="订单详情"
      v-model="accountChildInfoDialog"
      @close="$emit('changeStatus', false)"
    >
      <el-descriptions :data="nowInfo" title="有关订单的详细信息" :column="2">
        <!-- 以下是从上面传下来的消息 -->
        <el-descriptions-item label="订单的id">{{
          nowInfo.order_id
        }}</el-descriptions-item>
        <el-descriptions-item label="订单的名字">{{
          nowInfo.order_name
        }}</el-descriptions-item>
        <el-descriptions-item label="订单的申请人">{{
          nowInfo.username
        }}</el-descriptions-item>
        <el-descriptions-item label="订单的备注">{{
          nowInfo.order_remark
        }}</el-descriptions-item>

        <el-descriptions-item label="订单的核销状态">{{
          nowInfo.order_hexiao_status
        }}</el-descriptions-item>

        <el-descriptions-item label="订单的核销批准人">
          <i v-if="itemInfo.order_header">
            {{ nowInfo.order_header }}
          </i>
          <i v-else>无</i>
        </el-descriptions-item>
        <el-descriptions-item label="订单的核销备注">
          <i v-if="itemInfo.order_hexiao_remark">
            {{ nowInfo.order_hexiao_remark }}
          </i>
          <i v-else>无</i>
        </el-descriptions-item>
        <!-- <el-descriptions-item label="订单物品的id">{{
          nowInfo.item_id
        }}</el-descriptions-item>
        <el-descriptions-item label="订单物品的名字">{{
          nowInfo.item_
        }}</el-descriptions-item> -->
        <el-descriptions-item label="物品的id">{{
          nowInfo.item_id
        }}</el-descriptions-item>
        <el-descriptions-item label="物品的名字">{{
          nowInfo.item_name
        }}</el-descriptions-item>
        <el-descriptions-item label="物品的单价">{{
          nowInfo.item_price
        }}</el-descriptions-item>
        <el-descriptions-item label="物品的个数">{{
          nowInfo.item_count
        }}</el-descriptions-item>
        <el-descriptions-item label="物品的备注">{{
          nowInfo.item_remark
        }}</el-descriptions-item>
      </el-descriptions>

      <el-button @click="open">我要支付</el-button>
    </el-dialog>
  </div>
</template>

<script>
import Qs from "qs";
import { post, get } from "../../../server/base";

export default {
  components: {},
  computed: {},
  props: {
    nnInfo: {},
    accountChildInfoDialog: {
      type: Boolean,
    },
  },
  data() {
    return {
      nowInfo: this.nnInfo,
      AllAccountChildInfoDialogVisible: this.accountChildInfoDialog,
      formLabelWidth: "120px",
      itemInfo: {},
      childInfo: [],
      column: 2,
    };
  },
  methods: {
    open() {
      this.$confirm("此操作将完成支付, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.postPay();
          this.$message({
            type: "success",
            message: "支付成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消支付！",
          });
        });
    },
    postPay() {
      let data = Qs.stringify({
        order_child_id: this.nowInfo.order_child_id,
        child_already_pay: this.nowInfo.child_should_pay,
        order_child_status: "支付完成",
      });

      post("finish-pay", data)
        .then((res, req) => {
          console.log(res);
          console.log(req);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    console.log(this.dialogAllInfoTableVisible);
    this.nowInfo = this.nnInfo;
  },
  updated() {
    console.log(this.dialogAllInfoTableVisible);

    console.log(this.nnInfo);
    console.log(this.nowInfo);
    this.nowInfo = this.nnInfo;
  },
};
</script>