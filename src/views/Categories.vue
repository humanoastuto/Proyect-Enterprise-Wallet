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
        <div id="c_type">
          <label>Type</label>
          <select class="browser-default custom-select" v-model="selectedType">
            <option v-for="(type, index) in typelist" :key="index">
              {{ type.name }}
            </option>
          </select>
        </div>
        <button
          @click="addCategory({ name: c_name })"
          class="btn btn-success c_btn "
        >
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
                <th></th>
              </tr>
            </thead>
            <tbody
              class="green"
              v-for="(category, index) in category_list.income"
              :key="index.name"
            >
              <tr>
                <td class="categoryIncome">{{ category.name }}</td>
                <td>Income</td>
                <td>
                  <button
                    class="close"
                    @click.stop="deleteCategory(category.name, 'Income')"
                    v-if="
                      category.name !== 'Transfer' && category.name !== 'Other'
                    "
                  >
                    &times;
                  </button>
                </td>
              </tr>
            </tbody>
            <tbody
              class="red"
              v-for="(category, item) in category_list.expense"
              :key="item.name"
            >
              <tr>
                <td class="categoryExpense">{{ category.name }}</td>
                <td>Expense</td>
                <td>
                  <button
                    class="close"
                    @click.stop="deleteCategory(category.name, 'Expense')"
                    v-if="
                      category.name !== 'Transfer' && category.name !== 'Other'
                    "
                  >
                    &times;
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Categories",
  data() {
    return {
      c_name: "",
      selectedType: "",
      exists: false,
      typelist: [{ name: "Income" }, { name: "Expense" }],
      add_category_bool: false,
      category_list: {
        income: [{ name: "Transfer" }, { name: "Other" }],
        expense: [{ name: "Transfer" }, { name: "Other" }]
      }
    };
  },
  computed: {},
  methods: {
    addCategory: function() {
      if (this.c_name === "" || this.selectedType === "") {
        alert("You must complete all the fields");
      } else {
        let category = { name: this.c_name };
        let type = this.selectedType;
        this.add(category, type);
      }
      this.add_category_bool = false;
      this.cancel();
    },
    add: function(categoryToAdd, selectedType) {
      if (selectedType === "Expense") {
        this.category_list.expense.forEach(item_expense => {
          if (item_expense.name === this.c_name) {
            this.exists = true;
          }
        });
      } else if (selectedType === "Income") {
        this.category_list.income.forEach(item_income => {
          if (item_income.name === this.c_name) {
            this.exists = true;
          }
        });
      }
      if (this.exists === true) {
        alert("Category already exists");
      } else {
        if (selectedType === "Expense") {
          this.category_list.expense.push(categoryToAdd);
        } else if (selectedType === "Income") {
          this.category_list.income.push(categoryToAdd);
        }
        localStorage.setItem(
          "reg-local-category",
          JSON.stringify(this.category_list)
        );
      }
    },
    cancel: function() {
      this.c_name = "";
      this.selectedType = "";
    },
    deleteCategory: function(category, type) {
      if (type === "Expense") {
        this.category_list.expense = this.category_list.expense.filter(
          ct => ct.name !== category
        );
      } else if (type === "Income") {
        this.category_list.income = this.category_list.income.filter(
          ct => ct.name !== category
        );
      }
      localStorage.setItem(
        "reg-local-category",
        JSON.stringify(this.category_list)
      );
    }
  },
  created: function() {
    let categoriesDB = JSON.parse(localStorage.getItem("reg-local-category"));
    if (categoriesDB === null) {
      categoriesDB = this.category_list;
    } else {
      this.category_list = categoriesDB;
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
  background: rgb(76, 174, 76);
  color: white;
}

.table_p {
  margin-top: 30pt;
  width: 550pt;
  border: 2pt;
  text-align: center;
  border-right: 4pt solid #000;
  border-left: 1px solid rgb(148, 146, 146);
  border-bottom: 3pt solid #000;
  margin-left: auto;
  margin-right: auto;
}

.green {
  color: green;
}

.red {
  color: red;
}

.add-form-categories {
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
.add-form-categories-content {
  height: 345px;
  width: 500px;
  background: white;
  padding: 40pt;
  border-radius: 6px;
}
</style>
