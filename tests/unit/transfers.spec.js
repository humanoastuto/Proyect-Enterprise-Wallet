import { expect, assert } from "chai";
import { shallowMount, createLocalVue , mount} from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
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
describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    });
    expect(wrapper.text()).to.include(msg);
  });
});
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
    console.log(
      "Probando" + JSON.stringify(global.localStorage.getItem("reg-local"))
    );
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
    const wrapper = mount(IncomeExpense, { store, localVue });

    wrapper.vm.$data.registry.transferSource = "Salary";
    wrapper.vm.$data.registry.transferDestination = "Savings";
    wrapper.vm.$data.registry.transferAmount = "1090";
    wrapper.vm.$data.totalAmount = 2000;
    wrapper.vm.transferRegistry();
    console.log(
      "Probando" +
        " " +
        JSON.stringify(global.localStorage.getItem("reg-local"))
    );
  /*  const [incomefound] = JSON.parse(
      global.localStorage.getItem("reg-local")
    ).filter(item => item.name === "Savings");
    const [expensefound] = JSON.parse(
      global.localStorage.getItem("reg-local")
    ).filter(item => item.name === "Salary");

    console.log(expensefound);
    console.log(incomefound);

    assert.equal(incomefound.type_search, "Income");

    assert.equal(expensefound.type_search, "Expense"); */
  });
});
