<template>
  <v-container class="mt-15">
    <v-card class="mx-auto" width="400" outlined>
      <v-card-title class="justify-center">REGISTER</v-card-title>
      <v-divider />
      <v-card-text>
        <v-form>
          <v-text-field v-model="user.name" outlined label="name" />
          <v-text-field v-model="user.email" outlined label="email" />
          <v-text-field
            v-model="user.password"
            outlined
            type="password"
            label="Password"
          />
          <v-select
            v-model="user.role"
            :items="items"
            label="REGISTER AS"
          ></v-select>
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn  text color="blue" @click="createPost()">REGISTER</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  componentname: "RegisterUser",
  data() {
    return {
      items: ["admin", "teacher", "student"],
      user: {
        name: "",
        email: "",
        password: "",
        role: "",
      },
    };
  },
  methods: {
    async createPost() {
      try {
        let newUser = {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          role: this.user.role,
        };
        const response = await axios.post("http://localhost:5000/api/users/registerUser",newUser)
        if (response.status == 201) {
          this.$router.push("/");
        } else {
          this.$toasted.show(response.data.message );
        }
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>