<template>
  <div>
    <header-default :titlec="titlec" />
    <select-courses />
  </div>
</template>
<script>
import HeaderDefault from "../components/shared/Header";
import SelectCourses from "../components/student/SelectCourses";

export default {
  components: {
    HeaderDefault,
    SelectCourses,
  },
  data() {
    return {
      titlec: "STUDENT PORTAL",
    };
  },
};
</script>