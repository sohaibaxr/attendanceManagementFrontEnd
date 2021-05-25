<template>
  <div>
    <v-toolbar plain color="primary" dark>
      <v-toolbar-title>{{title}}  </v-toolbar-title>
      <v-toolbar-title>{{titleb}}</v-toolbar-title>
      <v-toolbar-title>{{titlec}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn outlined @click="logOut()"> LOG OUT</v-btn>
    </v-toolbar>
  </div>
</template>
<script>
export default {
  name: "HeaderDefault",
  data() {
    return {};
  },
  props:["title","titleb","titlec"],
  methods:{
    logOut(){
      this.$cookie.delete("token");
      this.$router.push("/");
    }
  }
};
</script>