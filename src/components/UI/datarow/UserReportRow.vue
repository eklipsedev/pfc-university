<template>
  <div v-if="users !== null">
    <div v-for="(user, i) in users" :key="i" class="row">
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
      <row-cell-wrapper showLabel="true" label="Created At">—</row-cell-wrapper>
      <row-cell-wrapper showLabel="true" label="Source">Manual</row-cell-wrapper>
      <row-cell-wrapper showLabel="true" label="Last Accessed">—</row-cell-wrapper>
      <row-cell-wrapper showLabel="true" label="Completed Sections"
        ><router-link
          :to="{
            name: 'reports-courses-users-sections',
            params: {
              userId: user.user.id,
              courseId: theCourse.id,
            },
          }"
          >{{ sectionCompletedCount(user.user.id) }} of
          {{ sectionCount }}</router-link
        ></row-cell-wrapper
      >
      <row-cell-wrapper showLabel="true" label="Completed On">—</row-cell-wrapper>
    </div>
  </div>
</template>

<script>
import RowCellWrapper from "./RowCellWrapper.vue";

export default {
  components: {
    RowCellWrapper,
  },
  props: ["theCourse"],
  computed: {
    users() {
      return this.$store.getters.users;
    },
    sectionCount() {
      let sectionCount = 0;

      this.theCourse.sectionsRef.forEach(() => {
        sectionCount++;
      });

      return sectionCount;
    },
  },
  methods: {
    sectionCompletedCount(userId) {
      let sectionCompletedCount = 0;

      this.theCourse.sectionsRef.forEach((section) => {
        let lessonCount = 0;
        let lessonCompletedCount = 0;
        section.lessonsRef.forEach((lesson) => {
          lessonCount++;
          lesson.users.forEach((user) => {
            if (user.user.id === userId && user.complete) {
              lessonCompletedCount++;
            }
          });
        });
        if (lessonCount === lessonCompletedCount) {
          sectionCompletedCount++;
        }
      });
      return sectionCompletedCount;
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
  width: 90vw;
  max-width: 1224px;
  margin-bottom: 7px;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 0 5px 2px rgb(0 0 0 / 8%);
  color: #6c6c6c;
}
@media only screen and (max-width: 800px) {
  .row {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px 15px;
  }
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
