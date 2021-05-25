<template>
  <div>
    <header-default :title="title" />
    <v-tabs>
      <v-tab>
        <v-icon left> mdi-account </v-icon>
        Teachers
      </v-tab>
      <v-tab>
        <v-icon left> mdi-account </v-icon>
        Courses
      </v-tab>
      <v-tab>
        <v-icon left> mdi-account </v-icon>
        Students
      </v-tab>
      <v-tab-item>
        <teacher-list />
      </v-tab-item>
      <v-tab-item>
        <course-list />
      </v-tab-item>
      <v-tab-item>
        <student-list />
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
import TeacherList from "../components/admin/teachers/TeacherList";
import HeaderDefault from "../components/shared/Header";
import CourseList from "../components/admin/courses/CourseList.vue";
import StudentList from "../components/admin/student/StudentList.vue";
export default {
  components: {
    TeacherList,
    HeaderDefault,
    CourseList,
    StudentList,
  },
  data(){
    return{
      title:"ADMIN PORTAL"
    }
  }
};
</script>