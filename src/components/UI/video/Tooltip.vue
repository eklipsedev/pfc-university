<template>
  <div ref="tooltip" class="tooltip-box">
    <slot />
    <div
      class="tooltip"
      :style="!centered ? `left:${percentage}%;right:0;` : 'left:0;right:0;'"
    >
      <span class="text">{{ text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      width: '',
    };
  },
  props: ["text", "percentage", "centered"],
  methods: {
    getToolTipWidth() {
      const tooltip = this.$refs.tooltip;
      this.width = tooltip.clientWidth;
    },
  },
  mounted() {
    this.getToolTipWidth();
  },
};
</script>

<style scoped>
.tooltip-box {
  position: relative;
}

.tooltip-box:hover .tooltip {
  visibility: visible;
  transition: all 0.2s;
  transition-delay: 1s;
}

.tooltip {
  color: #ffffff;
  font-size: 14px;
  text-align: center;
  padding: 5px 10px;
  border-radius: 4px;
  width: auto;
  bottom: 150%;
  visibility: hidden;
  position: absolute;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
