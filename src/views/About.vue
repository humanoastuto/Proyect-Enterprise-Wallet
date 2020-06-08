<template>
  <div class="about" id="app">
    <h3>{{ title }}</h3>
    <div class="form">
      <div class="form-group">
        <label>Name</label>
        <input class="form-control" type="text" v-model="registry.name">
      </div>
      <div class="form-group">
        <label>Category</label>
        <input class="form-control" v-model="registry.category">
      </div>
      <label>Type</label>
      <select class="browser-default custom-select" v-model="registry.type_search">
        <option v-for="(type, index) in typelist" :key="index"> {{ type.name }} </option>
      </select>
       <div class="form-group">
        <label>Amount</label>
        <input class="form-control" v-model="registry.amount">
      </div>
      <button class="btn btn-primary" @click="addRegistry">Add</button>        
    </div>
    <div class="col-sm-12">
      <div class="col-sm-8 nota" v-for="(registry, index) in registrys" :key="index">
        <div :class="[registry.type_search ==='Income' ? 'card-income' : 'card-expense']" @click="prevUpdate(index)">
          <div class="card-block">
            <div class="card-title">{{registry.name}}</div>
            <div class="card-subtitle mb-2 text-muted">{{registry.category}}</div>
            <div class="card-subtitle mb-2 text-muted">{{registry.type_search}}</div>
            <p class="card-text">{{registry.amount}}</p>
          </div>
          <button class="btn btn-primary" @click="updateRegistry(index)">Update</button>  
          <button class="close" @click="delRegistry(index)">&times;</button>          
        </div>
      </div>
    </div>        
  </div>  
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      title: 'Registry of transaction',
      typelist: [
       {
          name: 'Income'
       },
       {
          name:'Expense'
       }
     ],
      registry:{
        name:'',
        category:'',
        amount:'',
        type_search:'Income'
      },
      registrys: []
    }
  },
  methods:{
    addRegistry:function(){
      let { name, category, amount, type_search } = this.registry;
      this.registrys.push({
        name,
        category,
        amount,
        type_search
      });
      localStorage.setItem('reg-local', JSON.stringify(this.registrys));
    },
    delRegistry:function(index){
      this.registrys.splice(index, 1);
            localStorage.setItem('reg-local', JSON.stringify(this.registrys));

    },
    updateRegistry:function(index){
      this.registrys[index].name = this.registry.name;
      this.registrys[index].category = this.registry.category;
      this.registrys[index].type_search = this.registry.type_search;
      this.registrys[index].amount = this.registry.amount; 
      localStorage.setItem('reg-local', JSON.stringify(this.registrys));
    },
    prevUpdate:function(index){
      this.registry.name = this.registrys[index].name;
      this.registry.category = this.registrys[index].category;
      this.registry.type_search = this.registrys[index].type_search;
      this.registry.amount = this.registrys[index].amount; 
    }
  },
  created: function(){
    let registrysDB = JSON.parse(localStorage.getItem('reg-local'));
    if(registrysDB === null)
    {
      this.registrys = [];
    }
    else
    {
      this.registrys = registrysDB;
    }
  }
}
</script>

<style>
  .form{
    text-align: left;
  } 
  .card-income{
    background: lightgreen;
    text-align: left;
    border:1px solid #2c3e50;
    border-radius: 4px;
    padding-left: 8px;
    padding-right: 8px;
  } 
  .card-expense{
    background: lightcoral;
    text-align: left;
    border:1px solid #2c3e50;
    border-radius: 4px;
    padding-left: 8px;
    padding-right: 8px;
  } 
  .nota{
    padding: 5px;
  }
</style>
