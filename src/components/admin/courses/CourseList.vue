<template>
  <div>
    <v-btn @click="dialog = true" class="mt-5" color="success"
      >Add Course
    </v-btn>
    <course-dialogue v-if="dialog" @closeAddCourseDialog="dialog=false" :dialog="dialog" />
    <update-course-dialogue
      v-if="updateDialog"
      @closeUpdateCourseDialog="updateDialog=false"
      :updateDialog="updateDialog"
      :courseName="name"
      :courseCode="code"
      :id="id"
    />
    <template>
    <v-spacer />
      <v-data-table dark class="mt-5" :headers="headers" :items="Courses">
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="updateDialog = true,updateCourse(item)">
            mdi-pencil
          </v-icon>
          <v-icon small class="mr-2" @click="deleteCourseItem(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </template>
  </div>
</template>
<script>
import axios from "axios";
import CourseDialogue from "./CourseDialogue.vue";
import UpdateCourseDialogue from "./UpdateCourseDialogue.vue";
export default {
  components: { CourseDialogue, UpdateCourseDialogue },
  componentName: "CourseList",
  data() {
    return {
      dialog: false,
      updateDialog: false,
      name:"",
      code:"",
      id:"",
      headers: [
        {
          text: "CourseName",
          value: "name",
        },
        { text: "Action", value: "actions" },
      ],
      Courses: [],
    };
  },
  async mounted() {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/courses");
      this.Courses = response.data
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async deleteCourseItem(item) {
      try {
        await axios.delete("http://127.0.0.1:5000/api/courses/" + item._id, {
          headers: {
            Authorization: this.$cookie.get("token"),
          },
        });
        this.Courses = this.Courses.filter((d) => d._id !== item._id);
        this.$toasted.show("Course successfully deleted!");
      } catch (error) {
        console.log(error);
      }
    },
    async updateCourse(item) {
      this.name = item.name
      this.code = item.code
      this.id=item._id 
    },
  },
};
</script>