angular.module('articles').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/articles', {
      templateUrl: 'js/views/articles-list.client.view.html'
    }).
    when('/articles/create', {
      templateUrl: 'js/views/articles-create.client.view.html'
    }).
    when('/articles/:articleId', {
      templateUrl: 'js/views/articles-view.client.view.html'
    }).
    when('/articles/:articleId/edit', {
      templateUrl: 'js/views/articles-edit.client.view.html'
    });
  }
]);