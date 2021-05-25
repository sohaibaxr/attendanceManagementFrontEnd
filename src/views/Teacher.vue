<template>
  <div>
    <header-default :titleb="titleb" />
    <v-divider></v-divider>
    <select-course :receive="receive" />
    <v-divider></v-divider>
    <student-details class="mt-10" :itemId="itemId" />
  </div>
</template>
<script>
import HeaderDefault from "../components/shared/Header";
import SelectCourse from "../components/teacher/SelectCourse.vue";
import StudentDetails from "../components/teacher/StudentDetails.vue";
export default {
  components: {
    HeaderDefault,
    StudentDetails,
    SelectCourse,
  },
  data() {
    return {
      titleb: "TEACHER PORTAL",
      itemId: "",
    };
  },
  methods: {
    receive(selectedItemId) {
      this.itemId = selectedItemId;
    },
  },
};
</script>