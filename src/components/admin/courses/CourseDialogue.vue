<template>
  <div class="text-center my-10">
    <v-dialog persistent v-model="dialog" width="450">
      <v-card>
        <v-card-title class="headline red lighten-2">
          Add Course 
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-10">
          <v-text-field
            outlined
            label=" CourseName"
            v-model="course.name"                    
          ></v-text-field>
          <v-divider></v-divider>
          <v-text-field
            outlined
            label=" CourseCode"
            v-model="course.code"  
          ></v-text-field>
          <v-divider></v-divider>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click.native="close()"> Cancel </v-btn>
          <v-btn @click.native="addCourse()" color="blue darken-1" text> OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
    name:"CourseDialogue",
      data() {
    return {
      course: {
      name: "",
      code: "",
      },
    };
  },
    props:["dialog"],
    methods:{
        close(){
          this.$emit("closeAddCourseDialog")
        },
         async addCourse() {
    try {
      let newCourse = {
        name: this.course.name,
        code: this.course.code,
      };
      const resp = await axios.post(
        "http://127.0.0.1:5000/api/courses",
        newCourse
      );
      if (resp.status == 201) {
        this.$toasted.show("Course successfully added!");
      } else {
        this.$toasted.show("Course already registered!");
      }
    } catch (error) {
      console.log(error);
    }
    this.$emit("closeAddCourseDialog")
  },
  }

    
} 
</script>