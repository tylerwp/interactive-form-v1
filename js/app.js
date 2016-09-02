
//set focus first text field
$("#name").focus();



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