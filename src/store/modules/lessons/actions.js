import { db, app } from "@/db.js";
import firebase from "firebase/app";

export default {
  setLessons(context) {
    return new Promise((resolve) => {
      app.content
        .get({
          schemaKey: "lessons",
          populate: [
            {
              field: "sectionRef",
            },
            {
              field: "articleRef",
            },
            {
              field: "videoRef",
              populate: ["video"],
            },
            {
              field: "assignmentRef",
            },
            {
              field: "users",
              populate: ["user"],
            },
          ],
          orderBy: { field: "sectionOrder", order: "asc" },
        })
        .then((lessons) => {
          const lessonObjects = Object.values(lessons);
          const lessonsArray = [];
          lessonObjects.forEach((lesson) => {
            lessonsArray.push(lesson);
          });
          context.commit("setLessons", lessonsArray);
          resolve(lessonsArray);
        })
        .catch((error) => console.log(error)); // handle any errors
    });
  },

  //set user lessons
  setUserLessons(context) {
    return new Promise((resolve) => {
      const userId = localStorage.getItem("userId");
      console.log("setUserLessons called");
      //get the lessons
      context
        .dispatch("setLessons")
        .then((lessons) => {
          // loop through all of the lessons
          const completedArray = [];
          const lessonsArray = [];
          lessons.forEach((lesson) => {
            // loop through the users for a given lesson
            lesson.users.forEach((user) => {
              // if the user.user.id === userId
              if (user.user.id === userId) {
                lessonsArray.push(lesson);
              }
              if (user.user.id === userId && user.complete) {
                completedArray.push(lesson.name);
              }
            });
          });
          context.commit("setUserLessons", lessonsArray);
          context.commit("setCompletedLessons", completedArray);
          resolve(lessonsArray);
          resolve(completedArray);
        })
        .catch((error) => console.log(error)); // handle any errors
    });
  },

  toggleUserCompletion({ commit, dispatch, getters }, payload) {
    return new Promise((resolve) => {
      // get the lesson ID from the checkbox change event
      const lessonId = payload.id;

      // get the current user
      const userId = localStorage.getItem("userId");

      //get the lessons
      const lessons = getters.getUserLessons;

      // loop through all of the lessons
      lessons.forEach((lesson) => {
        // if the lesson ID matches the ID from the event object
        if (lesson.id === lessonId) {
          // loop through the users for a given lesson
          lesson.users.forEach((user) => {
            // if the user.user.id === userId
            if (user.user.id === userId) {
              const theUser = user;
              // invert the completion status
              const isComplete = (user.complete = !user.complete);

              if (!user.complete) {
                dispatch("setMostRecentlyCompleted", { id: lesson.id });
              }

              commit("updateCompletedLessons", { name: lesson.name });
              console.log("commiting a change to completion status");

              //dispatch the action
              app.content
                .update({
                  schemaKey: "lessons",
                  entryId: lesson.id,
                  data: {
                    users: firebase.firestore.FieldValue.arrayRemove({
                      ...theUser,
                      user: db.doc("fl_users/" + userId),
                      complete: !isComplete,
                    }),
                  },
                })
                .then(() => {
                  app.content.update({
                    schemaKey: "lessons",
                    entryId: lesson.id,
                    data: {
                      users: firebase.firestore.FieldValue.arrayUnion({
                        ...theUser,
                        user: db.doc("fl_users/" + userId),
                      }),
                    },
                  });
                });

              dispatch("setUserCompletionPercentage");
            }
          });
        }
      });
      resolve();
    });
  },
};
