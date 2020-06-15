import Categories from "@/views/Categories.vue";
import { assert } from "chai";
import { mount, createLocalVue } from "@vue/test-utils";
import store from "@/store";
import VueRouter from "vue-router";
import Vuex from "vuex";

describe("Category List ", () => {
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);
    //router = new VueRouter({ routes: [] });
  });

  it("The Logic to insert category income should works correctly", () => {
    //const wrapper = shallowMount(Categories, {
    const wrapper = mount(Categories, {
      store,
      localVue
    });
    const nameInView = wrapper.find("#category_name");
    // const selectedTypeInView = wrapper.find("#selectedType");
    wrapper.vm.addIncomeCategory(nameInView);
    assert.include(wrapper.vm.$store.state.categories.income, nameInView);
  });

  it("The Logic to insert category expense should works correctly", () => {
    const wrapper = mount(Categories, {
      store,
      localVue
    });
    const nameInView = wrapper.find("#category_name");
    wrapper.vm.addExpenseCategory(nameInView);
    assert.include(wrapper.vm.$store.state.categories.expense, nameInView);
  });

  it("The income category list contains at least two items.", () => {
    const wrapper = mount(Categories, {
      store,
      localVue
    });
    let incomes = wrapper.findAll(".categoryIncome");
    assert.isTrue(wrapper.exists());
    assert.isAtLeast(incomes.length, 2); //>=
  });

  it("The expense category list contains at least two items.", () => {
    const wrapper = mount(Categories, {
      store,
      localVue
    });
    let expense = wrapper.findAll(".categoryExpense");
    assert.isTrue(wrapper.exists());
    assert.isAtLeast(expense.length, 2); //>=
  });
});
