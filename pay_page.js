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
            const response = await fetch(`${api}/show_unpaid_reservation_cost`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'cache': 'no-store',
                },
                body: JSON.stringify({
                    "flight_instance_list": select_flight,
                    "passenger_list": passenger_list,
                    "flight_seats_list": select_seats,
                }),
            });
        
            // Handle the response here
            const transaction = await response.json();

            console.log(transaction);

            localStorage.setItem('flight_instances_cost', transaction["flight_instances_cost"]);
            localStorage.setItem('flight_seats_cost', transaction["flight_seats_cost"]);
            localStorage.setItem('services_cost', transaction["services_cost"]);
            localStorage.setItem('total_cost', transaction["total_cost"]);

            // flight_instances_cost : 3000
            // flight_seats_cost : 400
            // services_cost : 0
            // total_cost : 3400

            const transaction_container = document.getElementById("transaction");
            const element = document.createElement("div");
                element.innerHTML = `
                    <div>
                        <label>flight cost : ${localStorage.getItem('flight_instances_cost')}</label><br>
                        <label>seats cost : ${localStorage.getItem('flight_seats_cost')}</label><br>
                        <label>date : ${localStorage.getItem('services_cost')}</label><br>
                        <label>services cost : ${localStorage.getItem('total_cost')}</label><br>
      
                    </div>
                `;
                transaction_container.appendChild(element);


        } catch (error) {
            console.error('Error:', error);
        }    
      
}
