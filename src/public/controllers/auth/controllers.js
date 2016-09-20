(function(){
	'use strict';

	login.$inject = ['AUTH_MODEL','$mdToast','$mdDialog',"$location","$rootScope","jwtHelper"];

	angular.module('AuthControllers',['MODELS'])
	.controller('LoginPublicController',login);

	function login(AUTH_MODEL,$mdToast,$mdDialog,$location,$rootScope,jwtHelper) {
		var item = function() {
			return {
				email:"",
				password:""
			};
		};

		var showToast = function(message) {
			$mdToast.show($mdToast.simple().textContent(message));
		};

		var showDialog = function() {
			$mdDialog
				.show($mdDialog
				.alert()
				.title('More info goes here.')
				.textContent('Something witty.')
				.ariaLabel('More info')
				.ok('Got it')
				.targetEvent()
			).then(function() {
				
			});
		};

		var send = function() {
			if (vm.item.email&&vm.item.password) {
				AUTH_MODEL.login(vm.item,function(res) {
					if (res.error) showToast('Erro: '+res.error.error);
					else {
						var tokenDecoded = jwtHelper.decodeToken(res);
						$rootScope.user = tokenDecoded.user;
						localStorage['postis::selecao::teste'] = res;
						$location.path('/dashboard');
					}
				}, function(err) {
					showToast('Erro: '+JSON.stringify(err));
				});
			} else {
				showToast('Dados Incompletos!');
			}
		};

		var vm = this;

		vm.message = "asasasas";

		vm.item = item();
		vm.send = send;
	}
})();