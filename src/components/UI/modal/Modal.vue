<template>
  <div class="modal" v-if="open" :class="{ open: open }">
    <div class="modal-closer" @click="$emit('close')"></div>
    <transition name="modal">
      <div class="modal-body">
        <div class="tab-content">
          <div class="tab-pane">
            <form @submit.prevent="submitNewUser" class="form">
              <div class="row space-between">
                <div class="field">
                  <base-label
                    forInput="firstName"
                    name="First Name"
                  ></base-label>
                  <base-input
                    :class="{ invalid: !newUser.firstName.isValid }"
                    name="firstName"
                    id="firstName"
                    v-model="newUser.firstName.val"
                    @blur="clearValidity('firstName')"
                  ></base-input>
                  <p v-if="!newUser.firstName.isValid" class="error">
                    First name is required
                  </p>
                </div>
                <div class="field">
                  <base-label forInput="lastName" name="Last Name"></base-label>
                  <base-input
                    :class="{ invalid: !newUser.lastName.isValid }"
                    name="lastName"
                    id="lastName"
                    v-model="newUser.lastName.val"
                    @blur="clearValidity('lastName')"
                  ></base-input>
                  <p v-if="!newUser.lastName.isValid" class="error">
                    Last name is required
                  </p>
                </div>
              </div>
              <div class="row">
                <base-label forInput="email" name="Email"></base-label>
                <base-input
                  :class="{ invalid: !newUser.email.isValid }"
                  type="email"
                  name="email"
                  id="email"
                  v-model="newUser.email.val"
                  @blur="clearValidity('email')"
                ></base-input>
                <p v-if="!newUser.email.isValid" class="error">
                  Email is required
                </p>
              </div>
              <div class="row space-between">
                <div class="field">
                  <base-label forInput="location" name="Location"></base-label>
                  <base-input
                    name="location"
                    id="location"
                    v-model="newUser.location.val"
                  ></base-input>
                </div>
                <div class="field">
                  <base-label forInput="region" name="Region"></base-label>
                  <select
                    id="region"
                    name="region"
                    v-model="newUser.region.val"
                  >
                    <option disabled value="">Select One</option>
                    <option value="Northeast">Northeast</option>
                    <option value="Northwest">Northwest</option
                    ><option value="Southeast">Southeast</option>
                    <option value="Southwest">Southwest</option>
                    <option value="Midwest">Midwest</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
              </div>
              <div class="row space-between">
                <div class="field">
                  <base-label forInput="employeeRole" name="Employee Role"
                    >Employee Role</base-label
                  >
                  <select
                    :class="{ invalid: !newUser.employeeRole.isValid }"
                    id="employeeRole"
                    name="EmployeeRole"
                    v-model="newUser.employeeRole.val"
                    @blur="clearValidity('employeeRole')"
                  >
                    <option disabled value="">Select One</option>
                    <option value="Management">Management</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Shake/Smoothie Bar"
                      >Shake/Smoothie Bar</option
                    >
                    <option value="Other">Other</option>
                  </select>
                  <p v-if="!newUser.employeeRole.isValid" class="error">
                    Employee Role is required
                  </p>
                </div>
                <div class="field">
                  <base-label
                    forInput="userRole"
                    name="User Role?"
                  ></base-label>
                  <select
                    :class="{ invalid: !newUser.userRole.isValid }"
                    id="userRole"
                    name="userRole"
                    v-model="newUser.userRole.val"
                    @blur="clearValidity('userRole')"
                  >
                    <option disabled value="">Select One</option>
                    <option value="Super-Admin">Super-Admin</option>
                    <option value="Admin">Admin</option>

                    <option value="Non-Admin">Non-Admin</option>
                  </select>
                  <p v-if="!newUser.userRole.isValid" class="error">
                    User Role is required
                  </p>
                </div>
              </div>
              <div class="row">
                <div
                  v-for="course in getCourses"
                  :key="course.id"
                  class="checkbox-row"
                >
                  <input
                    type="checkbox"
                    :id="'user_' + course.id"
                    :value="course.id"
                    v-model="newUser.courses"
                  />
                  <label :for="'user_' + course.id">{{ course.name }}</label>
                </div>
              </div>
              <base-button class="primary">Create New User</base-button>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["open"],
  emits: ["close"],
  data() {
    return {
      newUser: {
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
        location: {
          val: "",
          isValid: true,
        },
        region: {
          val: "",
          isValid: true,
        },
        employeeRole: {
          val: "",
          isValid: true,
        },
        userRole: {
          val: "",
          isValid: true,
        },
        courses: [],
        formIsValid: true,
      },
    };
  },
  computed: {
    getCourses() {
      return this.$store.getters.courses;
    },
  },
  methods: {
    clearValidity(input) {
      this.newUser[input].isValid = true;
    },
    validateNewUser() {
      if (this.newUser.firstName.val === "") {
        this.newUser.firstName.isValid = false;
        this.formIsValid = false;
      }
      if (this.newUser.lastName.val === "") {
        this.newUser.lastName.isValid = false;
        this.formIsValid = false;
      }
      if (this.newUser.email.val === "") {
        this.newUser.email.isValid = false;
        this.formIsValid = false;
      }
      if (this.newUser.location.val === "") {
        this.newUser.location.isValid = false;
        this.formIsValid = false;
      }
      if (this.newUser.region.val === "") {
        this.newUser.region.isValid = false;
        this.formIsValid = false;
      }
      if (this.newUser.employeeRole.val === "Select One") {
        this.newUser.employeeRole.isValid = false;
        this.formIsValid = false;
      }
      if (this.newUser.userRole.val === "Select One") {
        this.newUser.userRole.isValid = false;
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

      const newUserData = {
        firstName: this.newUser.firstName.val,
        lastName: this.newUser.lastName.val,
        email: this.newUser.email.val,
        location: this.newUser.location.val,
        region: this.newUser.region.val,
        employeeRole: this.newUser.employeeRole.val,
        userRole: this.newUser.userRole.val,
        courses: this.newUser.courses,
      };
      console.log(newUserData);
      this.$store.dispatch("addUser", newUserData);
    },
  },
};
</script>

<style scoped>
.checkbox-row {
  display: flex;
  margin-bottom: 10px;
}
.invalid {
  border: 1px solid red;
}
.error {
  color: red;
  font-size: 10px;
  font-weight: 600;
  margin: 2px 0 0 0;
}
.modal {
  position: fixed;
  left: 0%;
  top: 0%;
  right: 0%;
  bottom: 0%;
  z-index: 10000;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
}
.open {
  display: flex;
}
.modal-closer {
  position: absolute;
  left: 0%;
  top: 0%;
  right: 0%;
  bottom: 0%;
}
.modal-body {
  position: relative;
  z-index: 2;
  display: flex;
  overflow: hidden;
  width: 630px;
  min-height: 60%;
  max-height: 90%;
  flex-direction: column;
  border-radius: 10px;
  background-color: #fff;
}
.tabs {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.tab-menu {
  position: relative;
  display: flex;
  align-items: center;
  padding: 30px;
  background-color: #f48221;
}
.tab {
  position: relative;
  display: inline-block;
  vertical-align: top;
  text-decoration: none;
  padding: 15px 30px;
  text-align: left;
  cursor: pointer;
  margin-right: 20px;
  border-radius: 5px;
  background-color: #fdae6b;
  color: #fff;
}
.tab.current {
  background-color: #fff;
  color: #f48221;
}
.tab-content {
  position: relative;
  display: block;
  overflow: hidden;
  flex: 1;
}
.tab-pane {
  position: relative;
  display: block;
  height: 100%;
  padding: 30px;
}
.form {
  display: flex;
  margin-bottom: 20px;
  flex-direction: column;
  align-items: stretch;
}
.row {
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
}
.row.space-between {
  display: flex;
  justify-content: space-between;
}
.field {
  position: relative;
  width: 48%;
  align-items: center;
}
label {
  display: block;
  margin-bottom: 2px;
  position: relative;
  color: #7d7d7d;
  font-size: 12px;
  line-height: 20px;
}
.overflow {
  overflow-y: auto;
  max-height: 400px;
  scroll-margin-left: 20px;
}

input[type="checkbox"] {
  width: auto;
  height: auto;
  margin-right: 10px;
}
.divider {
  height: 1px;
  margin-top: 30px;
  margin-bottom: 30px;
  background-color: hsla(0, 0%, 42.4%, 0.08);
}

.modal-enter-active {
  animation: modal 300ms ease;
}

@keyframes modal {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
