<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body,
html {
  height: 100%;
  width: 100%;
}

.margin {
  margin-top: 20px;
}

#app {
  background-color: #ccc;
  width: 100%;
  height: 100%;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

ul {
  list-style: none;
}

a {
  font-weight: bold;
  color: #ccc;
}

a.router-link-exact-active {
  color: rgb(106, 120, 242);
}

.btn {
  border: transparent solid 1px;
  cursor: pointer;
  background-color: transparent;
  color: #000;
  border-bottom: 1px solid #000;
  transition: 0.5s;
  animation: btn 1s linear infinite;
  box-sizing: border-box;
  border-radius: 8%;
}

.btn-big {
  width: 180px;
  height: 50px;
  font-size: 16px;
  font-weight: 600;
}

.btn-mid {
  width: 120px;
  height: 40px;
}

.btn-small {
  width: 60px;
  height: 30px;
  line-height: 30px;
}

.btn-success {
  background-color: #42b983;
  border-radius: 12%;
  cursor: pointer;
  transition: 0.5s;
  border: 0;
}

.btn-error {
  background-color: #c43232;
  border-radius: 12%;
  cursor: pointer;
  transition: 0.5s;
}

.btn-other {
  background-color: rgb(51, 51, 51);
  color: #ccc;
  border-radius: 12%;
  cursor: pointer;
  transition: 0.5s;
}

.btn-login {
  background-color: #fff;
}

@keyframes btn {
  0% {
    box-shadow: -2px 0 5px 0 #ccc;
  }
  25% {
    box-shadow: 0 -2px 5px 0 #ccc;
  }
  50% {
    box-shadow: 2px 0 5px 0 #ccc;
  }
  75% {
    box-shadow: 0 2px 5px 0 #ccc;
  }
  100% {
    box-shadow: -2px 0 5px 0 #ccc;
  }
}
.btn:hover,
.btn-other:hover,
.btn-success:hover,
.btn-error:hover {
  background: rgb(106, 120, 242);
  border: transparent;
  color: #fff;
  box-shadow: 5px 2px 0px 0px rgb(106, 120, 242);
}

/* element common CSS */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
