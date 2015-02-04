'use strict';

/**
 * @ngdoc overview
 * @name idlegameApp
 * @description
 * # idlegameApp
 *
 * Main module of the application.
 */
angular
  .module('idlegameApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
