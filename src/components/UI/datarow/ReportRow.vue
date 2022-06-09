<template>
  <div v-if="courses !== null">
    <div v-for="(course, i) in courses" :key="i" class="row">
      <row-cell-wrapper class="long">
        <img
          class="profilePic"
          :src="course.thumbnail[0].url"
          :alt="course.name"
        />
        <div>
          <div class="flex">
            <div>
              <strong>{{ course.name }}</strong>
            </div>
          </div>
        </div>
      </row-cell-wrapper>
      <row-cell-wrapper showLabel="true" label="Users"
        ><router-link
          :to="{
            name: 'reports-courses-users',
            params: {
              courseId: course.id,
            },
          }"
          >{{ courseUserCount(course) }}</router-link
        ></row-cell-wrapper
      >
      <row-cell-wrapper showLabel="true" label="Incomplete">{{
        courseIncompleteCount(course)
      }}</row-cell-wrapper>
      <row-cell-wrapper showLabel="true" label="Completed">{{
        courseCompleteCount(course)
      }}</row-cell-wrapper>
      <row-cell-wrapper showLabel="true" label="Completion Rate"
        >{{ completionPercentage(course) }}%</row-cell-wrapper
      >
    </div>
  </div>
</template>

<script>
import RowCellWrapper from "./RowCellWrapper.vue";

export default {
  components: {
    RowCellWrapper,
  },
  computed: {
    courses() {
      return this.$store.getters.courses;
    },
  },
  methods: {
    courseUserCount(theCourse) {
      let userCount = 0;

      theCourse.users.forEach(() => {
        userCount++;
      });

      return userCount;
    },
    courseCompleteCount(theCourse) {
      let userCount = 0;
      let incompleteCount = 0;

      theCourse.users.forEach(() => {
        userCount++;
      });

      theCourse.users.forEach((user) => {
        if (user.completed !== 100) {
          incompleteCount++;
        }
      });
      return userCount - incompleteCount;
    },
    courseIncompleteCount(theCourse) {
      let userCount = 0;
      let completeCount = 0;

      theCourse.users.forEach(() => {
        userCount++;
      });

      theCourse.users.forEach((user) => {
        if (user.completed === 100) {
          completeCount++;
        }
      });
      return userCount - completeCount;
    },
    completionPercentage(theCourse) {
      return (
        (this.courseCompleteCount(theCourse) /
          this.courseUserCount(theCourse)) *
        100
      );
    },
  },
};
</script>

<style scoped>
.dot {
  width: 6px;
  height: 6px;
  margin: 0 1px;
  border-radius: 50%;
  background-color: #6c6c6c;
}
.profilePic {
  width: 36px;
  min-width: 36px;
  height: 36px;
  margin-right: 20px;
  border-radius: 50%;
  object-fit: cover;
}
.row {
  display: flex;
  min-height: 60px;
  width: 90vw;
  max-width: 1224px;
  margin-bottom: 7px;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 0 5px 2px rgb(0 0 0 / 8%);
  color: #6c6c6c;
}
@media only screen and (max-width: 800px) {
  .row {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px 15px;
  }
}
.admin {
  width: 18px;
  margin-left: 10px;
}
.email {
  opacity: 0.8;
  font-size: 12px;
  line-height: 12px;
  font-weight: 400;
}
.flex {
  display: flex;
  align-items: center;
}
.long {
  width: 260px;
  min-width: 260px;
  justify-content: flex-start;
  text-align: left;
}
</style>
