(function($){

describe("addModaltoSignIn Method",function(){
	  beforeEach(function() {
	   	setFixtures('<div id="ibm-signin-minimenu-container"><span data-linktype="signin"><a href="www.ibm.com"></a></span></div>');
	  });
	  afterEach(function() {
		  
	  });

	it("shoild Add Attribute data-urx-id to Sign In Link",function(){
		
		var loginLink = $('#ibm-signin-minimenu-container').find('[data-linktype="signin"] a');
		loginCtrl.addModaltoSignIn();
		console.log(loginLink.attr("href"));
        expect($(loginLink).data('urx-id')).toBe('myibm');
	})	
})
})(jQuery);