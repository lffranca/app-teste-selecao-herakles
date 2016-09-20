(function(){
	'use script';
	angular.module('PublicDirectives',[])
	.directive('scrollHeaderDir', function() {
        return {
            // Restrict it to be an attribute in this case
            restrict: 'A',
            // responsible for registering DOM listeners as well as updating the DOM
            link: function(scope, element, attrs) {
                window.onscroll = function() {
					myFunction();
				};

				function myFunction() {
				    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
						element.addClass('scrolldown');
				    } else {
						element.removeClass('scrolldown');
				    }
				}
            }
        };
    });
})();