<template>
  <div class="nav--middle">
    <div class="container">
      <div class="admin-title">ADMIN LINKS:</div>
      <base-dropdown>
        <template #toggle>
          <div>
            <font-awesome-icon class="margin-right" icon="users" />
            Users
          </div>
        </template>
        <template #nav>
          <base-button
            v-for="link in usersList"
            :key="link.id"
            link
            mode="dd-link"
            :to="link.url"
          >
            <div>
              <font-awesome-icon class="margin-right" :icon="link.icon" />
              {{ link.name }}
            </div>
          </base-button>
        </template>
      </base-dropdown>
      <base-dropdown>
        <template #toggle>
          <div>
            <font-awesome-icon class="margin-right" icon="chart-pie" />
            Reports
          </div>
        </template>
        <template #nav>
          <base-button
            v-for="link in reportsList"
            :key="link.id"
            link
            mode="dd-link"
            :to="link.url"
          >
            <div>
              <font-awesome-icon class="margin-right" :icon="link.icon" />
              {{ link.name }}
            </div>
          </base-button>
        </template>
      </base-dropdown>
    </div>
  </div>
</template>

<script>
import BaseDropdown from "../../components/UI/BaseDropdown.vue";
import BaseButton from "../../components/UI/BaseButton.vue";

export default {
  components: {
    BaseDropdown,
    BaseButton,
  },
  data() {
    return {
      usersList: [],
      reportsList: [],
      links: [
        {
          id: new Date().toISOString(),
          name: "All Users",
          icon: "users",
          group: "users",
          url: "/users/all",
        },
        {
          id: new Date().toISOString(),
          name: "Archived Users",
          icon: "archive",
          group: "users",
          url: "/users/archived",
        },
        {
          id: new Date().toISOString(),
          name: "Education",
          icon: "graduation-cap",
          group: "reports",
          url: "/reports",
        },
      ],
    };
  },
  created() {
    this.usersList = this.links.filter((link) => {
      return link.group === "users";
    });
    this.reportsList = this.links.filter((link) => {
      return link.group === "reports";
    });
  },
};
</script>

<style scoped>
.nav--middle {
  display: flex;
  height: 70px;
  background-color: #f2f3f5;
  color: #2c3e50;
  z-index: 999;
  border-top: 1px solid #dedfe0;
}
.container {
  display: flex;
  width: 90vw;
  max-width: 1224px;
  margin: 0 auto;
  align-items: center;
}
.admin-title {
  margin-right: 30px;
  opacity: 0.7;
  font-size: 12px;
  font-weight: 400;
}
.dd {
  margin: 0;
  position: relative;
  z-index: 900;
}
.dd-toggle {
  display: flex;
  align-items: center;
  height: 100%;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding: 20px 40px 20px 20px;
}
.dd-list {
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
}
.margin-right {
  margin-right: 5px;
}
.open {
  display: flex;
}
</style>
