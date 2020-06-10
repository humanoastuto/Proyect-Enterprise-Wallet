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
    /* mutateCategoryList(state, category) {
      state.categories.push(category);
    },*/
    mutateIncomeList(state, category) {
      state.categories.income.push(category);
      /* state.categories.income.forEach(item => {
        if (category.name !== "" && category.name !== item.name) {
          state.categories.income.push(category);
        }
      });*/
    },
    mutateExpenseList(state, category) {
      state.categories.expense.push(category);
      /* state.categories.expense.forEach(item => {
        if (category.name !== "" && category.name !== item.name) {
          state.categories.expense.push(category);
        }
      });*/
    }
  },
  getters: {
    getCategoryList(state) {
      return state.categories;
    }
  },
  modules: {}
});
