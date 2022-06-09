<template>
  <div class="video-progress">
    <progress
      ref="this.$refs.progress"
      :value="currentTime"
      min="0"
      :max="duration"
    ></progress>
    <input
      ref="seek"
      @mousemove="updateSeekTooltip"
      @input="skipAhead"
      class="seek"
      min="0"
      :value="currentTime"
      :max="duration"
      type="range"
      step="1"
    />
    <div class="seek-tooltip" ref="seekTooltip">
      {{ skipToMinutes }}:{{ skipToSeconds }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      setSkipToMinutes: "",
      setSkipToSeconds: "",
    };
  },
  props: ["currentTime", "duration", "skipToMinutes", "skipToSeconds"],
  methods: {
    formatTime(timeInSeconds) {
      const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

      return {
        minutes: result.substr(3, 2),
        seconds: result.substr(6, 2),
      };
    },
    updateSeekTooltip(event) {
      const video = this.$parent.$refs.video;
      const seek = this.$refs.seek;
      const seekTooltip = this.$refs.seekTooltip;

      const skipTo = Math.round(
        (event.offsetX / event.target.clientWidth) *
          parseInt(event.target.getAttribute("max"), 10)
      );
      seek.setAttribute("data-seek", skipTo);
      const t = this.formatTime(skipTo);
      this.setSkipToMinutes = t.minutes;
      this.setSkipToSeconds = t.seconds;
      const rect = video.getBoundingClientRect();
      seekTooltip.style.left = `${event.pageX - rect.left}px`;
    },
    skipAhead(event) {
      const video = this.$parent.$refs.video;
      const seek = this.$refs.seek;
      const progress = this.$refs.progress;

      const skipTo = event.target.dataset.seek
        ? event.target.dataset.seek
        : event.target.value;
      video.currentTime = skipTo;
      progress.value = skipTo;
      seek.value = skipTo;
    },
  },
};
</script>

<style scoped>
progress {
  appearance: none;
  border-radius: 2px;
  width: 100%;
  height: 9px;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
}
progress::-webkit-progress-bar {
  background-color: #f48221;
  border-radius: 2px;
}

progress::-webkit-progress-value {
  background: #f48221;
  border-radius: 2px;
}

progress::-moz-progress-bar {
  border: 1px solid #f48221;
  background: #f48221;
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
.seek {
  position: absolute;
  top: -3px;
  width: 100%;
  cursor: pointer;
  margin: 0;
}

.seek:hover + .seek-tooltip {
  display: block;
}

.seek-tooltip {
  display: none;
  position: absolute;
  top: -50px;
  margin-left: -32px;
  font-size: 12px;
  padding: 3px 5px;
  content: attr(data-title);
  font-weight: bold;
  color: #fff;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
