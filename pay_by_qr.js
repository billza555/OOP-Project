
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

    localStorage.setItem('passengers_data', JSON.stringify(all_respon));

    document.location.href = "reservation.html";

}