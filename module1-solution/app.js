(function(){
  'use strict';
  angular.module('LunchCheck',[])
  .controller('LunchCheckController', LunchCheckController);
  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController ($scope){
   $scope.items = "";
   $scope.message = "";
   $scope.checkLunch = function(){
     var size = numberOfItems($scope.items);
     if( size  <= 3 && size > 0){
       $scope.message = "Enjoy!";
     }else if(size > 3){
       $scope.message = "Too much!";
     }else{
       $scope.message = "Please enter data first";
     }

  };

  function numberOfItems(items){
    if(items === ""){
      return 0;
    }else{
      var itemArray = items.split(',');
      var itemsLength = 0;
      for (var i=0; i<itemArray.length; i++) {
        if (itemArray[i].trim()) {
          itemsLength++;
        }
      }
      return itemsLength;
    }
  }
}
})();
