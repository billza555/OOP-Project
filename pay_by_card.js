function prepare_data() {

    // localStorage.setItem('select_flight', JSON.stringify(select_flight_data));
    // localStorage.getItem('passenger_num')

    let all_respon = []
    JSON.parse(localStorage.getItem('input_from'))
    const response = {flight_instance_list : JSON.parse(localStorage.getItem('select_flight'))}
    const response2 = {passenger_list : JSON.parse(localStorage.getItem('passenger_data_depart'))}
    const response3 = {flight_seats_list : JSON.parse(localStorage.getItem('selected_seats'))}


    all_respon.push(response)
    all_respon.push(response2)
    all_respon.push(response3)

    console.log("All : ", all_respon)

    const card_number = document.getElementById("card_number").value;
    const name = document.getElementById("name").value;
    const expiry_date = document.getElementById("expiry_date").value;
    const cvv = document.getElementById("cvv").value;

    let missing_info_card = false; 
    if (card_number=="" || name=="" || expiry_date=="" || cvv=="") {
        missing_info_card = true;
    }

    if (missing_info_card) {

        alert("please fill the information");

    } else {
        localStorage.setItem("card_number", JSON.stringify(card_number));
        localStorage.setItem("name", JSON.stringify(name));
        localStorage.setItem("expiry_date", JSON.stringify(expiry_date));
        localStorage.setItem("cvv", JSON.stringify(cvv));
        localStorage.setItem('passengers_data', JSON.stringify(all_respon));
        document.location.href = "reservation_card.html";
    }

}