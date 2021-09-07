<template>
  <div>
    <welcome-content>
      <template v-slot:welcome_title>
        <h1>管理订单</h1>
      </template>
      <template v-slot:welcome_content>
        <p>在此处你可以管理你的订单</p>
        <p>你可以选择添加订单 编辑自己的订单 以及</p>
        <p>然后在新增订单的时候，我们可以加入在这里储存的物资</p>
      </template>
    </welcome-content>

    <welcome-content class="margin">
      <template v-slot:welcome_title>
        <h1>增加订单</h1>
      </template>
      <template v-slot:welcome_content>
        <p>在此处你可以提交购买请求</p>
      </template>
    </welcome-content>
    <div id="mo-submit">
      <button class="btn btn-big" @click.prevent="insertOrder()">
        我要增加订单
      </button>
    </div>
    <insert-order-dialog
      :people-be-managed="beAdminedList"
      :dialog-insert="dialogInsertFormVisible"
      :all-visitor-list="allVisitorList"
      v-model="dialogInsertFormVisible"
      @change-status="changeStatus"
    >
    </insert-order-dialog>

    <div>
      <h4 @click="beAdminedListIsTrue = !beAdminedListIsTrue">
        我有权限管理哪几个用户？
        <h6>如果你是管理员，你有权限管理所有用户</h6>
      </h4>
      <div v-if="beAdminedList.length && beAdminedListIsTrue" class="margin">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>用户id</th>
              <th>用户username</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in beAdminedList" :key="item">
              <td>{{ index + 1 }}</td>
              <td>{{ item.user_id }}</td>
              <td>{{ item.username }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <welcome-content class="margin">
      <template v-slot:welcome_title>
        <h1>我发起的订单</h1>
      </template>
      <template v-slot:welcome_content>
        <p>在此处你可以看你所管理的所有订单</p>
      </template>
    </welcome-content>

    <div class="margin">
      <div v-if="my_info.length">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>订单名字</th>
              <th>订单申请人</th>
              <th>核销情况</th>
              <th>订单详情</th>
              <th>我要核销</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in my_info" :key="item">
              <td>{{ index + 1 }}</td>
              <td>{{ item.order_name }}</td>
              <td>{{ item.username }}</td>
              <td>{{ item.order_hexiao_status }}</td>
              <td>
                <button
                  class="btn-small btn-other"
                  @click="getAllInfo(item, $event)"
                >
                  订单详情
                </button>
              </td>
              <td>
                <button
                  v-if="item.order_hexiao_status == '未核销'"
                  class="btn-small btn-other"
                  @click="hexiao(item, $event)"
                >
                  核销
                </button>

                <button v-else class="btn-small btn-success">已核销</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <h2>您尚未提交任何申请</h2>
      </div>
    </div>

    <welcome-content class="margin">
      <template v-slot:welcome_title>
        <h1>所有订单</h1>
      </template>
      <template v-slot:welcome_content>
        <p>如果你是管理员你可以在这里看到所有订单</p>
        <p>我管理的成员</p>
      </template>
    </welcome-content>

    <div class="margin">
      <div v-if="order_info.length">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>订单名字</th>
              <th>订单申请人</th>
              <th>核销情况</th>
              <th>订单详情</th>
              <th v-if="HeXiaoIsValue()">我要核销</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in order_info" :key="item">
              <td>{{ index + 1 }}</td>
              <td>{{ item.order_name }}</td>
              <td>{{ item.username }}</td>
              <td>{{ item.order_hexiao_status }}</td>
              <td>
                <button
                  class="btn-small btn-other"
                  @click="getAllInfo(item, $event)"
                >
                  订单详情
                </button>
              </td>
              <td v-if="HeXiaoIsValue()">
                <button
                  v-if="item.order_hexiao_status == '未核销'"
                  class="btn-small btn-other"
                  @click="hexiao(item, $event)"
                >
                  核销
                </button>

                <button v-else class="btn-small btn-success">已核销</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <h2>您尚未提交任何申请</h2>
      </div>
    </div>

    <all-order-info
      :nn-info="nowInfo"
      :dialog-all-info-visible="dialogAllInfoTableVisible"
      v-model="dialogAllInfoTableVisible"
      @change-status="changeStatus"
    >
    </all-order-info>
    <he-xiao-dialog
      :nn-info="nowInfo"
      :dialog-hexiao-visible="dialogHexiaoFormVisible"
      v-model="dialogHexiaoFormVisible"
      @change-status="changeStatus"
    >
    </he-xiao-dialog>
  </div>
</template>

<script>
import WelcomeContent from "./WelcomeContent.vue";
import InsertOrderDialog from "./Dialog/InsertOrderDialog.vue";
import AllOrderInfo from "./Dialog/AllOrderInfo.vue";
import HeXiaoDialog from "./Dialog/HeXiaoDialog.vue";
import Qs from "qs";
import { get, post } from "../../server/base";

export default {
  name: "MyAdminOrders",
  components: {
    WelcomeContent,
    AllOrderInfo,
    InsertOrderDialog,
    HeXiaoDialog,
  },
  data() {
    return {
      order_info: [],
      nowInfo: {},
      my_info: [],
      allVisitorList: [],
      dialogAllInfoTableVisible: false,
      dialogInsertFormVisible: false,
      dialogHexiaoFormVisible: false,
      user_id: this.getUserId,
      user_status: this.getUserStatus,
      beAdminedList: [],
      beAdminedListIsTrue: false,
    };
  },
  computed: {
    getUserId() {
      return sessionStorage.getItem("id");
    },
    getUserStatus() {
      return sessionStorage.getItem("user_status");
    },
  },
  methods: {
    getOrders() {
      get("get-orders")
        .then((res, req) => {
          console.log(res);
          console.log(req);
          this.order_info = [];
          this.order_info = res.data.data;

          let user_id = parseInt(sessionStorage.getItem("id"));
          this.my_info = [];
          res.data.data.forEach((val) => {
            if (val.user_id == user_id) {
              this.my_info.push(val);
            }
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getAllInfo(item, event) {
      this.dialogAllInfoTableVisible = true;
      console.log(item);
      this.nowInfo = item;
      console.log(event);
      // this.imageUrl = item.item_pic;
    },
    hexiao(item, event) {
      this.dialogHexiaoFormVisible = true;
      console.log(item);
      this.nowInfo = item;
      console.log(event);
      if (item.hexaio_status == "已核销") {
        return false;
      } else {
        return true;
      }
    },

    insertOrder() {
      this.dialogInsertFormVisible = true;
    },
    changeStatus(val) {
      this.dialogAllInfoTableVisible = val;
      this.dialogInsertFormVisible = val;
      this.dialogHexiaoFormVisible = val;
      this.getOrders();
    },

    //塑料英语：我可以管理谁的订单？
    //采取向下取整的方法
    getMansIAdmin() {
      get("get_user")
        .then((res, req) => {
          console.log(res);
          console.log(req);
          //在这里获取我们需要看的，所有的成员
          const allPeople = res.data.data;

          this.getBeAdminedList(allPeople);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getBeAdminedList(allPeople) {
      //用于均分数组
      function cutArray(arr, num) {
        let newArr = [];
        for (var i = 0; i < arr.length; i += num) {
          newArr.push(arr.slice(i, i + num));
        }
        return newArr;
      }
      let visitorsArr = [];
      let AdminHeaderHexiaoArr = [];

      allPeople.forEach((value) => {
        //管理员不用参与这种批准，管理员可以管理所有人
        if (
          /* value.user_status === "admin"*/
          value.user_status === "header" ||
          value.user_status === "hexiao"
        ) {
          AdminHeaderHexiaoArr.push({
            user_id: value.user_id,
            username: value.username,
            user_status: value.user_status,
          });
        } else {
          visitorsArr.push({
            user_id: value.user_id,
            username: value.username,
            user_status: value.user_status,
          });
        }
      });
      //console.log(visitorsArr);
      //console.log(AdminHeaderHexiaoArr);

      let eachPeopleAdmin = Math.ceil(
        visitorsArr.length / AdminHeaderHexiaoArr.length
      );
      //console.log(eachPeopleAdmin);

      if (sessionStorage.getItem("user_status") == "admin") {
        let newArr = [];
        visitorsArr.forEach((ele) => {
          if (ele.user_status == "visitor") {
            newArr.push(ele);
          }
        });
        this.allVisitorList = newArr;
      }
      let adminVisitors = cutArray(visitorsArr, eachPeopleAdmin);
      //console.log(adminVisitors);

      let id = sessionStorage.getItem("id");
      let beAdminedIndex = -1;
      AdminHeaderHexiaoArr.forEach((value, index) => {
        if (value.user_id == id) {
          //console.log(index);
          beAdminedIndex = index;
        }
      });

      //console.log(beAdminedIndex);
      if (sessionStorage.getItem("user_status") != "admin") {
        this.beAdminedList = adminVisitors[beAdminedIndex];
      }
      //console.log(this.beAdminedList);
    },

    HeXiaoIsValue() {
      let user_status = sessionStorage.getItem("user_status");

      if (user_status == "admin" || user_status == "hexiao") {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.getOrders();
    this.getMansIAdmin();
  },
};
</script>

<style scoped>
#mo-submit {
  margin: 20px 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
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

h4 {
  cursor: pointer;
  color: rgb(139, 139, 139);
}
</style>