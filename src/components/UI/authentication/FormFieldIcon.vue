<template>
  <img class="icon" :src="image" :alt="altText" />
</template>

<script>
export default {
  props: ["image", "altText"],
};
</script>
