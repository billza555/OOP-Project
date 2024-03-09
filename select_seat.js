const api = "http://127.0.0.1:8000";

document.addEventListener('DOMContentLoaded', function () {
    const flight_list = JSON.parse(localStorage.getItem('select_flight'));
    const depart_date = JSON.parse(localStorage.getItem('input_depart_date'));
    const return_date = JSON.parse(localStorage.getItem('input_return_date'));
    const date_list = [depart_date, return_date]

    console.log("Flight list : ", flight_list)

    flight_number_list = []
    flight_number_list.push(flight_list[0]["flight_number"])
    flight_number_list.push(flight_list[1]["flight_number"])

    console.log("new flight number list : ", flight_number_list)

    show_all_seats(flight_number_list, date_list);
});

//show all seats of flight instance
async function show_all_seats(flight_number_list, date_list) {
    try {

        const response_1 = await fetch(`${api}/get_all_seats?flight_number=${flight_number_list[0]}&date=${date_list[0]}`);
        const response_2 = await fetch(`${api}/get_all_seats?flight_number=${flight_number_list[1]}&date=${date_list[1]}`);

        const depart_seats_list = await response_1.json();
        const return_seats_list = await response_2.json();
        console.log("Depart seats list : ", depart_seats_list)
        console.log("Return seats list : ", return_seats_list)

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
                element.innerHTML = `
                    <input type="checkbox" class="btn-check btn-select" id="normal-seat-${index}" autocomplete="off">
                    <label class="btn btn-outline-primary" for="normal-seat-${index}" id="select-seats-label">${data._Seats__seat_number}</label>
                `;
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
                element.innerHTML = `
                    <input type="checkbox" class="btn-check btn-select" id="normal-seat-${index}" autocomplete="off">
                    <label class="btn btn-outline-primary" for="normal-seat-${index}" id="select-seats-label">${data._Seats__seat_number}</label>
                `;
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
                element.innerHTML = `
                    <input type="checkbox" class="btn-check btn-select" id="normal-seat-${index}" autocomplete="off">
                    <label class="btn btn-outline-primary" for="normal-seat-${index}" id="select-seats-label">${data._Seats__seat_number}</label>
                `;
                normal_container_3.appendChild(element);
            }
        });

        // happy seats
        const happy_container = document.getElementById("happy-seats");
        happy_container.innerHTML = ''; // Clear previous content
        depart_seats_list.forEach((data, index) => {
            if (data._Seats__seat_category._SeatCategory__name === "happy_seat") {
                const element = document.createElement("div");
                element.innerHTML = `
                                    <input type="checkbox" class="btn-check btn-select" id="normal-seat-${index}" autocomplete="off">
                                    <label class="btn btn-outline-primary" for="normal-seat-${index}" id="select-seats-label">${data._Seats__seat_number}</label>
                `;
                happy_container.appendChild(element);
            }
        });

        // premium seats
        const premium_container = document.getElementById("premium-seats");
        premium_container.innerHTML = ''; // Clear previous content
        depart_seats_list.forEach((data, index) => {
            if (data._Seats__seat_category._SeatCategory__name === "premium_seat") {
                const element = document.createElement("div");
                element.innerHTML = `
                                    <input type="checkbox" class="btn-check btn-select" id="normal-seat-${index}" autocomplete="off">
                                    <label class="btn btn-outline-primary" for="normal-seat-${index}" id="select-seats-label">${data._Seats__seat_number}</label>
                `;
                premium_container.appendChild(element);
            }
        });

        // -----------------------------------------------------------------------------------------------------------------------------------------------------------

        // retrun

        // normal seats

        // row-1
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
                element.innerHTML = `
                    <input type="checkbox" class="btn-check btn-select" id="return-normal-seat-${index}" autocomplete="off">
                    <label class="btn btn-outline-primary" for="return-normal-seat-${index}" id="return-select-seats-label">${data._Seats__seat_number}</label>
                `;
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
                element.innerHTML = `
                    <input type="checkbox" class="btn-check btn-select" id="return-normal-seat-${index}" autocomplete="off">
                    <label class="btn btn-outline-primary" for="return-normal-seat-${index}" id="return-select-seats-label">${data._Seats__seat_number}</label>
                `;
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
                element.innerHTML = `
                    <input type="checkbox" class="btn-check btn-select" id="return-normal-seat-${index}" autocomplete="off">
                    <label class="btn btn-outline-primary" for="return-normal-seat-${index}" id="return-select-seats-label">${data._Seats__seat_number}</label>
                `;
                return_normal_container_3.appendChild(element);
            }
        });

        // happy seats
        const return_happy_container = document.getElementById("return-happy-seats");
        return_happy_container.innerHTML = ''; // Clear previous content
        depart_seats_list.forEach((data, index) => {
            if (data._Seats__seat_category._SeatCategory__name === "happy_seat") {
                const element = document.createElement("div");
                element.innerHTML = `
                                    <input type="checkbox" class="btn-check btn-select" id="return-happy-seat-${index}" autocomplete="off">
                                    <label class="btn btn-outline-primary" for="return-happy-seat-${index}" id="return-select-seats-label">${data._Seats__seat_number}</label>
                `;
                return_happy_container.appendChild(element);
            }
        });

        // premium seats
        const return_premium_container = document.getElementById("return-premium-seats");
        return_premium_container.innerHTML = ''; // Clear previous content
        depart_seats_list.forEach((data, index) => {
            if (data._Seats__seat_category._SeatCategory__name === "premium_seat") {
                const element = document.createElement("div");
                element.innerHTML = `
                                    <input type="checkbox" class="btn-check btn-select" id="return-premium-seat-${index}" autocomplete="off">
                                    <label class="btn btn-outline-primary" for="return-premium-seat-${index}" id="return-select-seats-label">${data._Seats__seat_number}</label>
                `;
                return_premium_container.appendChild(element);
            }
        });
        
    } catch(error) {
        console.error('Error:', error);
    }
}
