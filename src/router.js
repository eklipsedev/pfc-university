import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index.js";

//list of page imports that are to be rendered via Vue Router
import AccountDetails from "./pages/account/Details.vue";
import Login from "./pages/authentication/Login.vue";
import NewPassword from "./pages/authentication/NewPassword.vue";
import ResetPassword from "./pages/authentication/ResetPassword.vue";
import Signup from "./pages/authentication/Signup.vue";
import Reports from "./pages/reports/Education.vue";
import ReportsCoursesUsers from "./pages/reports/users/Users.vue";
import ReportsCoursesUsersSections from "./pages/reports/users/sections/Sections.vue";
import ReportsCoursesUsersSectionsLessons from "./pages/reports/users/sections/lessons/Lessons.vue";
import UsersAll from "./pages/users/All.vue";
import UsersArchived from "./pages/users/Archived.vue";
import UsersUser from "./pages/users/User.vue";
import Course from "./pages/courses/Course.vue";
import Home from "./pages/courses/Home.vue";
import NotFound from "./pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { requiresAuth: true, title: "Home | PFC University" },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { requiresUnauth: true, title: "Login" },
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
      meta: { requiresUnauth: true, title: "Sign Up" },
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: ResetPassword,
      meta: { requiresUnauth: true, title: "Reset Password" },
    },
    {
      path: "/new-password",
      name: "new-password",
      component: NewPassword,
      meta: { requiresUnauth: true, title: "New Password" },
    },
    {
      path: "/courses/:courseId/lessons/:lessonId",
      name: "lessons",
      component: Course,
      meta: (route) => ({ requiresAuth: true, title: route.params.username + " | PFC University" }),
    },
    {
      path: "/users/all",
      name: "all-users",
      component: UsersAll,
      meta: { requiresAuth: true, title: "All Users | PFC University" },
    },
    {
      path: "/users/archived",
      name: "archived-users",
      component: UsersArchived,
      meta: { requiresAuth: true, title: "Archived Users | PFC University" },
    },
    {
      path: "/users/:id",
      name: "user",
      component: UsersUser,
      meta: { requiresAuth: true, title: "User | PFC University" },
    },
    {
      path: "/account/:id/details",
      name: "Account",
      component: AccountDetails,
      meta: { requiresAuth: true, title: "Account Details | PFC University" },
    },
    {
      path: "/reports",
      name: "reports",
      component: Reports,
      meta: { requiresAuth: true, title: "Education Reports | PFC University" },
    },
    {
      path: "/reports/courses/:courseId/users",
      name: "reports-courses-users",
      component: ReportsCoursesUsers,
      meta: { requiresAuth: true, title: "Education Reports | PFC University" },
    },
    {
      path: "/reports/courses/:courseId/users/:userId/sections",
      name: "reports-courses-users-sections",
      component: ReportsCoursesUsersSections,
      meta: { requiresAuth: true, title: "Education Reports | PFC University" },
    },
    {
      path: "/reports/courses/:courseId/users/:userId/sections/:sectionId/lessons",
      name: "reports-courses-users-sections-lessons",
      component: ReportsCoursesUsersSectionsLessons,
      meta: { requiresAuth: true, title: "Education Reports | PFC University" },
    },
    {
      path: "/:notFound(.*)",
      name: "not-found",
      component: NotFound,
      meta: { requiresAuth: false, title: "404 Page Not Found" },
    },
  ],
});

router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/login");
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

router.beforeEach((to, _, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(
    document.querySelectorAll("[data-vue-router-controlled]")
  ).map((el) => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map((tagDef) => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create so we don't interfere with other ones.
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    // Add the meta tags to the document head.
    .forEach((tag) => document.head.appendChild(tag));

  next();
});

export default router;
