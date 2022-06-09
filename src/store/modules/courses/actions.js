import { db, app } from "@/db.js";
import firebase from "firebase/app";

export default {
  //set all courses
  setCourses(context) {
    return new Promise((resolve) => {
      //get the courses
      app.content
        .get({
          schemaKey: "courses",
          populate: [
            "thumbnail",
            {
              field: "sectionsRef",
              populate: [
                "lessonsRef",
                {
                  field: "lessonsRef",
                  populate: [
                    "users",
                    {
                      field: "users",
                      populate: ["user"],
                    },
                  ],
                },
              ],
            },
            {
              field: "users",
              populate: ["user", "mostRecentlyCompleted"],
            },
          ],
          orderBy: {
            field: "order",
            order: "asc",
          },
          structure: "nested",
        })
        .then((courses) => {
          const courseObjects = Object.values(courses);
          const coursesArray = [];
          // loop through all of the courses
          courseObjects.forEach((course) => {
            coursesArray.push(course);
          });
          console.log(coursesArray);
          context.commit("setCourses", coursesArray);
          resolve(coursesArray);
        })
        .catch((error) => console.log(error)); // handle any errors
    });
  },
  //set user lessons
  setUserCourses(context) {
    return new Promise((resolve) => {
      const userId = localStorage.getItem("userId");
      //get the courses
      app.content
        .get({
          schemaKey: "courses",
          populate: [
            "thumbnail",
            {
              field: "sectionsRef",
              populate: [
                "lessonsRef",
                {
                  field: "lessonsRef",
                  populate: [
                    "users",
                    {
                      field: "users",
                      populate: ["user"],
                    },
                  ],
                },
              ],
            },
            {
              field: "users",
              populate: ["user", "mostRecentlyCompleted"],
            },
          ],
          orderBy: {
            field: "order",
            order: "asc",
          },
          structure: "nested",
        })
        .then((courses) => {
          const courseObjects = Object.values(courses);
          const coursesArray = [];
          // loop through all of the courses
          courseObjects.forEach((course) => {
            // loop through the users for a given course
            course.users.forEach((user) => {
              // if the user.user.id === userId
              if (user.user.id === userId) {
                coursesArray.push(course);
              }
            });
          });
          console.log(coursesArray);
          context.commit("setUserCourses", coursesArray);
          resolve(coursesArray);
        })
        .catch((error) => console.log(error)); // handle any errors
    });
  },
  setMostRecentlyCompleted({ commit, getters }) {
    // get the current user
    return new Promise((resolve) => {
      const userId = localStorage.getItem("userId");

      // trigger the setUserCourses action
      const courses = getters.getUserCourses;
      // create an empty lessons array to store the filtered & sorted lessons
      const lessonsArray = [];
      // loop through all of the courses
      courses.forEach((course) => {
        let lessons = [];
        course.sectionsRef.forEach((section) => {
          section.lessonsRef.forEach((lesson) => {
            lesson.users.forEach((user) => {
              if (user.user.id === userId) {
                lessons.push({
                  user: user,
                  lessonId: lesson.id,
                  sectionOrder: section.order,
                  lessonOrder: lesson.order,
                });
              }
            });
          });
        });

        console.log(lessons);
        lessonsArray.push(lessons);
      });
      commit("setMostRecentlyCompleted", lessonsArray);
      lessonsArray.forEach((theCourse) => {
        const firstIncomplete = theCourse.find((lesson) => {
          return lesson.user.complete === false;
        });
        console.log(firstIncomplete);
      });
      console.log(lessonsArray);
      resolve(lessonsArray);
    });
  },

  setUserCompletionPercentage({ getters }) {
    console.log("setUserCompletionPercentage called");
    const userId = localStorage.getItem("userId");
    // get all of the course a user belongs to
    const courses = getters.getUserCourses;
    // store the number of lessons for user in a variable
    let theUser;
    const mostRecentlyCompletedArray = [];

    courses.forEach((course) => {
      let oldPercentage;
      let lessonCount = 0;
      let completedCount = 0;
      let mostRecentlyCompleted;

      course.users.forEach((user) => {
        if (user.user.id === userId) {
          oldPercentage = Math.round(user.completed);
          mostRecentlyCompleted = user.mostRecentlyCompleted.id;
          mostRecentlyCompletedArray.push(mostRecentlyCompleted);
          theUser = user;
        }
      });

      // for each course, loop through the sections
      course.sectionsRef.forEach((section) => {
        // for each section, loop through the number of lessons
        section.lessonsRef.forEach((lesson) => {
          lessonCount++;
          // for each lesson, loop through the number of users
          lesson.users.forEach((user) => {
            // check that the user.user.id === userId & user.completed
            if (user.user.id === userId && user.complete) {
              // if the check passes, add 1 to the counter
              completedCount++;
            }
          });
        });
      });
      // once done, divide the counter amount by number of lessons available
      const percentageComplete = Math.round(
        (completedCount / lessonCount) * 100
      );

      if (percentageComplete !== oldPercentage) {
        app.content
          .update({
            schemaKey: "courses",
            entryId: course.id,
            data: {
              users: firebase.firestore.FieldValue.arrayRemove({
                ...theUser,
                user: db.doc("fl_users/" + userId),
                mostRecentlyCompleted: db.doc(
                  "fl_content/" + mostRecentlyCompleted
                ),
                completed: oldPercentage,
              }),
            },
          })
          .then(() => {
            app.content.update({
              schemaKey: "courses",
              entryId: course.id,
              data: {
                users: firebase.firestore.FieldValue.arrayUnion({
                  ...theUser,
                  user: db.doc("fl_users/" + userId),
                  mostRecentlyCompleted: db.doc(
                    "fl_content/" + mostRecentlyCompleted
                  ),
                  completed: percentageComplete,
                }),
              },
            });
          });
      }
    });
    /* console.log(mostRecentlyCompletedArray);
    commit("setMostRecentlyCompleted", mostRecentlyCompletedArray); */
  },
};
