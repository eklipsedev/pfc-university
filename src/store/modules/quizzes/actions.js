import { db } from "@/db.js";

export default {
  setQuizzes(context) {
    db.collection("quizzes")
      .get()
      .then((querySnapshot) => {
        const quizzes = [];
        querySnapshot.forEach((doc) => {
          let data = { ...doc.data(), id: doc.id };
          quizzes.push(data);
        });
        context.commit("setQuizzes", quizzes);
      });
  },
};