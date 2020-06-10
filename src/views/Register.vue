<template>
  <div class="register">
    <h1>REGISTRAR NUEVA CUENTA</h1>
    <div class="form-group">
      <label>Account Name:</label>
      <input class="form-control" v-model="user.accountName" />
    </div>
    <div class="form-group">
      <label>User Name:</label>
      <input class="form-control" type="text" v-model="user.name" />
    </div>
    <div class="form-group">
      <label>User ID:</label>
      <input class="form-control" type="text" v-model="user.id" />
    </div>
    <button class="btn btn-primary" @click="addUser">Register</button>
    <!--Accounts :listData: List /-->
  </div>
</template>

<script>
export default {
  name: "Register",

  data() {
    return {
      user: {
        accountName: "",
        name: "",
        id: null
      },
      List: []
    };
  },
  /*components: {
    Accounts
  },*/

  methods: {
    addUser: function() {
      let { accountName, name, id } = this.user;
      this.List.push({
        accountName,
        name,
        id
      });
      localStorage.setItem("reg-Users", JSON.stringify(this.List));
    }
  },

  created: function() {},
  computed: {}
};
</script>

<style></style>
