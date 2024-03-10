const api = "http://127.0.0.1:8000";

document.addEventListener('DOMContentLoaded', function () {
    const len_passenger = JSON.parse(localStorage.getItem('passenger_num'));

    to_passengers_fill(len_passenger);
});

async function to_passengers_fill(len_passenger) {
    try {

        const passenger_container = document.getElementById("container");

        for (var i = 1 ; i < len_passenger ; i++) {

            const element = document.createElement("div");
            element.innerHTML = `
            <div class="pass-container">
                <label class="title-label fw-bold">
                    Passenger ${i + 1}
                </label>
                <div class="pass-input">
                    <div class="input-detail">
                        <div class="info-name">
                            <div class="title-passenger">
                                <label class="title-label">Title</label>
                                <select class="form-select title-input" id="title-input_${i + 1}">
                                    <option value="Mr.">Mr.</option>
                                    <option value="Mrs.">Mrs.</option>
                                    <option value="Miss">Miss</option>
                                    <option value="Monk">Monk</option>
                                </select>
                            </div>
                            <div class="first-name-passenger">
                                <label class="first-name-label">First name</label>
                                <input type="text" class="form-control first-name" placeholder="Enter first name" id = "passenger-first-name_${i + 1}">
                            </div>
                            <div class="middle-name-passenger">
                                <label class="middle-name-label">Middle name</label>
                                <input type="text" class="form-control middle-name" placeholder="Enter middle name" id = "passenger-middle-name_${i + 1}">
                            </div>
                            <div class="last-name-passenger">
                                <label class="last-name-label">Last name</label>
                                <input type="text" class="form-control last-name" placeholder="Enter last name" id = "passenger-last-name_${i + 1}">
                            </div>
                        </div>
                    <div class="info-birth">
                        <div class="select-birth">
                            <label class="birth-label">Date of Birth</label>
                            <input type="date" id="birth_date_${i + 1}" class="form-select birth-passenger"/>
                        </div>
                    </div>  
                </div>
            </div>
                `;
            passenger_container.appendChild(element);
        }

    } catch (error) {
          console.error('Error:', error);
    }
}

function to_select_seat() {

    const passenger_data = [];
    const len_passenger = JSON.parse(localStorage.getItem('passenger_num'));

    if (len_passenger > 1) {

        const first_passenger_info = {
            title: document.getElementById(`title-input`).value,
            first_name: document.getElementById(`passenger-first-name`).value,
            middle_name: document.getElementById(`passenger-middle-name`).value,
            last_name: document.getElementById(`passenger-last-name`).value,
            birthday: document.getElementById(`birth_date`).value,
            phone_number: document.getElementById(`passenger-phone-number`).value,
            email: document.getElementById(`passenger-email`).value

        };
    
        passenger_data.push(first_passenger_info)

        for (var i = 1 ; i < len_passenger; i++) {

            const passengerInfo = {
                title: document.getElementById(`title-input_${i + 1}`).value,
                first_name: document.getElementById(`passenger-first-name_${i + 1}`).value,
                middle_name: document.getElementById(`passenger-middle-name_${i + 1}`).value,
                last_name: document.getElementById(`passenger-last-name_${i + 1}`).value,
                phone_number: "",
                email: "",
                birthday: document.getElementById(`birth_date_${i + 1}`).value
                };

            passenger_data.push(passengerInfo);
        }

    } else {
        const first_passenger_info = {
            title: document.getElementById(`title-input`).value,
            first_name: document.getElementById(`passenger-first-name`).value,
            middle_name: document.getElementById(`passenger-middle-name`).value,
            last_name: document.getElementById(`passenger-last-name`).value,
            birthday: document.getElementById(`birth_date`).value,
            phone_number: document.getElementById(`passenger-phone-number`).value,
            email: document.getElementById(`passenger-email`).value
        };
    
        passenger_data.push(first_passenger_info)
    }

    console.log(passenger_data)
    localStorage.setItem('passenger_data', JSON.stringify(passenger_data));

    document.location.href = "select_seat.html";

}
