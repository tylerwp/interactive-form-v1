
//set focus first text field
$("#name").focus();
var tshirtColorOptions = $('#color'); //save original dropdown list


/*

Job Role section of the form. Reveal a text field when the "Other" option is selected from the "Job Role" drop down menu
Make sure you add an text input field.
Use the id of "other-title" for the field
Add placeholder text of "Your Title" for the field

*/
$("#title").on('change',function(){
    if(this.value == 'other'){
        console.log("other selected");
        $("#title").parent().append('<input type="text" id="other-title" placeholder="Your Title">');
    }else{
        if($("#other-title").length){
            $("#other-title").remove();
        }
    }
});

//////////////////////////////////////////////////////////////////////////////


$("#design").on('change',function(){
    //console.log($(this).val());
    var selectedShirt = $(this).val();
    displayShirtOptions(selectedShirt);   
    
});



function displayShirtOptions(selectedShirt){
    
    switch(selectedShirt) {
        case 'js puns':
            $('#color').val(tshirtColorOptions); //set original dropdown list back
             $('#color').find('option').each(function(){ 
                 if($(this).text().indexOf("JS Puns") === -1){ 
                     $(this).remove();
                 }
             });
            break;
        case 'heart js':
            $('#color').val(tshirtColorOptions); //set original dropdown list back
            $('#color').find('option').each(function(){ 
                 if($(this).text().indexOf("JS shirt") === -1){ 
                     $(this).remove();
                 }
             });
            
            break;
        default:
           $('#color').val(tshirtColorOptions); //set original dropdown list back
             //$('#color').children('option').each(function(){ 
                  
             //        $(this).remove();
                 
            //});
           
    }
    
}


//!!cannot Hide() options in IE
/*try...
var layout_select_html = $('#layout_select').html(); //save original dropdown list

    $("#column_select").change(function () {
        var cur_column_val = $(this).val(); //save the selected value of the first dropdown
        $('#layout_select').html(layout_select_html); //set original dropdown list back
        $('#layout_select').children('option').each(function(){ //loop through options
        if($(this).val().indexOf(cur_column_val)== -1){ //do your conditional and if it should not be in the dropdown list
           $(this).remove(); //remove option from list
        }
    });
*/
//

function shirtOptionsDisplay(selectedShirt){
    var colorOptions = $("#color");
    switch(selectedShirt) {
        case 'js puns':
            colorOptions[0].selectedIndex = 0;
            colorOptions.find('option').each(function(){                
                var optionItem = $(this);
                //console.log(optionItem.text().indexOf("JS shirt"));
                if(optionItem.text().indexOf("JS shirt") === -1){
                    $(this).show();
                // console.log($(this).text());
                }else{
                 //$(this).hide();
                    $(this).remove();
                }
                
            });
            break;
        case 'heart js':
            colorOptions[0].selectedIndex = 0;
            colorOptions.find('option').each(function(){
            
                if($(this).text().indexOf("JS Puns") === -1){
                    $(this).show();
                   // console.log($(this).text());
                }else{
                     $(this).hide();
                }
                
            });

            break;
        default:
           
            colorOptions[0].selectedIndex = 0;
            colorOptions.find('option').each(function(){
                console.log($(this));
                // $(this).hide(); //does not work in IE
               // $(this).remove();
            });
    }
}

