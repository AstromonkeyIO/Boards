var app = angular.module('TaskTracker', []);
app.controller('DashboardController', function($scope) {

      $scope.boardsList = [];
   	  $scope.num = 0;
      
      $scope.createBoard = function(){
       $scope.num++;
       $scope.boardsList.push({
         name: 'Board' + $scope.num,
         description: 'dentist'
       });
        console.log('Creating board...', $scope.num);
        console.log("$scope is in ", $scope.boardsList);
     };
});
