// BUDGET CONTROLLER
const budgetController = (() => {

  // Some code

})();


// UI CONTROLLER
const UIController = (() => {

  // Some code

})();


//GLOBAL APP CONTROLLER
const controller = ((budgetCtrl, UICtrl) => {
  
    document.querySelector('.add__btn').addEventListener('click', () => {
      console.log('THE BUTTON WAS..... CLICKEEEEEEED!!!!!!!!4!!!!!!!444!!!!!')
    })

})(budgetController, UIController)