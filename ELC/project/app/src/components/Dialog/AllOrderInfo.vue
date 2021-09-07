<template>
  <div>
    <el-dialog
      title="订单详情"
      v-model="dialogAllInfoVisible"
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
          itemInfo.order_remark
        }}</el-descriptions-item>

        <el-descriptions-item label="订单的核销状态">{{
          nowInfo.order_hexiao_status
        }}</el-descriptions-item>

        <el-descriptions-item label="订单的核销批准人">
          <i v-if="itemInfo.order_header">
            {{ itemInfo.order_header }}
          </i>
          <i v-else>无</i>
        </el-descriptions-item>
        <el-descriptions-item label="订单的核销备注">
          <i v-if="itemInfo.order_hexiao_remark">
            {{ itemInfo.order_hexiao_remark }}
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
          itemInfo.item_id
        }}</el-descriptions-item>
        <el-descriptions-item label="物品的名字">{{
          itemInfo.item_name
        }}</el-descriptions-item>
        <el-descriptions-item label="物品的单价">{{
          itemInfo.item_price
        }}</el-descriptions-item>
        <el-descriptions-item label="物品的个数">{{
          nowInfo.item_count
        }}</el-descriptions-item>
        <el-descriptions-item label="物品的备注">{{
          itemInfo.item_remark
        }}</el-descriptions-item>
        <el-descriptions-item label="已交金额">{{
          getAlreadyPaid
        }}</el-descriptions-item>
        <el-descriptions-item label="应交金额">{{
          getShouldPaid
        }}</el-descriptions-item>
      </el-descriptions>
      <!-- 里面嵌套着子订单 -->
      <order-child-info :child-info="childInfo"></order-child-info>
    </el-dialog>
  </div>
</template>

<script>
import Qs from "qs";
import { post, get } from "../../../server/base";
import OrderChildInfo from "./OrderChildInfoDialog.vue";
export default {
  components: {
    OrderChildInfo,
  },
  computed: {
    getAlreadyPaid() {
      let sum = 0;
      this.childInfo.forEach((ele) => {
        sum += parseInt(ele.child_already_pay);
      });

      return sum;
    },
    getShouldPaid() {
      let sum = 0;
      this.childInfo.forEach((ele) => {
        sum += parseInt(ele.child_should_pay);
        console.log(ele.child_should_pay);
        console.log(sum);
      });

      return sum;
    },
  },
  props: {
    nnInfo: {},
    dialogAllInfoVisible: {
      type: Boolean,
    },
    imageUrl: {},
  },
  data() {
    return {
      nowInfo: this.nnInfo,
      dialogAllInfoTableVisible: this.dialogAllInfoVisible,
      formLabelWidth: "120px",
      itemInfo: {},
      childInfo: [],
      column: 2,
    };
  },
  methods: {
    submitEditItem() {
      //this.nowInfo.item_pic = this.sendImgUrl;
      // let data = Qs.stringify(this.nowInfo);
      // post("edit-item", data)
      //   .then((res, req) => {
      //     console.log(res);
      //     console.log(req);
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
      this.dialogAllInfoTableVisible = false;

      console.log(this.dialogAllInfoTableVisible);
      this.$emit("changeStatus", this.dialogAllInfoTableVisible);
    },
    getOrderItemInfo() {
      let data = Qs.stringify(this.nowInfo);
      post("get-item-orders", data)
        .then((res, req) => {
          console.log(res);
          console.log(req);
          this.itemInfo = res.data.data[0];
          console.log(this.itemInfo);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getChildInfo() {
      let data = Qs.stringify(this.nowInfo);

      post("get-child-orders", data)
        .then((res, req) => {
          console.log(res);
          console.log(req);
          this.childInfo = res.data.data;
          console.log(this.childInfo);
        })
        .catch((e) => {
          console.log(e);
        });
    },
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
    this.getOrderItemInfo();
    this.getChildInfo();
  },
};
</script>