<template>
  <div>
    <welcome-content>
      <template v-slot:welcome_title>
        <h1>查询会员订单的支付情况</h1>
      </template>
      <template v-slot:welcome_content>
        <p>在此处你可以搜索用户的用户名</p>
        <p>并通过用户的用户名更改用户的支付状态</p>
        <p>当输入完毕后，后台会自动返回搜索结果</p>
        <p>当你是一位部长时</p>
        <p>搜索学号是你发起的订单的会员时，可以添加购买请求</p>
        <p>当你是核销员或管理员时</p>
        <p>可以为所有的用户添加购买请求</p>
      </template>
    </welcome-content>

    <div class="margin">
      <input
        type="text"
        id="searchChildOrder"
        v-model="searchVal"
        @keyup="throttle()"
      />
    </div>
    <h1 class="margin">用户订单</h1>

    <div class="margin">
      <div v-if="searchData.length">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>订单名字</th>
              <th>用户名</th>
              <th>应交金额</th>
              <th>已交金额</th>
              <th>当前支付状态</th>
              <th>我要支付</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in searchData" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.order_name }}</td>
              <td>{{ item.username }}</td>
              <td>{{ item.child_should_pay }}</td>
              <td>{{ item.child_already_pay }}</td>
              <td>{{ item.order_child_status }}</td>
              <td>
                <button class="btn-other btn-small" @click="getAllOrder(item)">
                  我要支付
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <h2>该用户未提交任何申请</h2>
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
import { get, post } from "../../server/base";
import WelcomeContent from "./WelcomeContent.vue";
import AllAccountChildInfoDialog from "./Dialog/AllAccountChildInfoDialog.vue";
import Qs from "qs";

export default {
  name: "MyHexiaoOrders",
  data() {
    return {
      accountInfo: [],
      searchData: [],
      allChildInfo: {},
      AllAccountChildInfoDialogVisible: false,
      searchVal: "",
      statu: true,
      //这个变量用来实现节流操作
    };
  },
  computed: {},
  methods: {
    getAccountInfo() {
      get("search-order")
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
    searchInfo() {
      let search = this.searchVal;
      this.searchData = this.accountInfo.filter(function (product) {
        // filter方法创建一个新的数组
        //console.log("过滤", product);
        let searchField = {
          username: product.username,
        };
        // 此处是判断条件

        return Object.keys(searchField).some(function (key) {
          //该Object.keys()方法返回给定对象自己的可枚举属性名称的数组，以与普通循环相同的顺序迭代。
          //在此处key是username
          //objectKey用于设置判断条件

          // some方法用来测试是否通过了测试，如果通过了测试，就会返回true

          //console.log("key值", key);
          //console.log(
          //  "indexof(Search)",
          //  String(product[key]).toLowerCase().indexOf(search)
          //);
          return String(product[key]).toLowerCase().indexOf(search) > -1;
          //转化为小写
          // indexOf(search)如果为0就是查询到了相关结果，此时返回这个歌product[key],
          // 即product.username
        });
      });
    },

    //这个函数用来实现防抖
    throttle() {
      //保持this的指向始终指向vue实例
      var that = this;
      if (!that.statu) {
        return;
      }
      that.statu = false;
      setTimeout(function () {
        console.log(new Date());

        //看看到底有没有形成节流
        that.searchInfo();
        that.statu = true;
      }, 1000);
    },
    changeStatus(val) {
      this.dialogFormVisible = val;
      this.dialogTableVisible = val;
      this.dialogInsertFormVisible = val;
      this.getAccountInfo();
    },
    initData() {
      this.searchData = this.accountInfo;
    },
  },
  components: {
    WelcomeContent,
    AllAccountChildInfoDialog,
  },
  created() {
    this.initData();
  },
  mounted() {
    this.getAccountInfo();
  },
};
</script>

<style  scoped>
input {
  height: 40px;
  width: 50%;
  border-radius: 10px;
  transition: 0.5s;
  overflow: hidden;
  -webkit-box-reflect: below 1px linear-gradient(transparent, #0003);
  background: rgb(165, 165, 165);
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 0 10px;
  outline-style: none;
  transition: 0.25s;
}

input:focus {
  border: 1px solid #0085bd;
  height: 50px;
  line-height: 50px;
  caret-color: #0085bd;
  border: solid 2px;
  background-color: #000;
  color: #ccc;
  font-size: 26px;
}

input:hover {
  border: 2px solid rgb(106, 120, 242);
}

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