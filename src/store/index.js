import { createStore } from "vuex";

import coursesModule from "./modules/courses/index.js";
import sectionsModule from "./modules/sections/index.js";
import lessonsModule from "./modules/lessons/index.js";
import usersModule from "./modules/users/index.js";
import authModule from "./modules/auth/index.js";
import quizzesModule from "./modules/quizzes/index.js";

const store = createStore({
  modules: {
    courses: coursesModule,
    sections: sectionsModule,
    lessons: lessonsModule,
    users: usersModule,
    auth: authModule,
    quizzes: quizzesModule,
  },
});

export default store;
