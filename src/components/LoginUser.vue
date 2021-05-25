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
        let requestedUser = {
          email: this.user.email,
          password: this.user.password,
        };
        const response = await axios.post("http://localhost:5000/api/users/loginUser", requestedUser)
            if (response.data .token &&response.data._id && response.data.role) {
              this.$cookie.set("token",response.data.token)
              this.$cookie.set("loggedInUserId",response.data._id)
              this.$cookie.set("loggedInUserRole",response.data.role)
              if(response.data.role==="admin"){this.$router.push("home/admin")}
              if(response.data.role==="teacher"){this.$router.push("home/teacher")}
              if(response.data.role==="student"){this.$router.push("home/student")}
            }
            else{
              this.$toasted.show(response.data.message)
            }   
      } catch (err) {
        console.error(err)
      }
    },
    register() {
      this.$router.push("/register")
    }
  }
}
</script>