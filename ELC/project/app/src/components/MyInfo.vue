<template>
  <div>
    <welcome-content>
      <template v-slot:welcome_title>
        <h1>个人信息</h1>
      </template>
      <template v-slot:welcome_content>
        <p>在此处，你可以查看自己的个人信息</p>
      </template>
    </welcome-content>

    <ul class="margin">
      <li>
        <h1>我的账号:{{ myUsername }}</h1>
      </li>
      <li>
        <h1>我的id:{{ myUserId }}</h1>
      </li>
      <li>
        <h1>我的权限:{{ myUserStatus }}</h1>
      </li>
    </ul>
  </div>
</template>

<script>
import WelcomeContent from "./WelcomeContent.vue";
export default {
  name: "MyInfo",
  components: {
    WelcomeContent,
  },
  data() {
    return {
      myInfo: {},
    };
  },
  methods: {
    getmyInfo() {},
  },
  computed: {
    myUsername() {
      return sessionStorage.getItem("username");
    },
    myUserId() {
      return sessionStorage.getItem("id");
    },
    myUserStatus() {
      return sessionStorage.getItem("user_status");
    },
  },
  mounted() {
    this.getmyInfo();
  },
};
</script>

<style lang="scss" scoped>
</style>