# enty-wallet

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Concrete Tasks Left
Glossary
i/I = income
e/E = expense

1: = task 1
2: = task 2
3: = task 3
..

Task Faltantes:

Task-Changes
1: If no tranfer/i/e is attached to account, it can be deleted in Accounts.vue
2: Categories can use localStorage instead of state management, not mandatory as its for phase 2 and it's well developed

Task-I/E (inside IncomeExpense.vue)
4: Only integer/doubles allowed for amounts

Task-Transfer (inside Transfer.vue)
// A es el emisor (Transfer from:), B es el Receptor (Transfer to:)
// El 4 se refiere a que si un usuario hace la transferencia, que no se vea en la lista de los que pueden recibir esa transferencia
4: If A already selected an user, do not show A user for B possible accounts, same for B being selected
6: Only integer/doubles allowed for amounts

Task-Reports
1: Show i/e of each user order by date
2: Show i/e of each user order by date and categories
3: Filter option between task 1 and task 2



