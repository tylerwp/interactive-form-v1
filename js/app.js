
//set focus first text field
$("#name").focus();
var tshirtColorOptions = getColorSelectOptions(); //save original dropdown list

/*
    Job Role section of the form. Reveal a text field when the "Other" option is selected from the "Job Role" drop down menu
    Make sure you add an text input field.
    Use the id of "other-title" for the field
    Add placeholder text of "Your Title" for the field
*/

$("#title").on('change',function(){
    if(this.value == 'other'){
        console.log("other selected");
        $("#title").parent().append('<input type="text" id="other-title" placeholder="Your Title" class="form-control">');
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
            SetColorSelectOptions('JS Puns');
            break;
        case 'heart js':
            SetColorSelectOptions('JS shirt');                     
            break;
        default:                     
            SetColorSelectOptions('None'); 
    }
    
}



function getColorSelectOptions(){
    var select = $('#color');
    var obj = {};
    $('option', select).each(function(i, v){
        var $this = $(this);
        obj[$this.val()] = $this.text();
    });
    return obj;    
}

function SetColorSelectOptions(search){
            var OptionsToFilter = JSON.stringify(tshirtColorOptions);
            var $color = $("#color");
            $color.empty(); // remove old options
            if(search === 'None'){
                //hide color options
               $('#colors-js-puns').hide();
               //hide color view box
               $('#color-view').remove();
            }else{
                //hide color view box
               $('#color-view').remove();
                //Show color options
                $('#colors-js-puns').show();
                $color.append('<option>Select Color</option>');
                $.each(JSON.parse(OptionsToFilter), function(key,value) {
                    if(value.indexOf(search) !== -1){
                        $color.append($("<option></option>")
                        .attr("value", key).text(key).attr("style","background-color:" + key + ";color:white;"));                       
                        
                    }
                });
                 $color.on('change',function(){
                            $('#color-view').remove();
                            $('.shirt').append('<div id="color-view" style="float:left;background-color:' + $(this).val() + ';">&nbsp;</div>');                           
                           console.log($(this).val());
                        });
            }
            
}



//loop through "Register for Activities" checkboxes 
$(".activities").on("click",function(){
    var list = $(this);
    
   // $(this).each('input',function(){
    //        console.log(this);
   // });
});



displayShirtOptions('');

