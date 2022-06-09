<template>
  <the-top-nav></the-top-nav>
  <the-middle-nav></the-middle-nav>
  <the-bottom-nav
    :page-title="pageTitle"
    :page-description="pageDescription"
    :color="color"
    :completed-length="completedLength"
    :total-lessons="totalLessons"
  ></the-bottom-nav>
</template>

<script>
import TheTopNav from "./TheTopNav.vue";
import TheMiddleNav from "./TheMiddleNav.vue";
import TheBottomNav from "./TheBottomNav.vue";

export default {
  components: {
    TheTopNav,
    TheMiddleNav,
    TheBottomNav,
  },
  props: ["pageTitle", "pageDescription", "color", "completedLength", "totalLessons"],
  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    isSuperAdmin() {
      return this.$store.getters.isSuperAdmin;
    },
  },
};
</script>
