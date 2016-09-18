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
        $("#title").parent().append('<input type="text" id="other-title" placeholder="Your Title" name="other" class="form-control">');
    }else{
        if($("#other-title").length){
            $("#other-title").remove();
            $('#other-error').remove();
            $("#other-title-error").remove();
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
                           //run validation
                           validateTshirt();
                           //console.log($(this).val());
                        });
            }
            
}

var total = 0;
//loop through "Register for Activities" checkboxes 
function RegisterforActivitiesSetup(){    
        
    $('input[type=checkbox]').each(function () {         

        //Add click event to each checkbox that will update checkbox list based on conditions and get pricing. 
        $(this).change(function(){
            console.log($(this).prop("checked") + '--' + $(this).parent().text());
            RegisterforActivitiesUpdate($(this));
        });

        ///////////////////////////////////////////////////

        //get price of event        
            var tx  = $(this).parent().text();//get label text
            total = total + parseInt(tx.substr(tx.length - 3));//get $$ from text
       
    });

    
   
}



function RegisterforActivitiesUpdate(inputCheckbox){
    
    if(inputCheckbox.prop("checked")){

         RegisterforActivitiesSetAccess(inputCheckbox,true);  

    }else{

        RegisterforActivitiesSetAccess(inputCheckbox,false);       

    }
}



//compare the changed checkbox item with the list of checkboxes to determine if it should be disabled or enabled for conflicts
function RegisterforActivitiesSetAccess(inputCheckbox,checked){

        $('input[type=checkbox]').each(function () {
        if(inputCheckbox.prop("name") !== $(this).prop("name")){
            //Is not the select input so check for time conflics
                //get parent text (label) and parse after '—' and end at ','
                var SelectedSchedule = inputCheckbox.parent().text().split('—')[1].split(',')[0];
                var CompareSchedule = $(this).parent().text();
                
                if(CompareSchedule.indexOf(SelectedSchedule) !== -1){                    
                    //Enable event
                    if(checked){
                        $(this).prop( "disabled", true );
                        $(this).parent().addClass("disZEvent");
                    }else{
                        $(this).prop( "disabled", false );
                        $(this).parent().removeClass("disZEvent");
                    }
                }
        }
            
    });
    RegisterforActivitiesUpdateTotal();

}




function RegisterforActivitiesUpdateTotal(){
    total = 0;//reset total
     $('input[type=checkbox]').each(function () {
         var inputCheckbox = $(this);
         if(inputCheckbox.prop("checked")){
            var Labeltext = inputCheckbox.parent().text();//get label text
             total = total + parseInt(Labeltext.substr(Labeltext.length - 3));
         }
        
     });
     //apend total to 
     $(".activitiesTotal").remove();
     $(".activities").append('<div class="activitiesTotal ConfTotal"><strong>Total: </strong>$' + total + '</div>');
     validateActivities();
}




$('form').on('click', 'button[type="submit"]', function(btnSubmit) {
  
  if (!formValidation()) {
		btnSubmit.preventDefault();
	} 
});
  


// Payment functions //////////////
function PaymentViewSetup(){
    //set default payment method to Credit Card    
    $('option[value="credit card"]').attr('selected','selected');
    $('#credit-card').show();
    $('#paypal').hide();
    $('#Bitcoin').hide();

     $('#payment').on('change',function(){
        var SelectValue = $(this).val();
        switch(SelectValue) {
        case 'paypal':        
            $('#credit-card').hide();
            $('#paypal').show();
            $('#Bitcoin').hide();
           //check validation before enabling button
        break;
        case 'bitcoin':
            $('#credit-card').hide();
            $('#paypal').hide();
            $('#Bitcoin').show();
           //check validation before enabling button
        break;
        case 'credit card':
            $('#credit-card').show();
            $('#paypal').hide();
            $('#Bitcoin').hide();
            //check validation before enabling button
        break;
                
        }
        //validate payment method on change
        validatePayment();
     });
}

function CreditCardValidationSetup(){
    // $('button[type="submit"]').prop( "disabled", true );
}


displayShirtOptions('');
RegisterforActivitiesSetup();
PaymentViewSetup();
CreditCardValidationSetup();


