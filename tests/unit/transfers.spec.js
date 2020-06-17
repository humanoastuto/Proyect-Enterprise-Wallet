import { assert } from "chai";
import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import Accounts from "@/views/Accounts.vue";
import IncomeExpense from "@/views/IncomeExpense.vue";
import store from "@/store";

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
describe("Income.vue", () => {
  it("Create transaction verify it is an Income", () => {
    global.localStorage = storageMock();
    const localVue = createLocalVue();
    const wrapper = shallowMount(IncomeExpense, { store, localVue });
    const newregistry = {
      name: "Salary",
      category: "Category1",
      amount: "100",
      type_search: "Income"
    };
    wrapper.vm.$data.registry.name = "Salary";
    wrapper.vm.$data.registry.category = "Category1";
    wrapper.vm.$data.registry.amount = "100";
    wrapper.vm.$data.registry.type_search = "Income";
    wrapper.vm.addRegistry();
    const [incomefound] = JSON.parse(
      global.localStorage.getItem("reg-local")
    ).filter(item => item.type_search === "Income");
    assert.equal(incomefound.type_search, newregistry.type_search);
  });
});
describe("Transfer.vue", () => {
  it("Create transfer and make sure the Income is made to destination and Expense to source", () => {
    global.localStorage = storageMock();
    const localVue = createLocalVue();
    const wrapper = mount(Accounts, IncomeExpense, {
      store,
      localVue
    });
    const accountSource = {
      accountName: "Unit Test",
      name: "Testing",
      id: 1234567
    };
    const accountDestination = {
      accountName: "Test Unit",
      name: "Testing1",
      id: 123490
    };
    wrapper.vm.$data.user = accountSource;
    wrapper.vm.addUser();

    wrapper.vm.$data.user = accountDestination;
    wrapper.vm.addUser();

    const registryToAdd = {
      name: "Unit Test",
      category: "Transfer",
      amount: "1000",
      type_search: "Income",
      fecha: new Date(Date.now()).toLocaleDateString()
    };
    wrapper.vm.$data.registry = registryToAdd;
    wrapper.vm.addRegistry();
    let accountmodified = JSON.parse(global.localStorage.getItem("reg-Users"));
    accountmodified[0].balance = 1000;

    global.localStorage.setItem("reg-Users", JSON.stringify(accountmodified));

    wrapper.vm.$data.registry.transferSource = accountSource.accountName;
    wrapper.vm.$data.registry.transferDestination =
      accountDestination.accountName;
    wrapper.vm.$data.registry.transferAmount = "109";

    wrapper.vm.$data.accounts = JSON.parse(
      global.localStorage.getItem("reg-Users")
    );

    wrapper.vm.transferRegistry();

    const [expensefound] = JSON.parse(
      global.localStorage.getItem("reg-local")
    ).filter(
      item => item.name === "Unit Test" && item.type_search == "Expense"
    );
    const [incomefound] = JSON.parse(
      global.localStorage.getItem("reg-local")
    ).filter(item => item.name === "Test Unit" && item.type_search == "Income");

    assert.equal(incomefound.type_search, "Income");

    assert.equal(expensefound.type_search, "Expense");
  });
});
