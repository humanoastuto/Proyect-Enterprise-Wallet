<template>
  <div class="transfer" id="app">
    <h3>{{ title }}</h3>
    <div class="form">
      <div id="myDIV">
        <label>Transfer from: </label>
        <select
          class="browser-default custom-select"
          v-model="registry.transferSource"
        >
          <option v-for="(account, index) in accounts" :key="index">
            {{ account.name }}
          </option>
        </select>
        <label>Transfer to: </label>
        <select
          class="browser-default custom-select"
          v-model="registry.transferDestination"
        >
          <option v-for="(account, index) in accounts" :key="index">
            {{ account.name }}
          </option>
        </select>
        <label>Amount</label>
        <input class="form-control" v-model="registry.transferAmount" />
        <button
          class="btn btn-primary btn-primary-left"
          @click="transferRegistry()"
        >
          Transfer
        </button>
        <button class="btn btn-primary" @click="cleanText">Clean</button>
      </div>
      <label></label>
      <br />
      <label>Total Amount: {{ totalAmount }}</label>
    </div>
    <div class="col-sm-12">
      <div
        class="col-sm-8 nota"
        v-for="(registry, index) in registrys"
        :key="index"
      >
        <div
          :class="[
            registry.type_search === 'Income' ? 'card-income' : 'card-expense'
          ]"
          @click="prevUpdate(index)"
        >
          <div class="card-block">
            <div class="card-title">
              {{ registry.name }}
            </div>
            <div class="card-subtitle mb-2 text-muted">
              {{ registry.type_search }}
            </div>
            <div class="card-subtitle mb-2 text-muted">
              {{ registry.category }}
            </div>
            <p class="card-text">
              {{ registry.amount }}
            </p>
          </div>
          <button class="btn btn-primary" @click="updateRegistry(index)">
            Update
          </button>
          <button class="close" @click="delRegistry(index)">&times;</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Transfer",
  data() {
    return {
      title: "Registry of transaction",
      total: 0,
      typelist: [
        {
          name: "Income"
        },
        {
          name: "Expense"
        }
      ],
      registry: {
        name: "",
        category: "",
        amount: "",
        type_search: "Income",
        transferSource: "",
        transferDestination: "",
        transferAmount: ""
      },
      account: {
        accountName: "",
        name: "",
        id: ""
      },
      registrys: [],
      accounts: []
    };
  },
  methods: {
    delRegistry: function(index) {
      this.registrys.splice(index, 1);
      localStorage.setItem("reg-local", JSON.stringify(this.registrys));
    },
    updateRegistry: function(index) {
      this.registrys[index].name = this.registry.name;
      this.registrys[index].category = this.registry.category;
      this.registrys[index].type_search = this.registry.type_search;
      this.registrys[index].amount = this.registry.amount;
      localStorage.setItem("reg-local", JSON.stringify(this.registrys));
    },
    prevUpdate: function(index) {
      this.registry.name = this.registrys[index].name;
      this.registry.category = this.registrys[index].category;
      this.registry.type_search = this.registrys[index].type_search;
      this.registry.amount = this.registrys[index].amount;
    },
    transfershow: function() {
      var x = document.getElementById("myDIV");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    },
    transferRegistry: function() {
      if (
        this.registry.transferSource === "" ||
        this.registry.transferDestination === "" ||
        this.registry.transferAmount === ""
      ) {
        alert("You must complete all the fields");
      } else {
        let name = this.registry.transferSource;
        let category = "Transfer";
        let amount = this.registry.transferAmount;
        let type_search = "Expense";
        this.registrys.push({
          name,
          category,
          amount,
          type_search
        });
        name = this.registry.transferDestination;
        category = "Transfer";
        amount = this.registry.transferAmount;
        type_search = "Income";
        this.registrys.push({
          name,
          category,
          amount,
          type_search
        });
      }
    },

    cleanText: function() {
      this.registry.transferSource = "";
      this.registry.transferDestination = "";
      this.registry.transferAmount = "";
    }
  },

  created: function() {
    const registrysDB = JSON.parse(localStorage.getItem("reg-local"));
    const accountsDB = JSON.parse(localStorage.getItem("reg-Users"));
    if (registrysDB === null) {
      this.registrys = [];
    } else {
      this.registrys = registrysDB;
    }
    if (accountsDB === null) {
      this.accounts = [];
    } else {
      this.accounts = accountsDB;
    }
  },
  computed: {
    totalAmount() {
      let tamount = 0;
      this.registrys.forEach(function(registry) {
        registry.type_search === "Income"
          ? (tamount += parseInt(registry.amount))
          : (tamount -= parseInt(registry.amount));
      });
      return tamount;
    },
    ...mapGetters(["getCategoryList"]),
    categories: function() {
      return this.getCategoryList;
    }
  }
};
</script>

<style>
.form {
  text-align: left;
}
.card-income {
  background: lightgreen;
  text-align: left;
  border: 1px solid #2c3e50;
  border-radius: 4px;
  padding-left: 8px;
  padding-right: 8px;
}
.card-expense {
  background: lightcoral;
  text-align: left;
  border: 1px solid #2c3e50;
  border-radius: 4px;
  padding-left: 8px;
  padding-right: 8px;
}
.nota {
  padding: 5px;
}
.btn-primary-left {
  margin-right: 20px;
}
</style>
