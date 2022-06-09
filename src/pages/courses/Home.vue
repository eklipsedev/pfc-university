<template>
  <the-header
    :page-title="'Hi,' + ' ' + firstName + '!'"
    page-description="Here is an overview of your courses."
  ></the-header>
  <div>
    <the-dashboard-layout>
      <base-spinner v-if="isLoading"></base-spinner>
      <base-dashboard-card v-else></base-dashboard-card>
    </the-dashboard-layout>
  </div>
</template>

<script>
import TheDashboardLayout from "../../components/layouts/TheDashboardLayout.vue";
import BaseDashboardCard from "../../components/UI/BaseDashboardCard.vue";

export default {
  components: {
    TheDashboardLayout,
    BaseDashboardCard,
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
    firstName() {
      return localStorage.getItem('firstName');
    },
  },
};
</script>
