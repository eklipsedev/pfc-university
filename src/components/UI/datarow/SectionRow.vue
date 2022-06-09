<template>
  <div v-if="theCourse !== null">
    <div v-for="(section, i) in theCourse.sectionsRef" :key="i" class="row">
      <row-cell-wrapper class="long">
        <img
          class="profilePic"
          :src="theCourse.thumbnail[0].url"
          :alt="section.name"
        />
        <div>
          <div class="flex">
            <div>
              <strong>{{ section.name }}</strong>
            </div>
          </div>
        </div>
      </row-cell-wrapper>
      <row-cell-wrapper>{{}}</row-cell-wrapper>
      <row-cell-wrapper
        showLabel="true"
        label="Status"
        :class="{ complete: setStatus(section) === 'Completed' }"
        >{{ setStatus(section) }}</row-cell-wrapper
      >
      <row-cell-wrapper showLabel="true" label="Lessons Complete"
        ><router-link
          :to="{
            name: 'reports-courses-users-sections-lessons',
            params: {
              userId: filterUser.id,
              courseId: theCourse.id,
              sectionId: section.id,
            },
          }"
          >{{ lessonCompleteCount(section) }} of
          {{ lessonCount(section) }}</router-link
        ></row-cell-wrapper
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
  props: ["filterUser", "theCourse"],
  computed: {
    courses() {
      return this.$store.getters.courses;
    },
  },
  methods: {
    setStatus(section) {
      if (this.lessonCompleteCount(section) === 0) {
        return "Not Started";
      } else if (
        this.lessonCompleteCount(section) > 0 &&
        this.lessonCompleteCount(section) < this.lessonCount(section)
      ) {
        return "In Progress";
      } else {
        return "Completed";
      }
    },
    lessonCount(theSection) {
      let lessonCount = 0;

      theSection.lessonsRef.forEach(() => {
        lessonCount++;
      });

      return lessonCount;
    },
    lessonCompleteCount(theSection) {
      let completeCount = 0;

      theSection.lessonsRef.forEach((lesson) => {
        lesson.users.forEach((user) => {
          if (user.complete) {
            completeCount++;
          }
        });
      });
      return completeCount;
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
.complete {
  color: #638b18;
  font-weight: bold;
}
</style>
