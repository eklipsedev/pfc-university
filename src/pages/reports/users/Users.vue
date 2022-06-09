<template>
  <modal :open="isModalOpen" @close="toggleModal"></modal>
  <div v-for="course in courses" :key="course.id">
    <the-header
      :page-title="'Users — ' + course.name"
      :color="course.color"
    ></the-header>
    <main-container>
      <user-row-actions @open="toggleModal"></user-row-actions>
      <user-report-row-header></user-report-row-header>
      <user-report-row :the-course="course"></user-report-row>
    </main-container>
  </div>
</template>

<script>
import UserReportRow from "@/components/UI/datarow/UserReportRow.vue";
import UserRowActions from "@/components/UI/datarow/UserRowActionsWrapper.vue";
import UserReportRowHeader from "@/components/UI/datarow/UserReportRowHeader.vue";
import Modal from "@/components/UI/modal/Modal.vue";

export default {
  components: {
    UserReportRow,
    UserRowActions,
    UserReportRowHeader,
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
  },
};
</script>
