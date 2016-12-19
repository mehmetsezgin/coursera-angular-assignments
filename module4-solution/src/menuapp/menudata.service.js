(function () {
'use strict';

angular.module('MenuApp')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$http', 'ApiBasePath']
function MenuDataService($http, ApiBasePath) {
  var service = this;

  // List of shopping items
  var items = [];

  // Simulates call to server
  // Returns a promise, NOT items array directly
  service.getAllCategories = function () {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    }).then(function (result) {
      // process result and only keep items that match
      var allCategories = result.data;
      // for(var i=0; i<allCategories.length; i++){
      //     categories.push(allItems[i]);
      // }
      // return processed items
      return allCategories;
    });
  };

  service.getItemsForCategory = function (categoryShortName) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json?category=" + categoryShortName)
    }).then(function (result) {
      // process result and only keep items that match
      var allItems = result.data.menu_items;
      // return processed items
      return allItems;
    });
  };
}

})();
