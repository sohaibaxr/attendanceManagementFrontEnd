<template>
  <div>
    <!-- <v-select
      label="Choose Students"
      outlined
      class="mt-5"
      :items="Students"
      item-text="name"
    ></v-select> -->
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
      attended: false,
      items: ["present", "absent"],
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
        "http://127.0.0.1:5000/api/users/" + this.itemId);
      this.Students = response.data;
    },
    async markAttendance(uid, status) {
      try {
        let newAttendance = {
          student: uid,
          course: this.itemId,
          date: new Date(),
          isPresent: status,
        };
        var response = await axios.post("http://127.0.0.1:5000/api/attendance",newAttendance
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>