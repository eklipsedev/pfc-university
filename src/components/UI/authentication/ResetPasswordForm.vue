<template>
  <the-auth-container>
    <logo></logo>
    <form @submit.prevent="submitForm">
      <header class="header">
        <h3>
          Enter your email and we'll send you a link to reset your password.
        </h3>
      </header>
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
        <form-field-icon image="https://firebasestorage.googleapis.com/v0/b/appjaxx.appspot.com/o/authIcons%2Femail.svg?alt=media&token=b21cb7d6-ef35-42d6-b06a-9fc6a7e8360c" altText="email">
        </form-field-icon>
        <p v-if="!email.isValid" class="error">Email is invalid</p>
      </div>
      <div class="actions">
        <base-button class="primary">Reset Password</base-button>
      </div>
    </form>
  </the-auth-container>
</template>

<script>
import FormFieldIcon from "./FormFieldIcon.vue";
import TheAuthContainer from "@/components/layouts/TheAuthContainer.vue";

export default {
  components: {
    FormFieldIcon,
    TheAuthContainer,
  },
  data() {
    return {
      email: {
        val: "",
        isValid: true,
      },
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateEmail() {
      if (!this.email.val.includes("@")) {
        this.email.isValid = false;
      }
    },
    submitForm() {
      this.validateEmail();

      if (!this.email.isValid) {
        return;
      }

      this.email.isValid = true;

      const formData = {
        email: this.email.val,
      };
      console.log(formData);
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
