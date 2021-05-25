<template>
  <div class="text-center my-10">
    <v-dialog persistent v-model="dialog" width="400">
      <v-card>
        <v-card-title class="headline blue lighten-2">
          Add Teacher 
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-10">
          <v-text-field
            outlined
            label=" Name"
            v-model="teacher.name"                    
          ></v-text-field>
          <v-divider></v-divider>
          <v-text-field
            outlined
            label=" Email"
            v-model="teacher.email"  
          ></v-text-field>
          <v-divider></v-divider>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click.native="close()"> Cancel </v-btn>
          <v-btn @click.native="addTeacher()" color="blue darken-1" text> OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
    name:"TeacherDialogue",
      data() {
    return {
      teacher: {
      name: "",
      email: "",
      role: "teacher",
      password: "grayphite123",
      },
    };
  },
    props:{
        dialog:{
          default:false
        }
    },
    methods:{
        close(){
          this.$emit("closeTeacherAddDialog")
        },
         async addTeacher() {
    try {
      let newTeacher = {
        name: this.teacher.name,
        email: this.teacher.email,
        role: this.teacher.role,
        password: this.teacher.password,
      };
      const resp = await axios.post(
        "http://127.0.0.1:5000/api/users/registerUser",
        newTeacher
      );
      if (resp.status == 201) {
        this.$toasted.show("Teacher successfully added!");
      } else {
        this.$toasted.show("Email already registered!");
      }
    } catch (error) {
      console.log(error);
    }
    this.$emit("closeTeacherAddDialog")
  },
  }    
} 
</script>