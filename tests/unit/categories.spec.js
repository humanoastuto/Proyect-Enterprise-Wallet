import Categories from "@/views/Categories.vue";
import { assert } from "chai";
import { mount, createLocalVue } from "@vue/test-utils";
import store from "@/store";

/// MOCK LOCAL STORAGE
function storageMock() {
  let storage = {};

  return {
    setItem: function(key, value) {
      storage[key] = value || "";
    },
    getItem: function(key) {
      return key in storage ? storage[key] : null;
    },
    removeItem: function(key) {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key: function(i) {
      const keys = Object.keys(storage);
      return keys[i] || null;
    }
  };
}
describe("Category List ", () => {
  let localVue;

  beforeEach(() => {
    global.localStorage = storageMock();

    localVue = createLocalVue();
  });

  it("The LocalStorage category list is the same as the category data list and is not empty", () => {
    const wrapper = mount(Categories, {
      store,
      localVue
    });

    const categories = wrapper.vm.$data.category_list;
    assert.exists(categories);
    wrapper.vm.add();
    assert.exists(global.localStorage.getItem("reg-local-category"));
    assert.equal(
      global.localStorage.getItem("reg-local-category"),
      JSON.stringify(categories)
    );
    //console.log(categories);
  });

  it("The Logic to insert income category should works correctly", () => {
    const wrapper = mount(Categories, {
      store,
      localVue
    });

    let selectedType = "Income";
    let categoryToAdd = { name: "test category" };

    wrapper.vm.add(categoryToAdd, selectedType);

    assert.include(
      global.localStorage.getItem("reg-local-category"),
      JSON.stringify(categoryToAdd)
    );

    //console.log(global.localStorage.getItem("reg-local-category"));
  });

  it("The Logic to insert expense category should works correctly", () => {
    const wrapper = mount(Categories, {
      store,
      localVue
    });

    let selectedType = "Expense";
    let categoryToAdd = { name: "test category" };

    wrapper.vm.add(categoryToAdd, selectedType);

    assert.include(
      global.localStorage.getItem("reg-local-category"),
      JSON.stringify(categoryToAdd)
    );

    //console.log(global.localStorage.getItem("reg-local-category"));
  });

  /*
  it("The income category list contains at least two items.", () => {
    global.localStorage = storageMock();

    const localVue = createLocalVue();

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
  });*/
});
