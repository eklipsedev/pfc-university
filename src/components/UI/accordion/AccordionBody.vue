<template>
  <ul class="accordion-body" :class="setClass" :id="id">
    <li v-for="(lesson, i) in lessonsRef" :key="i">
      <base-button
        link
        class="accordion"
        :to="'/courses/' + sectionId + '/lessons/' + lesson.id"
      >
        <base-checkbox :title="lesson.name" type="checkbox"></base-checkbox>
        <div>
          <div>{{ i + 1 }}. {{ lesson.name }}</div>
          <div class="flex">
            <font-awesome-icon
              v-if="lesson.type === 'article'"
              class="margin-right"
              icon="book"
            />
            <font-awesome-icon
              v-else-if="lesson.type === 'video'"
              class="margin-right"
              icon="video"
            />
            <font-awesome-icon
              v-else
              class="margin-right"
              icon="clipboard-list"
            />
            {{ lesson.length }}
          </div>
        </div>
      </base-button>
    </li>
  </ul>
</template>

<script>
import BaseCheckbox from "../../UI/BaseCheckbox.vue";

export default {
  components: {
    BaseCheckbox,
  },
  computed: {
    lessons() {
      return this.$store.getters.lessons;
    },
  },
  props: ["id", "lessonsRef", "sectionId"],
};
</script>

<style scoped>
li {
  display: flex;
  padding: 15px;
}
.flex {
  display: flex;
  margin-top: 10px;
  align-items: center;
  color: hsla(0, 0%, 42.4%, 0.8);
  font-size: 12px;
}
.accordion-body {
  padding: 0;
  margin: 0;
  height: 0px;
  overflow: hidden;
}
.margin-right {
  margin-right: 10px;
  opacity: 0.5;
}
span.icon {
  margin-right: 10px;
  font-family: "Font awesome 5 free solid 900", sans-serif;
  color: hsla(0, 0%, 42.4%, 0.3);
}
.open {
    height: auto;
}
</style>
