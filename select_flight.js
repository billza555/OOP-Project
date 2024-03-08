
const api = "http://127.0.0.1:8000";

document.addEventListener('DOMContentLoaded', function () {
    const new_input_from = JSON.parse(localStorage.getItem('input_from'));
    const new_input_to = JSON.parse(localStorage.getItem('input_to'));
    const new_input_depart_date = JSON.parse(localStorage.getItem('input_depart_date'));
    const new_input_return_date = JSON.parse(localStorage.getItem('input_return_date'));
    
    console.log("From:", new_input_from);
    console.log("To:", new_input_to);
    console.log("Departure Date:", new_input_depart_date);
    console.log("Return Date:", new_input_return_date);
    
    show_flight(new_input_from, new_input_to, new_input_depart_date, new_input_return_date);
});

async function show_flight(new_input_from, new_input_to, new_input_depart_date, new_input_return_date) {
    try {
        console.log(new_input_from, new_input_to, new_input_depart_date, new_input_return_date);
        const response = await fetch(`${api}/flight_instance_matches?froml=${new_input_from}&to=${new_input_to}&depart_date=${new_input_depart_date}&return_date=${new_input_return_date}`);
        console.log(response.url)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        http://127.0.0.1:8000/flight_instance_matches?froml=Don%20Mueang&to=Chiang%20Mai&depart_date=2024-03-08&return_date=2024-03-09
        response_data = await response.json();
        console.log(response_data)  

    } catch (error) {
        console.error('Error:', error);
    }
}