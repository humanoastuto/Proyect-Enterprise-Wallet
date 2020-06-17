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

  it("The LocalStorage category list is not empty.", () => {
    const wrapper = mount(Categories, {
      store,
      localVue
    });
    let expectedlength = 2;
    let categories = wrapper.vm.$data.category_list;
    assert.exists(categories);

    assert.isAtLeast(categories.income.length, expectedlength); //>=

    assert.isAtLeast(categories.expense.length, expectedlength);

    wrapper.vm.add();

    assert.exists(global.localStorage.getItem("reg-local-category"));
    assert.equal(
      global.localStorage.getItem("reg-local-category"),
      JSON.stringify(categories)
    );
    //console.log(categories);
    //console.log(global.localStorage.getItem("reg-local-category"));
  });

  it("The Logic to insert and delete income category should works correctly.", () => {
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

    /*console.log(
      "\tAdd Income category:  " +
        JSON.stringify(categoryToAdd) +
        "\n\t => " +
        global.localStorage.getItem("reg-local-category")
    );*/

    wrapper.vm.deleteCategory(categoryToAdd.name, selectedType);
    assert.notInclude(
      global.localStorage.getItem("reg-local-category"),
      JSON.stringify(categoryToAdd)
    );

    /*console.log(
      "\n\tDelete Income Category:  " +
        JSON.stringify(categoryToAdd) +
        "\n\t => " +
        global.localStorage.getItem("reg-local-category") +
        "\n\n"
    );*/
  });

  it("The Logic to insert and delete expense category should works correctly.", () => {
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

    /*console.log(
      "\tAdd Expense category:  " +
        JSON.stringify(categoryToAdd) +
        "\n\t => " +
        global.localStorage.getItem("reg-local-category")
    );*/

    wrapper.vm.deleteCategory(categoryToAdd.name, selectedType);
    assert.notInclude(
      global.localStorage.getItem("reg-local-category"),
      JSON.stringify(categoryToAdd)
    );

    /*console.log(
      "\tDelete Expense Category:  " +
        JSON.stringify(categoryToAdd) +
        "\n\t => " +
        global.localStorage.getItem("reg-local-category") +
        "\n\n"
    );*/
  });
});
