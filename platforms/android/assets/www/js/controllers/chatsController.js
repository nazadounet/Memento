app.controller('ChatsCtrl', function($scope, $firebaseArray, Auth, $rootScope, User){


    Auth.ref().onAuth(function(authData) {
        if (authData) {
            
            $scope.messages = $firebaseArray(Auth.ref().child('tchat'));
            
            $scope.sendMsg = function() {
                $scope.messages.$add({
                    'username': $rootScope.username,
                    'date' : new Date().getTime(),
                    'content': $scope.contente,
                    'team': $rootScope.team
                });
                $scope.contente = '';
            };
                    
        } else {
            console.log("Client unauthenticated.")
        }
    });

});
