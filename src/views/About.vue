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
        <div class="card">
          <div class="card-block">
            <div class="card-title">{{registry.name}}</div>
            <div class="card-subtitle mb-2 text-muted">{{registry.category}}</div>
            <div class="card-subtitle mb-2 text-muted">{{registry.type}}</div>
            <p class="card-text">{{registry.amount}}</p>
          </div>
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
        typelist:[
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
      registrys:[
        {
          name:'Salary',
          category:'Dep',
          type:'Income',
          amount:'2500 Bs.'
        }
      ]
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
      })
    },
    delRegistry:function(index){
      this.registrys.splice(index, 1);
    }
  }
}
</script>

<style>
  .form{
    text-align: left;
  } 
  .card{
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
