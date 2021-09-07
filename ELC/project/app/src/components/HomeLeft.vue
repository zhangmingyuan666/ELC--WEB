<template>
  <div id="LoginLeft">
    <div id="content">
      <div class="welcome color">
        <h3>Welcome To</h3>
        <h1>Material Verification System</h1>
        <h3>By ELC</h3>
      </div>
      <div id="loginNav">
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
      </div>

      <div class="main">
        <router-view v-slot="{ Component }">
          <transition name="scale" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginLeft",
  setup() {},
};
</script>

<style scoped>
#LoginLeft {
  float: left;
  background-color: #000;
  opacity: 0.7;
  width: 50%;
  height: 100%;
}

#content {
  padding: 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.welcome {
  text-align: left;
  flex: 1;
}
.color {
  color: rgb(106, 120, 242);
}

#loginNav {
  font-size: 24px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.main {
  flex: 4;
}

#loginNav a {
  padding: 0 30px 0 30px;
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