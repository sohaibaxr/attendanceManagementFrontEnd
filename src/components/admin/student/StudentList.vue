<template>
  <div>
    <v-btn @click="dialog = true" class="mt-5" color="success"
      >Add Student
    </v-btn>
    <student-dialogue
      @closeDialog="dialog = false"
      v-if="dialog"
      :dialog="dialog"
    />
    <update-student-dialogue
      v-if="updateDialog"
      :updateDialog="updateDialog"
      @closeUpdateDialog="updateDialog = false"
      :studentName="name"
      :studentEmail="email"
      :id="id"
    />
    <v-spacer />
    <template>
      <v-data-table dark class="mt-5" :headers="headers" :items="Students">
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="(updateDialog = true),updateStudent(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon small class="mr-2" @click="deleteStudentItem(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </template>
  </div>
</template>
<script>
import axios from "axios";
import StudentDialogue from "./StudentDialogue.vue";
import UpdateStudentDialogue from "./UpdateStudentDialogue.vue";
export default {
  components: { StudentDialogue, UpdateStudentDialogue },
  componentName: "StudentList",
  data() {
    return {
      dialog: false,
      updateDialog:false,
      name:"",
      email:"",
      id:"",
      headers: [
        {
          text: "Name",
          value: "name",
        },
        { text: "Action", value: "actions" },
      ],
      Students: [],
    };
  },
  async mounted() {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/users");
      this.Students = response.data.filter((d) => d.role == "student");
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async deleteStudentItem(item) {
      try {
        await axios.delete("http://127.0.0.1:5000/api/users/"+item._id,{
          headers: {
            Authorization: this.$cookie.get("token"),
          },
        });
        this.Students = this.Students.filter((d) => d._id !== item._id);
        this.$toasted.show("Student  Deleted!");
      } catch (error) {
        console.log(error);
      }
    },
    updateStudent(item) {   
      this.name = item.name;
      this.email=item.email;
      this.id=item._id      
    },
  },
};
</script>