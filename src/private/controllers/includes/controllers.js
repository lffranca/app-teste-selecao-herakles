(function(){
	'use strict';

	header.$inject = ['$rootScope','$location','$q'];
	footer.$inject = [];
	buttonssheet.$inject = ['$mdBottomSheet'];

	angular.module('IncludesControllers',[])
	.controller('HeaderPrivateController',header)
	.controller('FooterPrivateController',footer)
	.controller('ButtonsSheetPrivateController',buttonssheet);

	function header($rootScope,$location,$q) {
		var vm = this;

		vm.logout = function() {
			/**using a promise**/
			function deleteRootScope() {
				return $q(function(resolve, reject) {
					delete $rootScope.user;
					resolve('$rootScope deleted');
				});
			}

			var promise = deleteRootScope();
			var promise2 = promise.then(function(data) {
				console.log(data);
				return $q(function(resolve,reject) {
					delete localStorage['postis::selecao::teste'];
					resolve('localStorage deleted');
				});
			}, function(error) {
				console.log(error);
			});
			promise2.then(function(data) {
				console.log(data);
				$location.path('/auth');
			});
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