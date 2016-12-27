
function validateForm() {
	console.log("inside the validateform");
    var x = document.forms["loginForm"]["username"]["password"].value;
    if (x == null || x == "") {
    	
        alert("this fields must be filled out");
        return false;
    }
}
