<template>
  <main-container>
    <form @submit.prevent="updateInfo">
      <div class="row split">
        <div class="row-container">
          <label for="firstName"
            >First Name<span class="asterisk">*</span></label
          >
          <base-input
            type="text"
            name="firstName"
            id="firstName"
            :value="userFirstName"
            v-model="userFirstName"
          ></base-input>
          <p class="error">First name is required</p>
        </div>
        <div class="row-container">
          <label for="lastName">Last Name<span class="asterisk">*</span></label>
          <base-input
            type="text"
            name="lastName"
            id="lastName"
            :value="userLastName"
            v-model="userLastName"
          ></base-input>
          <p class="error">Last name is required</p>
        </div>
      </div>
      <div class="row split">
        <div class="row-container">
          <label for="phone">Phone (optional)</label>
          <base-input
            type="text"
            name="phone"
            id="phone"
            :value="userPhone"
            v-model="userPhone"
          ></base-input>
        </div>
        <div class="row-container">
          <label for="employeeRole"
            >Employee Role<span class="asterisk">*</span></label
          >
          <select
            id="employeeRole"
            name="EmployeeRole"
            :value="userEmployeeRole"
            v-model="userEmployeeRole"
          >
            <option disabled value="">Select One</option>
            <option value="Management">Management</option>
            <option value="Fitness">Fitness</option>
            <option value="Shake/Smoothie Bar">Shake/Smoothie Bar</option>
            <option value="Other">Other</option>
          </select>
          <p class="error">Employee Role is required</p>
        </div>
      </div>
      <div class="row split">
        <div class="row-container">
          <label for="region">Region</label>
          <select
            id="region"
            name="region"
            :value="userRegion"
            v-model="userRegion"
          >
            <option disabled value="">Select One</option>
            <option value="Northeast">Northeast</option>
            <option value="Northwest">Northwest</option>
            <option value="Southeast">Southeast</option>
            <option value="Southwest">Southwest</option>
            <option value="Midwest">Midwest</option>
            <option value="Canada">Canada</option>
          </select>
          <p class="error">Region is required</p>
        </div>
        <div class="row-container">
          <label for="location">Location<span class="asterisk">*</span></label>
          <base-input
            type="text"
            name="location"
            id="location"
            :value="userLocation"
            v-model="userLocation"
          ></base-input>
          <p class="error">Location is required</p>
        </div>
      </div>
      <div class="actions">
        <base-button class="primary">Update Info</base-button>
      </div>
    </form>
  </main-container>
  <main-container>
    <form @submit.prevent="updateEmail">
      <div class="row">
        <label for="email">Email<span class="asterisk">*</span></label>
        <base-input
          type="email"
          name="email"
          id="email"
          :value="userEmail"
          v-model="userEmail"
        ></base-input>
        <p class="error">Email is required</p>
      </div>
      <div class="actions">
        <base-button class="primary">Update Email</base-button>
      </div>
    </form>
  </main-container>
  <main-container>
    <form @submit.prevent="updatePassword">
      <div class="row">
        <label for="password">Password<span class="asterisk">*</span></label>
        <base-input
          type="password"
          name="password"
          id="password"
          :value="userPassword"
          v-model="userPassword"
        ></base-input>
        <p class="error">Passwords must match</p>
      </div>
      <div class="row">
        <label for="confirmPassword"
          >Confirm Password<span class="asterisk">*</span></label
        >
        <base-input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          :value="userConfirmPassword"
          v-model="userConfirmPassword"
        ></base-input>
        <p class="error">Passwords must match</p>
      </div>
      <div class="actions">
        <base-button class="primary">Update Password</base-button>
      </div>
    </form>
  </main-container>
  <!-- <main-container>
    <user-courses-list></user-courses-list>
  </main-container> -->
</template>

<script>

export default {
  props: [
    "id",
    "firstName",
    "lastName",
    "email",
    "phone",
    "employeeRole",
    "region",
    "location",
  ],
  data() {
    return {
      userId: this.id,
      userFirstName: this.firstName,
      userLastName: this.lastName,
      userEmail: this.email,
      userPhone: this.phone,
      userEmployeeRole: this.employeeRole,
      userRegion: this.region,
      userLocation: this.location,
      userPassord: this.password,
      userConfirmPassword: this.confirmPassword,
      currentUser: {},
    };
  },
  methods: {
    theFirstName() {
      return this.userFirstName;
    },
    updateInfo() {
      return this.$store.dispatch("updateInfo", {
        id: this.userId,
        firstName: this.userFirstName,
        lastName: this.userLastName,
        phone: this.userPhone,
        employeeRole: this.userEmployeeRole,
        region: this.userRegion,
        location: this.userLocation
      });
    },
    updateEmail() {
      return this.$store.dispatch("updateEmail", {
        id: this.userId,
        email: this.userEmail,
      });
    },
    updatePassword() {
      return this.$store.dispatch("updatePassword", {
        id: this.userId,
        password: this.password,
      });
    },
  },
};
</script>

<style scoped>
form {
  width: 100%;
}
label {
  color: #6c6c6c;
  font-size: 12px;
  line-height: 20px;
}
p {
  font-size: 12px;
  font-weight: bold;
  color: red;
}
.row {
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
}
.split {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.row-container {
  position: relative;
  width: 48%;
  align-items: center;
}
.actions {
  display: flex;
}
.error {
  display: none;
}
</style>
