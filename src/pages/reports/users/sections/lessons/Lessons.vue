<template>
  <modal :open="isModalOpen" @close="toggleModal"></modal>
  <div v-for="course in courses" :key="course.id">
    <div v-for="section in course.sectionsRef" :key="section.id">
      <the-header
        :page-title="'Lessons — ' + course.name"
        page-description="username"
        :color="course.color"
      ></the-header>
      <main-container>
        <user-row-actions @open="toggleModal"></user-row-actions>
        <lesson-row-header></lesson-row-header>
        <lesson-row :the-course="course" :the-section="section"></lesson-row>
      </main-container>
    </div>
  </div>
</template>

<script>
import LessonRow from "@/components/UI/datarow/LessonRow.vue";
import UserRowActions from "@/components/UI/datarow/UserRowActionsWrapper.vue";
import LessonRowHeader from "@/components/UI/datarow/LessonRowHeader.vue";
import Modal from "@/components/UI/modal/Modal.vue";

export default {
  components: {
    LessonRow,
    UserRowActions,
    LessonRowHeader,
    Modal,
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
    filterUser() {
      const userId = this.$route.params.userId;
      return this.$store.getters.filterUsers(userId);
    },
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  methods: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
    filterSections(theSections) {
      const sectionId = this.$route.params.sectionId;
      let theSection;
      theSections.forEach((section) => {
        if (section.id === sectionId) {
          theSection = section;
        }
      })
      return theSection;
    }
  },
  created() {
    console.log(this.$route);
  },
};
</script>
