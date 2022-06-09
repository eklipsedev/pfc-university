<template>
  <modal :open="isModalOpen" @close="toggleModal"></modal>
  <the-header
    page-title="Reports"
    page-description="See what your users have been up to in terms of education."
  ></the-header>
  <main-container>
    <user-row-actions @open="toggleModal"></user-row-actions>
    <report-row-header></report-row-header>
    <report-row></report-row>
  </main-container>
</template>

<script>
import ReportRow from "../../components/UI/datarow/ReportRow.vue";
import UserRowActions from "../../components/UI/datarow/UserRowActionsWrapper.vue";
import ReportRowHeader from "../../components/UI/datarow/ReportRowHeader.vue";
import Modal from "@/components/UI/modal/Modal.vue";

export default {
  components: {
    ReportRow,
    UserRowActions,
    ReportRowHeader,
    Modal,
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
