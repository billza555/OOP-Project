const api = "http://127.0.0.1:8000";

document.addEventListener('DOMContentLoaded', function () {
    const new_input_from = JSON.parse(localStorage.getItem('input_from'));
    const new_input_to = JSON.parse(localStorage.getItem('input_to'));
    const new_input_depart_date = JSON.parse(localStorage.getItem('input_depart_date'));
    const new_input_return_date = JSON.parse(localStorage.getItem('input_return_date'));

    show_flight(new_input_from, new_input_to, new_input_depart_date, new_input_return_date);
});

async function show_flight(new_input_from, new_input_to, new_input_depart_date, new_input_return_date) {
   
    try {
        const response = await fetch(`${api}/flight_instance_matches?starting_location=${new_input_from}&destination=${new_input_to}&depart_date=${new_input_depart_date}&return_date=${new_input_return_date}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const response_data = await response.json();
        console.log("Response data : ", response_data)

        const depart_flight_data = response_data[0];
        const return_flight_data = response_data[1];

        console.log("Depart_flight_list", depart_flight_data)
        console.log("Return", return_flight_data)

        localStorage.setItem('depart_flight_data', JSON.stringify(depart_flight_data));
        localStorage.setItem('return_flight_data', JSON.stringify(return_flight_data));

        // Departure flight label
        const departLabelContainer = document.querySelector(".depart-label");
        departLabelContainer.textContent = `Departure : ${new_input_from} --> ${new_input_to}`;
        
        // Departure date label
        const departLabelContainers = document.querySelector(".depart-labels");
        departLabelContainers.textContent = `Date : ${new_input_depart_date}`;

        // Departure flight details
        const departContainer = document.getElementById("flight-detail-each-item");
        departContainer.innerHTML = '';

        depart_flight_data.forEach((data, index) => {
            const element = document.createElement("div");
            element.innerHTML = `
                    <label class="depart-time-label flight-detail-items-i" id="depart-time">${data["departure_time"]}</label>
                    <label class="arrive-time-label flight-detail-items-i" id="arrive-time">${data["arrival_time"]}</label>
                    <label class="flight-number-label flight-detail-items-i" id="flight_number">${data["flight_number"]}</label>
                    <label class="aircraft_number-label flight-detail-items-i" id="aircraft_number">${data["aircraft_number"]}</label>

                    <input type="radio" class="btn-check" name="departRadio" id="departBtnRadio${index}" autocomplete="off">
                    <label class="btn btn-outline-primary choose-flight-btn flight-detail-items-i" for="departBtnRadio${index}" id="selectBtn" onclick="selectFlight('depart', ${index}, this)">${data["cost"]} Baht</label>
                `;
            departContainer.appendChild(element);
        });

        // Return flight label
        const return_label = document.querySelector(".return-label");
        return_label.textContent = `Return : ${new_input_to} --> ${new_input_from}`;

        // Return date label
        const return_labels = document.querySelector(".return-labels");
        return_labels.textContent = `Return : ${new_input_return_date}`;

        // Return flight details
        const returnContainer = document.getElementById("flight-return-detail-each-item");
        returnContainer.innerHTML = '';
        
        return_flight_data.forEach((data, index)=> {
            const element = document.createElement("div");
            element.innerHTML = `
                <label class="depart-time-label flight-detail-items-i" id="depart-time">${data["departure_time"]}</label>
                <label class="arrive-time-label flight-detail-items-i" id="arrive-time">${data["arrival_time"]}</label>
                <label class="flight-number-label flight-detail-items-i" id="flight_number">${data["flight_number"]}</label>
                <label class="aircraft_number-label flight-detail-items-i" id="aircraft_number">${data["aircraft_number"]}</label>

                <input type="radio" class="btn-check" name="returnRadio" id="returnBtnRadio${index}" autocomplete="off">
                <label class="btn btn-outline-primary choose-flight-btn flight-detail-items-i" for="returnBtnRadio${index}" id="selectBtn" onclick="selectFlight('return', ${index}, this)">${data["cost"]} Baht</label>
                `;
            returnContainer.appendChild(element);
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
            flight_number: button.parentNode.querySelector('.flight-number-label').textContent,
            date: new_input_depart_date
        };

        if (depart_data.length > 0) {
            depart_data[0] = flightDetails;
        } else {
            depart_data.push(flightDetails);
        }
    }

    if (type === 'return') {

        const flightDetails = {
            flight_number: button.parentNode.querySelector('.flight-number-label').textContent,
            date: new_input_return_date
        };

        if (return_data.length > 0) {
            return_data[0] = flightDetails;
        } else {
            return_data.push(flightDetails);
        }
    }

    const select_data = [...depart_data, ...return_data];

    console.log("Depart : ", depart_data);
    console.log("Return : ", return_data);
    console.log("Selected : ", select_data);

    localStorage.setItem('select_flight', JSON.stringify(select_data));
}

function to_passengers_fill() {

    const select_flight_data = JSON.parse(localStorage.getItem('select_flight'));
    console.log("Select Flight : ", select_flight_data)
    localStorage.setItem('select_flight', JSON.stringify(select_flight_data));

    document.location.href = "fill_passengers_info.html";

}