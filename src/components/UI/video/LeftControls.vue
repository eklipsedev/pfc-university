<template>
  <div class="left-controls">
    <font-awesome-icon
      v-if="!videoPlaying"
      @click="togglePlay"
      class="video-control play"
      icon="play"
    />
    <font-awesome-icon
      v-if="videoPlaying"
      @click="togglePlay"
      class="video-control pause"
      icon="pause"
    />
    <font-awesome-icon
      @click="rewind"
      class="video-control rewind"
      icon="backward"
    />
    <div class="volume-controls">
      <font-awesome-icon
        v-if="!videoMuted"
        @click="toggleVolume"
        class="video-control volume-on"
        icon="volume-up"
      />
      <font-awesome-icon
        v-if="videoMuted"
        @click="toggleVolume"
        class="video-control volume-off"
        icon="volume-mute"
      />
      <input
        ref="volume"
        @input="updateVolume"
        class="volume"
        :value="volume"
        data-mute="0.5"
        type="range"
        max="1"
        min="0"
        step="0.01"
      />
    </div>
    <div class="time">
      <time id="time-elapsed">{{ elapsedMinutes }}:{{ elapsedSeconds }}</time>
      <span class="divider">/</span>
      <time id="duration" :datetime="dateTime"
        >{{ totalMinutes }}:{{ totalSeconds }}</time
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoMuted: false,
      volume: "100",
    };
  },
  props: [
    "videoPlaying",
    "togglePlay",
    "elapsedMinutes",
    "elapsedSeconds",
    "dateTime",
    "totalMinutes",
    "totalSeconds",
  ],
  methods: {
    rewind() {
      const video = this.$parent.$refs.video;
      video.pause();
      this.currentTime = "0";
      video.load();
      video.play();
    },
    toggleVolume() {
      const video = this.$parent.$refs.video;

      if (this.videoMuted) {
        this.videoMuted = false;
        video.muted = false;
        this.volume = "100";
      } else {
        this.videoMuted = true;
        video.muted = true;
        this.volume = "0";
      }
    },
    updateVolume() {
      const video = this.$parent.$refs.video;
      const volume = this.$refs.volume;

      video.volume = volume.value;
      this.volume = video.volume;
    },
  },
};
</script>

<style scoped>
.divider {
  margin: 0 0.5rem;
}
.time {
  color: white;
}
.video-control {
  width: 28px;
  height: 28px;
  color: white;
  cursor: pointer;
}
.play,
.pause,
.volume-off,
.volume-on,
.rewind {
  margin-right: 2rem;
}
.left-controls {
  display: flex;
  align-items: center;
  justify-content: center;
}
.volume-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 2rem;
}
.volume-controls input {
  width: 100px;
  opacity: 1;
  transition: all 0.4s ease;
}

.volume-controls:hover input,
.volume-controls input:focus {
  width: 100px;
  opacity: 1;
}
input[type="range"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  height: 14px;
  background: transparent;
  cursor: pointer;
  padding: 0;
}

input[type="range"]:focus {
  outline: none;
}

input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  cursor: pointer;
  border-radius: 1.5px;
  -webkit-appearance: none;
  transition: all 0.4s ease;
}

input[type="range"]::-webkit-slider-thumb {
  height: 1.25rem;
  width: 1.25rem;
  border-radius: 50%;
  background: #f48221;
  cursor: pointer;
  -webkit-appearance: none;
  margin-left: -1px;
}

input[type="range"]:focus::-webkit-slider-runnable-track {
  background: transparent;
}

input[type="range"].volume {
  height: 5px;
  background-color: #fff;
}

input[type="range"].volume::-webkit-slider-runnable-track {
  background-color: transparent;
}

input[type="range"].volume::-webkit-slider-thumb {
  margin-left: 0;
  height: 1rem;
  width: 1rem;
  background: #fff;
}

input[type="range"]::-moz-range-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  border: 1px solid transparent;
  background: transparent;
  border-radius: 1.3px;
}

input[type="range"]::-moz-range-thumb {
  height: 1rem;
  width: 1rem;
  border-radius: 50px;
  border: 1px solid #f48221;
  background: #f48221;
  cursor: pointer;
  margin-top: 5px;
}

input[type="range"]:focus::-moz-range-track {
  outline: none;
}

input[type="range"].volume::-moz-range-thumb {
  border: 1px solid #fff;
  background: #fff;
}
</style>
