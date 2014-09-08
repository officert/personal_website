(function() {
  'use strict';

  angular.module('app').controller('homeController', [
    '$scope',
    function($scope) {
      $scope.links = [{
        title: 'GitHub',
        url: 'https://github.com/officert',
        icon: 'fa-github'
      }, {
        title: 'LinkedIn',
        url: 'http://lnkd.in/jqpTXe',
        icon: 'fa-linkedin'
      }, {
        title: 'Twitter',
        url: 'https://twitter.com/timothyOfficer',
        icon: 'fa-twitter'
      }];
    }
  ]);
}());
