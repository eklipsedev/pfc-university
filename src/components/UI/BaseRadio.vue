<template>
  <label>
    <div :class="setClass"></div>
    <input
      type="radio"
      :value="title"
      :name="setName"
      :v-model="setName"
    />
    <span :class="mode">{{ title }}</span>
  </label>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: null,
    },
    mode: {
      type: String,
      required: false,
      default: null,
    },
    type: {
      type: String,
      required: true,
      default: "checkbox",
    },
    index: {
      type: Number,
      required: false,
      default: null,
    },
    setClass: {
      required: false,
    }
  },
  computed: {
    setName() {
      return 'question' + this.index;
    },
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-right: 15px;
  padding-left: 20px;
  cursor: pointer;
}
div {
  float: left;
  margin-left: -20px;
  border-radius: 50%;
  margin-top: 0;
  border: 1px solid #dedfe0;
  width: 20px;
  height: 20px;
}
input {
  opacity: 0;
  position: absolute;
  z-index: -1;
}
span {
  display: inline-block;
  cursor: pointer;
  margin-bottom: 5px;
  margin-left: 15px;
  font-size: 16px;
}
.checked {
  border-color: #f48221;
  background-color: #f48221;
  background-image: url("https://uploads-ssl.webflow.com/5ef3e3a7c461c21cad3df40e/5f4aa6e58f8984ec13c241d0_foursquare-check-in%20(1).svg");
  background-size: 60%;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
