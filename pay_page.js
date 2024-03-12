const api = "http://127.0.0.1:8000";

document.addEventListener('DOMContentLoaded', function () {
    select_flight = JSON.parse(localStorage.getItem('select_flight'));
    passenger_list = JSON.parse(localStorage.getItem('passenger_data'));
    select_seats = JSON.parse(localStorage.getItem('selected_seats'));

    console.log("Select Flight : ", select_flight)
    console.log("Passenger list : ", passenger_list)
    console.log("Select Seats : ", select_seats)

    get_pay_page(select_flight, passenger_list, select_seats)
});

async function get_pay_page(select_flight, passenger_list, select_seats) {
      try {
        console.log("Select Flight : ", select_flight)
        console.log("Passenger list : ", passenger_list)
        console.log("Select Seats : ", select_seats)
            
        const response = await fetch(`${api}/show_unpaid_reservation_cost`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'cache': 'no-store',
            },
            body: JSON.stringify ({
                "flight_instance_list": select_flight,
                "passenger_list": passenger_list,
                "flight_seats_list": select_seats,
            }),
        });
        
        const transaction = await response.json();

        console.log(transaction);

        if (transaction === "Normal Seat Full for People not select") {
            if (localStorage.getItem('type') === 'one_way') {
                document.getElementById('cost').style.display = 'none'; 
                go_back_to_select_flight_one_way();
            } else {
                document.getElementById('cost').style.display = 'none';
                go_back_to_select_flight();
            }
        }

        localStorage.setItem('flight_instances_cost', transaction["flight_instances_cost"]);
        localStorage.setItem('flight_seats_cost', transaction["flight_seats_cost"]);
        localStorage.setItem('services_cost', transaction["services_cost"]);
        localStorage.setItem('total_cost', transaction["total_cost"]);

        const transaction_container = document.getElementById("transaction");
        const element = document.createElement("div");
        element.innerHTML = `
            <div>
                <label>Flight cost : ${localStorage.getItem('flight_instances_cost')} Baht</label><br>
                <label>Seat cost : ${localStorage.getItem('flight_seats_cost')} Baht</label><br>
                <label>Service cost : ${localStorage.getItem('services_cost')} Baht</label><br>
                <label>Total cost : ${localStorage.getItem('total_cost')} Baht</label><br>
            </div>
        `;
        
            transaction_container.appendChild(element);

        } catch (error) {
            console.error('Error:', error);
        }    
}

function go_back_to_select_flight_one_way() {
    document.location.href = "select_flight_oneway.html";
    alert("Normal Seat Full for People not select .Please select a seat or choose a new flight file.");
}

function go_back_to_select_flight() {
    document.location.href = "select_flight.html";
    alert("Normal Seat Full for People not select Please select a seat or choose a new flight file.");
}