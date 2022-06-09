<template>
  <the-header
    v-for="course in courses"
    :key="course.id"
    :page-title="course.name"
    :color="course.color"
    :page-description="course.description"
    :total-lessons="getTotalLessons(course)"
    :completed-length="getLessonsCompleted(course)"
  ></the-header>
  <the-course-layout></the-course-layout>
</template>

<script>
import TheCourseLayout from "../../components/layouts/TheCourseLayout.vue";

export default {
  components: {
    TheCourseLayout,
  },
  computed: {
    courses() {
      const courseId = this.$route.params.courseId;
      const courses = this.$store.getters.getUserCourses;
      return courses.filter((course) => {
        if (course.id === courseId) {
          return true;
        }
      });
    },
    courseLength() {
      return this.$store.getters.getUserCourses.length;
    },
  },
  methods: {
    getTotalLessons(theCourse) {
      let lessonCount = 0;

      theCourse.sectionsRef.forEach((section) => {
        section.lessonsRef.forEach(() => {
          lessonCount++;
        });
      });
      return lessonCount;
    },
    getLessonsCompleted(theCourse) {
      const userId = localStorage.getItem("userId");
      let completedLessonCount = 0;

      theCourse.sectionsRef.forEach((section) => {
        section.lessonsRef.forEach((lesson) => {
          lesson.users.forEach((user) => {
            if (user.user.id === userId && user.complete) {
              completedLessonCount++;
            }
          });
        });
      });
      return completedLessonCount;
    },
  },
};
</script>
