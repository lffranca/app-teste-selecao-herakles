(function(){
	'use strict';

	func.$inject = ['$mdSidenav','$timeout'];

	angular.module('ClientControllers',[])
	.controller('ClientPrivateController',func);

	function func($mdSidenav,$timeout) {
		var type = '';

		var item = function(name=null,email=null,phone=null) {
			return {
				name:name,
				email:email,
				phone:phone
			};
		}

		var buildToggler = function (componentId) {
			return function() {
				$mdSidenav(componentId).toggle();
			}
		};

		var edit = function(index,data) {
			vm.item = angular.copy(data);
			type = 'edit';
			vm.toggleSidenav();
		};

		var del = function(index,data) {
			vm.items.splice(1,index);
		};

		var add = function() {
			console.log(vm.item);
			if (type!=='edit') {
				vm.items.push(vm.item);
				$timeout(function(){
					vm.item = item();
				},100);
			} else {
				$timeout(function(){
					vm.items.splice(vm.item.index,1,vm.item);
					vm.item = item();
					type = null;
				},100);
			}
		}

		var vm = this;

		vm.items = [
			item(
				'Lucas França',
				'lucas.teleinfo@gmail.com',
				'(88)997680894'
			),
			item(
				'Jessica Saraiva',
				'jessica.saraiva_@hotmail.com',
				'(85)000000000'
			),
			item(
				'Marcos Moreira',
				'mar.apm@hotmail.com',
				'(85)000000000'
			),
		];

		vm.item = item();

		vm.toggleSidenav = buildToggler('clients');

		vm.add = add;
		vm.edit = edit;
		vm.delete = del;
	}
})();