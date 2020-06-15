<template>
  <div class="incomeexpense" id="app">
    <h3>{{ title }}</h3>

    <div class="add-form" v-if="add_bool">
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
            <option
              v-for="(category, index) in category_list.income"
              :key="index"
            >
              {{ category.name }}
            </option>
          </select>
          <select
            class="browser-default custom-select"
            v-model="registry.category"
            v-if="registry.type_search === 'Expense'"
          >
            <option
              v-for="(category, index) in category_list.expense"
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
            <option
              v-for="(category, index) in category_list.income"
              :key="index"
            >
              {{ category.name }}
            </option>
          </select>
          <select
            class="browser-default custom-select"
            v-model="registry.category"
            v-if="registry.type_search === 'Expense'"
          >
            <option
              v-for="(category, index) in category_list.expense"
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
      <label>Total Amount: {{ totalAmount }} $ </label>
      <br />
      <span>
        Sort by (First to appear in the Report, already sorted by date):
      </span>
      <div class="flex">
        <select v-model="selectedOption">
          <option> None </option>
          <option> Income </option>
          <option> Expense </option>
        </select>
        <select
          v-model="selectedOptionCategory"
          :disabled="selectedOption === 'None'"
          v-if="selectedOption === 'Income'"
        >
          <option
            v-for="(category, index) in category_list.income"
            :key="index"
          >
            {{ category.name }}
          </option>
        </select>
        <select
          v-model="selectedOptionCategory"
          :disabled="selectedOption === 'None'"
          v-else
        >
          <option
            v-for="(category, index) in category_list.expense"
            :key="index"
          >
            {{ category.name }}
          </option>
        </select>
        <select v-model="selectedOptionReport">
          <option value="All"> All </option>
          <option value="Daily"> Daily </option>
          <option value="Weekly"> Weekly </option>
          <option value="Monthly"> Monthly </option>
          <option value="Yearly"> Yearly </option>
        </select>
        <span> Since </span>
        <input
          v-model="rangestart"
          :disabled="selectedOptionReport === 'All'"
          placeholder="Indique la fecha de Inicio"
        />
      </div>
      <span v-if="selectedOptionReport !== 'All'">
        Can't Delete while Report Daily, Weekly, Monthly, Yearly
      </span>
      <br />
      <div class="col-xs-12" v-if="selectedOptionReport !== 'All'">
        <div
          class="col-xs-8 nota"
          v-for="(registry, index) in reportedregistrys"
          :key="index"
        >
          <div
            :class="[
              registry.type_search === 'Income' ? 'card-income' : 'card-expense'
            ]"
            @click="prevUpdate(index)"
          >
            <div class="card-block">
              <button
                v-if="selectedOptionReport === 'All'"
                class="close"
                @click="delRegistry(index)"
              >
                &times;
              </button>
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
      <div class="col-xs-12" v-else>
        <div
          class="col-xs-8 nota"
          v-for="(registry, index) in sortededregistrys"
          :key="index"
        >
          <div
            :class="[
              registry.type_search === 'Income' ? 'card-income' : 'card-expense'
            ]"
            @click="prevUpdate(index)"
          >
            <div class="card-block">
              <button class="close" @click="delRegistry(index)">
                &times;
              </button>
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
export default {
  name: "IncomeExpense",
  data() {
    return {
      title: "Registry of transaction",
      total: 0,
      selectedOption: "None",
      selectedOptionCategory: "All",
      selectedOptionReport: "All",
      add_bool: false,
      upd_bool: false,
      index_upd: 0,
      rangestart: new Date(Date.now()).toLocaleDateString(),
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
        fecha: ""
      },
      account: {
        accountName: "",
        name: "",
        id: ""
      },
      registrys: [],
      accounts: [],
      category_list: {
        income: [{ name: "Transfer" }, { name: "Other" }],
        expense: [{ name: "Transfer" }, { name: "Other" }]
      }
    };
  },
  methods: {
    addRegistry: function() {
      let { name, category, amount, type_search } = this.registry;
      if (
        this.registry.name === "" ||
        this.registry.category === "" ||
        this.registry.amount === "" ||
        this.registry.type_search === ""
      ) {
        alert("You must complete all the fields");
      } else {
        if (
          !isNaN(parseInt(this.registry.amount)) &&
          parseInt(this.registry.amount) > 0
        ) {
          this.registrys.push({
            name,
            category,
            amount,
            type_search,
            fecha: new Date(Date.now()).toLocaleDateString()
            //fecha: new Date(Date.now()).toString()
          });
          localStorage.setItem("reg-local", JSON.stringify(this.registrys));
          this.add_bool = false;
          this.cleanText();
        } else {
          alert("Amount only allow number value");
        }
      }
    },
    delRegistry: function(index) {
      this.sortededregistrys.splice(index, 1);
      localStorage.setItem("reg-local", JSON.stringify(this.sortededregistrys));
      this.registrys = this.sortededregistrys;
      this.upd_bool = false;
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
    let accountsDB = JSON.parse(localStorage.getItem("reg-Users"));
    let categoriesDB = JSON.parse(localStorage.getItem("reg-local-category"));

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
    if (categoriesDB === null) {
      categoriesDB = this.category_list;
    } else {
      this.category_list = categoriesDB;
    }
  },
  computed: {
    rangeend() {
      let fechasplit = this.rangestart.split("/");
      let rangeend;
      if (this.selectedOptionReport == "All") {
        rangeend = new Date(+fechasplit[2], fechasplit[1] - 1, +fechasplit[0]);
      } else if (this.selectedOptionReport == "Daily") {
        rangeend = new Date(
          +fechasplit[2],
          fechasplit[1] - 1,
          +fechasplit[0] + 1
        );
      } else if (this.selectedOptionReport == "Weekly") {
        rangeend = new Date(
          +fechasplit[2],
          fechasplit[1] - 1,
          +fechasplit[0] + 7
        );
      } else if (this.selectedOptionReport == "Monthly") {
        rangeend = new Date(+fechasplit[2], fechasplit[1], +fechasplit[0]);
      } else if (this.selectedOptionReport == "Yearly") {
        rangeend = new Date(
          +fechasplit[2] + 1,
          fechasplit[1] - 1,
          +fechasplit[0]
        );
      }
      return rangeend.toLocaleDateString();
    },
    reportedregistrys() {
      let fechastartsplit = this.rangestart.split("/");
      let fechaendsplit = this.rangeend.split("/");
      let fechastart = new Date(
        +fechastartsplit[2],
        fechastartsplit[1] - 1,
        +fechastartsplit[0]
      );
      let fechaend = new Date(
        +fechaendsplit[2],
        fechaendsplit[1] - 1,
        +fechaendsplit[0]
      );
      let rangedregistrys = [];
      this.sortededregistrys.forEach(element => {
        let fechasplit = element.fecha.split("/");
        let fechain = new Date(
          +fechasplit[2],
          fechasplit[1] - 1,
          +fechasplit[0]
        );
        if (
          fechain.getTime() <= fechaend.getTime() &&
          fechain.getTime() >= fechastart.getTime()
        ) {
          rangedregistrys.push(element);
        }
      });
      return rangedregistrys;
    },
    sortededregistrys() {
      let sortedregistrys =
        this.selectedOption === "None" ? this.registrys : [];
      sortedregistrys.sort(comp);
      let sortedregistrysparttwo = [];
      if (this.selectedOption === "Income") {
        this.registrys.forEach(element => {
          if (element.type_search === "Income") {
            sortedregistrys.push(element);
          }
        });
        this.registrys.forEach(element => {
          if (element.type_search === "Expense") {
            sortedregistrysparttwo.push(element);
          }
        });
      } else if (this.selectedOption === "Expense") {
        this.registrys.forEach(element => {
          if (element.type_search === "Expense") {
            sortedregistrys.push(element);
          }
        });
        this.registrys.forEach(element => {
          if (element.type_search === "Income") {
            sortedregistrysparttwo.push(element);
          }
        });
      }
      function comp(a, b) {
        return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
      }
      sortedregistrys.sort(comp);
      sortedregistrysparttwo.sort(comp);
      let cat1 = [];
      let cat2 = [];
      if (
        this.selectedOption === "Income" ||
        this.selectedOption === "Expense"
      ) {
        cat1 = sortedregistrys.filter(
          item => item.category === this.selectedOptionCategory
        );
        cat2 = sortedregistrys.filter(
          item => item.category !== this.selectedOptionCategory
        );
        sortedregistrys = cat1.concat(cat2);
      }
      return sortedregistrys.concat(sortedregistrysparttwo);
    },
    totalAmount() {
      let tamount = 0;
      if (this.selectedOptionReport === "All") {
        this.registrys.forEach(function(registry) {
          registry.type_search === "Income"
            ? (tamount += parseInt(registry.amount))
            : (tamount -= parseInt(registry.amount));
        });
      } else {
        this.reportedregistrys.forEach(function(registry) {
          registry.type_search === "Income"
            ? (tamount += parseInt(registry.amount))
            : (tamount -= parseInt(registry.amount));
        });
      }
      return tamount;
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
