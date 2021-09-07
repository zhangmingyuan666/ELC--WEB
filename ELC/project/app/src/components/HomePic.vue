<template>
  <div id="LoginPic">
    <img :src="pic" alt="homepic" />
  </div>
</template>

<script>
export default {
  name: "LoginPic",
  data() {
    return {
      pic: require("../assets/homepic.jpg"),
    };
  },
};
</script>

<style scoped>
#LoginPic {
  float: right;
  background-color: green;
  width: 50%;
  height: 100%;
}

#LoginPic img {
  max-width: 100%;
  max-height: 100%;
  min-width: 100%;
  min-height: 100%;
}
</style>