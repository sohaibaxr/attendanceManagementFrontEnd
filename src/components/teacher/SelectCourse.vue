<template>
  <div class="mt-10">
    <v-card>
      <v-select 
        :items="Courses"
        label="Choose Courses"
        item-text="name"
        item-value="_id"
        v-model="selectedItemId"
        outlined
        @change="receive(selectedItemId)"
      ></v-select>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "SelectCourse",
  props: ['receive'],
  data() {
    return {
      selectedItemId: "none",
      Courses: [],
    };
  },
  async mounted() {
    const response = await axios.get("http://127.0.0.1:5000/api/courses");
    this.Courses = response.data;
  },
};
</script>