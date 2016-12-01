(function(){
  'use strict';
  angular.module('ShoppingListCheckOff',[])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService',ShoppingListCheckOffService);
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];


  function ToBuyController (ShoppingListCheckOffService){
    var buyList = this;

    buyList.buyItems = ShoppingListCheckOffService.getToBuyItems();
    buyList.buyItem = function (itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
}

function AlreadyBoughtController (ShoppingListCheckOffService){
  var boughtList = this;
  boughtList.boughtItems = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService(){
    var service = this;
    var toBuyItems = [
      {
        name: "Cookies",
        quantity: "10"
      },
      {
        name: "Milk",
        quantity: "2"
      },
      {
        name: "Donuts",
        quantity: "2"
      },
      {
        name: "Chocolate",
        quantity: "5"
      },
      {
        name: "Sugary Drink",
        quantity: "6"
      }
    ];

    var boughtItems = [];

    service.buyItem = function (itemIndex) {
      var item = toBuyItems[itemIndex];
      boughtItems.push(item);
      toBuyItems.splice(itemIndex, 1);
    };

    service.getToBuyItems = function () {
      return toBuyItems;
    };

    service.getBoughtItems = function () {
      return boughtItems;
    };

}
})();
