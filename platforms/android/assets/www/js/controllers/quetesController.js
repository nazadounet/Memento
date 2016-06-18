app.controller('QueteCtrl', function($scope, $ionicPopup, $state, Auth, $rootScope) {


    Auth.ref().onAuth(function(authData) {
        if (authData) {

            $scope.equipeSens = 'sens';
            $scope.equipeLogique = 'logique';

            $scope.Scan = function () {
                $cordovaBarcodeScanner.scan().then(function() {

                    var getAuth = Auth.ref().getAuth();
                    var ref = Auth.ref().child(getAuth.uid).child('markers').child('marker1');
                    ref.remove().then(function () {
                        $window.location.reload(true);
                    })

                }, function(error) {
                    console.log("An error happened -> " + error);
                });

            };

            /* partie logique*/

            $scope.user={};

            $scope.answerSens = function () {

                var goodAnswer = 'fontaine des éléphant';

                if($scope.user.answerSens == goodAnswer){
                    $ionicPopup.alert({
                        title: 'Réponse validé',
                        template: 'Vous avez trouvé la bonne réponse !'
                    }).then(function () {
                        $state.go('tab.quete');
                    });
                }else if($scope.user.answer == null){
                    $ionicPopup.alert({
                        title: 'Réponse non validé',
                        template: 'Veuillez entrer une réponse'
                    });
                }else{
                    $ionicPopup.alert({
                        title: 'Réponse non validé',
                        template: 'Mauvaise réponse !'
                    });
                }
            };

            $scope.answerSens = function () {

                var goodAnswer = 'éléphant';

                if($scope.user.answerSens == goodAnswer){
                    $ionicPopup.alert({
                        title: 'Réponse validé',
                        template: 'Vous avez trouvé la bonne réponse !'
                    }).then(function () {
                        $state.go('tab.quete');
                    });
                }else if($scope.user.answer == null){
                    $ionicPopup.alert({
                        title: 'Réponse non validé',
                        template: 'Veuillez entrer une réponse'
                    });
                }else{
                    $ionicPopup.alert({
                        title: 'Réponse non validé',
                        template: 'Mauvaise réponse !'
                    });
                }
            };



        } else {
            $state.go('SignIn');
        }
    });
    
});
