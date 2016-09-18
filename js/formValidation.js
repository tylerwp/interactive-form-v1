
// Form Validation /////////////////////////
/*jshint bitwise: false*/

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
            
           
        }
    }else{
        //remove error if exists
        if($('#activities-error').length){
            $('#activities-error').remove();
           
        }
    }


    return valid;
    
}


//Validate payment info if Credit Card selected
function validatePayment(){
     var payment = $('#payment option:selected').val();
    if(payment === 'credit card'){
        var CreditInfoValid = true;
        //Validate credit card number                        
        if(!ValidateCreditCard()){
            CreditInfoValid = false;
        }
        //Validate zip
        if(!ValidateCreditCardZip()){
            CreditInfoValid = false;
        }          
        //Validate CVV
        if(!ValidateCreditCardCVV()){
            CreditInfoValid = false;
        }
        //Validate Exp          
        if(!validateCreditCardExp()){
            CreditInfoValid = false;
        }

        return CreditInfoValid;
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


//Validate Creit Card
function ValidateCreditCard(){
    var cc = $('#cc-num').val();    
    if(!cc.trim()){
        //display error to DOM
        //if error does not exist
        if(!$('#cc-error').length){
            //add error message
            $('#credit-card .col:eq(0)').append('<div id="cc-error" class="error">Credit Card is required.</div>');
            //update name element style
            $('#cc-num').addClass('name-err');
        }
        return false;
    }else{
        //Validate credit format
        var validatecc = luhnChk($('#cc-num').val());       
        //if valid credit card clear errors.
        if(validatecc){
            //call function to clear error from DOM
            if($('#cc-error').length){
                $('#cc-error').remove();
                $('#cc-num').removeClass('name-err');                
            }
            return true;
        }else{
            //Invalid Credit Card number.
            $('#cc-error').remove();
            //add error message
            $('#credit-card .col:eq(0)').append('<div id="cc-error" class="error">Invalid Credit Card number.</div>');
            //update name element style
            $('#cc-num').addClass('name-err');            
                return false;
            }

       
    }
}


//Validate Zip
function ValidateCreditCardZip(){
    var zip = $('#zip').val();    
    if(!zip.trim()){
        //display error to DOM
        //if error does not exist
        if(!$('#zip-error').length){
            //add error message
            $('#credit-card .col:eq(1)').append('<div id="zip-error" class="error">Zip required.</div>');
            //update name element style
            $('#zip').addClass('name-err');
        }
        return false;
    }else{
            if(!isNaN(zip)){
            //call function to clear error from DOM
                if($('#zip-error').length){
                    $('#zip-error').remove();
                    $('#zip').removeClass('name-err');
                }
                return true;
            }else{
                //clear previous errors
                $('#zip-error').remove();
                 //add error message
                $('#credit-card .col:eq(1)').append('<div id="zip-error" class="error">Invalid Zip.</div>');
                //update name element style
                $('#zip').addClass('name-err');
                return false;
            }
        
        
    }
}

//Validate CVV
function ValidateCreditCardCVV(){
    var cvv = $('#cvv').val();    
    if(!cvv.trim()){
        //display error to DOM
        //if error does not exist
        if(!$('#cvv-error').length){
            //add error message
            $('#credit-card .col:eq(2)').append('<div id="cvv-error" class="error">CVV required.</div>');
            //update name element style
            $('#cvv').addClass('name-err');
        }
        return false;
    }else{
             if(!isNaN(cvv) && cvv.length === 3){
            //call function to clear error from DOM
                if($('#cvv-error').length){
                    $('#cvv-error').remove();
                    $('#cvv').removeClass('name-err');
                }
                return true;
             }else{
                  //clear previous errors
                 $('#cvv-error').remove();
                //add error message
                $('#credit-card .col:eq(2)').append('<div id="cvv-error" class="error">Invalid CVV.</div>');
                //update name element style
                $('#cvv').addClass('name-err');
                return false;
             }
        
    }
}

function validateCreditCardExp(){
     var expMonth = parseInt($('#exp-month option:selected').val());
    // var expYear = parseInt($('#exp-year option:selected').val());

     var datenow = new Date();
     if(datenow.getMonth() >= expMonth){
          if(!$('#exp-error').length){
            //add error message
            $('#exp-year').after('<div id="exp-error" class="error">Check Expiration Date.</div>');
            //update name element style
            $('#exp-month').addClass('name-err');
            $('#exp-year').addClass('name-err');
          }
          return false;
     }else{
        
            $('#exp-error').remove();
            $('#exp-month').removeClass('name-err');
            $('#exp-year').removeClass('name-err');
            return true;
        
     }     
     

}

/////////////////////////////////////////////////////////////////////////
/**
 * Luhn algorithm in JavaScript: validate credit card number supplied as string of numbers
 * @author ShirtlessKirk. Copyright (c) 2012.
 * @license WTFPL (http://www.wtfpl.net/txt/copying)
 * //http://www.paypalobjects.com/en_US/vhelp/paypalmanager_help/credit_card_numbers.htm
 */
var luhnChk = (function (arr) {
    return function (ccNum) {
        var 
            len = ccNum.length,
            bit = 1,
            sum = 0,
            val;

        while (len) {
            val = parseInt(ccNum.charAt(--len), 10);
            sum += (bit ^= 1) ? arr[val] : val;
        }

        return sum && sum % 10 === 0;
    };
}([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]));
////////////////////////////////////////////////////////////////////////////



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