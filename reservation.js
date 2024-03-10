const api = "http://127.0.0.1:8000";

document.addEventListener('DOMContentLoaded', function () {

    select_flight = JSON.parse(localStorage.getItem('select_flight'));
    passenger_list = JSON.parse(localStorage.getItem('passenger_data_depart'));
    select_seats = JSON.parse(localStorage.getItem('selected_seats'));

    console.log("Select Flight : ", select_flight)
    console.log("Passenger list : ", passenger_list)
    console.log("Select Seats : ", select_seats)

    get_reservation(select_flight, passenger_list, select_seats)
});

async function get_reservation(select_flight, passenger_list, select_seats) {
      try {
            const response = await fetch(`${api}/pay_by_qr`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "flight_instance_list": select_flight,
                    "passenger_list": passenger_list,
                    "flight_seats_list": select_seats,
                }),
            });
        
            // Handle the response here
            const responseData = await response.json();
            console.log(responseData);
        } catch (error) {
            console.error('Error:', error);
        }
}