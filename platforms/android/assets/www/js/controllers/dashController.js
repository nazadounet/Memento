app.controller('DashCtrl', function(Auth, $state, $scope, $rootScope, User) {

   Auth.ref().onAuth(function(authData) {
        if (authData) {
            $scope.Scan = function () {
                $cordovaBarcodeScanner.scan().then(function() {

                }, function(error) {
                    console.log("An error happened -> " + error);
                });

            };

        $scope.logOut = function () {
            Auth.ref().unauth();
            $state.go('SignIn');
        };
            $scope.passChange = function () {
                $scope.user = {};
                Auth.ref().changePassword({
                    email       : $scope.user.email,
                    oldPassword : $scope.user.oldPassword,
                    newPassword : $scope.user.newPassword
                }, function(error) {
                    if (error === null) {
                        console.log("Password changed successfully");
                    } else {
                        console.log("Error changing password:", error);
                    }
                });

            };

            console.log("Authenticated with uid:", authData.uid);
        } else {
            console.log("Client unauthenticated.");
            $state.go('SignIn');
        }
    })

});