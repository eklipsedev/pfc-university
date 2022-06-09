<template>
  <div v-if="users !== null">
    <div v-for="(user, i) in users" :key="i" class="row">
      <router-link :to="'/users/' + user.user.id" class="rowLink">
        <row-cell-wrapper class="long">
          <img
            class="profilePic"
            :src="user.avatarUrl"
            :alt="user.user.firstName + ' ' + user.user.lastName"
          />
          <div>
            <div class="flex">
              <div>
                <strong
                  >{{ user.user.firstName }} {{ user.user.lastName }}</strong
                >
              </div>
              <img
                v-if="user.user.permissions.name === 'Super Admin'"
                src="@/assets/admin-crown.svg"
                alt="admin"
                class="admin"
              />
            </div>
            <div class="email">{{ user.user.email }}</div>
          </div>
        </row-cell-wrapper>
      </router-link>
      <row-cell-wrapper>{{ user.location }}</row-cell-wrapper>
      <row-cell-wrapper>{{ user.region }}</row-cell-wrapper>
      <row-cell-wrapper>{{ user.employeeRole }}</row-cell-wrapper>
      <row-cell-wrapper>—</row-cell-wrapper>
      <row-cell-wrapper>{{ user.createdDate }}</row-cell-wrapper>
      <row-cell-wrapper>{{ user.lastAccessed }}</row-cell-wrapper>
      <row-cell-wrapper>
        <base-dropdown>
          <template #toggle>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </template>
          <template #nav>
            <base-button v-for="link in links" :key="link.id">
              <div>
                <span class="fa-icon left"></span>
                {{ link.name }}
              </div>
            </base-button>
          </template>
        </base-dropdown>
      </row-cell-wrapper>
    </div>
  </div>
</template>

<script>
import RowCellWrapper from "./RowCellWrapper.vue";

export default {
  components: {
    RowCellWrapper,
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
  },
  data() {
    return {
      links: [
        {
          id: new Date().toISOString(),
          name: "Edit User",
          icon: "fa-pen",
        },
        {
          id: new Date().toISOString(),
          name: "Resend Invite Email",
          icon: "fa-redo",
        },
        {
          id: new Date().toISOString(),
          name: "Copy Invite Link",
          icon: "fa-copy",
        },
        {
          id: new Date().toISOString(),
          name: "Delete Invite",
          icon: "fa-trash",
        },
      ],
    };
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
  max-width: 1224px;
  margin-bottom: 7px;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 0 5px 2px rgb(0 0 0 / 8%);
  color: #6c6c6c;
}
.rowLink {
  display: flex;
  align-items: center;
  color: #6c6c6c;
  text-decoration: none;
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
  justify-content: flex-start;
  text-align: left;
}
</style>
