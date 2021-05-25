<template>
  <div class="text-center my-10">
    <v-dialog persistent v-model="updateDialog" width="400">
      <v-card>
        <v-card-title class="headline red lighten-2">
          Update Student
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-10">
          <v-text-field outlined label=" Name" v-model="name"></v-text-field>
          <v-divider></v-divider>
          <v-text-field outlined label=" Email" v-model="email"></v-text-field>
          <v-divider></v-divider>
          <v-select
            multiple
            class="mt-6"
            label="courses"
            :items="Courses"
            item-text="name"
            item-value="_id"
            v-model="courseIds"
            outlined
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="close()"> Cancel </v-btn>
          <v-btn @click="UpdateStudent()" color="blue darken-1"> OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "UpdateStudentDialogue",
  data() {
    return {
      Courses: [],
      name: "",
      email: "",
      courseIds: [],
    };
  },
  props: ["updateDialog", "studentName", "studentEmail", "id"],
  async mounted() {
    if (this.id) {
      (this.email = this.studentEmail), (this.name = this.studentName);
    }
    const response = await axios.get("http://127.0.0.1:5000/api/courses");
    this.Courses = response.data;
  },
  methods: {
    close() {
      this.$emit("closeUpdateDialog");
    },
    async UpdateStudent() {
      try {
        let updatedStudent = {
          name: this.name,
          email: this.email,
          courses: this.courseIds,
        };
        await axios.put("http://127.0.0.1:5000/api/users/" + this.id,updatedStudent);
        this.$toasted.show("Student successfully updated!");
      } catch (error) {
        console.log(error);
      }
      this.$emit("closeUpdateDialog");
    },
  },
};
</script>