(function(){
	'use strict';

	func.$inject = ['$mdSidenav','$mdBottomSheet','$timeout','POSTIT_MODEL','$mdToast','$mdDialog'];

	angular.module('PostitControllers',['MODELS'])
	.controller('PostitPrivateController',func);

	function func($mdSidenav,$mdBottomSheet,$timeout,POSTIT_MODEL,$mdToast,$mdDialog) {
		var message = function(message) {
			$mdToast.show($mdToast.simple().textContent(message));
		};

		var item = function() {
			return {
				description:"",
				text:""
			};
		};

		var getAll = function() {
			POSTIT_MODEL.getall(function(res) {
				if (res.error) console.log(res.error);
				vm.items = res;
			}, function(err) {
				console.log(err);
			});
		};

		var options = function(data) {
			$mdSidenav('sidenav-create')
			.close()
			.then(function(){
				$mdSidenav('sidenav-edit')
				.close()
				.then(function(){
					$mdBottomSheet.show({
						templateUrl: 'views/private/includes/buttons.sheet.html',
						controller: 'ButtonsSheetPrivateController',
						controllerAs:'vm'
					}).then(function(item) {
						if (item==='edit') {
							vm.item = angular.copy(data);
							$mdSidenav('sidenav-edit').open();
						} else {
							vm.item = angular.copy(data);
							dialogDelete();
						}
					});
				});
			});
		};

		var sidenavCreate = function() {
			vm.item = item();
			$mdSidenav('sidenav-edit')
			.close()
			.then(function(){
				$mdSidenav('sidenav-create').open();
			});
		};

		var closeSidenav = function() {
			$mdSidenav('sidenav-edit').close();
			$mdSidenav('sidenav-create').close();
		};

		var dialogDelete = function() {
			$mdDialog.show({
				contentElement: '#dialogDelete',
				parent: angular.element(document.body)
			});
		};
		var cancelDelte = function() {
			vm.item = item();
			$mdDialog.hide();
		};

		var save = function() {
			var _create = function() {
				if (vm.item.description&&vm.item.text) {
					POSTIT_MODEL.create(vm.item,function(res){
						if (res.error) message('Erro: '+res.error.error);
						else {
							message('Salvo com sucesso!');
							vm.item = item();
							closeSidenav();
							getAll();
						}
					}, function(err) {
						message('Erro: '+err);
					});
				} else {
					if (!vm.item.description) {
						message('Descrição é Obrigatória');
					} else if (!vm.item.text) {
						message('Texto é Obrigatório');
					} else {
						message('Não foi possível salvar! Entre em contato com o adminsitrador do sistema.');
					}
				}
			};
			var _update = function() {
				if (vm.item.id&&vm.item.description&&vm.item.text) {
					POSTIT_MODEL.update(vm.item.id,vm.item,function(res){
						if (res.error) message('Erro: '+res.error.error);
						else {
							message('Salvo com sucesso!');
							vm.item = item();
							closeSidenav();
							getAll();
						}
					}, function(err) {
						message('Erro: '+err);
					});
				} else {
					if (!vm.item.id) {
						message('ID é Obrigatório');
					} else if (!vm.item.description) {
						message('Descrição é Obrigatória');
					} else if (!vm.item.text) {
						message('Texto é Obrigatório');
					} else {
						message('Não foi possível salvar! Entre em contato com o adminsitrador do sistema.');
					}
				}
			};
			var _delete = function() {
				if (vm.item.id) {
					POSTIT_MODEL.delete(vm.item.id,{},function(res){
						if (res.error) message('Erro: '+res.error.error);
						else {
							message('Deletado com sucesso!');
							cancelDelte();
							getAll();
						}
					}, function(err) {
						message('Erro: '+err);
					});
				} else {
					if (!vm.item.id) {
						message('ID é Obrigatório');
					} else {
						message('Não foi possível salvar! Entre em contato com o adminsitrador do sistema.');
					}
				}
			};
			return {
				create:_create,
				update:_update,
				delete:_delete
			};
		};

		var vm = this;

		vm.item = item();
		vm.items = [];

		vm.options = options;

		vm.sidenavCreate = sidenavCreate;

		vm.closeSidenav = closeSidenav;

		vm.cancelDelte = cancelDelte;

		vm.save = save();

		getAll();
	}
})();