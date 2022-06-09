<template>
  <header :style="'background-color:' + color + ';'">
    <div class="container">
      <h1>
        {{ pageTitle
        }}<span v-if="completedLength >= 0 && totalLessons"
          >({{ completedLength }} / {{ totalLessons }})<span
            v-if="completedLength === totalLessons"
            >🎉</span
          ></span
        >
      </h1>
      <div v-if="pageDescription != null" class="text">
        {{ pageDescription }}
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: [
    "pageTitle",
    "pageDescription",
    "color",
    "completedLength",
    "totalLessons",
  ],
};
</script>

<style scoped>
header {
  display: flex;
  padding: 40px 0;
  justify-content: center;
  align-items: center;
  background-color: #638b18;
  text-align: left;
  z-index: 998;
}
h1 {
  color: #f5f5fa;
}
span {
  margin-left: 20px;
}
.container {
  width: 90vw;
  max-width: 1224px;
  margin: 0 auto;
  color: #f5f5fa;
}
.text {
  opacity: 0.7;
  font-size: 19px;
  font-weight: 500;
}
.flex {
  display: flex;
  align-items: center;
}
</style>
