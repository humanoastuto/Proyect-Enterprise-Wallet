<template>
  <div id="app">
    <nav
      class="navbar navbar-dark"
      style="background-color: #4cae4c; padding: 15px;"
    >
      <span class="navbar-brand mb-0 h1">Virtual Wallet</span>
      <router-link to="/">Home</router-link> |
      <router-link to="/incomeexpense">IncomeExpense</router-link> |
      <router-link to="/transfer">Transfer</router-link> |
      <router-link to="/accounts">Accounts</router-link> |
      <router-link to="/categories">Categories</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

a {
  font-weight: lighter;
  color: #dddcdc;
  font-size: 20px;
}

a.router-link-exact-active {
  color: #ffffff;
}

a.router-link-active {
  color: #ffffff;
}
</style>
