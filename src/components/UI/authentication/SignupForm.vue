<template>
  <the-auth-container>
    <logo></logo>
    <form @submit.prevent="submitNewUser">
      <header class="header">
        <h3>Sign Up</h3>
      </header>
      <div class="field">
        <base-label forInput="firstName" name="First Name"></base-label>
        <base-input
          :class="{ invalid: !firstName.isValid }"
          name="firstName"
          placeholder=""
          id="firstName"
          v-model.trim="firstName.val"
          @blur="clearValidity('firstName')"
        />
        <p v-if="!firstName.isValid" class="error">First Name is required</p>
      </div>
      <div class="field">
        <base-label forInput="lastName" name="Last Name"></base-label>
        <base-input
          :class="{ invalid: !lastName.isValid }"
          name="lastName"
          placeholder=""
          id="lastName"
          v-model.trim="lastName.val"
          @blur="clearValidity('lastName')"
        />
        <p v-if="!lastName.isValid" class="error">Last Name is required</p>
      </div>
      <div class="field">
        <base-label forInput="email" name="Email"></base-label>
        <base-input
          :class="{ invalid: !email.isValid }"
          type="email"
          name="email"
          placeholder=""
          id="email"
          v-model.trim="email.val"
          @blur="clearValidity('email')"
        />
        <p v-if="!email.isValid" class="error">Email is required</p>
      </div>
      <div class="field">
        <base-label forInput="password" name="Password"></base-label>
        <base-input
          :class="{ invalid: !password.isValid }"
          type="password"
          name="password"
          placeholder=""
          id="password"
          v-model.trim="password.val"
          @blur="clearValidity('password')"
        />
        <p v-if="!password.isValid" class="error">Passwords must match</p>
      </div>
      <div class="actions">
        <base-button class="primary">Sign Up</base-button>
      </div>
    </form>
    <section>
      <p>
        Already have an account?
        <base-button link to="/login" class="flat">Login</base-button>
      </p>
    </section>
  </the-auth-container>
</template>

<script>
import TheAuthContainer from "@/components/layouts/TheAuthContainer.vue";

export default {
  components: {
    TheAuthContainer,
  },
  data() {
    return {
      firstName: {
        val: "",
        isValid: true,
      },
      lastName: {
        val: "",
        isValid: true,
      },
      email: {
        val: "",
        isValid: true,
      },
      password: {
        val: "",
        isValid: true,
      },
      isFormValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateNewUser() {
      if (this.firstName.val === "") {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }
      if (this.lastName.val === "") {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }
      if (this.email.val === "") {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (this.password.val.length < 6) {
        this.password.isValid = false;
        this.doPasswordsMatch = false;
        this.formIsValid = false;
      } else {
        this.formIsValid = true;
      }
    },
    submitNewUser() {
      this.validateNewUser();

      if (!this.formIsValid) {
        return;
      }

      // send http request to sign up new user
      this.$store.dispatch("signup", {
        firstName: this.firstName.val,
        lastName: this.lastName.val,
        email: this.email.val,
        password: this.password.val,
      });
    },
  },
};
</script>

<style scoped>
.invalid {
  border: 1px solid red;
}
.error {
  font-size: 12px;
  line-height: 20px;
  color: red;
  font-weight: 600;
  margin: 2px 0 0 0;
}
</style>
