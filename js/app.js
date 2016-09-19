//set focus to first text field
$("#name").focus();
var tshirtColorOptions = getColorSelectOptions(); //save original dropdown list

/*
    Reveal a text field when the "Other" option is selected from the "Job Role" drop down menu
*/
$("#title").on('change',function(){
    if(this.value == 'other'){
        //add other title field
        $("#title").parent().append('<input type="text" id="other-title" placeholder="Your Title" name="other" class="form-control">');
    }else{
        if($("#other-title").length){
            //other title has values so remove error messages 
            $("#other-title").remove();
            $('#other-error').remove();
            $("#other-title-error").remove();
        }
    }
});



$("#design").on('change',function(){
    // add/update color options when design selection changes.
    var selectedShirt = $(this).val();
    displayShirtOptions(selectedShirt);   
    
});

/**
* switch triggers functions based on Object value to reveal color options.
*
* @param {Object.<string>} select field - #design.
*/
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


/**
* return Object array from color select element.
*
*/
function getColorSelectOptions(){
    var select = $('#color');
    var obj = {};
    $('option', select).each(function(i, v){
        var $this = $(this);
        obj[$this.val()] = $this.text();
    });
    return obj;    
}

/**
* Convert object tshirtColorOptions to JSON and filter 
* results to new select options element to display color choices.
*
* @param {string} t-shirt options to filter by.
*/
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

// total for activities.
var total = 0;

/**
* loop through "Register for Activities" checkboxes
*
*/
function RegisterforActivitiesSetup(){    
        
    $('input[type=checkbox]').each(function () {         

        //Add click event to each checkbox that will update checkbox list based on conditions and get pricing. 
        $(this).change(function(){
            console.log($(this).prop("checked") + '--' + $(this).parent().text());
            RegisterforActivitiesUpdate($(this));
        });

        //get price of event and add to totals.     
            var tx  = $(this).parent().text();//get label text
            total = total + parseInt(tx.substr(tx.length - 3));//get $$ from text
       
    });

    
   
}


/**
* function for clicked checkbox event to check the state of the element. 
*
* @param {Object.<string>} checkbox element.
*/
function RegisterforActivitiesUpdate(inputCheckbox){
    
    if(inputCheckbox.prop("checked")){

         RegisterforActivitiesSetAccess(inputCheckbox,true);  

    }else{

        RegisterforActivitiesSetAccess(inputCheckbox,false);       

    }
}



/**
* compare the changed checkbox item with the list of checkboxes to determine if it should be disabled or enabled for conflicts.
*
* @param {Object.<string>} checkbox element.
* @param {bool} checked - Condition to determine state of checkboxes 
*/
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




/**
* Update totals based on checked checkboxes. 
*
*/
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



//set click event for submit button
$('form').on('click', 'button[type="submit"]', function(btnSubmit) {
  
  if (!formValidation()) {
		btnSubmit.preventDefault();
	} 
});
  


/**
* Setup payment view and change events.
*
*/
function PaymentViewSetup(){
    //set default payment method to Credit Card    
    $('option[value="credit card"]').attr('selected','selected');
    $('#credit-card').show();
    $('#paypal').hide();
    $('#Bitcoin').hide();
    //hide or display payment method based on selection.
     $('#payment').on('change',function(){
        var SelectValue = $(this).val();
        switch(SelectValue) {
        case 'paypal':        
            $('#credit-card').hide();
            $('#paypal').show();
            $('#Bitcoin').hide();
           
        break;
        case 'bitcoin':
            $('#credit-card').hide();
            $('#paypal').hide();
            $('#Bitcoin').show();
           
        break;
        case 'credit card':
            $('#credit-card').show();
            $('#paypal').hide();
            $('#Bitcoin').hide();
            
        break;
                
        }
        //validate payment method on change
        validatePayment();
     });
}



//setup views for t-shirts, activities and payment method.
displayShirtOptions('');
RegisterforActivitiesSetup();
PaymentViewSetup();



