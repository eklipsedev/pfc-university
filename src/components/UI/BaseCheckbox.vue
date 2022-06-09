<template>
  <label>
    <div
      :class="completedLessons.includes(title) ? 'checked' : null"
      :style="getType"
    ></div>
    <input
      :id="id"
      :type="type"
      :value="title"
      :name="getName"
      v-model="completedLessons"
      :disabled="disabled"
      @change="toggleUserCompletion($event)"
    />
    <span v-if="hasLabel" :class="mode">{{ title }}</span>
  </label>
</template>

<script>
export default {
  data() {
    return {
      checked: [],
    };
  },
  props: {
    checkedClass: {
      type: String,
    },
    title: {
      type: String,
      required: false,
      default: null,
    },
    mode: {
      type: String,
      required: false,
      default: null,
    },
    hasLabel: {
      type: Boolean,
      required: false,
      default: false,
    },
    type: {
      type: String,
      required: true,
      default: "checkbox",
    },
    index: {
      type: Number,
      required: false,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
    },
  },
  computed: {
    isChecked() {
      return this.completedLessons.includes(this.title) ? "checked" : null;
    },
    getType() {
      return this.type === "checkbox"
        ? "border-radius:4px"
        : "border-radius:50%";
    },
    getName() {
      return this.type === "radio" ? "question" + this.index : null;
    },
    getLessons() {
      return this.$store.getters.lessons;
    },
    userLessons() {
      const userId = localStorage.getItem("userId");
      const userLessons = this.$store.getters.getUserLessons;

      return userLessons.filter((lesson) => {
        lesson.users.forEach((user) => {
          if (user.user.id === userId && user.complete) {
            return this.checked.push(lesson.name);
          }
        });
      });
    },
    completedLessons() {
      return this.$store.getters.getCompletedLessons;
    },
    courses() {
      return this.$store.getters.userCourses;
    },
  },
  methods: {
    toggleUserCompletion(event) {
      this.$store
        .dispatch("toggleUserCompletion", { id: event.target.id })
        .then(() => {
          this.$store.dispatch("setMostRecentlyCompleted");
          this.$store.dispatch("setSections");
        });
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-right: 15px;
  padding-left: 20px;
  cursor: pointer;
}
div {
  float: left;
  margin-left: -20px;
  margin-top: 0;
  border: 1px solid #dedfe0;
  width: 20px;
  height: 20px;
}
input {
  opacity: 0;
  position: absolute;
  z-index: -1;
}
span {
  display: inline-block;
  cursor: pointer;
  margin-bottom: 5px;
  margin-left: 15px;
  font-size: 16px;
}
.checked {
  border-color: #f48221;
  border-radius: 2px;
  background-color: #f48221;
  background-image: url("https://uploads-ssl.webflow.com/5ef3e3a7c461c21cad3df40e/5f4aa6e58f8984ec13c241d0_foursquare-check-in%20(1).svg");
  background-size: 70%;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
