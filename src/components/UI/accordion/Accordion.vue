<template>
  <div>
    <section v-for="(section, index) in getSections" :key="section.id">
      <div
        class="trigger"
        @click="section.isVisible = !section.isVisible"
        :id="section.id"
      >
        <div>
          <div class="title">
            Section
            <span>{{ index + 1 }}</span>
            : {{ section.name }}
          </div>
          <div class="info">
            <span>{{ getLessonsCompleted(section) }}</span>
            /
            <span>{{ getSectionLength(section) }}</span>
            | {{ "2hr" }}
          </div>
        </div>
        <img
          src="https://uploads-ssl.webflow.com/5ef3e3a7c461c21cad3df40e/5f3fd2a0831c4e4462607dd1_up-chevron.svg"
          alt=""
          class="arrow"
          :class="{
            rotate:
              section.isVisible ||
              section.lessonsRef.some(
                (lesson) => lesson.id === $route.params.lessonId
              ),
          }"
        />
      </div>
      <ul
        v-if="
          section.isVisible ||
            section.lessonsRef.some(
              (lesson) => lesson.id === $route.params.lessonId
            )
        "
        class="accordion-body"
        :id="section.id"
      >
        <div v-for="(lesson, i) in section.lessonsRef" :key="i">
          <router-link
            :to="'/courses/' + $route.params.courseId + '/lessons/' + lesson.id"
            v-slot="{ href, navigate, isActive }"
            custom
          >
            <li :class="[isActive && 'router-link-active']">
              <base-checkbox
                :id="lesson.id"
                :title="lesson.name"
                type="checkbox"
                :disabled="lesson.type === 'assignment'"
                :class="{ disabled: lesson.type === 'assignment' }"
              ></base-checkbox>
              <a class="accordion" :to="href" @click="navigate">
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
              </a>
            </li>
          </router-link>
        </div>
      </ul>
    </section>
  </div>
</template>

<script>
import BaseCheckbox from "@/components/UI/BaseCheckbox.vue";
export default {
  components: {
    BaseCheckbox,
  },
  computed: {
    theSections() {
      return this.$store.getters.sections;
    },
    getSections() {
      const courseId = this.$route.params.courseId;
      const sections = this.$store.getters.sections;
      return sections.filter((section) => {
        if (section.courseRef.id === courseId) {
          return true;
        } else {
          return false;
        }
      });
    },
  },
  methods: {
    getSectionLength(theSection) {
      let lessonCount = 0;

      theSection.lessonsRef.forEach(() => {
        lessonCount++;
      });
      return lessonCount;
    },
    getLessonsCompleted(theSection) {
      const userId = localStorage.getItem("userId");
      let completedLessonCount = 0;

      theSection.lessonsRef.forEach((lesson) => {
        lesson.users.forEach((user) => {
          if (user.user.id === userId && user.complete) {
            completedLessonCount++;
          }
        });
      });
      return completedLessonCount;
    },
  },
};
</script>

<style scoped>
.disabled {
  cursor: not-allowed;
}
.trigger {
  position: relative;
  display: flex;
  padding: 15px 55px 15px 15px;
  align-items: center;
  background-color: #f2f3f5;
  cursor: pointer;
  text-align: left;
  border-bottom: 1px solid #dedfe0;
}
.trigger:hover {
  background-color: #e8e8e8;
}
.title {
  margin-bottom: 4px;
  font-size: 18px;
  line-height: 26px;
  font-weight: bold;
}
.info {
  font-size: 13px;
}
.arrow {
  position: absolute;
  right: 15px;
  width: 15px;
}
.rotate {
  transform: rotate(180deg);
}
li {
  display: flex;
  padding: 15px;
}
li:hover {
  background-color: hsla(0, 0%, 42.4%, 0.04);
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
  height: auto;
  overflow: hidden;
  border-bottom: 1px solid #dedfe0;
}
.margin-right {
  margin-right: 10px;
  opacity: 0.5;
}
.open {
  height: auto;
}
section {
  display: flex;
  overflow: hidden;
  flex-direction: column;
}
.router-link-active,
.isActive {
  background-color: rgba(244, 130, 33, 0.1) !important;
}
.accordion {
  display: flex;
  background-color: transparent;
  color: #2c3e50;
  padding: 0;
  font-weight: inherit;
  width: 100%;
  text-align: left;
}
</style>
