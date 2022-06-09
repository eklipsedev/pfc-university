<template>
  <div class="right-controls">
    <font-awesome-icon
      v-if="!fullscreen"
      @click="toggleFullScreen"
      class="video-control"
      icon="expand"
    />
    <font-awesome-icon
      v-if="fullscreen"
      @click="toggleFullScreen"
      class="video-control"
      icon="compress"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      setFullScreen: this.fullscreen,
    };
  },
  props: ["fullscreen"],
  methods: {
    toggleFullScreen() {
      const videoContainer = this.$parent.$refs.videoContainer;
      if (this.setFullscreen) {
        this.setFullscreen = false;
        document.exitFullscreen();
      } else {
        this.setFullscreen = true;
        videoContainer.requestFullscreen();
      }
    },
  },
};
</script>

<style scoped>
.video-control {
  width: 28px;
  height: 28px;
  color: white;
  cursor: pointer;
}
</style>
