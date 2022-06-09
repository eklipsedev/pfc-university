// Firebase Setup
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");

const flamelink = require("flamelink");

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://appjaxx.firebaseio.com",
});

const app = flamelink({
  firebaseApp,
  dbType: "cf",
});

const db = firebaseApp.firestore();

class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.type = "UnauthenticatedError";
  }
}

/* class NotAnAdminError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.type = "NotAnAdminError";
  }
} */

class InvalidRoleError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.type = "InvalidRoleError";
  }
}

function roleIsValid(userRole) {
  const validRoles = ["Super-Admin", "Admin", "Non-Admin"]; //To be adapted with your own list of roles
  return validRoles.includes(userRole);
}

exports.createUser = functions.https.onCall(async (data, context) => {
  try {
    //Checking that the user calling the Cloud Function is authenticated
    if (!context.auth) {
      throw new UnauthenticatedError(
        "The user is not authenticated. Only authenticated Admin users can create new users."
      );
    }

    /* //Checking that the user calling the Cloud Function is an Admin user
    const callerUid = context.auth.uid; //uid of the user calling the Cloud Function
    const callerUserRecord = await admin.auth().getUser(callerUid);
    if (
      !callerUserRecord.customClaims["Admin"] ||
      !callerUserRecord.customClaims["Super-Admin"]
    ) {
      throw new NotAnAdminError(
        "Only Super-Admin & Admin users can create new users."
      );
    } */

    //Checking that the new user role is valid
    const userRole = data.userRole;
    if (!roleIsValid(userRole)) {
      throw new InvalidRoleError(`The ${userRole} role is not a valid role`);
    }

    //set createdDate timestamp
    const time = new Date().getTime();
    const date = new Date(time);
    const formattedDate = date.toLocaleDateString();

    const newUser = {
      email: data.email,
      displayName: data.firstName + " " + data.lastName,
      password: "Sportsstar13!",
      emailVerified: false,
      disabled: false,
      createdOn: formattedDate,
    };

    const userRecord = await admin.auth().createUser(newUser);

    const userId = userRecord.uid;

    const claims = {};
    claims[userRole] = true;
    claims["PFC"] = true;

    await admin.auth().setCustomUserClaims(userId, claims);

    await app.users.addToDB({
      uid: userId,
      data: {
        displayName: data.firstName + " " + data.lastName,
        password: "Sportsstar13!",
        email: data.email,
        enabled: "Yes",
        firstName: data.firstName,
        lastName: data.lastName,
        permissions: data.userRole,
      },
    });

    const coursesArray = [];
    const userRef = db.doc("/fl_users/" + userId);

    data.courses.forEach((course) => {
      const courseRef = db.doc("/fl_content/" + course);
      coursesArray.push(courseRef);
    });

    await app.content.add({
      schemaKey: "profile",
      data: {
        location: data.location,
        region: data.region,
        employeeRole: data.employeeRole,
        courses: coursesArray,
        user: userRef,
      },
    });

    const profile = await app.content.get({
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
      filters: [["user.id", "==", userId]],
    });

    profile.courses.forEach((course) => {
      course.sectionsRef.forEach((section) => {
        section.lessonsRef.forEach((lesson) => {
          lesson.users.push({
            complete: false,
            user: userRef,
          });
        });
      });
    });

    return { result: "The new user has been successfully created." };
  } catch (error) {
    if (error.type === "UnauthenticatedError") {
      throw new functions.https.HttpsError("unauthenticated", error.message);
    } else if (
      error.type === "NotAnAdminError" ||
      error.type === "InvalidRoleError"
    ) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        error.message
      );
    } else {
      throw new functions.https.HttpsError("internal", error.message);
    }
  }
});
