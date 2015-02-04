'use strict';

/**
 * @ngdoc function
 * @name idlegameApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the idlegameApp
 */
angular.module('idlegameApp')
  .controller('MainCtrl', ['$scope','thegame','$interval',function ($scope,thegame,$interval) {

        $( '.navHome' ).addClass( 'active' );
        $( '.navAbout' ).removeClass( 'active' );


        $scope.value = thegame.get();
        $scope.modifiers = thegame.modifiers;

        thegame.observe(function(){
            $scope.value = thegame.get();
        });
        $scope.btnClick=function(){
            thegame.increase();
            $scope.value = thegame.get();
        };
        $scope.upgrade=function(modifier){
            thegame.upgrade(modifier);
        };

  }]);
