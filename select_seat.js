const api = "http://127.0.0.1:8000";

document.addEventListener('DOMContentLoaded', function () {
    console.log(localStorage.getItem("type"))
    if (localStorage.getItem("type") === "round_trip") {

        const flight_list = JSON.parse(localStorage.getItem('select_flight'));
        const depart_date = JSON.parse(localStorage.getItem('input_depart_date'));
        const return_date = JSON.parse(localStorage.getItem('input_return_date'));
        const date_list = [depart_date, return_date]

    // console.log("Flight list : ", flight_list)

        flight_number_list = []
        flight_number_list.push(flight_list[0]["flight_number"])
        flight_number_list.push(flight_list[1]["flight_number"])

    // console.log("new flight number list : ", flight_number_list)

        show_all_seats(flight_number_list, date_list);
    
    } else {

        const flight_list = JSON.parse(localStorage.getItem('select_flight'));
        const depart_date = JSON.parse(localStorage.getItem('input_depart_date'));
        const date_list = [depart_date]

    // console.log("Flight list : ", flight_list)

        flight_number_list = []
        flight_number_list.push(flight_list[0]["flight_number"])

    // console.log("new flight number list : ", flight_number_list)
        is_one_way()
        show_all_seats(flight_number_list, date_list);
    }
});

//show all seats of flight instance
async function show_all_seats(flight_number_list, date_list) {
    try {
        
        console.log("flight number list : ", flight_number_list)
        console.log("date_list : ", date_list)

        const response_1 = await fetch(`${api}/get_all_seats?flight_number=${flight_number_list[0]}&date=${date_list[0]}`);
        const depart_seats_list = await response_1.json();
        localStorage.setItem('depart_seat_list', JSON.stringify(depart_seats_list));
        console.log("Depart seats list : ", depart_seats_list)

        // Depart

        // normal seats

        // row-1
        const normal_container_1 = document.getElementById("normal-seats-row-1");
        normal_container_1.innerHTML = ''; // Clear previous content
        depart_seats_list.forEach((data, index) => {
            if (
                data._Seats__seat_category._SeatCategory__name === "normal_seat" &&
                (data._Seats__seat_number === "A3" ||
                 data._Seats__seat_number === "B3" ||
                 data._Seats__seat_number === "C3")
            ) {
                const element = document.createElement("div");
                console.log(data._FlightSeat__occupied)
                if(data._FlightSeat__occupied)
                {
                    element.innerHTML = `
                    <input type="checkbox" class="btn-check btn-select" id="normal-seat-${index} disabled" autocomplete="off">
                    <label class="btn btn-secondary depart-seat-number" for="normal-seat-${index}" id="select-seats-label" ">${data._Seats__seat_number}</label>`
                }
                else
                {
                element.innerHTML = `
                    <input type="checkbox" class="btn-check btn-select" id="normal-seat-${index}" autocomplete="off">
                    <label class="btn btn-outline-primary depart-seat-number" for="normal-seat-${index}" id="select-seats-label" onclick="select_seats('depart', ${index}, this)">${data._Seats__seat_number}</label>
                `;
                }
                normal_container_1.appendChild(element);
            }
        });

        // row-2
        const normal_container_2 = document.getElementById("normal-seats-row-2");
        normal_container_2.innerHTML = ''; // Clear previous content
        depart_seats_list.forEach((data, index) => {
            if (
                data._Seats__seat_category._SeatCategory__name === "normal_seat" &&
                (data._Seats__seat_number === "A4" ||
                 data._Seats__seat_number === "B4" ||
                 data._Seats__seat_number === "C4")
            ) {
                const element = document.createElement("div");
                if(data._FlightSeat__occupied)
                {
                    element.innerHTML = `
                    <input type="checkbox" class="btn-check btn-select" id="normal-seat-${index} disabled" autocomplete="off">
                    <label class="btn btn-secondary depart-seat-number" for="normal-seat-${index}" id="select-seats-label" ">${data._Seats__seat_number}</label>`
                }
                else
                {
                element.innerHTML = `
                    <input type="checkbox" class="btn-check btn-select" id="normal-seat-${index}" autocomplete="off">
                    <label class="btn btn-outline-primary depart-seat-number" for="normal-seat-${index}" id="select-seats-label" onclick="select_seats('depart', ${index}, this)">${data._Seats__seat_number}</label>
                `;
                }
                normal_container_2.appendChild(element);
            }
        });

        // row-3
        const normal_container_3 = document.getElementById("normal-seats-row-3");
        normal_container_3.innerHTML = ''; // Clear previous content
        depart_seats_list.forEach((data, index) => {
            if (
                data._Seats__seat_category._SeatCategory__name === "normal_seat" &&
                (data._Seats__seat_number === "A5" ||
                 data._Seats__seat_number === "B5" ||
                 data._Seats__seat_number === "C5")
            ) {
                const element = document.createElement("div");
                if(data._FlightSeat__occupied)
                {
                    element.innerHTML = `
                    <input type="checkbox" class="btn-check btn-select" id="normal-seat-${index} disabled" autocomplete="off">
                    <label class="btn btn-secondary depart-seat-number" for="normal-seat-${index}" id="select-seats-label" ">${data._Seats__seat_number}</label>`
                }
                else
                {
                element.innerHTML = `
                    <input type="checkbox" class="btn-check btn-select" id="normal-seat-${index}" autocomplete="off">
                    <label class="btn btn-outline-primary depart-seat-number" for="normal-seat-${index}" id="select-seats-label" onclick="select_seats('depart', ${index}, this)">${data._Seats__seat_number}</label>
                `;
                }
                normal_container_3.appendChild(element);
            }
        });

        // happy seats
        const happy_container = document.getElementById("happy-seats");
        happy_container.innerHTML = ''; // Clear previous content
        depart_seats_list.forEach((data, index) => {
            if (data._Seats__seat_category._SeatCategory__name === "happy_seat") {
                const element = document.createElement("div");
                if(data._FlightSeat__occupied)
                {
                    element.innerHTML = `
                    <input type="checkbox" class="btn-check btn-select" id="normal-seat-${index} disabled" autocomplete="off">
                    <label class="btn btn-secondary depart-seat-number" for="normal-seat-${index}" id="select-seats-label" ">${data._Seats__seat_number}</label>`
                }
                else
                {
                element.innerHTML = `
                                    <input type="checkbox" class="btn-check btn-select" id="normal-seat-${index}" autocomplete="off">
                                    <label class="btn btn-outline-success depart-seat-number" for="normal-seat-${index}" id="select-seats-label" onclick="select_seats('depart', ${index}, this)">${data._Seats__seat_number}</label>
                `;
                }
                happy_container.appendChild(element);
            }
        });

        // premium seats
        const premium_container = document.getElementById("premium-seats");
        premium_container.innerHTML = ''; // Clear previous content
        depart_seats_list.forEach((data, index) => {
            if (data._Seats__seat_category._SeatCategory__name === "premium_seat") {
                const element = document.createElement("div");
                if(data._FlightSeat__occupied)
                {
                    element.innerHTML = `
                    <input type="checkbox" class="btn-check btn-select" id="normal-seat-${index} disabled" autocomplete="off">
                    <label class="btn btn-secondary depart-seat-number" for="normal-seat-${index}" id="select-seats-label" ">${data._Seats__seat_number}</label>`
                }
                else
                {
                element.innerHTML = `
                                    <input type="checkbox" class="btn-check btn-select" id="normal-seat-${index}" autocomplete="off">
                                    <label class="btn btn-outline-danger depart-seat-number" for="normal-seat-${index}" id="select-seats-label" onclick="select_seats('depart', ${index}, this)">${data._Seats__seat_number}</label>
                `;
                }
                premium_container.appendChild(element);
            }
        });

        // -----------------------------------------------------------------------------------------------------------------------------------------------------------

        // retrun

        // normal seats

        // row-1
        if(localStorage.getItem("type") === "round_trip")
        {
        const response_2 = await fetch(`${api}/get_all_seats?flight_number=${flight_number_list[1]}&date=${date_list[1]}`);
        const return_seats_list = await response_2.json();
        console.log("Return seats list : ", return_seats_list)

        localStorage.setItem('return_seat_list', JSON.stringify(return_seats_list));
        const return_normal_container_1 = document.getElementById("return-normal-seats-row-1");
        return_normal_container_1.innerHTML = ''; // Clear previous content
        depart_seats_list.forEach((data, index) => {
            if (
                data._Seats__seat_category._SeatCategory__name === "normal_seat" &&
                (data._Seats__seat_number === "A3" ||
                 data._Seats__seat_number === "B3" ||
                 data._Seats__seat_number === "C3")
            ) {
                const element = document.createElement("div");
                if(data._FlightSeat__occupied)
                {
                    element.innerHTML = `
                    <input type="checkbox" class="btn-check btn-select" id="return-normal-seat-${index}" autocomplete="off">
                    <label class="btn btn-secondary return-seat-number" for="return-normal-seat-${index}" id="return-select-seats-label">${data._Seats__seat_number}</label>
                `;
                }
                else
                {
                element.innerHTML = `
                    <input type="checkbox" class="btn-check btn-select" id="return-normal-seat-${index}" autocomplete="off">
                    <label class="btn btn-outline-primary return-seat-number" for="return-normal-seat-${index}" id="return-select-seats-label" onclick="select_seats('return', ${index}, this)">${data._Seats__seat_number}</label>
                `;
                }
                return_normal_container_1.appendChild(element);
            }
        });

        // row-2
        const return_normal_container_2 = document.getElementById("return-normal-seats-row-2");
        return_normal_container_2.innerHTML = ''; // Clear previous content
        depart_seats_list.forEach((data, index) => {
            if (
                data._Seats__seat_category._SeatCategory__name === "normal_seat" &&
                (data._Seats__seat_number === "A4" ||
                 data._Seats__seat_number === "B4" ||
                 data._Seats__seat_number === "C4")
            ) {
                const element = document.createElement("div");
                if(data._FlightSeat__occupied)
                {
                    element.innerHTML = `
                    <input type="checkbox" class="btn-check btn-select" id="return-normal-seat-${index}" autocomplete="off">
                    <label class="btn btn-secondary return-seat-number" for="return-normal-seat-${index}" id="return-select-seats-label">${data._Seats__seat_number}</label>
                `;
                }
                else
                {
                element.innerHTML = `
                    <input type="checkbox" class="btn-check btn-select" id="return-normal-seat-${index}" autocomplete="off">
                    <label class="btn btn-outline-primary return-seat-number" for="return-normal-seat-${index}" id="return-select-seats-label" onclick="select_seats('return', ${index}, this)">${data._Seats__seat_number}</label>
                `;
                }
                return_normal_container_2.appendChild(element);
            }
        });

        // row-3
        const return_normal_container_3 = document.getElementById("return-normal-seats-row-3");
        return_normal_container_3.innerHTML = ''; // Clear previous content
        depart_seats_list.forEach((data, index) => {
            if (
                data._Seats__seat_category._SeatCategory__name === "normal_seat" &&
                (data._Seats__seat_number === "A5" ||
                 data._Seats__seat_number === "B5" ||
                 data._Seats__seat_number === "C5")
            ) {
                const element = document.createElement("div");
                if(data._FlightSeat__occupied)
                {
                    element.innerHTML = `
                    <input type="checkbox" class="btn-check btn-select" id="return-normal-seat-${index}" autocomplete="off">
                    <label class="btn btn-secondary return-seat-number" for="return-normal-seat-${index}" id="return-select-seats-label">${data._Seats__seat_number}</label>
                `;
                }
                else
                {
                element.innerHTML = `
                    <input type="checkbox" class="btn-check btn-select" id="return-normal-seat-${index}" autocomplete="off">
                    <label class="btn btn-outline-primary return-seat-number" for="return-normal-seat-${index}" id="return-select-seats-label" onclick="select_seats('return', ${index}, this)">${data._Seats__seat_number}</label>
                `;
                }
                return_normal_container_3.appendChild(element);
            }
        });

        // happy seats
        const return_happy_container = document.getElementById("return-happy-seats");
        return_happy_container.innerHTML = ''; // Clear previous content
        depart_seats_list.forEach((data, index) => {
            if (data._Seats__seat_category._SeatCategory__name === "happy_seat") {
                const element = document.createElement("div");
                if(data._FlightSeat__occupied)
                {
                    element.innerHTML = `
                                    <input type="checkbox" class="btn-check btn-select" id="return-normal-seat-${index}" autocomplete="off">
                                    <label class="btn btn-secondary return-seat-number" for="return-normal-seat-${index}" id="return-select-seats-label">${data._Seats__seat_number}</label>
                `;
                }
                else
                {
                element.innerHTML = `
                                    <input type="checkbox" class="btn-check btn-select" id="return-normal-seat-${index}" autocomplete="off">
                                    <label class="btn btn-outline-success return-seat-number" for="return-normal-seat-${index}" id="return-select-seats-label" onclick="select_seats('return', ${index}, this)">${data._Seats__seat_number}</label>
                `;
                }
                return_happy_container.appendChild(element);
            }
        });

        // premium seats
        const return_premium_container = document.getElementById("return-premium-seats");
        return_premium_container.innerHTML = ''; // Clear previous content
        depart_seats_list.forEach((data, index) => {
            if (data._Seats__seat_category._SeatCategory__name === "premium_seat") {
                const element = document.createElement("div");
                if(data._FlightSeat__occupied)
                {
                    element.innerHTML = `
                    <input type="checkbox" class="btn-check btn-select" id="return-normal-seat-${index}" autocomplete="off">
                                    <label class="btn btn-secondary return-seat-number" for="return-normal-seat-${index}" id="return-select-seats-label">${data._Seats__seat_number}</label>`
                }
                else
                {
                element.innerHTML = `
                                    <input type="checkbox" class="btn-check btn-select" id="return-normal-seat-${index}" autocomplete="off">
                                    <label class="btn btn-outline-danger  return-seat-number" for="return-normal-seat-${index}" id="return-select-seats-label" onclick="select_seats('return', ${index}, this)">${data._Seats__seat_number}</label>
                `;
                }
                return_premium_container.appendChild(element);
            }
        });
        }
    } catch(error) {
        console.error('Error:', error);
    }
}

let len_passenger = JSON.parse(localStorage.getItem('passenger_num'));

let selectedDepartSeats = []; // Declare a global array to store selected depart seats
let selectedReturnSeats = []
let depart_seat = [];
let return_seat = []

function select_seats(type, index, button) {

    if (type == "depart") {
        const depart_seats_list = JSON.parse(localStorage.getItem('depart_seat_list'));
        console.log("Depart seat list : ", depart_seats_list)

        const depart_selected_seat = button.parentNode.querySelector('.depart-seat-number').textContent

        const isSeatSelected = selectedDepartSeats.includes(depart_selected_seat);

        if (!isSeatSelected) {

            const seat_detail = {
            seat_number: depart_selected_seat,
            seat_category: depart_seats_list[index]._Seats__seat_category._SeatCategory__name,
            seat_price: depart_seats_list[index]._Seats__seat_category._SeatCategory__price
            };

            selectedDepartSeats.push(depart_selected_seat);

            if (selectedDepartSeats.length <= len_passenger) {
                depart_seat.push(seat_detail);
                // Change the button style or add visual indication as needed

                // Example: Change button color
                button.classList.add('selected-seat');
            } else {
                const button = document.getElementById("normal-seat-"+index);
                button.click();
                button.classList.remove("select-seat")
                const seatIndex = selectedDepartSeats.indexOf(depart_selected_seat);
                selectedDepartSeats.splice(seatIndex, 1);
                console.log("button", button)
            }

        } else {
        // If the seat is already selected, remove it from the array
            const seatIndex = selectedDepartSeats.indexOf(depart_selected_seat);
            selectedDepartSeats.splice(seatIndex, 1);

            // Remove the seat from the depart_seat array
            depart_seat = depart_seat.filter(seat => seat.seat_number !== depart_selected_seat);

        // Remove the visual indication (change button style as needed)

        // Example: Remove selected-seat class
            button.classList.remove('selected-seat');
        }

            localStorage.setItem("seat_depart", JSON.stringify(selectedDepartSeats))
            console.log("Depart Seat", selectedDepartSeats);

        } else {
            const return_seats_list = JSON.parse(localStorage.getItem('return_seat_list'));
            console.log("Return seat list : ", return_seats_list)

            const return_selected_seat = button.parentNode.querySelector('.return-seat-number').textContent

            const isSeatSelected = selectedReturnSeats.includes(return_selected_seat);

        if (!isSeatSelected) {

            const seat_detail = {
                seat_number: return_selected_seat,
                seat_category: return_seats_list[index]._Seats__seat_category._SeatCategory__name,
                seat_price: return_seats_list[index]._Seats__seat_category._SeatCategory__price
            };

            selectedReturnSeats.push(return_selected_seat);

            if (selectedReturnSeats.length <= len_passenger) {
                return_seat.push(seat_detail);
                // Change the button style or add visual indication as needed

                // Example: Change button color
                button.classList.add('selected-seat');

            } else {
                const button = document.getElementById("return-normal-seat-"+index);
                button.click();
                button.classList.remove("select-seat")
                const seatIndex = selectedReturnSeats.indexOf(return_selected_seat);
                selectedReturnSeats.splice(seatIndex, 1);
                console.log("button", button)
            }

        } else {
            // If the seat is already selected, remove it from the array
            const seatIndex = selectedReturnSeats.indexOf(return_selected_seat);
            selectedReturnSeats.splice(seatIndex, 1);

            // Remove the seat from the depart_seat array
            return_seat = return_seat.filter(seat => seat.seat_number !== return_selected_seat);

            // Remove the visual indication (change button style as needed)

            // Example: Remove selected-seat class
            button.classList.remove('selected-seat');
        }

        localStorage.setItem("seat_return", JSON.stringify(selectedReturnSeats))
        console.log("Return Seat", selectedReturnSeats);
        
    }

}

function to_select_service() {

    let selected_seats = []

    let departSeat = JSON.parse(localStorage.getItem('seat_depart'));
    let returntSeat = JSON.parse(localStorage.getItem('seat_return'));

    selected_seats.push(departSeat)
    
    if (localStorage.getItem("type") == "round_trip") {

        selected_seats.push(returntSeat)
    }
    
    console.log("Selected seat : ", selected_seats)

    localStorage.setItem('selected_seats', JSON.stringify(selected_seats));

    
    document.location.href = "service.html";
}

function is_one_way()
{
    document.querySelector('.return-container').style.display= 'none'
}