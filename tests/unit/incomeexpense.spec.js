// CHAI
import { assert } from "chai";
// VUE TEST UTILS
import { createLocalVue, mount } from "@vue/test-utils";
// components
import Accounts from "@/views/Accounts.vue";
import IncomeExpense from "@/views/IncomeExpense.vue";
//import Categories from "@/views/Categories.vue";
/* Recommended for actions/mutations */
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
//////////////////////

describe("IncomeExpense transactions", () => {
  let localVue;

  beforeEach(() => {
    global.localStorage = storageMock();

    localVue = createLocalVue();
  });

  it("Transaction succesfully updated", () => {
    const wrapper = mount(Accounts, IncomeExpense, {
      store,
      localVue
    });

    const registryToAdd = {
      name: "Unit Test",
      category: "Transfer",
      amount: "1000",
      type_search: "Income",
      fecha: new Date(Date.now()).toLocaleDateString()
    };
    const registryUpdated = {
      name: "Test Unit",
      category: "Transfer",
      amount: "1000",
      type_search: "Income"
    };
    wrapper.vm.$data.registry = registryToAdd;
    wrapper.vm.addRegistry();
    console.log(
      "Probando:" + JSON.stringify(global.localStorage.getItem("reg-local"))
    );
    let [registryFound] = JSON.parse(global.localStorage.getItem("reg-local"));
    assert.equal(registryFound.name, registryToAdd.name);
    wrapper.vm.$data.registry = registryUpdated;
    wrapper.vm.updateRegistry(0);
    [registryFound] = JSON.parse(global.localStorage.getItem("reg-local"));
    assert.equal(registryFound.name, registryUpdated.name);
  });
  it("Transaction (Expense) succesfully deleted", () => {
    const wrapper = mount(Accounts, IncomeExpense, {
      store,
      localVue
    });

    const accountSource = {
      accountName: "Unit Test",
      name: "Testing",
      id: 1234567
    };
    wrapper.vm.$data.user = accountSource;
    wrapper.vm.addUser();
    let accountmodified = JSON.parse(global.localStorage.getItem("reg-Users"));
    accountmodified[0].balance = 1000;
    global.localStorage.setItem("reg-Users", JSON.stringify(accountmodified));
    wrapper.vm.$data.accounts = JSON.parse(
      global.localStorage.getItem("reg-Users")
    );

    const registryToAdd = {
      name: "Unit Test",
      category: "Transfer",
      amount: "500",
      type_search: "Expense",
      fecha: new Date(Date.now()).toLocaleDateString()
    };
    wrapper.vm.$data.registry = registryToAdd;
    wrapper.vm.addRegistry();
    console.log(
      "Mostrando Expense añadido: " + JSON.stringify(global.localStorage.getItem("reg-local"))
    );
    let registryFound = JSON.parse(global.localStorage.getItem("reg-local"));
    assert.equal(registryFound[0].name, registryToAdd.name);
    wrapper.vm.delRegistry(0);
    assert.notEqual(
      JSON.parse(global.localStorage.getItem("reg-local")),
      registryFound
    );
  });
});
