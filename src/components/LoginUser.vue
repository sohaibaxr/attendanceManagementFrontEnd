<template>
  <v-container class="mt-15">
    <v-card   class="mx-auto" width="400" outlined>
      <v-card-title   class="justify-center">LOG IN</v-card-title>
      <v-divider />
      <v-card-text >
        <v-form >
          <v-text-field v-model="user.email" outlined label="email" />
          <v-text-field 
            v-model="user.password"
            outlined
            type="Password"
            label="password"
          />
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn  text color="blue" @click="login()">SIGN IN</v-btn>
        <v-spacer></v-spacer>
        <v-btn text color ="red" @click="register()"> SIGN UP </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  ComponentName: "LoginUser",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      try {
        let newUser = {
          email: this.user.email,
          password: this.user.password,
        };
        const response = await axios
          .post("http://localhost:5000/api/users/loginUser", newUser)
          .then((response) => {
            if (response.data.token ) { this.$cookie.set("token", response.data.token)}
            if (response.data && response.data._id){this.$cookie.set("loggedInUserId", response.data._id)};
            if (response.data.role == "teacher") {this.$router.push("/home/teacher")}
            if (response.data.role == "student") {this.$router.push("/home/student")}
            if (response.data.role == "admin") {this.$router.push("/home/admin")}
            else{
              this.$toasted.show("Invalid Credentials")
            }
          });
      } catch (err) {
        console.error(err);
        this.$router.push("/");

      }
    },
    register() {
      this.$router.push("/register");
    },
  },
};
</script>