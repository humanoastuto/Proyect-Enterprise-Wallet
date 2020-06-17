import { assert } from "chai";
import { createLocalVue, mount } from "@vue/test-utils";
import IncomeExpense from "@/views/IncomeExpense.vue";
import Accounts from "@/views/Accounts.vue";
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

describe("Reports ", () => {
  it("Verify Report Sorting in one account with multiple income expenses from different categories", () => {
    global.localStorage = storageMock();
    const localVue = createLocalVue();
    const wrapper = mount(Accounts, IncomeExpense, {
      store,
      localVue
    });
    // Add Account Salary where work will be saved
    const accounttest = {
      accountName: "Salary",
      name: "Tester",
      id: 171330
    };
    wrapper.vm.$data.user = accounttest;
    wrapper.vm.addUser();
    // Add first one
    const newregistry = {
      name: "Salary",
      category: "Other",
      amount: "500",
      type_search: "Income",
      fecha: new Date(Date.now()).toLocaleDateString()
    };
    wrapper.vm.$data.registry = newregistry;
    wrapper.vm.addRegistry();
    // Add second one
    const newregistry2 = {
      name: "Salary",
      category: "Transfer",
      amount: "400",
      type_search: "Income",
      fecha: new Date(Date.now()).toLocaleDateString()
    };
    wrapper.vm.$data.registry = newregistry2;
    wrapper.vm.addRegistry();
    //Adjust Balance Manually
    let accountmodified = JSON.parse(global.localStorage.getItem("reg-Users"));
    accountmodified[0].balance = 900;
    global.localStorage.setItem("reg-Users", JSON.stringify(accountmodified));
    wrapper.vm.$data.accounts = JSON.parse(
      global.localStorage.getItem("reg-Users")
    );
    // Add third one
    const newregistry3 = {
      name: "Salary",
      category: "Transfer",
      amount: "450",
      type_search: "Expense",
      fecha: new Date(Date.now()).toLocaleDateString()
    };
    wrapper.vm.$data.registry = newregistry3;
    wrapper.vm.addRegistry();
    // Add fourth one
    const newregistry4 = {
      name: "Salary",
      category: "Other",
      amount: "350",
      type_search: "Expense",
      fecha: new Date(Date.now()).toLocaleDateString()
    };
    wrapper.vm.$data.registry = newregistry4;
    wrapper.vm.addRegistry();
    //Adjust Balance Manually For Expenses
    accountmodified = JSON.parse(global.localStorage.getItem("reg-Users"));
    accountmodified[0].balance = 100;
    global.localStorage.setItem("reg-Users", JSON.stringify(accountmodified));
    wrapper.vm.$data.accounts = JSON.parse(
      global.localStorage.getItem("reg-Users")
    );
    // Check first Sort by Income Transfer
    wrapper.vm.$data.selectedOption = "Income";
    wrapper.vm.$data.selectedOptionCategory = "Transfer";
    wrapper.vm.$data.selectedOptionReport = "All";
    wrapper.vm.savesortedregistrys();
    const incomefound = JSON.parse(global.localStorage.getItem("reg-local"));
    assert(incomefound[0].type_search, newregistry2.type_search);
    assert(incomefound[0].category, newregistry2.category);
    // Check when sorted again by "Other" category
    wrapper.vm.$data.selectedOption = "Income";
    wrapper.vm.$data.selectedOptionCategory = "Other";
    wrapper.vm.savesortedregistrys();
    const incomefound2 = JSON.parse(global.localStorage.getItem("reg-local"));
    assert(incomefound2[0].type_search, newregistry.type_search);
    assert(incomefound2[0].category, newregistry.category);
    // Check when sorted again by "Other" "Expense"
    wrapper.vm.$data.selectedOption = "Expense";
    wrapper.vm.$data.selectedOptionCategory = "Other";
    wrapper.vm.savesortedregistrys();
    const incomefound3 = JSON.parse(global.localStorage.getItem("reg-local"));
    assert(incomefound3[0].type_search, newregistry4.type_search);
    assert(incomefound3[0].category, newregistry4.category);
    // Check when sorted again by "Other" "Expense"
    wrapper.vm.$data.selectedOption = "Expense";
    wrapper.vm.$data.selectedOptionCategory = "Transfer";
    wrapper.vm.savesortedregistrys();
    const incomefound4 = JSON.parse(global.localStorage.getItem("reg-local"));
    assert(incomefound4[0].type_search, newregistry3.type_search);
    assert(incomefound4[0].category, newregistry3.category);
  });
});
