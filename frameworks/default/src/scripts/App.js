/** @namespace appCtrl */
var appCtrl = appCtrl || {};
(function($) {
appCtrl = {
	version:'v1',
	/**
        Application initialization
        @memberof appCtrl
    */
	init: function(){
		console.log("Application Initialized");
		// Subscribe to the profile's ready event then call the API when ready.
		IBMCore.common.module.masthead.subscribe("profileMenuReady", "customjs", function(){
		    loginCtrl.addModaltoSignIn();
		}).runAsap(function(){
		    loginCtrl.addModaltoSignIn();
		});
	}
};
appCtrl.init();
})(jQuery);
