<template>
  <div class="trigger" :id="id">
    <div>
      <div class="title">
        Section
        <span>{{ sectionOrder }}</span>
        : {{ sectionName }}
      </div>
      <div class="info">
        <span>{{ 5 }}</span>
        /
        <span>{{ 12 }}</span>
        | {{ "2hr" }}
      </div>
    </div>
    <img
      src="https://uploads-ssl.webflow.com/5ef3e3a7c461c21cad3df40e/5f3fd2a0831c4e4462607dd1_up-chevron.svg"
      alt=""
      class="arrow"
      :class="{ rotate: isAccordionOpen }"
    />
  </div>
</template>

<script>
export default {
  props: ["id", "sectionOrder", "sectionName"],
};
</script>

<style scoped>
.trigger {
  position: relative;
  display: flex;
  padding: 15px 70px 15px 15px;
  align-items: center;
  background-color: #f7f8fa;
  cursor: pointer;
  text-align: left;
  border-bottom: 1px solid #dedfe0;
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
  transition: all 500ms ease;
}
</style>
