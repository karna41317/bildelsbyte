'use strict';

var app = angular.module('app', ['ngRoute']).config(function($routeProvider) {

    return $routeProvider.when('/', {
        templateUrl: 'Views/startsida.html'
    })

    .when('/kamremmssatser', {
        templateUrl: 'Views/kamremmssatser.html',
        controller: 'dropdownCtrl',
    })
        .when('/kamrem', {
            templateUrl: 'Views/kamrem.html',
        })
        .when('/vattenpump', {
            templateUrl: 'Views/vattenpump.html',
        })
        .when('/priser', {
            templateUrl: 'Views/priser.html',
        })
        .when('/reservdelar', {
            templateUrl: 'Views/reservdelar.html'
        })

    .when('/webshop', {
        templateUrl: 'Views/webshop.html',
    })

    .when('/contact', {
        templateUrl: 'Views/contact.html',
    })

    .otherwise({
        redirectTo: '/'
    });
});

function dropdownCtrl($scope, $http, filterFilter) {
    $scope.selectedParentItem = '';
    $scope.parentItems = [

        {
            "id": 0,
            "displayName": "Please select Brand"
        }, {
            "id": 1,
            "displayName": "Volvo"
        }, {
            "id": 2,
            "displayName": "Ford"
        }

    ];

    $scope.selectedParentItem = $scope.parentItems[0];
    $scope.childItems = [];
    $http.get('assets/js/models.json').then(function(res) {
        $scope.childItems = res.data;
       

    });

    $scope.filteredArray = [];
    $scope.$watch("selectedParentItem", function() {
        $scope.filteredArray = filterFilter($scope.childItems, {
            parentId: $scope.selectedParentItem.id
        });
        $scope.selectedChildItem = $scope.filteredArray[0];
    }, true);

    $scope.grandChildItems = [];
    $http.get('assets/js/engines.json').then(function(result) {
        $scope.grandChildItems = result.data;
    });
    $scope.filteredArray1 = [];
    $scope.$watch("selectedChildItem", function() {
        $scope.filteredArray1 = filterFilter($scope.grandChildItems, {
            childId: $scope.selectedChildItem.id
        });
        $scope.selectedGrandChildItem = $scope.filteredArray1[0];

    }, true);
    /*
    $scope.grandChildItems = [];
     $http.get('assets/js/engines.json').then(function(result){
          $scope.grandChildItems = result.data;  
        });

    $scope.selectedGrandChildItem = $scope.grandChildItems[0];
*/
    $scope.$watch("selectedGrandChildItem", function() {

        if (!($scope.selectedGrandChildItem)) {
            $scope.showitem = 'Please select your model';
        } else {
            $scope.showitem = $scope.selectedGrandChildItem.article;

        }

    }, true);

}