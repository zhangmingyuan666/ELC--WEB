<template>
  <form id="login">
    <ul>
      <li>
        <div class="title">username:</div>
        <input v-model="links.username" placeholder="请输入您的学号" />
      </li>

      <li>
        <div class="title">password:</div>
        <input placeholder="请输入密码" v-model="links.password" />
      </li>
    </ul>
    <div class="login-btn">
      <button class="btn btn-big btn-login" @click.prevent="dosubmit">
        Login
      </button>
    </div>
  </form>
</template>

<script>
import { post } from "../../server/base.js";

import Qs from "qs";

export default {
  name: "login",
  data() {
    return {
      links: {
        username: "",
        password: "",
      },
      user_Token: "",
    };
  },
  methods: {
    dosubmit() {
      let data = Qs.stringify(this.links);
      //此处用qs框架将登陆的表单信息编码传送至后台
      console.log(data);
      post("/login", data)
        .then((res, req) => {
          console.log(res);
          console.log(req);
          console.log(res.data.code);
          if (res.data.code == 200) {
            console.log(this);
            sessionStorage.setItem("username", res.data.data[0].username);
            sessionStorage.setItem("user_status", res.data.data[0].user_status);
            sessionStorage.setItem("id", res.data.data[0].user_id);
            this.$router.replace("/homepage/my-info");
          } else {
            this.$alert(`${res.data.message}`, "登陆失败", {
              confirmButtonText: "确定",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
#login {
  display: flex;
  flex-direction: column;
  height: 100%;
}
ul {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex: 4;
}

li {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: #000;
}

.title {
  color: #fff;
  text-align: left;
  font-size: 30px;
  height: 32px;
  line-height: 32px;
  font-weight: bolder;
  text-transform: uppercase;

  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.75);
}

li input {
  height: 40px;
  border-radius: 10px;
  transition: 0.5s;
  overflow: hidden;
  -webkit-box-reflect: below 1px linear-gradient(transparent, #0003);
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 0 10px;
  outline-style: none;
  transition: 0.5s;
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

.login-btn {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-btn button:hover {
  width: 240px;
}
</style>