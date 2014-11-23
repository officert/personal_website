 angular.module('app').config([
   '$stateProvider',
   '$urlRouterProvider',
   function($stateProvider, $urlRouterProvider) {
     'use strict';

     $urlRouterProvider
       .otherwise('/404');

     $stateProvider
       .state('home', {
         url: '',
         templateUrl: '/js/views/home.html',
         controller: 'homeController'
       })
       .state('system.404', {
         url: '404',
         templateUrl: '/js/views/404.html',
         controller: 'errorController'
       });
   }
 ]);
