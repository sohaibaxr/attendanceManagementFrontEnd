<template>
  <div class="text-center my-10">
    <v-dialog persistent v-model="updateDialog" width="400">
      <v-card>
        <v-card-title class="headline red lighten-2">
          Update Course
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-10">
          <v-text-field outlined label=" Name" v-model="name"></v-text-field>
          <v-divider></v-divider>
          <v-text-field outlined label=" Code" v-model="code"></v-text-field>
          <v-divider></v-divider>
          <v-select
            multiple
            class="mt-6"
            label="Students"
            :items="Students"
            item-text="name"
            item-value="_id"
            v-model="studentIds"
            outlined
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click.native="close()">
            Cancel 
          </v-btn>
          <v-btn @click.native="updateCourse()" color="blue darken-1" text>
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "UpdateCourseDialogue",
  data() {
    return {
      Students: [],
      name: "",
      code: "",
      studentIds: [],
    };
  },
  props: ["updateDialog", "courseName", "courseCode", "id"],
  async mounted() {
    (this.name = this.courseName), (this.code = this.courseCode)
    const response = await axios.get("http://127.0.0.1:5000/api/users")
    this.Students = response.data.filter((d) => d.role == "student")
  },
  methods: {
    close() {
      this.$emit("closeUpdateCourseDialog")
    },
    async updateCourse() {
      try {
        let updatedCourse = {
          name: this.name,
          code: this.code,
          students: this.studentIds,
        };
        await axios.put( "http://127.0.0.1:5000/api/courses/" + this.id,updatedCourse
        );
      } catch (error) {
        console.log(error)
      }
      this.$emit("closeUpdateCourseDialog")
    },
  },
};
</script>