(function(){
	'use script';
	angular.module('PrivateDirectives',[])
    .directive('myPostIt', function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: 'views/private/directives/postit.html',
            scope: {
                description:'@',
                date:'@'
            }
        };
    })
	.directive('myCard', function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: 'views/private/directives/card.html',
            scope: {},
            link: function(scope,element,attrs,ctrl) {

            }
        };
    })
    .directive('myCardHeader', function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: 'views/private/directives/card-header.html',
            scope: {}
        };
    })
    .directive('myCardBody', function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: 'views/private/directives/card-body.html',
            scope: {}
        };
    });
})();