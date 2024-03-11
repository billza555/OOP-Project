const api = "http://127.0.0.1:8000";

document.addEventListener('DOMContentLoaded', function () {
    const new_input_from = JSON.parse(localStorage.getItem('input_from'));
    const new_input_to = JSON.parse(localStorage.getItem('input_to'));
    const new_input_depart_date = JSON.parse(localStorage.getItem('input_depart_date'));

    show_flight(new_input_from, new_input_to, new_input_depart_date);
});

async function show_flight(new_input_from, new_input_to, new_input_depart_date) {
   
    try {
        const response = await fetch(`${api}/flight_instance_matches?starting_location=${new_input_from}&destination=${new_input_to}&depart_date=${new_input_depart_date}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const response_data = await response.json();
        console.log("Response data : ", response_data)

        const depart_flight_data = response_data[0];

        // console.log("Depart_flight_data", depart_flight_data)

        localStorage.setItem('one-way-depart_flight_data', JSON.stringify(depart_flight_data));

        // Departure flight label
        const departLabelContainer = document.querySelector(".one-way-depart-label");
        departLabelContainer.textContent = `Departure : ${new_input_from} --> ${new_input_to}`;
        
        // Departure date label
        const departLabelContainers = document.querySelector(".one-way-depart-labels");
        departLabelContainers.textContent = `Date : ${new_input_depart_date}`;

        // Departure flight details
        const departContainer = document.getElementById("one-way-flight-detail-each-item");
        departContainer.innerHTML = ''; // Clear previous content
        depart_flight_data.forEach((data, index) => {
            const element = document.createElement("div");
            element.innerHTML = `
                    <label class="one-way-depart-time-label flight-detail-items-i" id="one-way-depart-time">${data["departure_time"]}</label>
                    <label class="one-way-arrive-time-label flight-detail-items-i" id="one-way-arrive-time">${data["arrival_time"]}</label>
                    <label class="one-way-flight-number-label flight-detail-items-i" id="one-way-flight_number">${data["flight_number"]}</label>
                    <label class="one-way-aircraft_number-label flight-detail-items-i" id="one-way-aircraft_number">${data["aircraft_number"]}</label>

                    <input type="radio" class="btn-check" name="departRadio" id="departBtnRadio${index}" autocomplete="off">
                    <label class="btn btn-outline-primary choose-flight-btn one-way-flight-detail-items-i" for="departBtnRadio${index}" id="selectBtn" onclick="selectFlight('depart', ${index}, this)">${data["cost"]} Baht</label>
                `;
            departContainer.appendChild(element);
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

let depart_data = [];
let return_data = [];

function selectFlight(type, index, button) {

    const new_input_depart_date = JSON.parse(localStorage.getItem('input_depart_date'));
    const new_input_return_date = JSON.parse(localStorage.getItem('input_return_date'));

    if (type === 'depart') {

        const flightDetails = {
            flight_number: button.parentNode.querySelector('.one-way-flight-number-label').textContent,
            date: new_input_depart_date
        };

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

function to_passengers_fill() {

    const select_flight_data = JSON.parse(localStorage.getItem('select_flight'));
    console.log("Select Flight : ", select_flight_data)
    localStorage.setItem('select_flight', JSON.stringify(select_flight_data));

    document.location.href = "fill_passengers_info.html";

}