import { assert } from "chai";
import { shallowMount, createLocalVue } from "@vue/test-utils";
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

describe("Reports ", () => {
  it("Create an income (transfer category) after other registrys, check if the first sorted value is a transfer when sorted by income transfer", () => {
    global.localStorage = storageMock();
    const localVue = createLocalVue();
    const wrapper = shallowMount(IncomeExpense, { store, localVue });

    const newregistry = {
      name: "Salary",
      category: "Transfer",
      amount: "500",
      type_search: "Income",
      fecha: new Date(Date.now()).toLocaleDateString()
    };
    wrapper.vm.$data.registry = newregistry;
    wrapper.vm.addRegistry();
    wrapper.vm.$data.selectedOption = "Income";
    wrapper.vm.$data.selectedOptionCategory = "Transfer";
    wrapper.vm.$data.selectedOptionReport = "All";
    wrapper.vm.savesortedregistrys();
    const incomefound = JSON.parse(global.localStorage.getItem("reg-local"));
    assert(incomefound[0].type_search, newregistry.type_search);
    assert(incomefound[0].category, newregistry.category);
  });
});
