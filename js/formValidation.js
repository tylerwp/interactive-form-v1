
// Form Validation /////////////////////////


//Validate Name
function validateName(){
    var name = $('#name').val();    
    if(!name.trim()){
        //display error to DOM
        //if error does not exist
        if(!$('#name-error').length){
            //add error message
            $('#name').after('<div id="name-error" class="error">Name is required.</div>');
            //update name element style
            $('#name').addClass('name-err');
        }
        return false;
    }else{
        //call function to clear error from DOM
        if($('#name-error').length){
            $('#name-error').remove();
            $('#name').removeClass('name-err');
        }
        return true;
    }
}


//Validate Email format
 function validEmailFormat(emailAddr) {    
    var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
    if (filter.test(emailAddr)) {
        return true;
    }
    else {
        return false;
    }
}

//Validate Email
function validateEmail(){
    var emailAddr = $('#mail').val();    
    if(!emailAddr.trim()){
        //display error to DOM
        //if error does not exist
        if(!$('#email-error').length){
            //add error message
            $('#mail').after('<div id="email-error" class="error">Email is required.</div>');
            //update name element style
            $('#mail').addClass('name-err');
        }
        return false;
    }else{
       //check for valid email
        if(validEmailFormat(emailAddr)){
            //call function to clear error from DOM
            if($('#email-error').length){
                $('#email-error').remove();
                $('#mail').removeClass('name-err');
            }
            return true;
        }else{
            //not a valid email
                // remove previous error
                 $('#email-error').remove();
            //add error message
            $('#mail').after('<div id="email-error" class="error">This is not a valid email.</div>');
            //update name element style
            $('#mail').addClass('name-err');
            
            return false;

        }

    }
}



//Validate Job Role if Other selected
function validateJobRole(){
    var jobRole = $('#title option:selected').val();
    if(jobRole == 'other'){
        //validate other field
    var other = $('#other-title').val();    
    if(!other.trim()){
        //display error to DOM
        //if error does not exist
        if(!$('#other-error').length){
            //add error message
            $('#other-title').after('<div id="other-error" class="error">Title is required.</div>');
            //update name element style
            $('#other-title').addClass('name-err');
        }
        return false;
    }else{
        //call function to clear error from DOM
        if($('#other-error').length){
            $('#other-error').remove();
            $('#other-title').removeClass('name-err');
        }
        return true;
    }

    }else{
        return true;
    }
}


//Validate T-Shirt info if #color not selected 
function validateTshirt(){
    var tShirtColor = $('#color option:selected').val();

    if(!tShirtColor || tShirtColor === 'Select Color'){        
        //display error to DOM
        //if error does not exist
        if(!$('#color-error').length){
            //add error message
            $('.shirt').after('<div id="color-error" class="error">T-shirt color is required.</div>');
            //update name element style
            $('#color').addClass('name-err');
        }
        return false;
   

    }else{
        //call function to clear error from DOM
        if($('#color-error').length){
            $('#color-error').remove();
            $('#color').removeClass('name-err');
        }
        return true;
    }
}



//Validate Activities if none selected
function validateActivities(){   
    var valid = false;
    $('input[type=checkbox]').each(function () {        
       if(this.checked){
           valid = true;           
       }
    });

    if(!valid){
         if(!$('#activities-error').length){
            //add error message
            $('.activities legend').after('<div id="activities-error" class="error">You must select at least one activity.</div>');
            //update name element style
           // $('.activities legend').addClass('name-err');
        }
    }else{
        if($('#activities-error').length){
            $('#activities-error').remove();
           // $('.activities legend').removeClass('name-err');
        }
    }


    return valid;
    
}


//Validate payment info if Credit Card selected
function validatePayment(){
     var payment = $('#payment option:selected').val();
    if(payment === 'credit card'){
        //Validate credit card number
        //Validate zip
        //Validate CVV
        //Validate Exp
        return false;
    }else{
        if(payment === 'select_method'){
            if(!$('#payment-error').length){
                //add error message
                $('#payment').after('<div id="payment-error" class="error">Payment method required.</div>');
                //update name element style
                $('#payment').addClass('name-err');
            }
            return false;
        }else{
             if($('#payment-error').length){
                $('#payment-error').remove();
                $('#payment').removeClass('name-err');
            }
            return true;
        }

    }
}



//call all form validation functions 
function formValidation(){
   
    var isValid = true;

    //Validate Name
    if(!validateName()){
        isValid = false;
    }
    //Validate email
    if(!validateEmail()){
        isValid = false;
    }
    //validate job Role
    if(!validateJobRole()){
        isValid = false;
    }

    //Validate T-shirt info
    if(!validateTshirt()){
        isValid = false;
    }

    if(!validateActivities()){
        isValid = false;
    }

    if(!validatePayment()){
         isValid = false;
    }


    if(isValid){
        return true;
    }else{
        return false;
    }


}