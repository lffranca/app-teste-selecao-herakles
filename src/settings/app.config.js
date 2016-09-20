(function() {
	'use strict';
	var settings = function($stateProvider,$urlRouterProvider,$mdThemingProvider) {
		/**SETTINGS ROUTES**/
		$urlRouterProvider.otherwise("/");

		$stateProvider
		/**PUBLIC**/
		.state('index', {
			url: "/",
			views: {
				"header": {
					templateUrl: "views/public/includes/header.html"
				},
				"footer": {
					templateUrl: "views/public/includes/footer.html"
				},
				"body": {
					controller:"HomeIndexController",
					controllerAs:"vm",
					templateUrl: "views/public/home/index.html"
				}
			}
		})
		.state('auth', {
			url: "/auth",
			views: {
				"body": {
					controller:"LoginPublicController",
					controllerAs:"vm",
					templateUrl: "views/public/auth/login.html"
				}
			},
			resolve: {
				auth: ['$location','jwtHelper',function($location,jwtHelper) {
					if (localStorage['postis::selecao::teste']) {
						if (!jwtHelper.isTokenExpired(localStorage['postis::selecao::teste'])) {
							$location.path('/dashboard');
						}
					}
				}]
			}
		})
		/**PRIVATE**/
		.state('dashboard', {
			url: "/dashboard",
			views: {
				"header": {
					controller:'HeaderPrivateController',
					controllerAs:'demo',
					templateUrl: 'views/private/includes/header.html'
				},
				"footer": {
					controller:'FooterPrivateController',
					controllerAs:'vm',
					templateUrl: 'views/private/includes/footer.html'
				},
				"body-auth": {
					templateUrl: "views/private/dashboard/index.html",
					controller:"PostitPrivateController",
					controllerAs:"vm"
				}
			},
			resolve: {
				auth: ['$location','jwtHelper',function($location,jwtHelper) {
					if (localStorage['postis::selecao::teste']) {
						if (jwtHelper.isTokenExpired(localStorage['postis::selecao::teste'])) {
							delete localStorage['postis::selecao::teste'];
							$location.path('/auth');
						}
					} else {
						$location.path('/auth');
					}
				}]
			}
		});
		/**SETTING THEMING**/
		$mdThemingProvider.theme('default')
	    .primaryPalette('indigo')
	    .accentPalette('orange');
	};
	settings.$inject = ['$stateProvider','$urlRouterProvider','$mdThemingProvider'];

	var running = function($rootScope,jwtHelper,$location) {
		if (localStorage['postis::selecao::teste']) {
			if (!jwtHelper.isTokenExpired(localStorage['postis::selecao::teste'])) {
				$rootScope.user = jwtHelper.decodeToken(localStorage['postis::selecao::teste']).user;
			} else {
				delete localStorage['postis::selecao::teste'];
			}
		}
	};
	running.$inject = ['$rootScope','jwtHelper','$location'];

	angular.module('selecao', [
		'ui.router',
		'ngMaterial',
		'angular-jwt',
		'selecao.public.controllers',
		'selecao.private.controllers',
		'selecao.directives'
	]).config(settings).run(running);
})();