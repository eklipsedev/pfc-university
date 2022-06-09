<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      required: false,
      default: "/",
    },
  },
};
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 14px 18px;
  font-weight: bold;
  color: white;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  border: none;
  transition: all 200ms ease;
}

.accordion {
  display: flex;
  background-color: transparent;
  color: #2c3e50;
  padding: 0;
  font-weight: inherit;
  width: 100%;
  text-align: left;
}
.primary {
  background-color: #f48221;
  border-radius: 5px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.primary:hover {
  opacity: 0.8;
}

.secondary {
  background-color: #6c6c6c;
  border-radius: 5px;
  border: none;
}
.secondary:hover {
  opacity: 0.8;
}

.flat {
  background-color: transparent;
  color: #f48221;
  padding: 0;
}

.dd-link {
  display: flex;
  width: 100%;
  min-width: 160px;
  padding: 1rem;
  align-items: flex-start;
  border-bottom: 1px solid #f6f5f5;
  background-color: white;
  color: #6c6c6c;
  white-space: nowrap;
}

.dd-link:hover {
  color: #f48221;
}

.row-dropdown-link {
  display: flex;
  padding: 10px 12px;
  align-items: flex-start;
  color: #6c6c6c;
}

.row-dropdown-link:hover {
  background-color: #fbfbfb;
}
</style>
