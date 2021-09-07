<template>
  <div>
    <welcome-content>
      <template v-slot:welcome_title>
        <h1>我的账单</h1>
      </template>
      <template v-slot:welcome_content>
        <p>在此处你可以查看自己在各个订单中要交的钱</p>
        <p>请注意核实订单，再支付</p>
      </template>
    </welcome-content>

    <div class="margin">
      <h2>我的应付帐单</h2>
      <div class="margin">
        <div v-if="accountInfo.length">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>订单名字</th>
                <th>应交金额</th>
                <th>已交金额</th>
                <th>当前支付状态</th>
                <th>我要支付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in accountInfo" :key="item">
                <td>{{ index + 1 }}</td>
                <td>{{ item.order_name }}</td>
                <td>{{ item.child_should_pay }}</td>
                <td>{{ item.child_already_pay }}</td>
                <td>{{ item.order_child_status }}</td>
                <td>
                  <button
                    class="btn-other btn-small"
                    @click="getAllOrder(item)"
                  >
                    我要支付
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <h2>您尚未提交任何申请</h2>
        </div>
      </div>
    </div>

    <div class="margin">
      <h2>我的退款</h2>
      <div class="margin">
        <div v-if="accountInfo.length">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>订单名字</th>
                <th>应交金额</th>
                <th>已交金额</th>
                <th>当前支付状态</th>
                <th>我要支付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in accountInfo" :key="item">
                <td>{{ index + 1 }}</td>
                <td>{{ item.order_name }}</td>
                <td>{{ item.child_should_pay }}</td>
                <td>{{ item.child_already_pay }}</td>
                <td>{{ item.order_child_status }}</td>
                <td>
                  <button
                    class="btn-other btn-small"
                    @click="getAllOrder(item)"
                  >
                    我要支付
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <h2>您尚未收到任何退款</h2>
        </div>
      </div>
    </div>

    <all-account-child-info-dialog
      :nn-info="allChildInfo"
      :account-child-info-dialog="AllAccountChildInfoDialogVisible"
      v-model="AllAccountChildInfoDialogVisible"
      @change-status="changeStatus"
    >
    </all-account-child-info-dialog>
  </div>
</template>

<script>
import WelcomeContent from "./WelcomeContent.vue";
import AllAccountChildInfoDialog from "./Dialog/AllAccountChildInfoDialog.vue";
import Qs from "qs";
import { get, post } from "../../server/base";
export default {
  name: "MyAccount",
  data() {
    return {
      accountInfo: [],
      allChildInfo: {},
      AllAccountChildInfoDialogVisible: false,
    };
  },
  computed: {},
  methods: {
    getAccountInfo() {
      let data = Qs.stringify({
        user_id: sessionStorage.getItem("id"),
      });

      post("get-account", data)
        .then((res, req) => {
          console.log(res);
          console.log(req);
          this.accountInfo = res.data.data;
          console.log(this.accountInfo);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getAllOrder(item) {
      if (item.child_should_pay == item.child_already_pay) {
        this.$message({
          type: "info",
          message: "你已经支付过了!",
        });
      } else {
        this.AllAccountChildInfoDialogVisible = true;
        console.log(item);
        let data = Qs.stringify({
          order_id: item.order_id,
          user_id: item.user_id,
        });
        post("get-all-child-info", data)
          .then((res, req) => {
            console.log(res);
            console.log(req);
            this.allChildInfo = res.data.data;
            console.log(this.accountInfo);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    changeStatus(val) {
      this.dialogFormVisible = val;
      this.dialogTableVisible = val;
      this.dialogInsertFormVisible = val;
      this.getAccountInfo();
    },
  },
  components: {
    WelcomeContent,
    AllAccountChildInfoDialog,
  },
  mounted() {
    this.getAccountInfo();
  },
};
</script>

<style scoped>
table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  border-spacing: 0;
  margin: auto;
}

thead,
tbody,
tr {
  width: 100%;
}
th,
td {
  padding: 8px 50px;
  border: 1px solid #999;
  text-align: center;
}

th {
  background-color: rgb(68, 68, 68);
  color: #ccc;
  font-weight: 600;
}
</style>