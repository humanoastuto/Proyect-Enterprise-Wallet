import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    obj: {
      incomes: [],
      expenses: []
    },
    categories: {
      income: [{ name: "Transfer" }, { name: "Other" }],
      expense: [{ name: "Transfer" }, { name: "Other" }]
    }
  },
  actions: {
    addIncomeCategory({ commit }, category) {
      commit("mutateIncomeList", category);
    },
    addExpenseCategory({ commit }, category) {
      commit("mutateExpenseList", category);
    }
  },
  mutations: {
    mutateIncomeList(state, category) {
      var v = false;
      state.categories.income.forEach(item_category => {
        if (item_category.name === category.name) {
          v = true;
        }
      });
      if (v === true) {
        alert("Category already exists");
      } else {
        state.categories.income.push(category);
      }
    },
    mutateExpenseList(state, category) {
      var v = false;
      state.categories.expense.forEach(item_category => {
        if (item_category.name === category.name) {
          v = true;
        }
      });
      if (v === true) {
        alert("Category already exists");
      } else {
        state.categories.expense.push(category);
      }
    }
  },
  getters: {
    getCategoryList(state) {
      return state.categories;
    }
  },
  modules: {}
});
