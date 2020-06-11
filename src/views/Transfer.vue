<template>
  <div class="transfer" id="app">
    <h3>{{ title }}</h3>
    <div class="form">
      <button class="btn btn-primary" @click="transfershow">Transfer</button>
      <div id="myDIV">
        <label>Transfer from: </label>
        <select
          class="browser-default custom-select"
          v-model="registry.transferSource"
        >
          <option v-for="(registry, index) in registrys" :key="index">
            {{ registry.name }}
          </option>
        </select>
        <label>Transfer to: </label>
        <select
          class="browser-default custom-select"
          v-model="registry.transferDestination"
        >
          <option v-for="(registry, index) in registrys" :key="index">
            {{ registry.name }}
          </option>
        </select>
        <label>Amount</label>
        <input class="form-control" v-model="registry.transferAmount" />
        <button
          class="btn btn-primary"
          @click="
            transferRegistrySource();
            transferRegistryDestination();
          "
        >
          Transfer
        </button>
      </div>
      <div class="form-group">
        <label>Name</label>
        <input class="form-control" type="text" v-model="registry.name" />
      </div>
      <label>Type</label>
      <select
        class="browser-default custom-select"
        v-model="registry.type_search"
      >
        <option v-for="(type, index) in typelist" :key="index">
          {{ type.name }}
        </option>
      </select>
      <div>
        <label>Category</label>
        <select
          class="browser-default custom-select"
          v-model="registry.category"
          v-if="registry.type_search === 'Income'"
        >
          <option v-for="(category, index) in categories.income" :key="index">
            {{ category.name }}
          </option>
        </select>
        <select
          class="browser-default custom-select"
          v-model="registry.category"
          v-if="registry.type_search === 'Expense'"
        >
          <option v-for="(category, index) in categories.expense" :key="index">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>Amount</label>
        <input class="form-control" v-model="registry.amount" />
      </div>
      <button class="btn btn-primary" @click="addRegistry">Add</button>
      <button class="btn btn-primary" @click="cleanText">Clean</button>
      <br />
      <label>Total: {{ totalAmount }}</label>
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
        type_search: "Income"
      },
      registrys: []
    };
  },
  methods: {
    addRegistry: function() {
      let { name, category, amount, type_search } = this.registry;
      this.registrys.push({
        name,
        category,
        amount,
        type_search
      });
      localStorage.setItem("reg-local", JSON.stringify(this.registrys));
    },
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
    transferRegistrySource: function() {
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
    },
    transferRegistryDestination: function() {
      let name = this.registry.transferDestination;
      let category = "Transfer";
      let amount = this.registry.transferAmount;
      let type_search = "Income";

      this.registrys.push({
        name,
        category,
        amount,
        type_search
      });
    },
    cleanText: function() {
      this.registry.name = "";
      this.registry.category = "";
      this.registry.type_search = "Income";
      this.registry.amount = "";
    }
  },

  created: function() {
    let registrysDB = JSON.parse(localStorage.getItem("reg-local"));
    if (registrysDB === null) {
      this.registrys = [];
    } else {
      this.registrys = registrysDB;
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
</style>
