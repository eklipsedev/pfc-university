<template>
  <the-header page-title="Account Details"></the-header>
  <main-container>
    <user-details-form
      :id="filterUser.user.id"
      :firstName="filterUser.user.firstName"
      :lastName="filterUser.user.lastName"
      :email="filterUser.user.email"
      :phone="filterUser.phone"
      :employeeRole="filterUser.employeeRole"
      :region="filterUser.region"
      :location="filterUser.location"
    ></user-details-form>
  </main-container>
</template>

<script>
import UserDetailsForm from "../../components/UI/UserDetailsForm.vue";

export default {
  components: {
    UserDetailsForm,
  },
  computed: {
    filterUser() {
      const userId = this.$route.params.id;
      return this.$store.getters.filterUsers(userId);
    },
  },
};
</script>
