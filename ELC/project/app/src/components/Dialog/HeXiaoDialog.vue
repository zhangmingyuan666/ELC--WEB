<template>
  <div>
    <el-dialog
      title="我要核销"
      v-model="dialogHexiaoVisible"
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

        <el-descriptions-item label="已交金额">{{
          getAlreadyPaid
        }}</el-descriptions-item>
        <el-descriptions-item label="应交金额">{{
          getShouldPaid
        }}</el-descriptions-item>
        <el-descriptions-item label="物品单价">{{
          itemInfo.item_price
        }}</el-descriptions-item>

        <el-descriptions-item label="物品个数">{{
          nowInfo.item_count
        }}</el-descriptions-item>
        <el-descriptions-item label="物品备注">{{
          itemInfo.item_remark
        }}</el-descriptions-item>
      </el-descriptions>

      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="order_hexiao_remark"
      >
      </el-input>
      <el-button @click="submitHeXiao()" class="margin">提交核销请求</el-button>

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
    getUserId() {
      return sessionStorage.getItem("id");
    },
  },
  props: {
    nnInfo: {},
    dialogHexiaoVisible: {
      type: Boolean,
    },
    imageUrl: {},
  },
  data() {
    return {
      nowInfo: this.nnInfo,
      dialogHexiaoFormVisible: this.dialogHexiaoVisible,
      formLabelWidth: "120px",
      itemInfo: {},
      childInfo: [],

      order_hexiao_remark: "",

      column: 2,
    };
  },
  methods: {
    submitHeXiao() {
      if (this.getAlreadyPaid == this.getShouldPaid) {
        let data = Qs.stringify({
          order_id: this.nowInfo.order_id,
          order_hexiao_remark: this.order_hexiao_remark,
          order_header: sessionStorage.getItem("id"),
          order_hexiao_status: "已核销",
          should_pay: this.getShouldPaid,
          already_pay: this.getAlreadyPaid,
        });
        post("hexiao-order", data)
          .then((res, req) => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "核销成功",
              });
              this.dialogHexiaoFormVisible = false;
              console.log(this.dialogHexiaoFormVisible);
              this.$emit("changeStatus", this.dialogHexiaoFormVisible);
            }
          })
          .catch((e) => {
            console.log(e);
            this.$message({
              type: "info",
              message: "核销失败",
            });
          });
      } else {
        this.$message({
          type: "info",
          message: "尚未付清金额，无法核销",
        });
      }
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
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.nowInfo = this.nnInfo;
  },
  updated() {
    this.nowInfo = this.nnInfo;
    this.getOrderItemInfo();
    this.getChildInfo();
  },
};
</script>

<style scoped>
.margin {
  margin-top: 20px;
}
</style>