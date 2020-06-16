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
describe("Categories ", () => {
  let localVue;

  global.alert = function(msg) {
    console.log(msg);
  };

  beforeEach(() => {
    global.localStorage = storageMock();

    localVue = createLocalVue();
  });

  it("The LocalStorage category list is the same as the category data list and is not empty.", () => {
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

  it("The Logic to insert income category should works correctly.", () => {
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

  it("The Logic to insert expense category should works correctly.", () => {
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

  it("The income and expense lists in categories contain at least two elements each.", () => {
    const wrapper = mount(Categories, {
      store,
      localVue
    });

    const income_list = wrapper.vm.$data.category_list.income;
    assert.isAtLeast(income_list.length, 2); //>=

    const expense_list = wrapper.vm.$data.category_list.expense;
    assert.isAtLeast(expense_list.length, 2);
  });
});
