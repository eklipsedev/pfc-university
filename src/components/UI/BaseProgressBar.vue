<template>
  <div class="progress-bar">
    <div
      class="progress"
      :class="{ complete: isComplete }"
      :style="getWidth"
    ></div>
  </div>
</template>

<script>
export default {
  props: ["width", "isComplete"],
  computed: {
    getWidth() {
      return "width:" + this.width + "%";
    },
  },
};
</script>

<style scoped>
.progress-bar {
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 8px;
  align-items: stretch;
  border-radius: 30px;
  background-color: #eaeaea;
}
.progress {
  background-color: #f48221;
}
.complete {
    background-color: #638b18;
}
</style>
