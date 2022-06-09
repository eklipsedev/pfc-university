<template>
  <modal :open="isModalOpen" @close="toggleModal"></modal>
  <the-header
    page-title="All Users"
    page-description="A list of all of your users"
  ></the-header>
  <main-container>
    <user-row-actions @open="toggleModal"></user-row-actions>
    <user-row-header></user-row-header>
    <user-row></user-row>
  </main-container>
</template>

<script>
import UserRow from "../../components/UI/datarow/UserRow.vue";
import UserRowActions from "../../components/UI/datarow/UserRowActionsWrapper.vue";
import UserRowHeader from "../../components/UI/datarow/UserRowHeader.vue";
import Modal from "@/components/UI/modal/Modal.vue";

export default {
  components: {
    UserRow,
    UserRowActions,
    UserRowHeader,
    Modal,
  },
  data() {
    return {
      isModalOpen: false,
    }
  },
  methods: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
  },
};
</script>
