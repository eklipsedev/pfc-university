import { db, app, functions } from "@/db.js";

export default {
  //set all users
  setUsers(context) {
    return new Promise((resolve) => {
      app.content
        .get({
          schemaKey: "profile",
          populate: [
            {
              field: "courses",
              populate: ["thumbnail"],
            },
            {
              field: "user",
              populate: ["avatar", "permissions", "thumbnail"],
            },
          ],
          structure: "nested",
        })
        .then((users) => {
          const userObjects = Object.values(users);
          const usersArray = [];
          userObjects.forEach((user) => {
            app.storage
              .getURL({
                fileId: user.user.avatar[0],
              })
              .then((avatar) => {
                usersArray.push({
                  ...user,
                  avatarUrl: avatar,
                });
              });
          });
          context.commit("setUsers", usersArray);
          resolve(usersArray);
        })
        .catch((error) => console.log(error)); // handle any errors
    });
  },

  addUser(context, payload) {
    const createUser = functions.httpsCallable("createUser");

    const user = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      location: payload.location,
      region: payload.region,
      employeeRole: payload.employeeRole,
      userRole: payload.userRole,
      courses: payload.courses,
    };

    console.log(payload.email);

    createUser(user)
      .then((resp) => {
        //Display success
        console.log(resp);
        context.commit("addUser", user);
      })
      .catch(function(error) {
        console.log("something deff went wrong.");
        console.log(error.code);
        console.log(error.message);
      });
  },

  //update the users basic info
  updateInfo(context, payload) {
    app.users
      .updateInDB({
        uid: payload.id,
        data: {
          displayName: payload.firstName + " " + payload.lastName,
          firstName: payload.firstName,
          lastName: payload.lastName,
        },
      })
      .then(() => {
        app.content
          .update({
            schemaKey: "profile",
            entryId: payload.id,
            data: {
              phone: payload.phone,
              employeeRole: payload.employeeRole,
              region: payload.region,
              location: payload.location,
            },
          })
          .then(() => {
            context.commit("updateInfo", payload);
            console.log("Updating the user entry succeeded");
          });
      });
  },

  //update the users email address
  updateEmail(context, payload) {
    const userRef = db.collection("users").doc(payload.id);
    return userRef
      .update({
        id: payload.id,
        email: payload.email,
      })
      .then(() => {
        context.commit("updateEmail", payload);
        console.log(`Successfully updated ${payload.id} email`);
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  },
};
