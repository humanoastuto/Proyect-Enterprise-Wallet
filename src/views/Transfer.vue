<template>
  <div class="transfer" id="app">
    <h3>{{ title }}</h3>

    <div class="add-form" v-if="add_bool">
      <div class="add-form-content">
        <div class="form-group">
          <label>Transfer form:</label>
          <select
            class="browser-default custom-select"
            v-model="registry.transferSource"
          >
            <option v-for="(account, index) in dropdownListSource" :key="index">
              {{ account.name }}
            </option>
          </select>
        </div>
        <label>Transfer to:</label>
        <select
          class="browser-default custom-select"
          v-model="registry.transferDestination"
        >
          <option
            v-for="(account, index) in dropdownListDestination"
            :key="index"
          >
            {{ account.name }}
          </option>
        </select>
        <div class="form-group">
          <label>Amount</label>
          <input class="form-control" v-model="registry.transferAmount" />
        </div>
        <button class="btn btn-success" @click="transferRegistry()">
          Confirm
        </button>
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
          <label>Name</label>
          <select class="browser-default custom-select" v-model="registry.name">
            <option v-for="(account, index) in accounts" :key="index">
              {{ account.name }}
            </option>
          </select>
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
            <option
              v-for="(category, index) in categories.expense"
              :key="index"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>Amount</label>
          <input class="form-control" v-model="registry.amount" />
        </div>
        <button class="btn btn-success" @click="updateRegistry(index_upd)">
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

    <div class="form">
      <button class="btn btn-success" @click="add_bool = true">
        Make Transfer
      </button>
      <br />
      <label>Total Amount: {{ totalAmount }}</label>
      <div class="col-xs-12">
        <div
          class="col-xs-8 nota"
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
              <button class="close" @click="delRegistry(index)">&times;</button>
              <div class="card-title">
                {{ registry.name }}
              </div>
              <div class="card-subtitle mb-2 text-muted">
                {{ registry.type_search }}
              </div>
              <div class="card-subtitle mb-2 text-muted">
                {{ registry.category }}
              </div>
              <div class="card-subtitle mb-2 text-muted">
                {{ registry.fecha }}
              </div>
              <p class="card-text">
                {{ registry.amount }}
              </p>
            </div>
          </div>
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
      add_bool: false,
      upd_bool: false,
      index_upd: 0,
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
      this.upd_bool = false;
      this.cleanText();
    },
    prevUpdate: function(index) {
      try {
        this.registry.name = this.registrys[index].name;
        this.registry.category = this.registrys[index].category;
        this.registry.type_search = this.registrys[index].type_search;
        this.registry.amount = this.registrys[index].amount;
      } catch (error) {
        console.log("Undefined variable as it's non existent");
      }

      this.upd_bool = true;
      this.index_upd = index;
    },
    transferRegistry: function() {
      if (
        this.registry.transferSource === "" ||
        this.registry.transferDestination === "" ||
        this.registry.transferAmount === ""
      ) {
        alert("You must complete all the fields");
      } else if (this.registry.transferAmount > this.total) {
        alert("Transfer amount exceeds total");
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
      this.add_bool = false;
      this.cleanText();
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
    },
    dropdownListDestination() {
      return this.accounts.filter(
        item => item.name !== this.registry.transferSource
      );
    },
    dropdownListSource() {
      return this.accounts.filter(
        item => item.name !== this.registry.transferDestination
      );
    }
  }
};
</script>

<style>
.form {
  text-align: left;
  margin: 30px;
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
</style>
