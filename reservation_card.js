const api = "http://127.0.0.1:8000";

document.addEventListener('DOMContentLoaded', function () {

    select_flight = JSON.parse(localStorage.getItem('select_flight'));
    passenger_list = JSON.parse(localStorage.getItem('passenger_data'));
    select_seats = JSON.parse(localStorage.getItem('selected_seats'));


    card_number = JSON.parse(localStorage.getItem('card_number'));
    name_holder = JSON.parse(localStorage.getItem('name'));
    expiry_date = JSON.parse(localStorage.getItem('expiry_date'));
    cvv = JSON.parse(localStorage.getItem('cvv'));


    console.log("Select Flight : ", select_flight)
    console.log("Passenger list : ", passenger_list)
    console.log("Select Seats : ", select_seats)

    get_reservation(card_number, name_holder, expiry_date, cvv, select_flight, passenger_list, select_seats)
});

async function get_reservation(card_number, name_holder, expiry_date, cvv, select_flight, passenger_list, select_seats) {
      try {
            const response = await fetch(`${api}/pay_by_credit?card_number=${card_number}&cardholder_name=${name_holder}&expiry_date=${expiry_date}&cvv=${cvv}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'cache': 'no-store',
                },
                body: JSON.stringify({
                    "flight_instance_list": select_flight,
                    "passenger_list": passenger_list,
                    "flight_seats_list": select_seats,
                }),
            });
        
            // Handle the response here
            const reservation = await response.json();

            console.log(reservation);

        

        } catch (error) {
            console.error('Error:', error);
        }    

}