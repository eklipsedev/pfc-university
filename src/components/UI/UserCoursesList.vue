<template>
  <div class="container">
    <div class="list">
      <div
        v-for="course in filteredUser.courses"
        :key="course.id"
        class="item"
      >
        <div class="card">
          <img
            loading="lazy"
            :src="course.thumbnail[0].url"
            :alt="course.name"
          />
          <div class="content">
            <h1 class="title">{{ course.name }}</h1>
            <base-progress-bar :width="course.completed"></base-progress-bar>
            <div class="remove">Remove Course</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseProgressBar from "./BaseProgressBar.vue";

export default {
  components: {
    BaseProgressBar,
  },
  computed: {
    getCurrentUser() {
      const currentUser = localStorage.getItem("currentUser");
      return JSON.parse(currentUser);
    },
    filteredUser() {
      const userId = this.$route.params.id;
      return this.$store.getters.filterUsers(userId);
    }
  },
};
</script>

<style scoped>
.container {
  display: flex;
  width: 100%;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
}
.list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
}
.item {
  width: 20%;
}
.card {
  margin-right: 20px;
  margin-bottom: 20px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 1px 1px 29px 0 hsl(0deg 0% 42% / 40%);
  color: #6c6c6c;
}
.title {
  font-size: 14px;
  line-height: 22px;
  text-overflow:ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.content {
  padding: 0.5rem 1rem;
  text-align: left;
}
.remove {
  color: #f48221;
  font-size: 12px;
  font-weight: 700;
  margin-top: 10px;
  cursor: pointer;
}
</style>
