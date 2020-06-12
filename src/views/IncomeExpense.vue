<template>
  <div class="incomeexpense" id="app">
    <h3>{{ title }}</h3>

    <div class="add-form" v-if="add_bool">
      <div class="add-form-content">
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
        <button class="btn btn-success" @click="addRegistry">Add</button>
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
        Add Transaction
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
  name: "IncomeExpense",
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
      this.add_bool = false;
      this.cleanText();
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
