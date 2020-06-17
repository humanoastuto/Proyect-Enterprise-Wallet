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
  it("Create an income category transfer and check if it is shown first if filtered by income transfer", () => {
    global.localStorage = storageMock();
    const localVue = createLocalVue();
    const wrapper = shallowMount(IncomeExpense, { store, localVue });

    const newregistry = {
      name: "Salary",
      category: "Category1",
      amount: "100",
      type_search: "Income",
      fecha: new Date(Date.now()).toLocaleDateString()
    };
    wrapper.vm.$data.registry.name = "Salary";
    wrapper.vm.$data.registry.category = "Category1";
    wrapper.vm.$data.registry.amount = "100";
    wrapper.vm.$data.registry.type_search = "Income";
    wrapper.vm.$data.registry.fecha = "Income";
    wrapper.vm.addRegistry();
    console.log(
      "Testing" + JSON.stringify(global.localStorage.getItem("reg-local"))
    );
    const [incomefound] = JSON.parse(
      global.localStorage.getItem("reg-local")
    ).filter(item => item.type_search === "Income");
    assert.equal(incomefound.type_search, newregistry.type_search);
  });
});
