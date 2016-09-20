(function(){
	'use strict';

	authModel.$inject = ['$http','APP_SETTINGS'];
	postIt.$inject = ['$http','APP_SETTINGS'];

	angular.module('MODELS',[])
	.constant('APP_SETTINGS',{
		URL_API_PUBLIC:"http://localhost:3000/public/",
		URL_API_PRIVATE:"http://localhost:3000/api/",
	})
	.filter('perfil',['$filter',function($filter) {
		return function(input) {
			return ($filter('limitTo')(input.split(" ")[0],1)+$filter('limitTo')(input.split(" ")[1],1));
		}
	}])
	.factory('AUTH_MODEL',authModel)
	.factory('POSTIT_MODEL',postIt);

	function authModel($http,APP_SETTINGS) {
		return {
			login:function(item,success,error){
				$http.post(APP_SETTINGS.URL_API_PUBLIC+'auth/login',item).success(success).error(error);
			},
		};
	}

	function postIt($http,APP_SETTINGS) {
		var token = localStorage['postis::selecao::teste'];
		var url = APP_SETTINGS.URL_API_PRIVATE+'postits/';
		return {
			getall:function(success,error){
				$http({
					method:'GET',
					url:url+'',
					headers: {
						'Authorization':'Bearer ' + token
					}
				}).success(success).error(error);
			},
			create:function(data,success,error){
				$http({
					method:'POST',
					url:url+'',
					data:data,
					headers: {
						'Authorization':'Bearer ' + token
					}
				}).success(success).error(error);
			},
			update:function(id,data,success,error){
				$http({
					method:'PUT',
					url:url+id,
					data:data,
					headers: {
						'Authorization':'Bearer ' + token
					}
				}).success(success).error(error);
			},
			delete:function(id,data,success,error){
				$http({
					method:'DELETE',
					url:url+id,
					data:data,
					headers: {
						'Authorization':'Bearer ' + token
					}
				}).success(success).error(error);
			},
			byid:function(data,success,error){
				$http({
					method:'GET',
					url:url+data,
					headers: {
						'Authorization':'Bearer ' + token
					}
				}).success(success).error(error);
			},
			search:function(data,success,error){
				$http({
					method:'GET',
					url:url+'search/'+data,
					headers: {
						'Authorization':'Bearer ' + token
					}
				}).success(success).error(error);
			},
		};
	}
})();