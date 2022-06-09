<template>
  <li class="question">
    <div class="title">
      {{ questionTitle }}
      <font-awesome-icon
        :v-if="submittedStage"
        :class="{ correct: isCorrect, incorrect: !isCorrect }"
        :icon="icon"
      />
    </div>
    <ul class="choices">
      <li v-for="(choice, index) in choices" :key="index" class="choice">
        <base-radio
          @click="isChecked(choice, questionIndex)"
          :setClass="{ checked: activeOption === choice }"
          :title="choice.choice"
          :mode="isCorrect ? null : 'strikethrough'"
          :index="questionIndex"
          :v-model="'question' + questionIndex"
          @change="$emit('set-choice', activeOption)"
        ></base-radio>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  data() {
    return {
      activeOption: this.modelValue,
      icon: null,
    };
  },
  props: [
    "questionTitle",
    "choices",
    "correctChoice",
    "isCorrect",
    "submittedStage",
    "questionIndex",
    "modelValue",
  ],
  emits: ["update:modelValue", "set-choice"],
  methods: {
    isChecked(option, index) {
      this.activeOption = option;
      this.$emit("update:modelValue", option, index);
    },
    setIcon() {
      if (this.submittedStage && this.isCorrect) {
        this.icon = "check-circle";
      } else if (this.submittedStage && !this.isCorrect) {
        this.icon = "times-circle";
      } else {
        this.icon = "fw";
      }
    },
  },
  created() {
    this.setIcon();
  }
};
</script>

<style scoped>
.question {
  margin-bottom: 20px;
  padding: 20px 5px;
  border-bottom: 1px solid rgba(222, 223, 224, 0.4);
  color: #6c6c6c;
  list-style-type: decimal;
  text-align: left;
}
.title {
  margin-bottom: 25px;
  color: #6c6c6c;
  font-size: 22px;
  line-height: 30px;
  font-weight: 600;
}
.correct {
  color: #79a624;
}
.incorrect {
  color: #ff0101;
}
.strikethrough {
  color: #ff0101;
  font-weight: 600;
  text-decoration: line-through;
}
.choice,
.choices {
  list-style-type: none;
  padding-left: 0;
}
.choice {
  margin-bottom: 10px;
}
.choices {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
