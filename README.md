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

Task-Priority (puede ser directo a develop, previo a Task-I/E, Task-Transfer y Task Reports)
1: Separate Income/Expense from transfer (new transfer.vue)
2: Change name of About.vue to IncomeExpense.vue

Task-Changes
1: If no tranfer/i/e is attached to account, it can be deleted in Accounts.vue
2: Categories can use localStorage instead of state management, not mandatory as its for phase 2 and it's well developed

Task-I/E (inside IncomeExpense.vue)
1: i/e must use account list for task 2
2: Change input Name for a select from Account list in i/e register
3: Add condition if its null, it wont search for incomes in the list
4: Only integer/doubles allowed for amounts

Task-Transfer (inside Transfer.vue)
// A es el emisor (Transfer from:), B es el Receptor (Transfer to:)
// El 4 se refiere a que si un usuario hace la transferencia, que no se vea en la lista de los que pueden recibir esa transferencia
1: Erase the transfer that appears with the button, as it is mandatory to not be able to choose category or type.
2: When A transfers to B, A register an EXPENSE and B registers an INCOME, both forced to be TRANSFER category
3: Transfer.vue must have account list related to choose for A and B users.
4: If A already selected an user, do not show A user for B possible accounts, same for B being selected
5: Must verify all data signed

Task-Reports
1: Show i/e of each user order by date
2: Show i/e of each user order by date and categories
3: Filter option between task 1 and task 2



