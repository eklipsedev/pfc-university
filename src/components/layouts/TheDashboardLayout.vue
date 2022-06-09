<template>
  <main-container>
    <div v-if="setCourses === 0" class="empty">
      Oh no! It looks like you have no courses.
    </div>
    <div class="grid">
      <slot></slot>
    </div>
  </main-container>
</template>

<script>
export default {
  computed: {
    setCourses() {
      const userId = localStorage.getItem("userId");

      //get the courses
      const courses = this.$store.getters.getUserCourses;
      // loop through all of the courses
      let courseLength = 0;
      courses.forEach((course) => {
        // loop through the users for a given course
        course.users.forEach((user) => {
          // if the user.user.id === userId
          if (user.user.id === userId) {
            courseLength++;
          }
        });
      });
      return courseLength;
    },
  },
};
</script>

<style scoped>
.empty {
  background-color: #f2f3f5;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
}
.grid {
  display: grid;
  grid-auto-columns: 1fr;
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  max-width: 924px;
}
@media only screen and (max-width: 800px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
