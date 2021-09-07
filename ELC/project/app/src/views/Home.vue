<template>
  <div class="home">
    <home-pic></home-pic>

    <home-left></home-left>
  </div>
</template>

<script>
import HomePic from "../components/HomePic";
import HomeLeft from "../components/HomeLeft.vue";
export default {
  name: "Home",

  setup() {},

  components: {
    HomePic,
    HomeLeft,
  },
};
</script>

<style scoped>
.home {
  width: 70%;
  height: 80%;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
