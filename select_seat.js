const api = "http://127.0.0.1:8000";

document.addEventListener('DOMContentLoaded', function () {
});

//show all seats of flight instance
async function show_all_seats(flight_number, date){
    url = api + "/get_all_seats?" + "flight_number=" + flight_number + "&date=" + date
    const seats = fetch(url, {
      
    });
    
    for (var i = 1 ; i < 1 ; i++) {

        const element = document.createElement("div");
        element.innerHTML = `
        `;
        passenger_container.appendChild(element);
    }
}