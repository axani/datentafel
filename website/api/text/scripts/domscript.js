$(function() {
    
    /* Change label on input */
    $('input[name="textInput"]').keyup(function() {
        var content = $(this).val()
        var inputName = $(this).attr('name')

        if(content.substring(0, 4) == 'http') {
            $('label[for="' + inputName +'"]').text('WebLink');
        } else {
            $('label[for="' + inputName +'"]').text('Text');
        };
    })

    /* Send data */

    $('.addInput').on('click', function(e) {

        console.log($('input[name="textInput"]').val());
        e.preventDefault();
        
        $.ajax({
               type: "POST",
               data: {'content': $('input[name="textInput"]').val()},
               url: "../../cgi-bin/sendInput.cgi",
               success: function (msg) {
                console.log(msg.status);
               }
        })  
    });

});