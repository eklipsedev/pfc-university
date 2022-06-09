<template>
  <section id="course">
    <div class="content">
      <div v-for="lesson in getLessons" :key="lesson.id">
        <the-quiz v-if="lesson.type === 'assignment'"></the-quiz>
        <the-video v-if="lesson.type === 'video'"></the-video>
        <the-article v-if="lesson.type === 'article'"></the-article>
      </div>
    </div>
    <div class="panel">
      <accordion></accordion>
    </div>
  </section>
</template>

<script>
import Accordion from "@/components/UI/accordion/Accordion.vue";
import TheQuiz from "@/components/UI/quiz/Quiz.vue";
import TheVideo from "@/components/UI/video/Video.vue";
import TheArticle from "@/components/UI/article/Article.vue";

export default {
  components: {
    Accordion,
    TheQuiz,
    TheVideo,
    TheArticle,
  },
  data() {
    return {
      article: true,
      video: false,
      assignment: false,
    };
  },
  computed: {
    getLessons() {
      const lessonId = this.$route.params.lessonId;
      const lessons = this.$store.getters.getUserLessons;

      return lessons.filter((lesson) => {
        if (lesson.id === lessonId && lesson.type === "article") {
          return (this.article = true);
        } else if (lesson.id === lessonId && lesson.type === "video") {
          return (this.video = true);
        } else if (lesson.id === lessonId && lesson.type === "assignment") {
          return (this.assignment = true);
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
#course {
  min-height: 100vh;
}
section {
  display: flex;
  width: 100%;
  justify-content: start;
}
.content {
  flex: 1;
}
.panel {
  position: relative;
  width: 480px;
  z-index: 0;
  border-left: 1px solid #dedfe0;
  background-color: white;
  overflow-y: auto;
  max-height: 100vh;
  top: 0;
  position: sticky;
}

@media only screen and (max-width: 1094px) {
  section {
    flex-direction: column;
  }
  .panel {
    width: 100%;
  }
}
</style>
