<template>
  <modal :open="isModalOpen" @close="toggleModal"></modal>
  <div v-for="course in courses" :key="course.id">
    <the-header
      :page-title="'Sections — ' + course.name"
      :page-description="userName"
      :color="course.color"
    ></the-header>
    <main-container>
      <user-row-actions @open="toggleModal"></user-row-actions>
      <section-row-header></section-row-header>
      <section-row :filter-user="filterUser" :the-course="course"></section-row>
    </main-container>
  </div>
</template>

<script>
import SectionRow from "@/components/UI/datarow/SectionRow.vue";
import UserRowActions from "@/components/UI/datarow/UserRowActionsWrapper.vue";
import SectionRowHeader from "@/components/UI/datarow/SectionRowHeader.vue";
import Modal from "@/components/UI/modal/Modal.vue";

export default {
  components: {
    SectionRow,
    UserRowActions,
    SectionRowHeader,
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
    userName() {
        return this.filterUser.user.firstName + ' ' + this.filterUser.user.lastName;
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