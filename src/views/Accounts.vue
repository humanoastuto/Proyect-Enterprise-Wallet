<template>
  <div class="accounts">
    <h2>ELIJE UNA CUENTA</h2>
    <div class="col-sm-12">
      <div
        class="col-sm-8 nota"
        v-for="(user, index) in usersList"
        :key="index"
      >
        <div>
          <div class="card-block1">
            <div class="card-title1">
              {{ user.accountName }}
            </div>
            <div class="card-subtitle mb-2 text-muted">
              Usuario: {{ user.name }}
            </div>
            <div class="card-subtitle mb-2 text-muted">ID: {{ user.id }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Accounts",
  data() {
    return {
      user: {
        accountName: "",
        name: "",
        id: null
      },
      usersList: []
    };
  },
  methods: {
    addUser: function() {
      let { accountName, name, id } = this.user;
      this.usersList.push({
        accountName,
        name,
        id
      });
      localStorage.setItem("reg-Users", JSON.stringify(this.usersList));
    }
  },
  created: function() {
    let usersDB = JSON.parse(localStorage.getItem("reg-Users"));
    if (usersDB === null) {
      this.usersList = [];
    } else {
      this.usersList = usersDB;
    }
  },
  computed: {}
};
</script>

<style>
.form {
  text-align: left;
}
.card-block1 {
  background: rgb(182, 189, 182);
  text-align: left;
  border: 1px solid #2c3e50;
  border-radius: 4px;
  padding-left: 8px;
  padding-right: 8px;
  margin-left: auto;
  margin-right: auto;
}
.nota {
  padding: 5px;
}
.card-title1 {
  text-align: center;
  padding: 5px;
}
</style>
