<template>
  <div class="actions">
    <input type="text" maxlength="256" name="Search" placeholder="Search..." />
    <div class="buttons">
      <base-button class="secondary">Export</base-button>
      <base-button @click="$emit('open')" class="primary"
        >New User(s)</base-button
      >
    </div>
  </div>
</template>

<script>
export default {
  emits: ["open"],
  created() {
    console.log(this.$route)
  }
};
</script>

<style scoped>
input {
  width: 350px;
  margin-right: auto;
}
.actions {
  width: 90vw;
  max-width: 1224px;
  display: flex;
  min-height: 50px;
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: center;
}
.buttons {
  display: flex;
  align-items: center;
}
.secondary {
  margin-right: 0.5rem;
  background-color: #6c6c6c;
}
</style>
