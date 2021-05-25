<template>
  <div class="text-center my-10">
    <v-dialog persistent v-model="dialog" width="400">
      <v-card>
        <v-card-title class="headline green lighten-2">
          Add Student
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-10">
          <v-text-field
            outlined
            label=" Name"
            v-model="student.name"
          ></v-text-field>
          <v-divider></v-divider>
          <v-text-field
            outlined
            label=" Email"
            v-model="student.email"
          ></v-text-field>
          <v-divider></v-divider>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="close()">
            Cancel
          </v-btn>
          <v-btn @click.native="addStudent()" color="blue darken-1" text>
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "StudentDialogue",
  data() {
    return {
      student: {
        name: "",
        email: "",
        role: "student",
        password: "grayphite1234",
      },
    };
  },
  props: ["dialog"],
  methods: {
    close() {
      this.$emit("closeDialog");
    },
    async addStudent() {
      try {
        let newStudent = {
          name: this.student.name,
          email: this.student.email,
          role: this.student.role,
          password: this.student.password,
        };
        const resp = await axios.post("http://127.0.0.1:5000/api/users/registerUser",newStudent)
        if (resp.status == 201) {
          this.$toasted.show("Student  Added!");
        } else {
          this.$toasted.show("Student Already Registered!");
        }
      } catch (error) {
        console.log(error);
      }
      this.$emit("closeDialog")
    },
  },
};
</script>