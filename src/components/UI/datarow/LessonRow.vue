<template>
  <div v-if="theSection !== null">
    <div v-for="(lesson, i) in theSection.lessonsRef" :key="i" class="row">
      <row-cell-wrapper class="long">
        <img
          class="profilePic"
          :src="theCourse.thumbnail[0].url"
          :alt="lesson.name"
        />
        <div>
          <div class="flex">
            <div>
              <strong>{{ lesson.name }}</strong>
            </div>
          </div>
        </div>
      </row-cell-wrapper>
      <row-cell-wrapper showLabel="true" label="Lesson Type">{{
        capitalizeFirstLetter(lesson.type)
      }}</row-cell-wrapper>
      <row-cell-wrapper
        showLabel="true"
        label="Status"
        :class="{ complete: lesson.type === 'Article' }"
        >{{ lesson.complete ? "Complete" : "In Progress" }}</row-cell-wrapper
      >
      <row-cell-wrapper showLabel="true" label="Last Accessed"
        >—</row-cell-wrapper
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
  props: ["theCourse", "theSection"],
  computed: {
    courses() {
      return this.$store.getters.courses;
    },
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
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
