<template>
  <div
    v-for="lesson in getLessons"
    :key="lesson.id"
    ref="videoContainer"
    @fullscreenchange="toggleFullsScreen"
    id="video-container"
    class="video-container"
  >
    <transition name="playback">
      <div class="playback-animation">
        <font-awesome-icon
          v-if="!videoPlaying"
          @click="togglePlay"
          class="playback-icon"
          icon="play"
        />
        <font-awesome-icon
          v-if="videoPlaying"
          @click="togglePlay"
          class="playback-icon"
          icon="pause"
        />
      </div>
    </transition>
    <div v-if="videoEnded" @click="restart" class="overlay">
      <font-awesome-icon class="playback-icon" icon="history" />
    </div>
    <video
      ref="video"
      @click="togglePlay"
      @ended="finishVideo"
      @loadedmetadata="initializeVideo"
      @timeupdate="makeUpdates"
      preload="metadata"
    >
      <source :src="lesson.videoRef.video[0].url" type="video/mp4" />
    </video>
    <div v-if="showControls" class="video-controls">
      <div class="video-progress">
        <progress
          ref="progress"
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
      <div class="bottom-controls">
        <div class="left-controls">
          <tooltip v-if="!videoPlaying" percentage="0" text="Play">
            <font-awesome-icon
              @click="togglePlay"
              class="video-control play"
              icon="play"
            />
          </tooltip>
          <tooltip v-if="videoPlaying" percentage="0" text="Pause">
            <font-awesome-icon
              @click="togglePlay"
              class="video-control pause"
              icon="pause"
            />
          </tooltip>
          <tooltip percentage="0" text="Restart">
            <font-awesome-icon
              @click="rewind"
              class="video-control rewind"
              icon="backward"
            />
          </tooltip>
          <div class="volume-controls">
            <tooltip v-if="!videoMuted" percentage="0" text="Mute">
              <font-awesome-icon
                v-if="!videoMuted"
                @click="toggleVolume"
                class="video-control volume-on"
                icon="volume-up"
              />
            </tooltip>
            <tooltip v-if="videoMuted" percentage="0" text="Unmute">
              <font-awesome-icon
                @click="toggleVolume"
                class="video-control volume-off"
                icon="volume-mute"
              />
            </tooltip>
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
            <time id="time-elapsed"
              >{{ elapsedMinutes }}:{{ elapsedSeconds }}</time
            >
            <span class="divider">/</span>
            <time id="duration" :datetime="dateTime"
              >{{ totalMinutes }}:{{ totalSeconds }}</time
            >
          </div>
        </div>
        <div class="right-controls">
          <tooltip v-if="!fullscreen" percentage="-200" text="Fullscreen">
            <font-awesome-icon
              @click="toggleFullScreen"
              class="video-control fullscreen"
              icon="expand"
            />
          </tooltip>
          <tooltip v-if="fullscreen" text="Compress">
            <font-awesome-icon
              @click="toggleFullScreen"
              class="video-control fullscreen"
              icon="compress"
            />
          </tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tooltip from "./Tooltip.vue";
import { db } from "@/db.js";

export default {
  components: {
    Tooltip,
  },
  data() {
    return {
      videoLoading: false,
      videoPlaying: false,
      videoMuted: false,
      fullscreen: false,
      showControls: true,
      videoEnded: false,
      duration: "",
      totalMinutes: "00",
      totalSeconds: "00",
      elapsedMinutes: "00",
      elapsedSeconds: "00",
      skipToMinutes: "",
      skipToSeconds: "",
      currentTime: "0",
      volume: "100",
    };
  },
  computed: {
    dateTime() {
      return this.minutes + "m " + this.seconds + "s";
    },
    getLessons() {
      const lessonId = this.$route.params.lessonId;
      const lessons = this.$store.getters.lessons;
      return lessons.filter((lesson) => {
        if (lesson.id === lessonId) {
          return true;
        }
      });
    },
  },
  methods: {
    markAsComplete() {
      // get the lesson ID from URL
      const lessonId = this.$route.params.lessonId;

      // get the current user
      const userId = localStorage.getItem("userId");

      //get the lessons
      const lessons = this.getLessons;
      console.log(lessons);

      // loop through all of the lessons
      lessons.forEach((lesson) => {
        // if the lesson ID matches the ID from the event object
        if (lesson.id === lessonId) {
          // loop through the users for a given lesson
          lesson.users.forEach((user) => {
            // if the user.user.id === userId
            if (user.user.id === userId) {
              const theUser = user;
              // invert the completion status
              const isComplete = (user.complete = !user.complete);
              //dispatch the action
              this.$store.dispatch("updateLessonStatus", {
                oldData: {
                  ...theUser,
                  user: db.doc("fl_users/" + userId),
                  complete: !isComplete,
                },
                newData: {
                  ...theUser,
                  user: db.doc("fl_users/" + userId),
                },
                lessonId: lessonId,
                userId: userId,
                isComplete: isComplete,
              });
            }
          });
        }
      });
    },
    makeUpdates() {
      this.updateProgress();
      this.updateTimeElapsed();
    },
    togglePlay() {
      const video = this.$refs.video;
      if (!this.videoPlaying || this.videoEnded) {
        this.videoPlaying = true;
        video.play();
      } else {
        this.videoPlaying = false;
        video.pause();
      }
    },
    formatTime(timeInSeconds) {
      const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

      return {
        minutes: result.substr(3, 2),
        seconds: result.substr(6, 2),
      };
    },
    initializeVideo() {
      const video = this.$refs.video;
      const videoDuration = Math.round(video.duration);
      const time = this.formatTime(videoDuration);
      this.duration = videoDuration;
      this.totalMinutes = time.minutes;
      this.totalSeconds = time.seconds;
    },
    updateTimeElapsed() {
      const video = this.$refs.video;
      const time = this.formatTime(Math.round(video.currentTime));
      this.elapsedMinutes = time.minutes;
      this.elapsedSeconds = time.seconds;
    },
    updateProgress() {
      const video = this.$refs.video;
      const progress = this.$refs.progress;

      this.currentTime = Math.floor(video.currentTime);
      progress.value = Math.floor(video.currentTime);
      console.log(progress.value);
    },
    finishVideo() {
      this.videoEnded = true;
      this.videoPlaying = false;
      this.showControls = false;
      this.markAsComplete();
    },
    updateSeekTooltip(event) {
      const video = this.$refs.video;
      const seek = this.$refs.seek;
      const seekTooltip = this.$refs.seekTooltip;

      const skipTo = Math.round(
        (event.offsetX / event.target.clientWidth) *
          parseInt(event.target.getAttribute("max"), 10)
      );
      seek.setAttribute("data-seek", skipTo);
      const t = this.formatTime(skipTo);
      this.skipToMinutes = t.minutes;
      this.skipToSeconds = t.seconds;
      const rect = video.getBoundingClientRect();
      seekTooltip.style.left = `${event.pageX - rect.left}px`;
    },
    restart() {
      const video = this.$refs.video;

      this.currentTime = "0";
      this.videoPlaying = true;
      this.videoEnded = false;
      this.showControls = true;
      video.load();
      video.play();
    },
    rewind() {
      const video = this.$refs.video;

      video.pause();
      this.currentTime = "0";
      video.load();
      video.play();
    },
    skipAhead(event) {
      const video = this.$refs.video;
      const seek = this.$refs.seek;
      const progress = this.$refs.progress;

      const skipTo = event.target.dataset.seek
        ? event.target.dataset.seek
        : event.target.value;
      video.currentTime = skipTo;
      progress.value = skipTo;
      seek.value = skipTo;
    },
    toggleVolume() {
      const video = this.$refs.video;

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
      const video = this.$refs.video;
      const volume = this.$refs.volume;

      video.volume = volume.value;
      this.volume = video.volume;
    },
    animatePlayback() {},
    toggleFullScreen() {
      const videoContainer = this.$refs.videoContainer;
      if (this.fullscreen) {
        this.fullscreen = false;
        document.exitFullscreen();
      } else {
        this.fullscreen = true;
        videoContainer.requestFullscreen();
      }
    },
    toggleControls() {
      this.showControls = !this.showControls;
    },
    keyboardShortcuts(event) {
      const { key } = event;
      switch (key) {
        case "k":
          this.togglePlay();
          this.animatePlayback();
          if (!this.videoPlaying) {
            this.toggleControls();
          } else {
            setTimeout(() => {
              this.toggleControls();
            }, 2000);
          }
          break;
        case "m":
          this.toggleVolume();
          break;
        case "f":
          this.toggleFullScreen();
          break;
      }
    },
  },
};
</script>

<style scoped>
.overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  z-index: 1;
  cursor: pointer;
}
.playback-icon {
  width: 50px;
  height: 50px;
  color: white;
}
.playback-animation {
  pointer-events: none;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -40px;
  margin-top: -40px;
  width: 80px;
  height: 80px;
  border-radius: 80px;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
}
.playback-enter-active,
.playback-leave-active {
  transition: opacity 0.5s;
}
.playback-enter, .playback-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

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
.bottom-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.video-controls {
  padding: 1rem;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  transition: all 200ms ease;
}
.video-container {
  display: flex;
  position: relative;
  border-radius: 10px;
}
.video-progress {
  position: relative;
  margin-bottom: 1.5rem;
}
video {
  width: 100%;
  min-width: 100%;
  height: 100%;
  cursor: pointer;
}
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
button {
  cursor: pointer;
  position: relative;
  margin-right: 7px;
  font-size: 12px;
  padding: 3px;
  border: none;
  outline: none;
  background-color: transparent;
}

button * {
  pointer-events: none;
}

button::before {
  content: attr(data-title);
  position: absolute;
  display: none;
  right: 0;
  top: -50px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-weight: bold;
  padding: 4px 6px;
  word-break: keep-all;
  white-space: pre;
}

button:hover::before {
  display: inline-block;
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
.hidden {
  display: none;
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
