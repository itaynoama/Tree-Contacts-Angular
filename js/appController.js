'use strict';

var app = angular.module('app',[]); 

app.controller('myCtrl', function($scope){

    var node = "";
    
    $scope.nodesArr = [];
    $scope.initializeNodeTree = function(pChildArr) {
        
        var length = pChildArr.length || 0;

        for (var i = 0; i < length; i++) {
            var treeContacts = pChildArr[i];
            var level = 0;
            var childCount = 0;
            if (treeContacts.contacts && treeContacts.contacts.length)
                childCount = treeContacts.contacts.length;
              $scope.nodesArr.push({
                name: treeContacts.name,
                id: treeContacts._id,
                parent: "root",
                toggleStatus: false,
                parentId: -1,
                isShow: true,
                level: 0,
                childCount: childCount,
              });
            if (treeContacts.contacts != undefined)
                $scope.initializeNodeTreeHelper(treeContacts.contacts, treeContacts.name, treeContacts._id, level);
        }
    };

    $scope.initializeNodeTreeHelper = function(pChildArr, pParentName, pPparentId, pLevel) {
        var isShowNode = false;
        pLevel = pLevel + 1;
        for (var i = 0; i < pChildArr.length; i++) {
          var node = pChildArr[i];
          var childCount = node.contacts != undefined ? node.contacts.length : 0
          $scope.nodesArr.push({
            name: node.name,
            id: node._id,
            toggleStatus: false,
            parentId: pPparentId,
            isShow: isShowNode,
            level: pLevel,
            childCount: childCount,
          });
          if (node.contacts != undefined)
            $scope.initializeNodeTreeHelper(node.contacts, node.name, node._id, pLevel)
        }
    };


    $scope.selected = 0;
    $scope.select= function(index) {
       $scope.selected = index; 
    };

    $scope.selectIndentationClass = function(node) {
        return 'level' + node.level;
    };
    
    $scope.toggleStatus = false;
    $scope.toggleDropdown = function(node) {
        node.toggleStatus = node.toggleStatus == true ? false : true;
        $scope.toggleStatus = node.toggleStatus;
        $scope.toggleDropdownHelper(node.id, $scope.toggleStatus);
    };

    $scope.toggleDropdownHelper = function(parentNodeId, toggleStatus) {
        for (var i = 0; i < $scope.nodesArr.length; i++) {
          node = $scope.nodesArr[i];
          if (node.parentId == parentNodeId) {
            if (toggleStatus == false)
              $scope.toggleDropdownHelper(node.id, toggleStatus);
            $scope.nodesArr[i].isShow = toggleStatus;
            }
        }
    };

    $scope.initializeNodeTree(contacts.data);
})

var contacts = {
  "data": [{
    "_id": 1,
    "name": "Friends",
    "type": "Group",
      "contacts": [
      {
        "_id": 2,
        "name": "Udi",
        "type": "Contact",
      }, 
      {
        "_id": 3,
        "name": "Tommy",
        "type": "Contact",
      },
      {
        "_id": 6,
        "name": "Old Friends",
        "type": "Group",
        "contacts": [{
          "_id": 7,
          "name": "Itay",
          "type": "Contact",
        }],
      },          
    ], 
  }, 
  {
    "_id": 4,
    "name": "Family",
    "type": "Group",
    "contacts": [{
      "_id": 5,
      "name": "Roni",
      "type": "Contact",
    }],
  },
  {
    "_id": 8,
    "name": "Ori",
    "type": "Contact",
  }]   
}