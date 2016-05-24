var fbURL = "https://volgnummer.firebaseio.com"


angular.module('client', ["firebase"]).controller("helpCtrl", ["$scope", "$firebaseArray", function($scope, $firebaseArray) {
  var ref = new Firebase(fbURL)
  var myId = 0;
  $scope.list = $firebaseArray(ref);
  console.log($scope.list);
  $scope.output = "Help me Please!"
  $scope.f = false
    // add an item
  $scope.helpMe = function() {
    console.log("adding stuff")
    $scope.list.$add({
      Naam: $scope.naam,
      Reden: $scope.reden,
      t: Firebase.ServerValue.TIMESTAMP,
      done:false
    }).then(function(ref){
      $scope.f=true;
      $scope.output = "Hold on, help is comming!";
      myId = ref.key();
      console.log("added record with id " + myId);
      console.log($scope.list.$getRecord(myId))
    })
  }
  $scope.list.$watch(function(event) {
    var audio = new Audio('audio_file.mp3');
    audio.play();
    console.log("watching -->",event.key);
    console.log("myId = ", myId)
    if(event.key == myId){
      console.log("Hey, you are talking about me? Nice!")
      $scope.f = false
      $scope.output = "Help me Please!";
  }
});

  $scope.deleteHelp = function(item) {
    console.log("change item state to done", item)
    item.done = true
    item.donet = Firebase.ServerValue.TIMESTAMP
    $scope.list.$save(item).then(function(ref) {
      $scope.f=false
    });
  }
    // via $bindTo  een 3 way binding opzetten naar de client, zo kan die zijn
    // bijbehoren record blijven volgen!!
}]);
