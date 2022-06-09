<template>
  <label :for="forInput">{{ name }}</label>
</template>

<script>
export default {
  props: ["forInput", "name"],
};
</script>
