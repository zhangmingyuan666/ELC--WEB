<template>
  <div>
    <slot name="welcome_title"></slot>

    <div class="attention">
      <slot name="welcome_content" class="attention"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.attention {
  color: rgb(139, 139, 139);
}
</style>