/**
 * Created by agam on 21/09/18.
 */
var BeonCustomOrderSDK = {
    config:{
        'api_url':'/index.php?m=beon_order&action=api&api='
    },
    func:{
        maskingForm : function () {
            $('#frmCheckout').addClass('validate-email-form');
        },
        displayAlert: function (message) {
            var alert ='<div id="alert-validate-email" class="alert alert-danger"> ' +
                            '<strong>Error:</strong> ' +message+
                        '</div>';
            if($('#alert-validate-email').length){
                $('#alert-validate-email').remove();
                $('#frmCheckout').prepend(alert);
            }else{
                $('#frmCheckout').prepend(alert);
            }
            var elmnt = document.getElementById("alert-validate-email");
            elmnt.scrollIntoView();
            $('#alert-validate-email').focus();
        },
        removeMasking:function () {
            $('#frmCheckout').removeClass('validate-email-form');
        },
        submitForm: function () {
            $('#frmCheckout').submit();
        },
        loadModal: function () {
            $('#loading-validate-email').modal({
                backdrop: 'static',
                keyboard: false
            });
        },
        closeModal: function () {
            $('#loading-validate-email').modal('hide');
        }
    },
    api:{
        callapi :function (action, data, callback) {
            $.post(BeonCustomOrderSDK.config.api_url+action,data, function (response) {
                callback(response);
            })
        },
        validateEmail:function (email, callback) {
            postdata = {
                'email':email
            };
            BeonCustomOrderSDK.api.callapi('validate-email',postdata, function (response) {
                callback(response);
            })
        }
    },
    event:{
        submitForm: function () {
            $('.validate-email-form').on('submit', function (e) {
                e.preventDefault();
                var form = $(this);
                BeonCustomOrderSDK.func.loadModal();
                var email = $(this).find('[name="email"]').val();
                BeonCustomOrderSDK.api.validateEmail(email, function (response) {
                    BeonCustomOrderSDK.func.closeModal();
                    if(response.status==1){
                        BeonCustomOrderSDK.func.removeMasking();
                        form.unbind().submit();
                    }else{
                        BeonCustomOrderSDK.func.displayAlert(response.message);
                        return false;
                    }
                })
            })
        }
    }
};

$(document).ready(function () {
    BeonCustomOrderSDK.func.maskingForm();
    BeonCustomOrderSDK.event.submitForm();
});