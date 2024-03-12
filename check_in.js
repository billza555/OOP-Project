const api = "http://127.0.0.1:8000";

function click_check_in() {
    
      let booking_ref = document.getElementById("booking_ref").value;
      let last_name = document.getElementById("last_name").value;
      
      let missing_info_check_in = false; 
      
      if (booking_ref === "" || last_name === "") {
            missing_info_check_in = true;
      }

      if (missing_info_check_in) {

            alert("please fill the information");

      } else {

            localStorage.setItem('booking_ref', JSON.stringify(booking_ref));
            localStorage.setItem('last_name', JSON.stringify(last_name));

            document.location.href = "boarding_pass.html";
      }
}