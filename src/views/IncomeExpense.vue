<template>
  <div class="incomeexpense" id="app">
    <h3>{{ title }}</h3>
    <!--
      add transaction form view
    -->
    <div class="add-form" v-if="add_bool">
      <div class="add-form-content">
        <div class="form-group">
          <label>Name</label>
          <select class="browser-default custom-select" v-model="registry.name">
            <option v-for="(account, index) in accounts" :key="index">
              {{ account.accountName }}
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
    <!--
      tranfer form view
    -->
    <div class="add-form" v-if="transfer_bool">
      <div class="add-form-content">
        <div class="form-group">
          <label>Transfer form:</label>
          <select
            class="browser-default custom-select"
            v-model="registry.transferSource"
          >
            <option v-for="(account, index) in dropdownListSource" :key="index">
              {{ account.accountName }}
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
            {{ account.accountName }}
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
            transfer_bool = false;
            cleanTextTransfer();
          "
          style="margin-left: 20px;"
        >
          Cancel
        </button>
      </div>
    </div>
    <!--
      update transaction form view
    -->
    <div class="add-form" v-if="upd_bool">
      <div class="add-form-content">
        <div class="form-group">
          <label>Name</label>
          <select class="browser-default custom-select" v-model="registry.name">
            <option v-for="(account, index) in accounts" :key="index">
              {{ account.accountName }}
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
    <!--
      Main View of Income Expense
    -->
    <div class="form">
      <button
        class="btn btn-success"
        @click="
          add_bool = true;
          cleanText();
        "
      >
        Add Transaction
      </button>
      <p />
      <button
        class="btn btn-success"
        @click="
          transfer_bool = true;
          cleanTextTransfer();
        "
      >
        Make Transfer
      </button>
      <br />
      <label>Total Amount: {{ totalAmount }} $ </label>
      <label style="color: white;">Total Balance: {{ fieldBalances }} $ </label>
      <br />
      <!--
        Show sort options
      -->
      <span>
        Sort by (First to appear in the Report, already sorted by date):
      </span>
      <div class="flex">
        <select class="browser-default custom-select" v-model="selectedOption">
          <option> None </option>
          <option> Income </option>
          <option> Expense </option>
        </select>
        <select
          class="browser-default custom-select"
          v-model="selectedOptionCategory"
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
          class="browser-default custom-select"
          v-model="selectedOptionCategory"
          v-if="selectedOption === 'Expense'"
        >
          <option
            v-for="(category, index) in category_list.expense"
            :key="index"
          >
            {{ category.name }}
          </option>
        </select>
        <select
          class="browser-default custom-select"
          v-model="selectedOptionReport"
        >
          <option value="All"> Without </option>
          <option value="Daily"> Daily </option>
          <option value="Weekly"> Weekly </option>
          <option value="Monthly"> Monthly </option>
          <option value="Yearly"> Yearly </option>
        </select>
        <span> Since: </span>
        <input
          class="form-control"
          v-model="rangestart"
          :disabled="selectedOptionReport === 'All'"
          placeholder="Indique la fecha de Inicio"
        />
      </div>
      <span v-if="selectedOptionReport !== 'All'">
        Can't Delete while Report Daily, Weekly, Monthly, Yearly
      </span>
      <!--
        Show cards WITHOUT delete for reports
      -->
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
              <div class="card-title">Account: {{ registry.name }}</div>
              <div class="card-subtitle mb-2 text-muted">
                Type: {{ registry.type_search }}
              </div>
              <div class="card-subtitle mb-2 text-muted">
                Category: {{ registry.category }}
              </div>
              <div class="card-subtitle mb-2 text-muted">
                Date: {{ registry.fecha }}
              </div>
              <p class="card-text">Amount: {{ registry.amount }}</p>
            </div>
          </div>
        </div>
      </div>
      <!--
        Show cards WITH delete for reports
      -->
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
              <button class="close" @click.stop="delRegistry(index)">
                &times;
              </button>
              <div class="card-title">Account: {{ registry.name }}</div>
              <div class="card-subtitle mb-2 text-muted">
                Type: {{ registry.type_search }}
              </div>
              <div class="card-subtitle mb-2 text-muted">
                Category: {{ registry.category }}
              </div>
              <div class="card-subtitle mb-2 text-muted">
                Date: {{ registry.fecha }}
              </div>
              <p class="card-text">Amount: {{ registry.amount }}</p>
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
      // Main Title
      title: "Registry of transaction",
      // To sort by type_search
      selectedOption: "None",
      // When sorting by type_search, sorts by categories first then show rest
      selectedOptionCategory: "All",
      // Selects the kind of report you want to see
      selectedOptionReport: "All",
      // Condition to show the add_transaction form
      add_bool: false,
      // Condition to show the update transaction form
      upd_bool: false,
      // Condition to show the transfer form
      transfer_bool: false,
      // Variable that helps with updates
      index_upd: 0,
      // Variable where reports starts counting the "weekly", "monthly", "yearly" range, rangeend is the one that limits it
      rangestart: new Date(Date.now()).toLocaleDateString(),
      // type_search types
      typelist: [
        {
          name: "Income"
        },
        {
          name: "Expense"
        }
      ],
      // main variable to add, update, transfer and modify
      registry: {
        name: "",
        category: "",
        amount: "",
        type_search: "Income",
        fecha: "",
        transferSource: "",
        transferDestination: "",
        transferAmount: ""
      },
      // variable for temporal account
      account: {
        accountName: "",
        name: "",
        id: "",
        balance: 0
      },
      // List of i/e called registry/s in the localStorage
      registrys: [],
      // List of accounts existent in the localStorage
      accounts: [],
      // List of categories of type_search types existent in the localStorage
      category_list: [],
      temporalAmount: 0 // When updating, it helps to calculate logic
    };
  },
  methods: {
    // Adds an i/e registrys
    addRegistry: function() {
      let { name, category, amount, type_search } = this.registry;
      if (
        this.registry.name === "" ||
        this.registry.category === "" ||
        this.registry.amount === "" ||
        this.registry.type_search === ""
      ) {
        alert("You must complete all the fields");
      } else if (
        this.registry.type_search === "Expense" &&
        this.registry.amount > this.findbalance
      ) {
        alert("Not enough balance in account for expense");
      } else {
        if (
          !isNaN(this.registry.amount) &&
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
        } else {
          alert("Amount only allow number value");
        }
      }
    },
    // Deletes i/e registrys
    delRegistry: function(index) {
      if (
        (parseInt(this.findbalance) - parseInt(this.temporalAmount) >= 0 &&
          this.registry.type_search === "Income") ||
        this.registry.type_search === "Expense"
      ) {
        this.sortededregistrys.splice(index, 1);
        localStorage.setItem(
          "reg-local",
          JSON.stringify(this.sortededregistrys)
        );
        this.registrys = this.sortededregistrys;
        this.upd_bool = false;
      } else {
        alert("Can't delete this, balance will reach negative value");
      }
    },
    // Updates sections of the card of i/e registrys
    updateRegistry: function(index) {
      if (
        parseInt(this.findbalance) +
          parseInt(this.temporalAmount) -
          parseInt(this.registry.amount) >=
          0 &&
        this.registry.type_search === "Expense"
      ) {
        this.registrys[index].name = this.registry.name;
        this.registrys[index].category = this.registry.category;
        this.registrys[index].type_search = this.registry.type_search;
        this.registrys[index].amount = this.registry.amount;
        localStorage.setItem("reg-local", JSON.stringify(this.registrys));
        this.upd_bool = false;
      } else if (
        parseInt(this.findbalance) -
          parseInt(this.temporalAmount) +
          parseInt(this.registry.amount) >=
          0 &&
        this.registry.type_search === "Income"
      ) {
        this.registrys[index].name = this.registry.name;
        this.registrys[index].category = this.registry.category;
        this.registrys[index].type_search = this.registry.type_search;
        this.registrys[index].amount = this.registry.amount;
        localStorage.setItem("reg-local", JSON.stringify(this.registrys));
        this.upd_bool = false;
      } else {
        alert("Cant update this, balance will reach negative value");
      }
    },
    // Saves data in the transfer form from the card of the i/e selected
    prevUpdate: function(index) {
      try {
        this.registry.name = this.registrys[index].name;
        this.registry.category = this.registrys[index].category;
        this.registry.type_search = this.registrys[index].type_search;
        this.registry.amount = this.registrys[index].amount;
        this.temporalAmount = this.registrys[index].amount;
      } catch (error) {
        console.log("Undefined variable as it's non existent");
      }
      this.upd_bool = true;
      this.index_upd = index;
    },
    // Cleans Text of all sections in the form of add transaction
    cleanText: function() {
      this.registry.name = "";
      this.registry.category = "";
      this.registry.type_search = "Income";
      this.registry.amount = "";
    },
    // Cleans Text of all sections in the form of transfer
    cleanTextTransfer: function() {
      this.registry.transferSource = "";
      this.registry.transferDestination = "";
      this.registry.transferAmount = "";
    },
    // Creates a transfer between two accounts
    transferRegistry: function() {
      console.log("TOTAL: " + this.findbalance);
      if (
        this.registry.transferSource === "" ||
        this.registry.transferDestination === "" ||
        this.registry.transferAmount === ""
      ) {
        alert("You must complete all the fields");
      } else if (this.registry.transferAmount > this.findbalance) {
        alert("Transfer amount exceeds total: " + this.findbalance);
      } else if (this.registry.transferAmount <= "0") {
        alert("Can't transfer nothing");
      } else if (isNaN(this.registry.transferAmount)) {
        alert("Value must me number");
      } else {
        let name = this.registry.transferSource;
        let category = "Transfer";
        let amount = this.registry.transferAmount;
        let type_search = "Expense";
        this.registrys.push({
          name,
          category,
          amount,
          type_search,
          fecha: new Date(Date.now()).toLocaleDateString()
        });
        name = this.registry.transferDestination;
        category = "Transfer";
        amount = this.registry.transferAmount;
        type_search = "Income";
        this.registrys.push({
          name,
          category,
          amount,
          type_search,
          fecha: new Date(Date.now()).toLocaleDateString()
        });
        localStorage.setItem("reg-local", JSON.stringify(this.registrys));
        this.transfer_bool = false;
        this.cleanTextTransfer();
      }
    },
    // Si se escoge algun sort, con este método se guardara el orden del sort en localStorage
    savesortedregistrys(){
      if (
        this.selectedOption !== "None" &&
        this.selectedOptionReport === "All"
      ) {
        localStorage.setItem(
          "reg-local",
          JSON.stringify(this.sortededregistrys)
        );
      } else if (
        this.selectedOption !== "None" &&
        this.selectedOptionReport !== "All"
      ) {
        localStorage.setItem(
          "reg-local",
          JSON.stringify(this.reportedregistrys)
        );
      }
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
    //calculates range limit for report
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
    //Filters report to only that range
    reportedregistrys() {
      try {
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
      } catch (error) {
        alert("Theres an issue with some date in the report");
      }
      return -1;
    },
    //Sorts by categories and dates
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
        cat1.sort(comp);
        cat2 = sortedregistrys.filter(
          item => item.category !== this.selectedOptionCategory
        );
        cat2.sort(comp);
        sortedregistrys = cat1.concat(cat2);
      }
      return sortedregistrys.concat(sortedregistrysparttwo);
    },
    //calculates balance of all i/e's
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
    },
    //calculates each account's balance
    fieldBalances() {
      const acc = this.accounts;
      acc.forEach(function(accobj) {
        accobj.balance = 0;
      });
      this.registrys.forEach(function(registry) {
        acc.forEach(function(account) {
          if (registry.name === account.accountName) {
            registry.type_search === "Income"
              ? (account.balance += parseInt(registry.amount))
              : (account.balance -= parseInt(registry.amount));
            localStorage.setItem("reg-Users", JSON.stringify(acc));
          }
        });
      });
      return 0;
    },
    // Filters selected option in source for transfer
    dropdownListDestination() {
      return this.accounts.filter(
        item => item.accountName !== this.registry.transferSource
      );
    },
    // Filters selected option in destination for transfer
    dropdownListSource() {
      return this.accounts.filter(
        item => item.accountName !== this.registry.transferDestination
      );
    },
    // Finds balance value of the account related to the i/e being modified or transfered
    findbalance() {
      let value = 0;
      this.accounts.forEach(element => {
        if (
          element.accountName === this.registry.transferSource ||
          element.accountName === this.registry.name
        ) {
          value = element.balance;
        }
      });
      return value;
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
  position: fixed;
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
