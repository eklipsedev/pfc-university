<template>
  <the-header page-title="Archived Users" :page-description="null"></the-header>
  <main-container>
    <user-row-actions></user-row-actions>
    <user-row-header></user-row-header>
    <user-row></user-row>
  </main-container>
</template>

<script>
import UserRow from "../../components/UI/datarow/UserRow.vue";
import UserRowActions from "../../components/UI/datarow/UserRowActionsWrapper.vue";
import UserRowHeader from "../../components/UI/datarow/UserRowHeader.vue";

export default {
  components: {
    UserRow,
    UserRowActions,
    UserRowHeader,
  },
};
</script>
