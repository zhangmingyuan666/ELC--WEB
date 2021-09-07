<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="dosubmit">1231313</button>
  </div>
</template>

<script>
import { get } from "../../server/base";

export default {
  name: "About",
  methods: {
    dosubmit() {
      get("get_user")
        .then((res, req) => {
          console.log(res);
          console.log(req);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
