<template>
  <header>
    <row-cell-wrapper
      v-for="cell in columnHeaders"
      :key="cell.id"
      :class="{ long: cell.long }"
    >
      <div>{{ cell.name }}</div>
      <img
        v-if="cell.sortable"
        src="https://uploads-ssl.webflow.com/5ef3e3a7c461c21cad3df40e/5f4d1133159bf195260074b2_sort.svg"
        :alt="'Sort' + cell.name"
      />
    </row-cell-wrapper>
  </header>
</template>

<script>
import RowCellWrapper from "./RowCellWrapper.vue";

export default {
  components: {
    RowCellWrapper,
  },
  data() {
    return {
      columnHeaders: [
        {
          id: new Date().toISOString(),
          name: "User",
          sortable: true,
          long: true,
        },
        {
          id: new Date().toISOString(),
          name: "Created",
          sortable: true,
          long: false,
        },
        {
          id: new Date().toISOString(),
          name: "Source",
          sortable: true,
          long: false,
        },
        {
          id: new Date().toISOString(),
          name: "Last Accessed",
          sortable: true,
          long: false,
        },
        {
          id: new Date().toISOString(),
          name: "Completed Sections",
          sortable: true,
          long: false,
        },
        {
          id: new Date().toISOString(),
          name: "Completed On",
          sortable: false,
          long: false,
        },
      ],
    };
  },
};
</script>

<style scoped>
header {
  display: flex;
  height: 34px;
  margin-bottom: 7px;
  align-items: center;
  border-radius: 4px;
  color: white;
  background-color: #6c6c6c;
  width: 90vw;
  max-width: 1224px;
}
img {
  width: 12px;
  margin-left: 5px;
  opacity: 0.7;
  transition: opacity 200ms ease;
  cursor: pointer;
}
img:hover {
  opacity: 1;
}
.long {
  width: 260px;
  min-width: 260px;
  justify-content: flex-start;
  text-align: left;
}
</style>