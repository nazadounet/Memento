app.controller('MapCtrl', function($window, $scope, $state, $cordovaGeolocation, MapService, $ionicLoading, User, Auth, $cordovaBarcodeScanner) {

    Auth.ref().onAuth(function(authData) {
        if (authData) {
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

/*
            $ionicLoading.show({
                template: 'Loading...'
            });
            */
            var options = {timeout: Infinity, enableHighAccuracy: false};

            $scope.initMap = function(){

                $cordovaGeolocation.getCurrentPosition(options).then(function (position) {

                    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                    var mapOptions = {
                        center: latLng,
                        zoom: 15,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };

                    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

                    var watchOptions = {
                        timeout : 3000,
                        enableHighAccuracy: false // may cause errors if true
                    };

                    var watch = $cordovaGeolocation.watchPosition(watchOptions);

                    watch.then(
                        null,
                        function (err) {
                            console.log('watch marche pas');
                        },
                        function (position) {
                            var watchLatLng = {lat : position.coords.latitude , lng : position.coords.longitude};

                            google.maps.event.addListener($scope.map, 'idle', function () {

                                //marker de l'user
                                var customIcon= "../../img/location-arrow.svg";
                                var marker = new google.maps.Marker({
                                    map: $scope.map,
                                    position: watchLatLng,
                                    icon: customIcon
                                });
                            });

                        }
                    );

                    //Wait until the map is loaded
                    google.maps.event.addListener($scope.map, 'idle', function () {

                        //marker de l'user
                        var customIcon= "../../img/location-arrow.svg";
                        var marker = new google.maps.Marker({
                            map: $scope.map,
                            position: latLng,
                            icon: customIcon
                        });
                    });


                    var markerData = User.getMarkerObject();

                    markerData.on('child_added', function (data) {
                        var markerUser = data.val();

                        var latLng = new google.maps.LatLng(markerUser.lat, markerUser.lng);
                        var customIcon1= "../../img/iconeMap.png";
                        // Place a marker at that location.
                        var marker = new google.maps.Marker({
                            position: latLng,
                            map: $scope.map,
                            icon: customIcon1
                        });
                    });

                    watch.clearWatch();


                    //$ionicLoading.hide()
                }, function (error) {
                    console.log("Could not get location");
                });
            };

        } else {
            $state.go('SignIn');
            console.log("Client unauthenticated.")
        }
    });

   });
