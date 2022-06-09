import { app } from "@/db.js";

export default {
  setSections(context) {
    return new Promise((resolve) => {
      const userId = localStorage.getItem("userId");
      app.content
        .get({
          schemaKey: "sections",
          populate: [
            {
              field: "lessonsRef",
              populate: [
                {
                  field: "users",
                  populate: ["user"],
                },
              ],
            },
            {
              field: "courseRef",
            },
          ],
          orderBy: "order",
        })
        .then((sections) => {
          console.log(sections);
          const sectionObjects = Object.values(sections);
          const sectionsArray = [];
          sectionObjects.forEach((section) => {
            let doesBelong = false;
            section.lessonsRef.forEach((lesson) => {
              lesson.users.forEach((user) => {
                if (user.user.id === userId) {
                  // the section belongs to the user
                  doesBelong = true;
                }
              });
            });
            if (doesBelong) {
              sectionsArray.push({ ...section, isVisible: false });
            }
          });
          context.commit("setSections", sectionsArray);
          console.log(sectionsArray)
          resolve(sectionsArray);
        })
        .catch((error) => console.log(error)); // handle any errors
    });
  },
};
