<template>
  <div v-if="introStage">
    <h2>Assignment: {{ title }}</h2>
    <p><font-awesome-icon class="margin-right" icon="clock" />{{ estimatedTime }} minutes to complete</p>
    <base-button @click="setQuestionStage" mode="primary">Start Quiz</base-button>
  </div>
</template>

<script>
export default {
    props: ["introStage", "title", "estimatedTime", "setQuestionStage"]
}
</script>

<style scoped>
div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
h2 {
    margin: 0;
}
p {
    margin-bottom: 30px;
}
.margin-right {
    margin-right: 0.5rem;
}
</style>