/**
 * Created by xdyuan on 16/12/21.
 */

'use strict';

(function (angular) {

	angular.module('app.service.main', [])
		.service('MainService', ['$window', function ($window) {

			var localStorage = $window.localStorage;
			var todos = localStorage['my_todo_list'] ? JSON.parse(localStorage['my_todo_list']) : [];

			this.save = function () {
				localStorage['my_todo_list'] = JSON.stringify(todos);
			};



			//暴露todos
			this.get = function () {

				return todos;

			};

			this.add = function (text) {
					todos.push({
						id : getId(),
						text : text,
						completed : false
					});

				this.save();
			};

			//解决一下id重复的问题
			function getId() {
				var id = Math.random();
				for(var i=0; i<todos.length; i++){
					if(id == todos[i].id) {
						id = getId();
					}
				}
				return id;
			}

			this.remove = function (id) {
				for(var i=0; i<todos.length; i++){
					if(id == todos[i].id){
						todos.splice(i, 1);
						break;
					}
				}
				this.save();

			};

			// 检测是否有未完成的， 然后控制按钮的消失和显示
			this.existCompleted = function () {
				for(var i=0; i<todos.length; i++){
					if(todos[i].completed){
						return true;
					}
				}
				return false;
			};

			this.clearCompleted = function () {
				var len = todos.length, result=[];
				for(var i=0; i< len; i++){
					if(!todos[i].completed){
						result.push(todos[i]);
					}
				}
				todos = result;
				result = [];
				this.save();
				return todos;
			};


			this.left = function () {
				var leftCount = 0, len=todos.length;
				for(var i=0; i< len; i++){
					if(!todos[i].completed){ 
						leftCount++;
					}
				}
				return leftCount;
			};


			//arrow 实现全选全不选
			var now = true;
			this.toggleAll = function () {
				var len=todos.length;
				for(var i=0; i< len; i++){
					todos[i].completed = now;
				}
				now = !now;

				this.save();
			};




		}]);


})(angular);
