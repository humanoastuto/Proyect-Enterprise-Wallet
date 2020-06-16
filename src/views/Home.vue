<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/icon-bank.png" style="margin-top: 20px;"/>
    <HelloWorld msg="Welcome to Your Wallet App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>
