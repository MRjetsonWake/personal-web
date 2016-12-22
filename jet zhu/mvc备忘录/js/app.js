(function (window, angular) {
	//严格模式
	'use strict';

	// Your starting point. Enjoy the ride!


	//1 、创建一个模块   给body加上ng-app，
	var myApp = angular.module('myTodoMVC', ['ngRoute', 'app.controller.main']);
	//配置路由
	myApp.config(['$routeProvider','$locationProvider', function ($routeProvider, $locationProvider) {

		$locationProvider.hashPrefix('');


		// hash值改变时, 控制器里面的模板会再次刷新
		$routeProvider
			.when("/:status?", {
				controller: "mainController",
				templateUrl: "todomvc_template" //模板必须要写
			})
			//redirectTo替换路径
			.otherwise({redirectTo:''});

	}]);

/*
	myApp.controller('mainController', ['$scope','$location', '$routeParams','$route',  function ($scope, $location, $routeParams, $route) {

		//0处理路由
		$scope.selector = {};
		//拿到status
		var status = $routeParams.status;
		//console.log(status);
		switch(status){
			case 'active':
				$scope.selector = {completed : false};
				break;
			case 'completed' :
				$scope.selector = {completed : true};
				break;
			default:
				//这句话是为了输入不是我们想要的hash值时, 会自动跳转到all
				$route.updateParams({status: ''});
				$scope.selector = {};
				break;
		}

		//1  这是保存输入的值
		$scope.text = '';

		//2  任务列表的填写
		//结构： {id：1 ， text : '睡觉'， completed：true}
		//大家以后再做数据时， 最好给一个id， 无论需不需要
		$scope.todos = [
            {id:1, text: '睡觉', completed : true},
            {id:2, text: '休息', completed : true},
            {id:3, text: '学习', completed : false}
        ];


		//3  添加新的事件
		$scope.add = function () {

			if($scope.text != ''){
				$scope.todos.push({
					//id : $scope.todos.length+1,   自增的方式会导致id的重复
					id : getId(),
					text : $scope.text,
                    completed : false
				})
			}
			//结束添加之后需要滞空这个输入框， text
            $scope.text = '';
        };

		//解决一下id重复的问题    使用递归
		function getId() {
			var id = Math.random();
            for(var i=0; i<$scope.todos.length; i++){
            	if(id == $scope.todos[i].id) {
            		id = getId();
				}
			}
			return id;
        }

        //4 、删除某一条   根据传递进来的id去做一个删除
		$scope.remove = function (id) {
			for(var i=0; i<$scope.todos.length; i++){
				if(id == $scope.todos[i].id){
					//删除这个元素、
                    $scope.todos.splice(i, 1);//删除元素
					break;//跳出循环
				}
			}
        };

        //5  检测是否有未完成的， 然后控制按钮的消失和显示
		$scope.existCompleted = function () {
            for(var i=0; i<$scope.todos.length; i++){
               if($scope.todos[i].completed){
               	//有已经完成的就返回true
               		return true;
			   }
            }
            return false;
        };
		//6 清除已经完成的内容
		/!*会造成数组越界， 没法实现
        $scope.clearCompleted = function () {
        	var len = $scope.todos.length;
            for(var i=0; i< len; i++){
                if($scope.todos[i].completed){
                    $scope.todos.splice(i, 1);
                }
            }
        };
        *!/
        $scope.clearCompleted = function () {
            var len = $scope.todos.length, result=[];
            for(var i=0; i< len; i++){
                if(!$scope.todos[i].completed){
                    result.push($scope.todos[i]);
                }
            }
            $scope.todos = result;
			result = [];
        };


        //多少项目没有完成
        $scope.left = function () {
			var leftCount = 0, len=$scope.todos.length;

            for(var i=0; i< len; i++){
                if(!$scope.todos[i].completed){
                   leftCount++;
                }
            }

            return leftCount;

        };


        //7 编辑
		$scope.currentEditingId = -1;  //没有任何一个id会等于-1
		$scope.editing = function (id) {
			//console.log(id);
            $scope.currentEditingId = id;
        };

        //8  编辑完成之后回车保存
		$scope.save = function () {
			//把currentEditingId重新赋值成-1 ， 没有任何一个todo的id会和他相等， 也就都没有editig这个类型
			//数据是双向绑定的， 不需要再操作这个数组。
            $scope.currentEditingId = -1;
            console.log($scope.todos);
        };


        //9 实现全选全不选
		var now = true;
		$scope.toggleAll = function () {
            var len=$scope.todos.length;
            for(var i=0; i< len; i++){
                $scope.todos[i].completed = now;
            }
            now = !now;
        };


        //10   筛选   all active completed三个按钮的事件
//		$scope.selector = {};

		//处理哈希值

		//console.log($location.hash());
		//从外面注入的
		$scope.$loca = $location;
		//console.log($scope.$loca.hash());

        // $scope.$watch('$loca.hash()', function (now, old) {
        //     // console.log(now);
        //     // console.log(old);
        //     switch (now){
        //         case '/active':
        //             $scope.selector = {completed : false};
        //             break;
        //         case '/completed':
        //             $scope.selector = {completed : true};
        //             break;
        //         case '/':
        //             $scope.selector = {};
        //             break;
        //     }
        // });
		//完全比较
        $scope.comparator = function (actual, expected) {

			return angular.equals(actual, expected);
        };



    }]);
*/

})(window, angular);





//这样子会造成内存泄露吗？

