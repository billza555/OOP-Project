const api = "http://127.0.0.1:8000";

document.addEventListener('DOMContentLoaded', function () {
    const from = JSON.parse(localStorage.getItem('from'));
    const to = JSON.parse(localStorage.getItem('to'));
    const date = JSON.parse(localStorage.getItem('date'));
    const passenger_num = JSON.parse(localStorage.getItem('passenger_num'));

    console.log(from)
    console.log(to)
    console.log(date)
    console.log(passenger_num)


    get_all_flight(from, to, date);
   
});

async function get_all_flight(from, to, date) {
      
      try {
            const response = await fetch(`${api}/flight_instance_matches?froml=${from}&to=${to}&depart_date=${date}&return_date=""`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const response_data = await response.json();
            console.log(response_data)  

            const departFlights = response_data[0];

            const departLabelContainer = document.querySelector(".depart-label");
            departLabelContainer.textContent = `Departure : ${departFlights[0]["depart_starting_location"]} --> ${departFlights[0]["depart_destination"]}`;

            const container = document.getElementById("flight-detail-each-item");

            departFlights.forEach(data => {
                const element = document.createElement("div");
                element.innerHTML = `
                    <label for="depart-time" class="depart-time-label flight-detail-items-i" id="depart-time">${data["depart_departure_time"]}</label>
                    <label for="arrive-time" class="arrive-time-label flight-detail-items-i" id="arrive-time">${data["depart_arrival_time"]}</label>
                    <label for="flight-number" class="flight-number-label flight-detail-items-i" id="flight_number">${data["depart_flight_number"]}</label>
                    <label for="aircraft_number" class="aircraft_number-label flight-detail-items-i" id="aircraft_number">${data["depart_aircraft_number"]}</label>
                    <button class="btn btn-success choose-flight-btn flight-detail-items-i" id="select-btn">${data["depart_cost"]} Baht</button>
                `;
                container.appendChild(element);
            });

        } catch (error) {
            console.error('Error:', error);
        }

}























