
const api = "http://127.0.0.1:8000";

document.addEventListener('DOMContentLoaded', function () {
    const input_from = JSON.parse(localStorage.getItem('input_from'));
    const input_to = JSON.parse(localStorage.getItem('input_to'));
    const input_depart_date = JSON.parse(localStorage.getItem('input_depart_date'));
    const input_return_date = JSON.parse(localStorage.getItem('input_return_date'));
    handle_select_flight_respone(input_from, input_to, input_depart_date, input_return_date);
});

async function  handle_select_flight_respone(input_from, input_to, input_depart_date, input_return_date) {
    try {
        const response = await fetch(`${api}/flight_instance_matches?froml=${input_from}&to=${input_to}&depart_date=${input_depart_date}&return_date=${input_return_date}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        
    } catch (error) {
        console.error('Error:', error);
    }
}