/**
 * Created by agam on 21/05/18.
 */
var BeonCustomInvoices = {
    function: {
        countdown: function (duedate) {
            console.log(duedate);

            // var countDownDate = new Date("Sep 5, 2018 15:37:25").getTime();
            var countDownDate = new Date(duedate).getTime();

// Update the count down every 1 second
            var x = setInterval(function () {

                // Get todays date and time
                var now = new Date().getTime();

                // Find the distance between now an the count down date
                var distance = countDownDate - now;

                // Time calculations for days, hours, minutes and seconds
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Output the result in an element with id="demo"
                $('#invoice-countdown .countdown-days').html(days);
                $('#invoice-countdown .countdown-hours').html(hours);
                $('#invoice-countdown .countdown-minutes').html(minutes);
                $('#invoice-countdown .countdown-second').html(seconds);

                // If the count down is over, write some text
                if (distance < 0) {
                    clearInterval(x);
                    $('#invoice-countdown .countdown-days').html("00");
                    $('#invoice-countdown .countdown-hours').html("00");
                    $('#invoice-countdown .countdown-minutes').html("00");
                    $('#invoice-countdown .countdown-second').html("00");

                }
            }, 1000);
        },
        copyinvoicetotal: function () {

            // var copyText = document.getElementById("myInput");
            var copyText = $('.invoicetotal-copy');
            copyText.select();
            console.log(copyText.select());
            document.execCommand("copy");

            var tooltip = document.getElementById("myTooltip");
            tooltip.innerHTML = "Copied: " + copyText.value;
        },
        copypaymentcode: function () {

        },
        checkerpaymentcountdown: function (milisecond) {
            // var countDownDate = new Date("Sep 5, 2018 15:37:25").getTime();
            var countDownDate = new Date((new Date().getTime()) + milisecond);
            // Update the count down every 1 second
            var x = setInterval(function () {
                // Get todays date and time
                var now = new Date().getTime();

                // Find the distance between now an the count down date
                var distance = countDownDate - now;

                // Time calculations for days, hours, minutes and seconds
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                // Output the result in an element with id="demo"
                $('#check-payment-countdown .countdown-minutes').html(minutes);
                $('#check-payment-countdown .countdown-second').html(seconds);

                // If the count down is over, write some text
                if (distance < 0) {
                    clearInterval(x);
                    $('#check-payment-countdown .countdown-minutes').html("00");
                    $('#check-payment-countdown .countdown-second').html("00");

                }
            }, 1000);
        }
    },
};