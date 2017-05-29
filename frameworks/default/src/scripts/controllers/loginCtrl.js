/** @namespace loginCtrl */
var loginCtrl = loginCtrl || {};
(function($) {
    loginCtrl = {
        /**
            Bind URX Auth Modal event
            @memberof loginCtrl
        */
        addModaltoSignIn: function(){
            var loginLink = $('#ibm-signin-minimenu-container').find('[data-linktype="signin"] a');
            loginLink.addClass("urx-modal-login");
            loginLink.data("urx-id","myibm");
            loginLink.off();
            loginLink.click(function(e){
                e.preventDefault();
                urx.ModalCtrl.bindLoginModalCta(loginLink);
            });
        }
    };
})(jQuery);
