const api = "http://127.0.0.1:8000";

document.addEventListener('DOMContentLoaded', function () {

    const new_input_from = JSON.parse(localStorage.getItem('input_from'));
    const new_input_to = JSON.parse(localStorage.getItem('input_to'));
    const new_input_depart_date = JSON.parse(localStorage.getItem('input_depart_date'));

    show_one_way_flight(new_input_from, new_input_to, new_input_depart_date);
   
});

async function show_one_way_flight(new_input_from, new_input_to, new_input_depart_date) {
      
    try {

        const response = await fetch(`${api}/flight_instance_matches?starting_location=${new_input_from}&destination=${new_input_to}&depart_date=${new_input_depart_date}&return_date=""`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        } 

        const response_data = await response.json();
        console.log(response_data)  

        const departFlights = response_data[0];

        const departLabelContainer = document.querySelector(".depart-label");
        departLabelContainer.textContent = `Departure : ${departFlights[0]["starting_location"]} --> ${departFlights[0]["destination"]}`;

        const departLabelContainers = document.querySelector(".depart-labels");
        departLabelContainers.textContent = `Departure : ${departFlights[0]["departure_date"]}`;

        const container = document.getElementById("flight-detail-each-item");

        departFlights.forEach((data,index) => {
            const element = document.createElement("div");
            element.innerHTML = `
                    
                <label  class="depart-time-label flight-detail-items-i" id="depart-time">${data["departure_time"]}</label>
                <label  class="arrive-time-label flight-detail-items-i" id="arrive-time">${data["arrival_time"]}</label>
                <label  class="flight-number-label flight-detail-items-i" id="flight_number">${data["flight_number"]}</label>
                <label  class="aircraft_number-label flight-detail-items-i" id="aircraft_number">${data["aircraft_number"]}</label>
                
                <input type="radio" class="btn-check" name="btnradio" id="btnradio${index}" autocomplete="off" checked>
                <label class="btn btn-outline-primary" for="btnradio${index}" onclick="selectFlight('depart', ${index}, this)">${data["cost"]}</label>
                
            `;
                container.appendChild(element);
            });

    } catch (error) {
            console.error('Error:', error);
    }
}

let depart_data = [];

function selectFlight(type, index, button) {

    const flightDetails = {
        departure_time: button.parentNode.querySelector('.depart-time-label').textContent,
        arrival_time: button.parentNode.querySelector('.arrive-time-label').textContent,
        flight_number: button.parentNode.querySelector('.flight-number-label').textContent,
        aircraft_number: button.parentNode.querySelector('.aircraft_number-label').textContent,
        cost: button.textContent.split(' ')[0]
    };

    if (type === 'depart') {
        if (depart_data.length > 0) {
            depart_data[0] = flightDetails;
        } else {
            depart_data.push(flightDetails);
        }
    }

    const select_data = [...depart_data];

    console.log("Depart : ", depart_data);
    console.log("Selected : ", select_data);

    localStorage.setItem('select_flight', JSON.stringify(select_data));

}

function to_passengers_fills() {

    const select_flight_data = JSON.parse(localStorage.getItem('select_flight'));
    console.log("Select Flight : ", select_flight_data)
    localStorage.setItem('select_flight', JSON.stringify(select_flight_data));

    document.location.href = "fill_passengers_info.html";

}

