const api = "http://127.0.0.1:8000";

document.addEventListener('DOMContentLoaded', function () {
    const flight_list = JSON.parse(localStorage.getItem('select_flight'));
    const depart_date = JSON.parse(localStorage.getItem('input_depart_date'));
    const return_date = JSON.parse(localStorage.getItem('input_return_date'));
    const date_list = [depart_date, return_date]
    show_all_seats(flight_list, date_list);
});

//show all seats of flight instance
async function show_all_seats(flight_list, date_list) {
    try {

        console.log(flight_list, date_list)
        all_seats = [];

        for (let index = 0 ; index < flight_list.length ; index++) {
            const flight_instance_data = flight_list[index];
            const flight_number = flight_instance_data["flight_number"];
            console.log(flight_number)
            console.log(date_list)
            url = api + "/get_all_seats?" + "flight_number=" + flight_number + "&date=" + date_list[index]
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            create_all_seats(data, index);
            all_seats.push(data)
        };
        
    } catch(error) {
        console.error('Error:', error);
    }
}

function create_all_seats(data, index) {
    
    data.forEach(seat => {
        const seat_number = seat.getItem('seat_number');
        const seat_category = seat.getItem('seat_category');
        const seat_occupied = seat.getItem("occupied");
        const element = document.createElement("div");
        if(seat_occupied)
        {
            element.classList.add("btn", "btn-close");
        }
        else if(seat_category <= 200)
        {
            element.classList.add("btn", "btn-info");
        }
        else if(seat_category <= 400)
        {
            element.classList.add("btn", "btn-warning");
        }
        else if(seat_category <= 600)
        {
            element.classList.add("btn", "btn-danger");
        }
        element.id = `${seat_number} ${index}`;
        seat_container.appendChild(element)
    });
}