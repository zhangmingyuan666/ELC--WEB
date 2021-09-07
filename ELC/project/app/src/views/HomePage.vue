<template>
  <div id="HomePage">
    <div id="hp_welcome">
      <div id="hp_back">
        <button id="hp_exit" class="btn btn-mid" @click="exitLogin()">
          退出登录
        </button>
      </div>
      <div id="hp_welcome_saying">
        <h2>
          你好，欢迎来到ELC物资管理系统，你的权限是：{{ getUserStatus() }}
        </h2>
      </div>
    </div>
    <div id="hp_show">
      <div id="hp_nav_box">
        <div id="hp_nav" ref="hp_nav">
          <router-link to="/homepage/my-account">我的应交金额</router-link>
          <!-- 所有人可见 -->
          <router-link to="/homepage/my-admin-orders" v-if="visitors_status"
            >我管理的订单</router-link
          >
          <!-- 用于让管理员修改所有的订单的状态 -->
          <router-link
            to="/homepage/my-hexiao-orders"
            v-if="visitors_status && header_status"
            >订单支付情况</router-link
          >
          <!-- 查看我管理的订单的核销状态 -->
          <router-link to="/homepage/member-management">成员管理</router-link>
          <!-- 管理员用来设置权限 -->
          <router-link to="/homepage/material-management" v-if="visitors_status"
            >物资管理</router-link
          >
          <!-- 管理员和部长用于添加物品请求 -->
          <router-link to="/homepage/my-info">我的个人信息</router-link>
          <!-- 所有人 -->
        </div>
      </div>
      <div id="hp_display">
        <router-view v-slot="{ Component }">
          <transition name="scale" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
    <div class="hp_footer">
      增值电信业务经营许可证：合字B2-20090007京ICP备10036305号-7京公网安备11010802022657号
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      visitors_status: this.getUserStatus(),
      header_status: this.getUserStatus(),
    };
  },
  methods: {
    getUserStatus() {
      let userStatus = sessionStorage.getItem("user_status");
      if (userStatus == "admin") {
        userStatus = "管理员";
      } else if (userStatus == "hexiao") {
        userStatus = "核销官（部长）";
      } else if (userStatus == "header") {
        userStatus = "部长";
        this.header_status = 0;
      } else {
        userStatus = "游客";
        this.visitors_status = 0;
      }
      return userStatus;
    },
    exitLogin() {
      sessionStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<style  scoped>
#HomePage {
  width: 100%;
  background-color: #ccc;
  min-height: 100vh;
  /* 最低高度 */
  display: flex;
  flex-direction: column;
}

/* header */
#hp_welcome {
  width: 100%;
  height: 70px;
  background-color: rgb(68, 68, 68);
  display: flex;
  color: rgb(174, 174, 174);
  line-height: 70px;
  flex-shrink: 0;
  position: fixed;
  top: 0;
}

#hp_back {
  width: 180px;
  height: 100%;
  float: left;
  background-color: rgb(51, 51, 51);
}

#hp_welcome_saying {
  flex: 1;
  text-align: center;
}

/* content */
#hp_show {
  display: flex;
  flex-direction: row;
  flex: 1;
  margin-top: 70px;
}

#hp_nav_box {
  width: 180px;
  min-width: 180px;
  background-color: rgb(68, 68, 68);
  display: flex;
  flex-direction: column;
}

#hp_nav {
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 180px;
  min-width: 180px;
}

#hp_nav a {
  height: 60px;
  line-height: 60px;
  font-size: 20px;
  text-align: center;
  text-decoration: none;
  transition: 0.2s;
}

#hp_nav a:hover {
  color: rgb(106, 120, 242);
  box-shadow: -5px 5px 10px rgb(106, 120, 242);
}

#hp_display {
  flex: 1;
  width: 100%;
  min-height: 560px;
}

#hp_display:nth-child(n) {
  margin: 20px 80px;
}

/* footer */
.hp_footer {
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #ccc;
  background-color: rgb(51, 51, 51);
  flex-shrink: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>