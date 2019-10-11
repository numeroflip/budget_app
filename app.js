// ---------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------BUDGET CONTROLLER-----------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------
const budgetController = (() => {

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value)  {
        this.id = id;
        this.description = description;
        this.value = value;
    };


    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };
  // -----------------------RETURN OBJECT-----------
    return {
    
        addItem(type, des, val) {
            let newItem, ID;

            // Create new ID
            if(data.allItems[type].length > 0){
            ID = data.allItems[type][data.allItems[type].length -1].id + 1}
            else ID = 0;
            // Create new item based in "inc" or "exp" type
            if(type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            // Push it into the data structure
            data.allItems[type].push(newItem);
            // return the new element
            return newItem;
        },

        testing() { return data}
    };


})();

// ---------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------UI CONTROLLER----------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------
const UIController = (() => {

    const DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    }
  // -----------------------RETURN OBJECT-------------------------------------
    return {
        getInput() {

            return {
                type : document.querySelector(DOMstrings.inputType).value,     //Will be either "inc" or "exp"
                description : document.querySelector(DOMstrings.inputDescription).value,
                value : document.querySelector(DOMstrings.inputValue).value

            }
        },
        getDOMstrings() {
            return DOMstrings;
        },
        addListItem(obj, type) {
            let html, newHtml, element;
            // Create HTML string with placeholder text

            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            else if(type ==='exp'){
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // Replace the placeholder text with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)
        },

        clearFields() {
            let fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.map((current, index, array) => {
                current.value = '';
            } )
            fieldsArr[0].focus();
           

        }

    }
})();

// ---------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------GLOBAL APP CONTROLLER------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------
const controller = ((budgetCtrl, UICtrl) => {
  
  let setupEventListeners = () => {
    let DOM = UIController.getDOMstrings();
    document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', (event) => {
      if (event.keyCode === 13 || event.which === 13) {  
        //event.which is for older browsers only
        event.preventDefault();
        ctrlAddItem();
      }
    })
  };

 
  let ctrlAddItem = () => {
    let input, newItem;

      // 1. Get the field date
    input = UICtrl.getInput();
    // 2. Add the item to the budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value)
    // 3. Add the item to the UI as well
    UICtrl.addListItem(newItem, input.type);
    // 4. Clear the fields
    UICtrl.clearFields();
    // 5. Calculate the budget

    // 6. Display the budget on the UI
   
  }
  // -----------------------RETURN OBJECT---------------------------------------------
  return {
    init() {
      console.log('Application has started');
      setupEventListeners();
    }
  };

})(budgetController, UIController);

controller.init();