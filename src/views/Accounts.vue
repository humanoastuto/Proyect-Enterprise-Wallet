<template>
  <div class="accounts">
    <h2>List of active accounts</h2>

    <div class="add-form" v-if="add_bool">
      <div class="add-form-content">
        <h2>Create new account</h2>
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
        <button
          class="btn btn-danger"
          @click="
            add_bool = false;
            cleanText();
          "
          style="margin-left: 20px;"
        >
          Cancel
        </button>
      </div>
    </div>

    <div class="add-form" v-if="upd_bool">
      <div class="add-form-content">
        <div class="form-group">
          <label>New Account Name:</label>
          <input class="form-control" v-model="user.accountName" />
        </div>
        <button class="btn btn-success" @click="updateUser(index_upd)">
          Update
        </button>
        <button
          class="btn btn-danger"
          style="margin-left: 20px;"
          @click="
            upd_bool = false;
            cleanText();
          "
        >
          Cancel
        </button>
      </div>
    </div>

    <div class="Form">
      <button class="btn btn-success prueba" @click="add_bool = true">
        Register
      </button>
      <br />
      <div class="col-xs-12">
        <div
          class="col-xs-8 nota"
          v-for="(user, index) in usersList"
          :key="index"
        >
          <div class="card-sytle" @click="prevUpdate(index)">
            <div>
              <div class="card-title1 blanco">
                {{ user.accountName }}
              </div>
              <div class="card-subtitle mb-2 blanco">
                Usuario: {{ user.name }}
              </div>
              <div class="card-subtitle mb-2 blanco">ID: {{ user.id }}</div>
            </div>
            <button class="close" @click="deleteUser(index)">&times;</button>
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
      add_bool: false,
      upd_bool: false,
      user_exists: false,
      isTaken: false,
      user: {
        accountName: "",
        name: "",
        id: null
      },
      registry: {
        name: "",
        category: "",
        amount: "",
        type_search: "Income"
      },
      usersList: [],
      registrysList: []
    };
  },
  methods: {
    addUser: function() {
      if (
        this.user.accountName === "" ||
        this.user.name === "" ||
        this.user.id === ""
      ) {
        alert("You must complete all the fields");
      } else {
        if (!isNaN(parseInt(this.user.id))) {
          for (let i = 0; i < this.usersList.length; i++) {
            if (
              this.usersList[i].accountName === this.user.accountName ||
              this.usersList[i].name === this.user.name ||
              this.usersList[i].id === this.user.id
            ) {
              this.isTaken = true;
              console.log(this.usersList[i].accountName);
              console.log(this.user.accountName);
              console.log(this.isTaken);
            }
          }
        } else {
          alert("ID field only accepts numbers");
        }
      }

      if (this.isTaken === true) {
        alert("That Account Name is already taken");
      } else {
        const { accountName, name, id } = this.user;
        this.usersList.push({
          accountName,
          name,
          id
        });
        localStorage.setItem("reg-Users", JSON.stringify(this.usersList));
      }
      this.isTaken = false;
    },
    deleteUser: function(index) {
      for (let i = 0; i < this.registrysList.length; i++) {
        if (this.registrysList[i].name === this.usersList[index].name) {
          this.user_exists = true;
        }
      }
      if (this.user_exists === true) {
        alert("You can't delte this user");
        this.user_exists = false;
      } else {
        this.usersList.splice(index, 1);
        localStorage.setItem("reg-Users", JSON.stringify(this.usersList));
      }
    },
    updateUser: function(index) {
      for (let i = 0; i < this.usersList.length; i++) {
        if (this.usersList[i].accountName === this.user.accountName) {
          this.isTaken = true;
        }
      }

      if (this.isTaken === true) {
        alert("That Account Name is already taken");
        this.isTaken = false;
      } else {
        this.usersList[index].accountName = this.user.accountName;
        localStorage.setItem("reg-Users", JSON.stringify(this.usersList));
        this.upd_bool = false;
        this.cleanText();
      }
    },
    prevUpdate: function(index) {
      this.upd_bool = true;
      this.index_upd = index;
    },
    cleanText: function() {
      this.user.accountName = "";
      this.user.name = "";
      this.user.id = null;
    }
  },
  created: function() {
    let usersDB = JSON.parse(localStorage.getItem("reg-Users"));
    let registrysDB = JSON.parse(localStorage.getItem("reg-local"));
    if (registrysDB === null) {
      this.registrys = [];
    } else {
      this.registrysList = registrysDB;
    }
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
  margin: 30px;
}
.card-sytle {
  background: #01875a;
  text-align: left;
  border: 1px solid #2c3e50;
  border-radius: 4px;
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 25px;
}
.nota {
  padding: 5px;
}
.card-title1 {
  text-align: center;
  padding: 5px;
}
.add-form {
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.add-form-content {
  height: 380px;
  width: 500px;
  background: white;
  padding: 20px;
  border-radius: 5px;
  position: relative;
}
.blanco {
  color: white;
}
</style>
