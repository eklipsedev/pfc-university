<template>
  <div class="dd">
    <div class="dd-toggle" @click="toggleDropdown">
      <slot name="toggle"></slot>
    </div>
    <nav class="dd-list" v-if="isDropdownOpen">
      <slot name="nav"></slot>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDropdownOpen: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
  },
};
</script>

<style scoped>
.dd {
  display: flex;
  margin: 0;
  text-align: left;
  z-index: 900;
}

.dd-toggle {
  position: relative;
  display: flex;
  align-items: center;
  color: inherit;
  cursor: pointer;
  padding: 20px;
  font-weight: 600;
}

.row {
  padding: 7px 10px;
  border-radius: 5px;
  background-color: rgba(3, 3, 3, 0.08);
}

.dd-list {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: absolute;
  top: 90%;
  z-index: 901;
  background-color: white;
  box-shadow: 1px 1px 29px 0 rgb(0 0 0 / 15%);
  border-radius: 5px;
  min-width: 160px;
}
</style>
