<template>
  <div>
    <h1>
      <u> Categories </u>
    </h1>
    <div class="card">
      <div class="form">
        <div class="form-group">
          <label>Name</label>
          <input class="form-control" type="text" v-model="c_name" />
        </div>
        <label>Type</label>
        <select class="browser-default custom-select" v-model="selectedType">
          <option v-for="(type, index) in typelist" :key="index">
            {{ type.name }}
          </option>
        </select>
        <div class="row">
          <button @click="addCategory" class="c_btn btn_1">
            Add <span class="glyphicon glyphicon-chevron-left"></span>
          </button>
          <button @click="cancel" class="c_btn btn_2">
            Cancel<span class="glyphicon glyphicon-chevron-right"></span>
          </button>
        </div>
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>NAME</th>
          <th>TYPE</th>
        </tr>
      </thead>
      <tbody
        class="income-gr"
        v-for="(category, item_i) in categories.income"
        :key="item_i.name"
      >
        <tr>
          <td>{{ category.name }}</td>
          <td>Income</td>
        </tr>
      </tbody>
      <tbody
        class="expense-gr"
        v-for="(category, item_e) in categories.expense"
        :key="item_e.name"
      >
        <tr>
          <td>{{ category.name }}</td>
          <td>Expense</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Categories",
  data() {
    return {
      c_name: "",
      selectedType: "",
      typelist: [
        {
          name: "Income"
        },
        {
          name: "Expense"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["getCategoryList"]),
    categories: function() {
      return this.getCategoryList;
    }
  },
  methods: {
    ...mapActions(["addIncomeCategory"]),
    ...mapActions(["addExpenseCategory"]),
    addCategory: function() {
      if (this.c_name === "" || this.selectedType === "") {
        alert("You must complete all the fields");
      }
      if (this.selectedType === "Income") {
        this.addIncomeCategory({ name: this.c_name });
      } else if (this.selectedType === "Expense") {
        this.addExpenseCategory({ name: this.c_name });
      }
      /*if (this.c_name === "" || this.selectedType === ""){
        alert("You must complete all the fields");
      } else {
        if (
          this.getCategoryList.income.name !== this.c_name &&
          this.selectedType === "Income"
        ) {
          this.addIncomeCategory({ name: this.c_name });
        } else if (
          this.getCategoryList.expense.name !== this.c_name &&
          this.selectedType === "Expense"
        ) {
          this.addExpenseCategory({ name: this.c_name });
        } else if (
          (this.getCategoryList.income.name === this.c_name &&
            this.selectedType === "Income") ||
          (this.getCategoryList.expense.name === this.c_name &&
            this.selectedType === "Expense")
        ) {
          alert("Category already exists");
        }*/
    },
    cancel: function() {
      this.c_name = "";
      this.selectedType = "";
    }
  }
};
</script>

<style>
.form {
  text-align: left;
  font-family: "Times New Roman", Times, serif;
  padding: 30pt;
}
.c_btn {
  padding: 10pt;
  position: relative;
  margin-top: 40pt;
  text-align: center;
  width: 100pt;
  min-width: 90pt;
  border-radius: 10pt;
  cursor: pointer;
  font-size: 14pt;
  transition-duration: 0.34s;
}
.c_btn:hover {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.16);
}
.btn_1 {
  background-color: antiquewhite;
  color: black;
  margin-left: auto;
  margin-right: auto;
}
.btn_2 {
  background-color: red;
  color: white;
  margin-left: auto;
  margin-right: auto;
}

h1 {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  color: black;
  font-size: 3em;
  text-align: center;
}
.card {
  border: 1px solid #222930;
  border-radius: 6px;
  max-width: max-content;
  margin-top: 40pt;
  margin-right: auto;
  margin-left: auto;
  min-width: 400pt;
}
.expense-gr {
  background-color: rgb(245, 209, 216);
}
.income-gr {
  background-color: rgb(220, 233, 220);
}

.table {
  padding: 15px;
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
  width: 450pt;
  border: 2px solid black;
}
</style>
