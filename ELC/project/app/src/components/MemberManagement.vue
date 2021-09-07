<template>
  <div>
    <welcome-content>
      <template v-slot:welcome_title>
        <h1>成员管理</h1>
      </template>
      <template v-slot:welcome_content>
        <p>在此处你可以选择成为部长或者核销员或者管理员</p>
        <p>在下方你可以查看所有申请以及自己的申请</p>
        <p>
          如果你想成为管理员需要两位管理员的批准，如果你想陈伟核销员或者部长只需要一位管理员的批准
        </p>
      </template>
    </welcome-content>

    <h2 class="margin">提交申请</h2>
    <div id="mm-submit">
      <button class="btn btn-big" @click.prevent="applyToAdmin()">
        我要成为管理员
      </button>
      <button class="btn btn-big" @click.prevent="applyToHexiao()">
        我要成为核销员
      </button>
      <button class="btn btn-big" @click.prevent="applyToHeader()">
        我要成为部长
      </button>
    </div>

    <div class="margin">
      <h2>我的申请</h2>
      <div class="margin">
        <div v-if="my_apply_info.length">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>申请方向</th>
                <th>批准人</th>
                <th>批准状态</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in my_apply_info" :key="item">
                <td>{{ index + 1 }}</td>
                <td>{{ item.add_type }}</td>
                <td>{{ showAdmin(item.admin_id_1, item.admin_id_2) }}</td>
                <td>{{ item.apply_status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <h2>您尚未提交任何申请</h2>
        </div>
      </div>
    </div>

    <h2 class="margin">所有申请</h2>
    <div class="margin">
      <div v-if="apply_info.length">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>申请方向</th>
              <th>申请人</th>
              <th>批准人</th>
              <th>批准状态</th>
              <th v-if="isAdmin()">我要批准</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in apply_info" :key="item">
              <td>{{ index + 1 }}</td>
              <td>{{ item.add_type }}</td>
              <td>{{ item.username }}</td>
              <td>{{ showAdmin(item.admin_id_1, item.admin_id_2) }}</td>
              <td>
                {{ item.apply_status }}
              </td>
              <td v-if="isAdmin(item.apply_status, item.admin_id_1)">
                <button
                  class="btn-other btn-small"
                  @click="changeStatus(item)"
                  v-if="isAdmin_btn(item.apply_status, item.admin_id_1)"
                >
                  批准
                </button>
                <div v-else>已经批准过了</div>
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
</template>

<script>
import { get, post } from "../../server/base";
import Qs from "qs";
import WelcomeContent from "./WelcomeContent.vue";
export default {
  name: "MemberManagement",

  data() {
    return {
      apply_info: [],
      my_apply_info: [],
      user_id: "",
      links: {
        add_type: "",
        user_id: "",
        // admin_id_1: null,
        // admin_id_2: null,
        apply_status: "未批准",
      },
      linksChangeStatus: {
        apply_id: "",
        admin_id_1: "",
      },
      userStatus: this.getUserStatus,
    };
  },
  components: {
    WelcomeContent,
  },
  computed: {
    getUserStatus() {
      return sessionStorage.getItem("user_status");
    },
  },
  methods: {
    modelVisit() {
      this.modelData.isVisit = true;
    },
    isAdmin(status, admin) {
      if (sessionStorage.getItem("user_status") === "admin") {
        return 1;
      } else {
        return 0;
      }
    },

    isAdmin_btn(status, admin) {
      if (status == "已批准") {
        return 0;
      } else if (admin == this.user_id) {
        return 0;
      } else {
        return 1;
      }
    },

    get_applys() {
      get("get-application")
        .then((res, req) => {
          let val = res.data.data;
          this.apply_info = [];
          this.my_apply_info = [];
          console.log(val);
          val.forEach((apply_info) => {
            this.apply_info.push(apply_info);

            if (apply_info.user_id == this.user_id) {
              this.my_apply_info.push(apply_info);
            }
          });
          console.log(this.my_apply_info);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    showAdmin(val1, val2) {
      if (val1 == null && val2 == null) {
        return "无";
      } else if (val1 != null && val2 != null) {
        return val1 + "和" + val2;
      } else {
        return val1;
      }
    },
    applyToHexiao() {
      if (this.userStatus == "admin") {
        this.$message({
          type: "info",
          message: "管理员无法申请成为核销员",
        });
      } else if (this.userStatus == "visitor") {
        this.$message({
          type: "info",
          message: "你需要先申请成为部长",
        });
      } else if (this.userStatus == "hexiao") {
        this.$message({
          type: "info",
          message: "你已经是核销员了",
        });
      } else {
        let val = this.getMyApplyStatus("核销员");
        if (val != "已经存在") {
          this.$confirm("点击此按钮将提交您的核销员申请, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.links.add_type = "核销员";
              this.links.user_id = sessionStorage.getItem("id");
              let data = Qs.stringify(this.links);
              console.log(data);
              console.log(this.userStatus);
              post("/send-apply", data)
                .then((res, req) => {
                  console.log(res);
                  console.log(req);
                  this.add_applys();
                  this.$message({
                    type: "success",
                    message: "申请成功",
                  });
                })
                .catch((err) => {
                  console.log(err);
                  this.$message({
                    type: "info",
                    message: "申请失败",
                  });
                });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消申请",
              });
            });
        } else {
          this.$message({
            type: "info",
            message: "你已经申请过了",
          });
        }
      }
    },
    applyToHeader() {
      if (this.userStatus == "admin") {
        this.$message({
          type: "info",
          message: "管理员无法申请成为部长",
        });
      } else if (this.userStatus == "header") {
        this.$message({
          type: "info",
          message: "你已经是部长了",
        });
      } else if (this.userStatus == "hexiao") {
        this.$message({
          type: "info",
          message: "核销员无法申请成为部长",
        });
      } else {
        let val = this.getMyApplyStatus("部长");
        if (val != "已经存在") {
          this.$confirm("点击此按钮将提交您的部长申请, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.links.add_type = "部长";
              this.links.user_id = sessionStorage.getItem("id");
              let data = Qs.stringify(this.links);
              console.log(data);
              post("/send-apply", data)
                .then((res, req) => {
                  console.log(res);
                  console.log(req);

                  this.get_applys();
                  this.$message({
                    type: "success",
                    message: "申请成功",
                  });
                })

                .catch((err) => {
                  console.log(err);
                  this.$message({
                    type: "info",
                    message: "申请失败",
                  });
                });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消申请",
              });
            });
        } else {
          this.$message({
            type: "info",
            message: "你已经申请过了",
          });
        }
      }
    },

    applyToAdmin() {
      if (this.userStatus == "admin") {
        this.$message({
          type: "info",
          message: "你已经是管理员了",
        });
      } else if (this.userStatus == "visitor") {
        this.$message({
          type: "info",
          message: "你需要先申请成为部长",
        });
      } else {
        let val = this.getMyApplyStatus("管理员");
        if (val != "已经存在") {
          this.$confirm("点击此按钮将提交您的管理员申请, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.links.add_type = "管理员";
              this.links.user_id = sessionStorage.getItem("id");
              let data = Qs.stringify(this.links);
              console.log(data);
              post("/send-apply", data)
                .then((res, req) => {
                  console.log(res);
                  console.log(req);

                  this.get_applys();
                  this.$message({
                    type: "success",
                    message: "申请成功",
                  });
                })

                .catch((err) => {
                  console.log(err);
                  this.$message({
                    type: "info",
                    message: "申请失败",
                  });
                });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消申请",
              });
            });
        } else {
          this.$message({
            type: "info",
            message: "你已经申请过了",
          });
        }

        console.log("admin");
      }
    },
    changeStatus(item) {
      this.$confirm("此操作将批准该成员的权限申请, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.linksChangeStatus.apply_id = item.apply_id;
          this.linksChangeStatus.admin_id_1 = sessionStorage.getItem("id");
          let data = Qs.stringify(this.linksChangeStatus);
          post("/change-status", data)
            .then((res, req) => {
              console.log(res);
              console.log(req);
              this.$message({
                type: "success",
                message: "批准成功!",
              });
              this.get_applys();
            })
            .catch((err) => {
              console.log(err);
              this.$message({
                type: "info",
                message: "批准失败",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消批准",
          });
        });
    },
    getMyApplyStatus(val) {
      this.my_apply_info.forEach((element) => {
        if (element.add_type == val) {
          val = "已经存在";
        }
      });

      return val;
    },
  },
  mounted() {
    this.user_id = sessionStorage.getItem("id");
    this.userStatus = this.getUserStatus;
    this.get_applys();
  },
};
</script>

<style scoped>
#mm-submit {
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
</style>