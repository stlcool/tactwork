var app = angular.module("app", ["firebase", "ngMaterial", "ngRoute"])
.config(function($mdIconProvider, $mdThemingProvider, $routeProvider, $locationProvider) {
  $mdIconProvider
    .defaultIconSet("./images/svg/avatars.svg", 128)
    .icon("menu"       , "./images/svg/menu.svg"        , 24)
    .icon("share"      , "./images/svg/share.svg"       , 24)
    .icon("google_plus", "./images/svg/google_plus.svg" , 512)
    .icon("hangouts"   , "./images/svg/hangouts.svg"    , 512)
    .icon("twitter"    , "./images/svg/twitter.svg"     , 512)
    .icon("phone"      , "./images/svg/phone.svg"       , 512);

  $mdThemingProvider.definePalette('tactwork', {
    '50': 'f9f9f9',
    '100': 'f5f5f5',
    '200': 'e0e0e0',
    '300': 'EDE7F6',
    '400': '7e57c2',
    '500': '4A148C', //teal 500
    '600': '1c1032', //darker shade of deep-purple 500 & md-hue-2
    '700': '2A184B',
    '800': '1C1032',
    '900': '0e0819',
    'A100': 'FAFAFA', //background color theme.
    'A200': '4A148C', //5E35B0
    'A400': '214EAF',
    'A700': '212837',
    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                        // on this palette should be dark or light
    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
     '200', '400', 'A100', 'A700'],
    'contrastLightColors': 'dark'    // could also specify this if default was 'dark'
  });
  $mdThemingProvider.theme('default')

    .primaryPalette('grey', {
      'default': '900', // by default use shade 400 from the pink palette for primary intentions
    })
    .accentPalette('teal', {
      'default': '500',
      'hue-1': 'A100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
    .warnPalette('pink', {
      'default': '500',
      'hue-1': 'A100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A700' // use shade A100 for the <code>md-hue-3</code> class
    })


  $mdThemingProvider.setDefaultTheme('default');
  //start routeProvider config for views & controllers

  $routeProvider.when('/articles', {
    templateUrl: 'partials/post-list.html', controller: PostListCtrl
  });
  $routeProvider.when('/articles/:postId', {
    templateUrl: 'partials/post-detail.html', controller: PostDetailCtrl
  });
  $routeProvider.when('/contact', {
    templateUrl: 'partials/contact.html'
  });
  $routeProvider.when('/home', {
    templateUrl: 'partials/home.html'
  });
  $routeProvider.when('/about', {
    templateUrl: 'partials/about.html'
  });
  $routeProvider.when('/projects', {
    templateUrl: 'partials/projects.html'
  });

  $routeProvider.otherwise({redirectTo: '/home'});
});
//APPCTRL AUTHENTICATION CONTROLLER
app.controller("AppCtrl", ["$scope", "Auth", function($scope, Auth) {
  // any time auth status updates, add the user data to scope
  $scope.auth = Auth;
  $scope.user = $scope.auth.$getAuth();
  Auth.$onAuth(function(authData) {
     $scope.authData = authData;
  });
}]);
//AUTH FACTORY FOR AppCtrl
app.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
  var ref = new Firebase("https://tactwork-13.firebaseio.com/");
  return $firebaseAuth(ref);
}]);
//REGISTER FACTORIES FOR FIREBASE USERS
// create a User factory with a getFullName() method
app.factory("UserFactory", function($FirebaseObject) {
  return $FirebaseObject.$extendFactory({
      getFullName: function() {
        // concatenate first and last name
        return this.first_name + " " + this.last_name;
      }
   });
});

// create a User object from our Factory
app.factory("User", function($firebase, $FirebaseObject) {
  var ref = new Firebase("https://tactwork-13.firebaseio.com"+"/users/");
  return function(userid) {
    return $firebase(ref.child(userid), {objectFactory: "UserFactory"}).$asObject();
  }
});


// PASSING AUTH HERE
app.controller('SideNavCtrl', function($scope, $timeout, $mdSidenav, $mdUtil, Auth) {


  $scope.toggleLeft = buildToggler('left');
  $scope.toggleRight = buildToggler('right');
  /**
   * Build handler to open/close a SideNav; when animation finishes
   * report completion in console
   */
  function buildToggler(navID) {
    var debounceFn =  $mdUtil.debounce(function(){
          $mdSidenav(navID)
            .toggle()
            .then(function () {
              $log.debug("toggle " + navID + " is done");
            });
        },300);
    return debounceFn;
  }
})
.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
  $scope.close = function () {
    $mdSidenav('left').close()
      .then(function () {
        $log.debug("close LEFT is done");
      });
  };
})
.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
  $scope.close = function () {
    $mdSidenav('right').close()
      .then(function () {
        $log.debug("close RIGHT is done");
      });
  };
});


//////////// SIDENAV MENU NG-CLICK CONFIG
app.controller('NavCtrl', function($scope, $location, $firebaseArray) {
  $scope.nav = function( path ) {
    $location.path( path )
  };
  //quick fix to get home as default
  $scope.data = {
    group1 : 'Home',
    group2 : '2',
    group3 : 'avatar-1'
  };
})


//MODAL DIALOG CONFIGURATION
app.controller('DialogCtrl', function($scope, $mdDialog) {
  $scope.alert = '';
  $scope.showAlert = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.body))
        .title('This is an alert title')
        .content('You can specify some description text in here.')
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        .targetEvent(ev)
    );
  };
  $scope.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
      .parent(angular.element(document.body))
      .title('Would you like to delete your debt?')
      .content('All of the banks have agreed to forgive you your debts.')
      .ariaLabel('Lucky day')
      .ok('Please do it!')
      .cancel('Sounds like a scam')
      .targetEvent(ev);
    $mdDialog.show(confirm).then(function() {
      $scope.alert = 'You decided to get rid of your debt.';
    }, function() {
      $scope.alert = 'You decided to keep your debt.';
    });
  };
  $scope.showAdvanced = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'partials/dialog1.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
    })
    .then(function(answer) {
      $scope.alert = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.alert = 'You cancelled the dialog.';
    });
  };
});
function DialogController($scope, $mdDialog, $timeout) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
};

app.controller('BottomSheetExample', ["$scope", "$timeout", "$mdBottomSheet", "$mdToast",
  function($scope, $timeout, $mdBottomSheet, $mdToast) {
    $scope.alert = '';
    $scope.showListBottomSheet = function($event) {
      $scope.alert = '';
      $mdBottomSheet.show({
        templateUrl: '/partials/bottom-sheet-list-template.html',
        controller: 'ListBottomSheetCtrl',
        targetEvent: $event
      }).then(function(clickedItem) {
        $scope.alert = clickedItem.name + ' clicked!';
      });
    };
  }
])
app.controller('ListBottomSheetCtrl', ["$scope", "$mdBottomSheet",
  function($scope, $mdBottomSheet) {
    $scope.items = [
      { name: 'Share Us', icon: 'share' },
      { name: 'Call Now', icon: 'phone'},
      { name: 'Tactwork Google+', icon: 'google_plus' },
      { name: 'Follow us on Twitter.', icon: 'twitter' },
      { name: 'Send us a message.', icon: 'hangouts' },
    ];
    $scope.listItemClick = function($index) {
      var clickedItem = $scope.items[$index];
      $mdBottomSheet.hide(clickedItem);
    };
  }
])
app.factory("Profile", ["$firebaseObject",
  function($firebaseObject) {
    return function(username) {
      // create a reference to the database node where we will store our data
      var ref = new Firebase("tactwork-13.firebaseio.com/profile");
      var profileRef = ref.child(username);

      // return it as a synchronized object
      return $firebaseObject(profileRef);
    }
  }
]);

app.controller("ProfileCtrl", ["$scope", "$mdToast", "Profile",
  function($scope, $mdToast, Profile) {
    // put our profile in the scope for use in DOM
    $scope.profile = Profile("emails");

    // calling $save() on the synchronized object syncs all data back to our database
    $scope.saveProfile = function() {
      $scope.profile.$save().then(function() {
        $mdToast.show(
          $mdToast.simple()
            .content('Your data was saved.')
            .position('bottom left')
            .hideDelay(5000)
          );
      }).catch(function(error) {
        $mdToast.show(
          $mdToast.simple()
            .content('SAVE FAILED')
            .position('bottom left')
            .hideDelay(5000)
          );
      });
    };
  }
]);
app.controller("simpleMessageCtrl", ["$scope", "$firebaseArray",
  function($scope, $firebaseArray) {
    //CREATE A FIREBASE REFERENCE
    var ref = new Firebase("https://tactwork-13.firebaseio.com/messages");

    // GET MESSAGES AS AN ARRAY
    $scope.messages = $firebaseArray(ref);

    //ADD MESSAGE METHOD
    $scope.addMessage = function(e) {

      //LISTEN FOR RETURN KEY
      if (e.keyCode === 13 && $scope.msg) {
        //ALLOW CUSTOM OR ANONYMOUS USER NAMES
        var name = $scope.name || "anonymous";

        //ADD TO FIREBASE
        $scope.messages.$add({
          from: name,
          body: $scope.msg
        });

        //RESET MESSAGE
        $scope.msg = "";
      }
    }
  }
])

.run(function($http, $templateCache) {
  var urls = [
    'images/svg/menu.svg',
    'images/svg/share.svg',
    'images/svg/google_plus.svg',
    'images/svg/hangouts.svg',
    'images/svg/twitter.svg',
    'images/svg/phone.svg'
  ];
  angular.forEach(urls, function(url) {
    $http.get(url, {cache: $templateCache});
  });
});



app.controller('SpinCtrl', ['$scope', '$interval',
  function($scope, $interval) {
    var self = this;

    self.determinateValue = 1;

    // Iterate every 100ms, non-stop
    $interval(function() {
      // Increment the Determinate loader
      self.determinateValue += 1;
      if (self.determinateValue > 100) {
        self.determinateValue = 0;
      }
    }, 100, 0, true);
}]);
function PostListCtrl($scope, $firebaseArray) {
  var ref = new Firebase("https://tactwork-13.firebaseio.com/posts");

  // create a synchronized array for use in our HTML code
  $scope.posts = $firebaseArray(ref);
  $scope.rating = 3;
};

function PostDetailCtrl($scope, $routeParams, $firebaseObject) {
  var ref = new Firebase("https://tactwork-13.firebaseio.com/posts/" + $routeParams.postId + "");


  var syncObject = $firebaseObject(ref);
  // synchronize the object with a three-way data binding
  // click on `index.html` above to see it used in the DOM!
  syncObject.$bindTo($scope, "data");
}

//QUICK BACKGOUND IMAGES.
app.directive('backImg', function(){
  return function(scope, element, attrs){
    var url = attrs.backImg;
    element.css({
        'background-image': 'url(' + url +')',
        'background-size' : 'cover',
        'background-repeat': 'no-repeat',
        'background-position': 'center center'
    });
  };
});

//TYPEWRITER EFFECT ON TEXT
app.directive('typewrite', ['$timeout', function ($timeout) {
  function linkFunction (scope, iElement, iAttrs) {
    var timer = null,
      initialDelay = iAttrs.initialDelay ? getTypeDelay(iAttrs.initialDelay) : 200,
      typeDelay = iAttrs.typeDelay ? getTypeDelay(iAttrs.typeDelay) : 200,
      blinkDelay = iAttrs.blinkDelay ? getAnimationDelay(iAttrs.blinkDelay) : false,
      cursor = iAttrs.cursor ? iAttrs.cursor : '|',
      blinkCursor = iAttrs.blinkCursor ? iAttrs.blinkCursor === "true" : true,
      auxStyle;
    if (iAttrs.text) {
      timer = $timeout(function() {
        updateIt(iElement, 0, iAttrs.text);
      }, initialDelay);
    }

    function updateIt(element, i, text){
      if (i <= text.length) {
        element.html(text.substring(0, i) + cursor);
        i++;
        timer = $timeout(function() {
          updateIt(iElement, i, text);
        }, typeDelay);
        return;
      } else {
        if (blinkCursor) {
          if (blinkDelay) {
            auxStyle = '-webkit-animation:blink-it steps(1) ' + blinkDelay + ' infinite;-moz-animation:blink-it steps(1) ' + blinkDelay + ' infinite ' +
                  '-ms-animation:blink-it steps(1) ' + blinkDelay + ' infinite;-o-animation:blink-it steps(1) ' + blinkDelay + ' infinite; ' +
                  'animation:blink-it steps(1) ' + blinkDelay + ' infinite;';
            element.html(text.substring(0, i) + '<span class="blink" style="' + auxStyle + '">' + cursor + '</span>');
          } else {
            element.html(text.substring(0, i) + '<span class="blink">' + cursor + '</span>');
          }
        } else {
          element.html(text.substring(0, i));
        }
      }
    }

    function getTypeDelay(delay) {
      if (typeof delay === 'string') {
        return delay.charAt(delay.length - 1) === 's' ? parseInt(delay.substring(0, delay.length - 1), 10) * 1000 : +delay;
      }
    }

    function getAnimationDelay(delay) {
      if (typeof delay === 'string') {
        return delay.charAt(delay.length - 1) === 's' ? delay : parseInt(delay.substring(0, delay.length - 1), 10) / 1000;
      }
    }

    scope.$on('$destroy', function() {
      if(timer) {
        $timeout.cancel(timer);
      }
    });
  }

  return {
    restrict: 'A',
    link: linkFunction,
    scope: false
  };

}]);
