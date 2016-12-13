(function(){
  'use strict';
  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService',MenuSearchService)
  .directive('foundItems', FoundItemsDirective)
  .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

  NarrowItDownController.$inject = ['MenuSearchService'];

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };

    return ddo;
  }

  function FoundItemsDirectiveController() {
    var list = this;
    list.searchTermInList = function () {
      if(list.items.length == 0){
        return true;
      }
      return false;
    };
  }


  function NarrowItDownController (MenuSearchService){
    var list = this;
    list.searchTerm = "";
    list.items = [];
    list.findItems  = function (){
      var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);
      promise.then(function (response) {
        list.items = response;
      })
      .catch(function (error) {
        console.log(error);
      })
    }

    list.removeItem = function (itemIndex) {
      list.items.splice(itemIndex,1);
    };
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath){
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      }).then(function (result) {
        // process result and only keep items that match
        var foundItems = [];
        var allItems = result.data.menu_items;
        for(var i=0; i<allItems.length; i++){
          if(allItems[i].description.indexOf(searchTerm)> -1 ){
            foundItems.push(allItems[i]);
          }
        }
        // return processed items
        return foundItems;
      });
    }
  }
})();
