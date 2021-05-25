<template>
  <div>
    <v-btn @click="dialog = true" class="mt-5" color="success"
      >Add Teacher
    </v-btn>
    <teacher-dialogue v-if="dialog" @closeTeacherAddDialog="dialog = false" :dialog="dialog" />
    <update-teacher-dialogue
      v-if="UpdateDialog"
      @closeUpdateDialog="UpdateDialog=false"
      :UpdateDialog="UpdateDialog"
      :selectedName="name"
      :selectedEmail="email"
      :id="id"
    />
    <v-spacer />
    <template>
      <v-data-table dark class="mt-5" :headers="headers" :items="Teachers">
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="(UpdateDialog = true), updateTeacher(item)">mdi-pencil</v-icon>
          <v-icon small class="mr-2" @click="deleteTeacherItem(item)"> mdi-delete</v-icon>
        </template>
      </v-data-table>
    </template>
  </div>
</template>
<script>
import axios from "axios";
import TeacherDialogue from "./TeacherDialogue.vue";
import UpdateTeacherDialogue from "./UpdateTeacherDialogue.vue";
export default {
  components: { TeacherDialogue, UpdateTeacherDialogue },
  componentName: "TeacherList",
  data() {
    return {
      dialog: false,
      UpdateDialog: false,
      name: "",
      email: "",
      id: "",
      headers: [
        {
          text: "Teacher",
          value: "name",
        },
        { text: "Action", value: "actions" },
      ],
      Teachers: [],
    };
  },
  async mounted() {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/users");
      const filteredData1 = response.data.filter((d) => d.role == "teacher");
      this.Teachers = filteredData1;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async deleteTeacherItem(item) {
      try {
        await axios.delete("http://127.0.0.1:5000/api/users/" + item._id, {headers: {
            Authorization: this.$cookie.get("token"),
          },
        });
        this.Teachers = this.Teachers.filter((d) => d._id !== item._id);
        this.$toasted.show("Teacher successfully Deleted!");
      } catch (error) {
        console.log(error);
      }
    },
    updateTeacher(item) {
      this.name = item.name;
      this.email = item.email;
      this.id = item._id;
    },
  },
};
</script>