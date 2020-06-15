<template>
  <div class="categories">
    <h2>Categories</h2>
    <div class="add-form-categories" v-if="add_category_bool">
      <div class="add-form-categories-content">
        <div class="form-group">
          <label>Name</label>
          <div id="category_name">
            <input class="form-control" type="text" v-model="c_name" />
          </div>
        </div>
        <label>Type</label>
        <select class="browser-default custom-select" v-model="selectedType">
          <option v-for="(type, index) in typelist" :key="index">
            {{ type.name }}
          </option>
        </select>
        <button @click="addCategory" class="btn btn-success c_btn ">
          Add
        </button>
        <button
          @click="
            add_category_bool = false;
            cancel();
          "
          class="btn btn-danger c_btn "
        >
          Cancel
        </button>
      </div>
    </div>
    <div class=" form_categories">
      <button class="btn btn-success" @click="add_category_bool = true">
        Add Category
      </button>
      <div class="col-xs-12">
        <div class="col-xs-8 nota">
          <table class="table table-hover table_p">
            <thead>
              <tr class="t_title">
                <th scope="col">Name</th>
                <th scope="col">Type</th>
              </tr>
            </thead>
            <tbody
              class="green"
              v-for="(category, index) in categories.income"
              :key="index.name"
            >
              <tr>
                <td class="categoryIncome">{{ category.name }}</td>
                <td>Income</td>
              </tr>
            </tbody>
            <tbody
              class="red"
              v-for="(category, item) in categories.expense"
              :key="item.name"
            >
              <tr>
                <td class="categoryExpense">{{ category.name }}</td>
                <td>Expense</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
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
      typelist: [{ name: "Income" }, { name: "Expense" }],
      add_category_bool: false
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
      } else {
        if (this.selectedType === "Income") {
          this.addIncomeCategory({ name: this.c_name });
        } else if (this.selectedType === "Expense") {
          this.addExpenseCategory({ name: this.c_name });
        }
        localStorage.setItem(
          "reg-local-category",
          JSON.stringify(this.getCategoryList)
        );
      }
      this.add_category_bool = false;
      this.cancel();
    },
    cancel: function() {
      this.c_name = "";
      this.selectedType = "";
    },
    created: function() {
      let categoriesDB = JSON.parse(localStorage.getItem("reg-local-category"));
      if (categoriesDB === null) {
        this.getCategoryList = [];
      } else {
        this.getCategoryList = categoriesDB;
      }
    }
  }
};
</script>

<style>
.form_categories {
  text-align: left;
  margin: 50pt;
}
.c_btn {
  margin: 12px;
  margin-top: 40pt;
}

h2 {
  margin-top: 25pt;
}

.t_title {
  font-size: 15pt;
  border-bottom: 3px solid rgb(148, 146, 146);
  border-top: 2px solid rgb(148, 146, 146);
}

.table_p {
  margin-top: 30pt;
  width: 500pt;
  border: 2pt;
  text-align: center;
  border-right: 4pt solid #000;
  border-left: 1px solid rgb(148, 146, 146);
  border-bottom: 3pt solid #000;
}

.green {
  /*background-color: rgba(10, 126, 10, 0.137);*/
  color: green;
}

.red {
  /*background-color: rgba(255, 0, 0, 0.192);*/
  color: red;
}

.add-form-categories {
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
.add-form-categories-content {
  height: 345px;
  width: 500px;
  background: white;
  padding: 40pt;
  border-radius: 6px;
}
</style>
