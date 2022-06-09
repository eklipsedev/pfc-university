import { db, app, auth } from "@/db.js";
import router from "@/router.js";

let timer;

export default {
  async login(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "login",
    });
  },
  async signup(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "signup",
    });
  },
  async auth(context, payload) {
    console.log("signing in...");
    context.commit("setIsAuthLoading", true);
    const mode = payload.mode;
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDyz-J-_Oq67KRs4qBSyaWRHDLA6Xv0XZg";

    if (mode === "signup") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDyz-J-_Oq67KRs4qBSyaWRHDLA6Xv0XZg";
    }
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();

    const time = new Date().getTime();
    const date = new Date(time);
    const formattedDate = date.toLocaleDateString();

    console.log(responseData);

    auth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .catch((error) => {
        console.log(error);
      });

    auth.onAuthStateChanged((user) => {
      if (user) {
        app.users
          .get({ uid: user.uid })
          .then(() => {
            app.content
              .get({
                schemaKey: "profile",
                populate: [
                  {
                    field: "courses",
                    populate: [
                      {
                        field: "sectionsRef",
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
                        ],
                      },
                      {
                        field: "thumbnail",
                      },
                    ],
                  },
                  {
                    field: "user",
                    populate: ["user"],
                  },
                ],
              })
              .then((filterProfile) => {
                Object.values(filterProfile).forEach((profile) => {
                  if (profile.user.id === user.uid) {
                    user.getIdTokenResult().then((idTokenResult) => {
                      context.commit("setUser", {
                        token: idTokenResult.token,
                        userId: user.uid,
                        firstName: profile.user.firstName,
                        lastName: profile.user.lastName,
                        userRole: profile.user.permissions,
                        currentUser: profile,
                      });
                      localStorage.setItem(
                        "currentUser",
                        JSON.stringify(profile)
                      );
                      localStorage.setItem("firstName", profile.user.firstName);
                      localStorage.setItem("lastName", profile.user.lastName);
                      localStorage.setItem("email", profile.user.email);
                      localStorage.setItem("token", idTokenResult.token);
                      localStorage.setItem("userId", user.uid);
                    });
                  }
                });
              })
              .then(() => {
                const currentUser = localStorage.getItem("userId");
                app.users.get({ uid: currentUser }).then((user) => {
                  app.storage
                    .getURL({ fileId: user.avatar[0] })
                    .then((avatar) => {
                      console.log(avatar);
                      context.commit("setAvatar", avatar);
                      localStorage.setItem("avatar", avatar);
                    });
                });
                context.dispatch("setUserCourses");
                context.dispatch("setSections");
                context.dispatch("setUserLessons");
              })
              .then(() => {
                console.log("signed in!");
                router.replace("/");
                context.commit("setIsAuthLoading", false);
              })
              .catch((error) => {
                context.commit("setIsAuthLoading", false);
                console.error(
                  "Something went wrong retrieving posts for the given category",
                  error
                );
              });
          })
          .catch((error) =>
            console.error(
              "Something went wrong retrieving the category ref",
              error
            )
          );
      } else {
        console.log("user status is unknown :(");
      }
    });

    if (mode === "signup") {
      // create an instance of the newly authenticated user in Firestore with matching ID
      db.collection("users")
        .doc(responseData.localId)
        .set({
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          createdDate: formattedDate,
        })
        .then(() => {
          console.log("Document successfully written!");
          context.commit("setUser", {
            userId: responseData.localId,
            firstName: payload.firstName,
            lastName: payload.lastName,
          });
          console.log(payload.firstName);
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }

    const expiresIn = +responseData.expiresIn * 10000000000000000000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem("tokenExpiration", expirationDate);

    timer = setTimeout(function() {
      context.dispatch("autoLogout");
    }, expiresIn);
  },
  tryLogin(context) {
    console.log("TryLogin running...");
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    const userRole = localStorage.getItem("userRole");
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(function() {
      context.dispatch("autoLogout");
    }, expiresIn);

    if (token && userId) {
      context.commit("setUser", {
        token: token,
        userId: userId,
        userRole: userRole,
        firstName: firstName,
        lastName: lastName,
      });
    }
  },
  logout(context) {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("userRole");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("email");

    clearTimeout(timer);

    context.commit("setUser", {
      currentUser: [],
      token: null,
      userId: null,
      userRole: null,
      firstName: null,
      lastName: null,
      email: null,
    });
  },
  autoLogout(context) {
    context.dispatch("logout");
    context.commit("setAutoLogout");
  },
};
