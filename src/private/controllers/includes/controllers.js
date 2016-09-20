(function(){
	'use strict';

	header.$inject = ['$rootScope','$location'];
	footer.$inject = [];
	buttonssheet.$inject = ['$mdBottomSheet'];

	angular.module('IncludesControllers',[])
	.controller('HeaderPrivateController',header)
	.controller('FooterPrivateController',footer)
	.controller('ButtonsSheetPrivateController',buttonssheet);

	function header($rootScope,$location) {
		var vm = this;
		vm.logout = function() {
			delete $rootScope.user;
			delete localStorage['postis::selecao::teste'];
			$location.path('/auth');
		};
	}

	function footer() {

	}

	function buttonssheet($mdBottomSheet) {
		this.listItemClick = function(data) {
			$mdBottomSheet.hide(data);
		};
	}
})();