<template>
  <div v-for="lesson in getLessons" :key="lesson.id">
    <h1>{{ lesson.name }}</h1>
    <article class="article" v-html="lesson.articleRef.article"></article>
    <div class="action">
      <base-button
        v-if="!completedLessons.includes(lesson.name)"
        @click="markAsComplete"
        class="primary"
        :data-id="lesson.id"
        >Go to Next Lesson</base-button
      >
      <base-button
        v-else
        @click="markAsComplete"
        class="secondary"
        :data-id="lesson.id"
        >Mark as Incomplete</base-button
      >
    </div>
  </div>
</template>

<script>
import router from "@/router.js";
export default {
  computed: {
    getLessons() {
      const lessonId = this.$route.params.lessonId;
      const lessons = this.$store.getters.lessons;
      return lessons.filter((lesson) => {
        if (lesson.id === lessonId) {
          return true;
        }
      });
    },
    getCourses() {
      return this.$store.getters.getUserCourses;
    },
    completedLessons() {
      return this.$store.getters.getCompletedLessons;
    },
  },
  methods: {
    markAsComplete(event) {
      console.log(event);
      this.$store
        .dispatch("toggleUserCompletion", {
          id: event.target.dataset.id,
        })
        .then(() => {
          this.$store.dispatch("setMostRecentlyCompleted").then(() => {
            this.$store.dispatch("setUserCompletionPercentage");
            // get the lesson ID from URL
            const courseId = this.$route.params.courseId;

            const userId = localStorage.getItem("userId");
            const courses = this.getCourses;
            let firstIncomplete;
            let userLessons = [];

            courses.forEach((course) => {
              if (course.id === courseId) {
                course.sectionsRef.forEach((section) => {
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
              }
            });

            const sortedLessons = userLessons.sort((a, b) => {
              if (a.sectionOrder === b.sectionOrder) {
                return a.lessonOrder - b.lessonOrder;
              }
              return a.sectionOrder > b.sectionOrder ? 1 : -1;
            });

            firstIncomplete = sortedLessons.find((lesson) => {
              return !lesson.user.complete;
            });

            router.replace(
              "/courses/" + courseId + "/lessons/" + firstIncomplete.id
            );
          });
        });
    },
  },
};
</script>

<style scoped>
div {
  margin: 0 auto;
  padding: 50px;
  max-width: 800px;
}
article {
  text-align: left;
}
article div {
  float: right;
}
.article li {
  margin-bottom: 8px;
}
.action {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
</style>
