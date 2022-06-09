<template>
  <div v-for="course in userCourses" :key="course.id">
    <div v-for="user in course.users" :key="user.id">
      <router-link
        v-if="user.user.id === userId"
        :to="{
          name: 'lessons',
          params: {
            courseId: course.id,
            lessonId: lessonId(course),
          },
        }"
      >
        <img
          width="400"
          height="240"
          :src="course.thumbnail[0].url"
          :alt="course.name"
        />
        <div class="card--content">
          <h1 class="card--title">{{ course.name }}</h1>
          <div v-for="user in course.users" :key="user.user.id">
            <base-progress-bar
              v-if="user.user.id === userId"
              :isComplete="user.completed === 100"
              :width="user.completed"
            ></base-progress-bar>
            <div v-if="user.user.id === userId" class="card--complete">
              {{ user.completed }}% complete
              <span v-if="user.completed === 100">🎉</span>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import BaseProgressBar from "./BaseProgressBar.vue";

export default {
  components: {
    BaseProgressBar,
  },
  data() {
    return {
      mostRecentlyCompletedArray: [],
    };
  },
  props: ["source", "title", "percentage", "link"],
  computed: {
    userId() {
      return localStorage.getItem("userId");
    },
    userCourses() {
      return this.$store.getters.getUserCourses;
    },
    getMostRecentlyCompleted() {
      return this.$store.getters.getMostRecentlyCompleted;
    },
  },
  methods: {
    lessonId(theCourse) {
      const userId = this.userId;
      let firstIncomplete;
      let firstComplete;
      let userLessons = [];

      theCourse.sectionsRef.forEach((section) => {
        section.lessonsRef.forEach((lesson) => {
          lesson.users.forEach((user) => {
            if (user.user.id === userId) {
              userLessons.push({
                ...lesson,
                user: user,
                sectionOrder: section.order,
                lessonOrder: lesson.sectionOrder,
              });
            }
          });
        });
      });

      const sortedLessons = userLessons.sort((a, b) => {
        if (a.sectionOrder === b.sectionOrder) {
          return a.lessonOrder - b.lessonOrder;
        }
        return a.sectionOrder > b.sectionOrder ? 1 : -1;
      });

      firstComplete = sortedLessons.find((lesson) => {
        return lesson.user.complete;
      });

      firstIncomplete = sortedLessons.find((lesson) => {
        return !lesson.user.complete;
      });
      if (!firstIncomplete) {
        return firstComplete.id;
      } else {
        return firstIncomplete.id;
      }
    },
  },
};
</script>

<style scoped>
a {
  display: inline-block;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 1px 1px 29px 0 hsl(0deg 0% 42% / 40%);
  transition: all 200ms ease;
  color: #6c6c6c;
  text-decoration: none;
}
a:hover {
  transform: translateY(-5px);
  box-shadow: 1px 1px 40px 0 hsl(0deg 0% 42% / 40%);
}
.card--content {
  padding: 0.5rem 1rem;
  text-align: left;
}
.card--title {
  font-size: 18px;
}
.card--complete {
  margin-top: 10px;
  font-weight: 400;
}
</style>
