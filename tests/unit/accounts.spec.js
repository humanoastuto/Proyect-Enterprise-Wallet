// CHAI
import { assert } from "chai";
// VUE TEST UTILS
import { createLocalVue, mount } from "@vue/test-utils";
// components
import Accounts from "@/views/Accounts.vue";
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

describe("Accounts Management", () => {
  let localVue;

  beforeEach(() => {
    global.localStorage = storageMock();

    localVue = createLocalVue();
  });

  it("Adding a new account to local storage", () => {
    const wrapper = mount(Accounts, {
      store,
      localVue
    });

    const accountToAdd = {
      accountName: "Unit Test",
      name: "Testing",
      id: 1234567
    };
    wrapper.vm.$data.user = accountToAdd;
    wrapper.vm.addUser();
    /*console.log(
      "Probando:" + JSON.stringify(global.localStorage.getItem("reg-Users"))
    );*/
    const [accountFound] = JSON.parse(
      global.localStorage.getItem("reg-Users")
    ).filter(an => an.accountName === "Unit Test");
    assert.equal(accountFound.accountName, accountToAdd.accountName);
  });

  it("Add a new account and delete it from the local storage", () => {
    const wrapper = mount(Accounts, {
      store,
      localVue
    });
    const accountToAdd1 = {
      accountName: "Unit Test - Delete",
      name: "Deleting",
      id: 1234567
    };

    wrapper.vm.$data.user = accountToAdd1;
    wrapper.vm.addUser();
    wrapper.vm.deleteUser(0);

    const lengthExpected = 0;
    const lengthRecieved = JSON.parse(global.localStorage.getItem("reg-Users"))
      .length;

    assert.equal(lengthExpected, lengthRecieved);
  });

  it("Update the accountName from one account", () => {
    const wrapper = mount(Accounts, {
      store,
      localVue
    });
    const accountToAdd1 = {
      accountName: "Unit Test - Update",
      name: "Testing",
      id: 1234567
    };
    const nameToUpdate = "Updated Correctly";

    wrapper.vm.$data.user = accountToAdd1;
    wrapper.vm.addUser();
    wrapper.vm.$data.user.accountName = nameToUpdate;
    wrapper.vm.updateUser(0);
    /*console.log(
      "Probando Update:" +
        JSON.stringify(global.localStorage.getItem("reg-Users"))
    );*/
    const [accountUpdated] = JSON.parse(
      global.localStorage.getItem("reg-Users")
    );

    assert.equal(accountUpdated.accountName, nameToUpdate);
  });
});
