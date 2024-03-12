const api = "http://127.0.0.1:8000";

document.addEventListener('DOMContentLoaded', function () {
    const booking_ref_data = JSON.parse(localStorage.getItem('booking_ref'));
    const last_name_data = JSON.parse(localStorage.getItem('last_name'));
    console.log(booking_ref_data);
    console.log(last_name_data);
    get_boarding_pass(booking_ref_data, last_name_data);
});

async function get_boarding_pass(booking_ref, last_name) {
    const data = {"booking_reference": booking_ref,
                  "last_name": last_name}

    try {
        const response = await fetch(`${api}/check_in?booking_reference=${booking_ref}&last_name=${last_name}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const response_data = await response.json();
        console.log(response_data);
        console.log(response_data.length);

        const showing_boarding_pass = document.getElementById('boarding_pass');

        response_data.forEach(data => {
            const element = document.createElement("div");
            element.innerHTML = `
            <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Boarding Pass</h5>
                <p class="card-text">name : ${data._BoardingPass__passenger_name}</p>
                <p class="card-text">flight number : ${data._BoardingPass__flight_number}</p>
                <p class="card-text">date : ${data._BoardingPass__departure_date}</p>
                <p class="card-text">from : ${data._BoardingPass__starting_location}</p>
                <p class="card-text">to : ${data._BoardingPass__destination}</p>
                <p class="card-text">seat : ${data._BoardingPass__flight_seat_number}</p>
                <p class="card-text">aircraft : ${data._BoardingPass__aircraft_number}</p>
                <p class="card-text">booking reference : ${data._BoardingPass__booking_reference}</p>
            </div>
            </div>
            `;
            showing_boarding_pass.appendChild(element);
          });

    } catch (error) {
        console.error('Error:', error);
    }
}