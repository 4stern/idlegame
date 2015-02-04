'use strict';

/**
 * @ngdoc function
 * @name idlegameApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the idlegameApp
 */
angular.module('idlegameApp')
  .controller('AboutCtrl', function ($scope) {
    $( '.navHome' ).removeClass( 'active' );
    $( '.navAbout' ).addClass( 'active' );
  });
