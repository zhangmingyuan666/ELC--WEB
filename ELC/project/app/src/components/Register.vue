<template>
  <form id="register">
    <ul>
      <li>
        <div class="title">username:(你的学号)</div>
        <input
          v-model="this.links.username"
          placeholder="请输入你的学号"
          @blur="usernameIsValue()"
        />
      </li>

      <li>
        <div class="title">password:</div>
        <input
          v-model="this.links.password"
          placeholder="请输入你的密码"
          @blur="passwordIsValue()"
        />
      </li>

      <li>
        <div class="title">phone:</div>
        <input
          v-model="this.links.user_phone"
          placeholder="请输入你的电话号码"
          @blur="phoneIsValue()"
        />
      </li>
    </ul>
    <div class="register-btn">
      <button class="btn btn-big btn-login" @click.prevent="dosubmit()">
        Register
      </button>
    </div>
  </form>
</template>

<script>
import { post } from "../../server/base";
import { h } from "vue";
import Qs from "qs";
export default {
  name: "Register",
  computed: {},
  data() {
    return {
      links: {
        username: "",
        password: "",
        user_phone: "",
        user_status: "visitor",
      },
      inputStatus: {
        username: false,
        password: false,
        phone: false,
      },
    };
  },
  methods: {
    getButtonIsValue() {
      let status = false;
      let inputStatus = this.inputStatus;
      if (
        //即这几个都没有对应正则表达式
        //只有这三个都对应函数才能跑
        inputStatus.username == true &&
        inputStatus.password == true &&
        inputStatus.phone == true
      ) {
        status = true;
      }
      console.log(status);
      return status;
    },
    dosubmit() {
      this.usernameIsValue();
      this.passwordIsValue();
      this.phoneIsValue();
      let status = this.getButtonIsValue();
      console.log(status);
      if (!status) {
        this.$message({
          type: "info",
          message: "你的输入格式尚未完善，无法注册",
        });
      } else {
        let data = Qs.stringify(this.links);
        //此处用qs框架将登陆的表单信息编码传送至后台
        console.log(data);
        post("/register", data)
          .then((res, req) => {
            console.log(res);
            console.log(req);
            console.log(res.data.code);
            if (res.data.code == 200) {
              this.$alert(`${res.data.message}`, "注册成功", {
                confirmButtonText: "确定",
              }).then((params) => {
                this.$router.push("/login");
              });
            } else {
              this.$alert(`${res.data.message}`, "注册失败", {
                confirmButtonText: "确定",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    usernameIsValue() {
      let UserNameReg = /^\d{10}$/;

      if (UserNameReg.test(this.links.username)) {
        console.log(UserNameReg.test(this.links.username));
        this.inputStatus.username = true;
      } else {
        console.log(UserNameReg.test(this.links.username));
        this.$notify({
          title: "username提醒",
          message: h(
            "i",
            { style: "color: teal" },
            "用户username应是10位数字的学号"
          ),
        });
      }
    },
    passwordIsValue() {
      let passwordReg = /^[A-Za-z0-9]{4,10}$/;

      if (passwordReg.test(this.links.password)) {
        console.log(passwordReg.test(this.links.password));
        this.inputStatus.password = true;
      } else {
        console.log(passwordReg.test(this.links.password));
        this.$notify({
          title: "password提醒",
          message: h(
            "i",
            { style: "color: teal" },
            "密码password应是2-10位数字，字母，或者数字和字母的组合"
          ),
        });
      }
    },
    phoneIsValue() {
      let phoneReg = /^\d{8}|\d{11}|110$/;

      if (phoneReg.test(this.links.user_phone)) {
        console.log(phoneReg.test(this.links.user_phone));
        this.inputStatus.phone = true;
      } else {
        console.log(phoneReg.test(this.links.user_phone));
        this.$notify({
          title: "phone提醒",
          message: h(
            "i",
            { style: "color: teal" },
            "phone电话号码应是11位或8位数字"
          ),
        });
      }
    },
  },
};
</script>

<style scoped>
#register {
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
  font-size: 1.875em;

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
.register-btn {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-btn button:hover {
  width: 240px;
}
</style>