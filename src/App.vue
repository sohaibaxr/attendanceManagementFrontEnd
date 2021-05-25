<template>
  <div id="App">
    <v-app>
      <router-view />
    </v-app>
  </div>
</template>
<script>
import RegisterUser from "./components/RegisterUser";
import LoginUser from "./components/LoginUser";

export default {
  name: "App",

  components: {
    RegisterUser,
    LoginUser,
    
  },

  data: () => ({}),
};
</script>
