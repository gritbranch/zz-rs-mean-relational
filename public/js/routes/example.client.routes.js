angular.module('example').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      templateUrl: 'js/views/example.client.view.html'
    }).
    otherwise({
      redirectTo: '/'
    });
  }
]);