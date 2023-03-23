var manId = document.getElementById('manId'); //declare the variable and assign the value to it 
var password = document.getElementById('password');
var submit = document.getElementById('submit');
//----------------------------------function to validate the entered Details----------------
function enter(){
    var getLocalStorage = window.localStorage.getItem("userDetails"); //get the value from local storage
    var getArray = JSON.parse(getLocalStorage); // convert the string value into the array object
    if(getArray == null || getArray == undefined || getArray == ""){ //Alert if the local storage have no values in it
        alert('Register First to Access the site');
        return false;
    }else if(getArray != "" || getArray != null || getArray != undefined){//run the code if local have the value
        var islogged = false; // set an boolean to variable for the validation purpose 
         getArray.forEach(obj => {
            if(obj.name == manId.value && obj.password == password.value){
                islogged = true; // if the given condition is satisfied, change the value into true and run the code
                window.location.href = "https://smjhsn.github.io/portfolio/";
             }  
         });
         if(islogged == false){ // if the value is not changed due to it failed in previous condition.Alert the Message to user
            alert('Enter Correct Id and Password')
            return false;
         }
    }
    manId.value = ""; //clear the input field after value is submitted
    password.value = ""; 
}