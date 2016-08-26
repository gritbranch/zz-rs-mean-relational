angular.module('users').factory('Authentication', [
  function() {
    this.user = window.user;
    console.log("Authentication Factory - Current User: ");
    console.log(user);
    return {
      user: this.user
    };
  }
]);