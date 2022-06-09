<template>
    <div>
        <span v-if="showLabel" class="mobile-label">{{ label }}:</span>
        <slot>—</slot>
    </div>
</template>

<script>
export default {
    props: ["showLabel", "label"],
    computed: {
        hasSlot() {
            return !!this.$slots.default;
        }
    }
}
</script>

<style scoped>
div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: auto;
    text-align: right;
    width: 200px;
    padding: 0 5px 0 12px;
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
}
.mobile-label {
    display: none;
    margin-right: 12px;
    font-weight: 400;
}
@media only screen and (max-width: 800px) {
  div {
    justify-content: flex-start;
    margin-bottom: 12px;
    font-weight: bold;
  }
  .mobile-label {
      display: inline-block;
  }
}
</style>