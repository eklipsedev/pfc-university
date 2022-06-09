<template>
  <router-view></router-view>
  <router-view name="body" v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("tryLogin");
    this.$store.dispatch("setCourses");
    this.$store.dispatch("setUserCourses").then(() => {
      this.$store.dispatch("setMostRecentlyCompleted").then(() => {
        this.$store.dispatch("setUserCompletionPercentage");
      });
    });
    this.$store.dispatch("setAvatar");
    this.$store.dispatch("setSections");
    this.$store.dispatch("setLessons");
    this.$store.dispatch("setUserLessons");
    this.$store.dispatch("setQuizzes");
    this.$store.dispatch("setUsers");
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
  },
  watch: {
    didAutoLogout(currentValue, oldValue) {
      if (currentValue & (currentValue !== oldValue)) {
        this.$router.replace("/login");
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap");

* {
  box-sizing: border-box;
}
body {
  margin: 0;
}

h1, h2, h3, h4, h5, h6, p {
  color: #6c6c6c;
}

a {
  cursor: pointer;
  color: #f48221;
  text-decoration: none;
  font-weight: bold;
}

label {
  display: block;
  margin-bottom: 2px;
  position: relative;
  opacity: 1;
  color: #7d7d7d;
  font-size: 12px;
  line-height: 20px;
}

input,
select {
  display: flex;
  width: 100%;
  height: 50px;
  margin-bottom: 0;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 5px;
  background-color: #eaeaea;
  transition: all 200ms ease;
  color: #6c6c6c;
  font-size: 16px;
}

#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

img {
  max-width: 100%;
  vertical-align: middle;
  display: inline-block;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
