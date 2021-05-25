<template>
  <div>
    <template>
      <v-data-table
        :headers="headers"
        :items="Students"
        :items-per-page="5"
        class="mt-5"
        dark
      >
        <template #item.isPresent="{ item }">
          <v-checkbox
            @change="markAttendance(item.id, item.isPresent)"
            v-model="item.isPresent"
          >
          </v-checkbox>
        </template>
      </v-data-table>
    </template>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "StudentDetail",
  data() {
    return {
      headers: [
        {
          text: "StudentName",
          value: "name",
        },
        {
          text: "Status",
          value: "isPresent",
        },
      ],
      Students: [],
    };
  },
  props: ["itemId"],
  watch: {
    itemId: async function (val, oldVal) {
      if (val) {
        await this.fetchData();
      }
    },
  },
  methods: {
    async fetchData() {
      var response = await axios.get(
        "http://127.0.0.1:5000/api/users/attendance/" + this.itemId);
      this.Students = response.data;
    },
    async markAttendance(uid, status) {
      console.log("what")
      try {
        let newAttendance = {
          student: uid,
          course: this.itemId,
          date: new Date(),
          isPresent: status,
        }
        var response = await axios.post("http://127.0.0.1:5000/api/attendance",newAttendance)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
  },
};
</script>