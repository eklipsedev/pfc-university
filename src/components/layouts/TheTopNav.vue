<template>
  <div class="nav--top">
    <div class="nav--container">
      <router-link :to="{ name: 'home' }" class="nav--brand">
        <img
          src="https://uploads-ssl.webflow.com/5ef3e3a7c461c21cad3df40e/5f3eb54dd597419deb8904cf_pfc-logo.png"
          loading="lazy"
          alt=""
        />
      </router-link>
      <nav class="nav--menu">
        <base-dropdown>
          <template #toggle>
            <div>My Courses</div>
            <div class="icon">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/appjaxx.appspot.com/o/right-arrow%20(3).svg?alt=media&token=340f463d-569a-4066-b692-19b1f4828de4"
              />
            </div>
          </template>
          <template #nav>
            <base-button
              v-for="course in userCourses"
              :key="course.id"
              link
              :to="{
                name: 'lessons',
                params: {
                  courseId: course.id,
                  lessonId: lessonId(course),
                },
              }"
              class="dd-link"
            >
              <img
                :src="course.thumbnail[0].url"
                loading="lazy"
                :alt="course.name"
                class="dd-course-icon"
              />
              <div class="dd-content">
                <div class="dd-course-text">{{ course.name }}</div>
                <div v-for="user in course.users" :key="user.user.id">
                  <base-progress-bar
                    v-if="user.user.id === userId"
                    :width="user.completed"
                    class="progress-bar"
                  ></base-progress-bar>
                </div>
              </div>
            </base-button>
          </template>
        </base-dropdown>

        <base-dropdown>
          <template #toggle>
            <div class="div-block-28">
              <div id="nav-name">
                <font-awesome-icon v-if="avatar === ''" icon="user-circle" />
                <img
                  v-else
                  class="avatar"
                  height="20"
                  width="20"
                  :src="avatar"
                />
                {{ firstName + " " + lastName }}
              </div>
              <div class="email">{{ email }}</div>
            </div>
            <div class="icon">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/appjaxx.appspot.com/o/right-arrow%20(3).svg?alt=media&token=340f463d-569a-4066-b692-19b1f4828de4"
              />
            </div>
          </template>
          <template #nav>
            <base-button
              v-for="link in links"
              :key="link.id"
              link
              mode="dd-link"
              :to="{
                name: link.name,
                params: {
                  id: userId,
                },
                path: '/account/' + userId + '/details',
              }"
            >
              <div>
                <font-awesome-icon class="margin-right" :icon="link.icon" />
                {{ link.name }}
              </div>
            </base-button>
            <base-button
              v-if="isLoggedIn"
              link
              mode="dd-link"
              @click="logout"
              to="/login"
            >
              <div>
                <font-awesome-icon class="margin-right" icon="sign-out-alt" />
                Logout
              </div>
            </base-button>
          </template>
        </base-dropdown>
      </nav>
    </div>
    <div class="nav--menu-btn">
      <div class="w-icon-nav-menu"></div>
    </div>
    <div class="w-nav-overlay" data-wf-ignore=""></div>
  </div>
</template>

<script>
import BaseDropdown from "../../components/UI/BaseDropdown.vue";
import BaseButton from "../../components/UI/BaseButton.vue";
import BaseProgressBar from "../../components/UI/BaseProgressBar.vue";

export default {
  components: {
    BaseButton,
    BaseDropdown,
    BaseProgressBar,
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    getCurrentUser() {
      const currentUser = localStorage.getItem("currentUser");
      return JSON.parse(currentUser);
    },
    userId() {
      return localStorage.getItem("userId");
    },
    firstName() {
      return localStorage.getItem("firstName");
    },
    lastName() {
      return localStorage.getItem("lastName");
    },
    email() {
      return localStorage.getItem("email");
    },
    avatar() {
      return localStorage.getItem("avatar");
    },
    userCourses() {
      return this.$store.getters.getUserCourses;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/login");
    },
    lessonId(theCourse) {
      const userId = this.userId;
      let firstIncomplete;
      let userLessons = [];

      theCourse.sectionsRef.forEach((section) => {
        section.lessonsRef.forEach((lesson) => {
          lesson.users.forEach((user) => {
            if (user.user.id === userId) {
              userLessons.push({
                ...lesson,
                user: user,
                sectionOrder: section.order,
                lessonOrder: lesson.sectionOrder,
              });
            }
          });
        });
      });

      const sortedLessons = userLessons.sort((a, b) => {
        if (a.sectionOrder === b.sectionOrder) {
          return a.lessonOrder - b.lessonOrder;
        }
        return a.sectionOrder > b.sectionOrder ? 1 : -1;
      });

      firstIncomplete = sortedLessons.find((lesson) => {
        return !lesson.user.complete;
      });
      return firstIncomplete.id;
    },
  },
  data() {
    return {
      links: [
        {
          id: new Date().toISOString(),
          name: "Account",
          icon: "user-circle",
        },
      ],
    };
  },
};
</script>

<style scoped>
.avatar {
  object-fit: cover;
  border-radius: 50%;
  margin-right: 3px;
  box-shadow: 0 0 5px 2px rgb(0 0 0 / 8%);
}
.nav--top {
  position: relative;
  display: flex;
  background-color: white;
  z-index: 1000;
}
.nav--container {
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  width: 90vw;
  max-width: 1224px;
}
.nav--brand {
  display: flex;
  align-items: center;
  max-width: 180px;
  margin-right: 20px;
}
.nav--menu {
  display: flex;
  justify-content: space-between;
  flex: 1;
  color: #6c6c6c;
}
.margin-right {
  margin-right: 5px;
}
.email {
  opacity: 0.8;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
}
.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 0 12px;
  width: 12px;
  height: 12px;
}
.dd-course-icon {
  position: relative;
  top: 3px;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 5px;
  object-fit: cover;
}
.dd-content {
  flex: 1;
  text-align: left;
  white-space: normal;
  font-size: 14px;
}
.progress-bar {
  margin-top: 8px;
}
</style>
