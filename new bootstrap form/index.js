var myArray = []; //declaring array
var maxuser;
var maxUserId;
var getUserDetailsString = window.localStorage.getItem("userDetails");// getting the local storage details
window.onload = function(){
    if(getUserDetailsString == null || getUserDetailsString == undefined || getUserDetailsString == ""){
        myArray = []; //setting array empty if no user details found in local storage
    }else{
        myArray = JSON.parse(getUserDetailsString) // setting array to countinue with existing local stoarge datas
    }
    loadTable() // calling the loadTable function to load the table 
}
function loadTable(){  //function to load the table in html page
    var tbody = document.getElementById("tbody")
    tbody.innerHTML = "";
    myArray.forEach(object =>{
        tbody.insertAdjacentHTML("beforeend", //this method used to insert the content and tag into html page
        '<tr><td data-label="User Id">'+object.userId+'</td><td data-label="User Name">'+object.name+'</td><td  data-label="Password">'+object.password+'</td><td data-label="Mobile No">'+object.mobile+'</td><td data-label="Email">'+object.email+'</td>'+
        '<td data-label="Country">'+object.country+'</td><td data-label="Gender">'+object.gender+'</td><td data-label="Address">'+object.address+'</td><td data-label="Pincode">'+object.pincode+'</td>'+
        '<td data-label="College">'+object.college+'</td><td data-label="Degree">'+object.degree+'</td><td data-label="Score">'+object.score+'</td><td data-label="Position">'+object.position+'</td>'+
        '<td data-label="Skills">'+object.skills+'</td>'+
        '<td ><button class="edit" onclick="edit('+object.userId+')">Edit</button></td>'+
        '<td><button class="delete" onclick="del('+object.userId+')">Del</button></td></tr>')
    })
}
var userName = document.getElementById("userName");  //declaring the variables for selected fields
var password = document.getElementById("password");
var mobile = document.getElementById("mobile");
var email = document.getElementById("email");
var country = document.getElementById("country");
var gender = document.getElementById("gender");
var address = document.getElementById("address");
var pincode = document.getElementById("pincode");
var college = document.getElementById("college");
var degree = document.getElementById("degree");
var score = document.getElementById("score");
var position;
var development = document.getElementById("development");
var testing = document.getElementById("testing");
var skills = document.getElementById("skills");
var checkbox = document.getElementById("checkbox");
mobile.addEventListener("keypress",function(event){   //number field for mobile number and pincode
    if(isNaN(event.key)){
        event.preventDefault();
    }
});
pincode.addEventListener("keypress",function(event){
    if(isNaN(event.key)){
        event.preventDefault();
    }
});

//--------------------------------------------------------------------------------
//create function for submit button to load register details in stoarge and table
//--------------------------------------------------------------------------------
function registerdetails(){
    

    var userIds = [];
    myArray.forEach(element => {
        userIds.push(element.userId);
    });
    console.log(userIds);


    var maxUserId = Math.max(...userIds);
    if(isNaN(maxUserId) || maxUserId === -Infinity || maxUserId === null || maxUserId ===undefined || maxUserId == 0 )
    {
        maxUserId = 100;
    }
    console.log(maxUserId);
    console.log(typeof(maxUserId));


    var newUserId = maxUserId+1;
    console.log(newUserId)

    var existingUserId = document.getElementById("userId").value;
    var isEdit = (existingUserId === null || existingUserId === undefined || existingUserId.trim() ==="") ? 'NonEditable' : 'Editable';

    if(isEdit == "NonEditable"){
        var isValidDate = inputField();
        if(isValidDate == false){
            return false;
        }
        //creatig the object and store the values
        try{
            var myObject = {
                userId : newUserId,
                name : userName.value,
                password : password.value,
                mobile : mobile.value,
                email : email.value,
                country : country.value,
                gender : gender.value,
                address : address.value,
                pincode : pincode.value,
                college : college.value,
                degree : degree.value,
                score : score.value,
                position : position(), //position function assigned
                skills : skills.value,
            }
            myArray.push(myObject); //push the obj into array
        }catch(error){
            alert(error.message)
        }
    
    }else{
        myArray.forEach(obj =>{
            if(obj.userId == existingUserId){
                obj.userName = userName.value;
                obj.password = password.value;
                obj.mobile = mobile.value;
                obj.email = email.value;
                obj.country = country.value;
                obj.gender = gender.value;
                obj.address = address.value;
                obj.pincode = pincode.value;
                obj.college = college.value;
                obj.degree = degree.value;
                obj.score = score.value;
                obj.position = position();
                obj.skills = skills.value;
                obj.password = password.value;
            }
        });
    }
    
    //store the details in loaclstorage
    var arrayToString = JSON.stringify(myArray);
    window.localStorage.setItem("userDetails",arrayToString);

    //get the localstorage details and assing that to myArray and load the table
    var getString = window.localStorage.getItem("userDetails");
    var stringToArray = JSON.parse(getString);
    myArray = stringToArray;


    loadTable() // calling the loadTable function to load the table
    //remove the values from input field after storedd in the table
        
        userName.value = "";
        password.value = "";
        mobile.value = "";
        email.value = "";
        country.value = "";
        gender.value = "";
        address.value = "";
        pincode.value = "";
        college.value = "";
        degree.value = "";
        score.value = "";
        position.value ="";
        development.checked = "";
        testing.checked = "";
        skills.value = "";
        checkbox.checked = "";
        
}
//-------------------------------------------------------------
//To submit the selected radio value 
//-------------------------------------------------------------
function position(){
    if(development.checked){
        return development.value;
    }else if(testing.checked){
        return testing.value;
    }else{
        throw new Error("Position is Not selected")
    }
}
//---------------------------------------------------
//checkbox to enable button
//-------------------------------------------------
function submit(click){
    if(click.checked){
        document.getElementById("submit-btn").disabled = false; 
    }else{
        document.getElementById("submit-btn").disabled = true; 
    }
}
//-----------------------------------------------------
//function to edit the table
//---------------------------------------------------
function edit(datas){
    var editObject = myArray.find(a=>a.userId == datas)
    document.getElementById("userId").value  = editObject.userId ;
    document.getElementById("userName").value  = editObject.name ;
    document.getElementById("password").value = editObject.password;
    document.getElementById("mobile").value = editObject.mobile ; 
    document.getElementById("email").value = editObject.email ;
    document.getElementById("country").value = editObject.country; 
    document.getElementById("gender").value = editObject.gender;
    document.getElementById("address").value = editObject.address;
    document.getElementById("pincode").value = editObject.pincode;
    document.getElementById("college").value = editObject.college;
    document.getElementById("degree").value = editObject.degree;
    document.getElementById("score").value = editObject.score;
    if(editObject.position == "Development"){
        document.getElementById("development").checked = true;
    }else if(editObject.position == "Testing"){
        document.getElementById("testing").checked = true;
    }
    document.getElementById("skills").value = editObject.skills;
}
//-----------------------------------------------------
//function to delete the table
//---------------------------------------------------
function del(deleteData){
    console.log(deleteData);
    // return;
// to delete the row instantly without refresh
    var td = event.target.parentNode; 
      var tr = td.parentNode; // the row to be removed
      tr.parentNode.removeChild(tr);
//to delete the local storage data 
    var getLocalstorage = window.localStorage.getItem("userDetails");
    var inToArray = JSON.parse(getLocalstorage);
    var findvalue = inToArray.findIndex(a=>a.userId == deleteData);
    inToArray.splice(findvalue,1);
    var inToString = JSON.stringify(inToArray);
    window.localStorage.setItem("userDetails",inToString);
}
//------------------------------------------------------
//declaring conditions for input field
//------------------------------------------------------
function inputField(){
    
    if(userName.value == null || userName.value == undefined || userName.value.length < 3){
        alert("Enter Valid Name");
        return false;
    }
    if(mobile.value == null || mobile.value == undefined || mobile.value.length < 10){
        alert("Mobile is Mandatory");
        return false;
    }
    var emailValue = email.value;
    var emailSplit = emailValue.split('@')
    if(emailSplit.length < 2){
        alert("Enter valid Email Address");
        return false;
    }else{
        var emailName = emailSplit[0];
        var emailDomain = emailSplit[1];
        if(emailName.length < 1 || emailDomain.length < 1){
            alert ("Enter Valid Email");
            return false;
        }else{
            var domainSplit = emailDomain.split('.')
            if(domainSplit.length < 2){
                alert ("Enter Valid Email");
                return false;
            }else{
                 emailValue;
            }
        }
    }
    if(country.value == null || country.value == undefined || country.value.length ==""){
        alert("Country Should not be Empty");
        return false;
    }
    if(gender.value == null || gender.value == undefined || gender.value.length == 0){
        alert("Gender is Mandatory");
        return false;
    }
    if(address.value == null || address.value == undefined || address.value.length ==""){
        alert("Address Should not be Empty");
        return false;
    }
    if(pincode.value == null || pincode.value == undefined || pincode.value.length == ""){
        alert("Pincode is Mandatory");
        return false;
    }
    if(college.value == null || college.value == undefined || college.value.length ==""){
        alert("College Should not be Empty");
        return false;
    }
    if(degree.value == null || degree.value == undefined || degree.value.length == 0){
        alert("Degree is Mandatory");
        return false;
    }
    if(score.value == null || score.value == undefined || score.value.length ==""){
        alert("Score Should not be Empty");
        return false;
    }
    if(skills.value == null || skills.value == undefined || skills.value.length ==""){
        alert("Skills Should not be Empty");
        return false;
    }
    if(password.value == null || password.value == undefined || password.value.length ==""){
        alert("Password Should not be Empty");
        return false;
    }

    var passwordValue,char,lcase,ucase,number,nameSplit,charSplit,lcaseSplit,ucaseSplit,numSplit;
    passwordValue = password.value;
    char = '!@#$%^&*()_+-';
    lcase = 'qwertyuioplkjhgfdsazxcvbnm';
    ucase = 'QWERTYUIOPLKJHGFDSAZXCVBNM';
    number = '1234567890';
    
    passSplit = passwordValue.split('');
    charSplit = char.split('');
    lcaseSplit = lcase.split('');
    ucaseSplit = ucase.split('');
    numSplit = number.split('');
    
    if(passwordValue.length<8){
        alert('Password should contain 8 Letters');
        return false;
    }
    var checkChar = false;
    for(i=0;i<charSplit.length;i++){
        if(passSplit.includes(charSplit[i])){
            checkChar = true;
            break;
        }
    }
    if(!checkChar){
        alert('Password Must Contain one char');
        return false;
    }
    var checkNum = false;
    for(i=0;i<numSplit.length;i++){
        if(passSplit.includes(numSplit[i])){
            checkNum = true;
            break;
        }
    }
    if(!checkNum){
        alert('Password Must Contain one number');
        return false;
    }
    var checkLcase = false;
    for(i=0;i<lcaseSplit.length;i++){
        if(passSplit.includes(lcaseSplit[i])){
            checkLcase = true;
            break;
        }
    }
    if(!checkLcase){
        alert('Password Must Contain one Lower Case');
        return false;
    }
    var checkUcase = false;
    for(i=0;i<ucaseSplit.length;i++){
        if(passSplit.includes(ucaseSplit[i])){
            checkUcase = true;
            break;
        }
    }
    if(!checkUcase){
        alert('Password Must Contain one Upper Case');
        return false;
    }
}