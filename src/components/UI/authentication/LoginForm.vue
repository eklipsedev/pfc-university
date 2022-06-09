<template>
  <the-auth-container>
    <logo></logo>
    <form @submit.prevent="submitForm">
      <header class="header">
        <h3>Sign in</h3>
        <router-link to="/reset-password" class="forgot-password"
          >Forgot Password?</router-link
        >
      </header>
      <div class="field">
        <base-label forInput="email" name="Email"></base-label>
        <base-input
          :class="{ invalid: !email.isValid }"
          type="email"
          name="email"
          placeholder=""
          id="email"
          v-model="email.val"
          @blur="clearValidity('email')"
        />
        <form-field-icon
          image="https://firebasestorage.googleapis.com/v0/b/appjaxx.appspot.com/o/authIcons%2Femail.svg?alt=media&token=b21cb7d6-ef35-42d6-b06a-9fc6a7e8360c"
          class="icon"
          altText="email"
        >
        </form-field-icon>
        <p v-if="!email.isValid" class="error">Email is invalid</p>
      </div>
      <div class="field">
        <base-label forInput="password" name="Password"></base-label>
        <base-input
          :class="{ invalid: !password.isValid }"
          type="password"
          name="password"
          placeholder=""
          id="password"
          v-model="password.val"
          @blur="clearValidity('password')"
        />
        <form-field-icon
          image="https://firebasestorage.googleapis.com/v0/b/appjaxx.appspot.com/o/authIcons%2Fpassword.svg?alt=media&token=1bf4a83a-c8b5-49d8-a3ff-9f07cca29b13"
          class="icon"
          altText="password"
        >
        </form-field-icon>
        <p v-if="!password.isValid" class="error">Password is invalid</p>
      </div>
      <div class="actions">
        <base-button v-if="!isAuthLoading" class="primary">Sign In</base-button>
        <base-button v-if="isAuthLoading" class="primary"
          >Signing in...<base-spinner size="0.2"></base-spinner
        ></base-button>
      </div>
    </form>
    <p v-if="!isFormValid" class="error">
      Oops! Please check your email and password.
    </p>
    <section>
      <p>
        Need an account? Contact Sales or
        <base-button link to="/signup" class="flat">Sign Up</base-button>
      </p>
    </section>
  </the-auth-container>
</template>

<script>
import FormFieldIcon from "./FormFieldIcon.vue";
import TheAuthContainer from "@/components/layouts/TheAuthContainer.vue";
import BaseSpinner from "@/components/UI/BaseSpinner.vue";

export default {
  components: {
    FormFieldIcon,
    TheAuthContainer,
    BaseSpinner,
  },
  data() {
    return {
      signingIn: false,
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
  computed: {
    isAuthLoading() {
      return this.$store.getters.isAuthLoading;
    },
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateCreds() {
      if (!this.email.val.includes("@")) {
        this.email.isValid = false;
        this.isFormValid = false;
      }
      if (this.password.val.length < 6) {
        this.password.isValid = false;
        this.isFormValid = false;
      } else {
        this.isFormValid = true;
      }
    },
    submitForm() {
      this.validateCreds();

      if (!this.isFormValid) {
        return;
      }

      // send http request to login user
      this.$store.dispatch("login", {
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
