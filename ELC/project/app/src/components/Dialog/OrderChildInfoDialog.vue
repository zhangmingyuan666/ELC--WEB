<template>
  <div :key="keyNum">
    <h3 class="margin">该订单的子订单</h3>
    <el-table
      :data="nowInfo"
      style="width: 100%"
      height="250"
      class-name="margin"
    >
      <el-table-column
        fixed
        prop="order_child_status"
        label="目前缴费状态"
        width="150"
      >
      </el-table-column>
      <el-table-column prop="order_child_id" label="子订单id" width="120">
      </el-table-column>
      <el-table-column prop="user_id" label="账号id" width="120">
      </el-table-column>
      <el-table-column prop="username" label="账号" width="120">
      </el-table-column>
      <el-table-column prop="child_should_pay" label="应缴金额" width="120">
      </el-table-column>
      <el-table-column prop="child_already_pay" label="实缴金额" width="120">
      </el-table-column>
      <el-table-column
        prop="child_already_pay"
        label="修改订单状态"
        width="120"
        v-if="user_status == 'admin'"
        fixed="right"
      >
        <template #default="scope">
          <el-button
            @click.prevent="editRow(scope.$index, nowInfo)"
            type="text"
            size="small"
            v-if="editRowStatus(scope.$index, nowInfo)"
          >
            未完成支付
          </el-button>
          <el-button type="text" size="small" v-else> 已完成支付 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { post } from "../../../server/base";
import Qs from "qs";
export default {
  props: {
    childInfo: {
      type: Array,
    },
  },
  data() {
    return {
      isTrue: 1,
      nowInfo: [],
      user_status: "",
      keyNum: 0,
    };
  },
  computed: {
    getUserStatus() {
      return sessionStorage.getItem("user_status");
    },
  },
  methods: {
    editRow(index, rows) {
      console.log(rows[index]);

      this.$confirm("此操作将会把此订单的状态修改为已支付, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = Qs.stringify({
            order_child_id: rows[index].order_child_id,
            child_already_pay: rows[index].child_should_pay,
            order_child_status: "支付完成",
          });

          post("edit-order-child-status", data)
            .then((res, req) => {
              console.log(res);
              console.log(req);
              this.$message({
                type: "success",
                message: "修改成功!",
              });
              this.keyNum++;
            })
            .catch((e) => {
              console.log(e);
              this.$message({
                type: "info",
                message: "修改失败",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改",
          });
        });
    },
    editRowStatus(index, rows) {
      let RowStatus = false;

      if (rows[index].child_should_pay != rows[index].child_already_pay) {
        RowStatus = true;
      }
      return RowStatus;
    },
  },
  updated() {
    this.nowInfo = this.childInfo;
  },
  mounted() {
    this.user_status = this.getUserStatus;
  },
};
</script>

<style  scoped>
h3 {
  float: left;
}
</style>