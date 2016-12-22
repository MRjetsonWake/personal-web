/**
 * Created by xdyuan on 16/12/21.
 */



(function (angular) {

	'use strict';


	var controller = angular.module('app.controller.main', ['app.service.main']);
	controller.controller('mainController', [
		'$scope',
		'$location',
		'$routeParams',
		'$route',
		'MainService',
		function ($scope, $location, $routeParams, $route, MainService) {

			//0处理路由
			$scope.selector = {};
			//拿到status
			var status = $routeParams.status;
			//console.log(status);
			switch (status) {
				case 'active':
					$scope.selector = {completed: false};
					break;
				case 'completed' :
					$scope.selector = {completed: true};
					break;
				default:
					$route.updateParams({status: ''});
					$scope.selector = {};
					break;
			}


			$scope.text = '';  		 

			$scope.todos = MainService.get(); 		 		 
			$scope.add = function () {

				if($scope.text != ''){
					MainService.add($scope.text);
					$scope.text = '';
				}

			};



			$scope.remove = function (id) {
				MainService.remove(id);
			};

			$scope.clearCompleted = function () {
				$scope.todos =  MainService.clearCompleted();
			};


			$scope.existCompleted = function () {
				return MainService.existCompleted();
			};


			//
			$scope.left = function () { 

				return MainService.left();  
			};


			$scope.currentEditingId = -1;
			$scope.editing = function (id) {
				$scope.currentEditingId = id;
			};

			$scope.save = function () {
				$scope.currentEditingId = -1;
				MainService.save();
				//console.log($scope.todos);
			};

			$scope.toggleAll = function () {
				MainService.toggleAll();
			};



			$scope.toggle = function () {
				MainService.save();
			};




		}]);



})(angular);
