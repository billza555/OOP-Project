const api = "http://127.0.0.1:8000";

document.addEventListener('DOMContentLoaded', function () {

    select_flight = JSON.parse(localStorage.getItem('select_flight'));
    passenger_list = JSON.parse(localStorage.getItem('passenger_data'));
    select_seats = JSON.parse(localStorage.getItem('selected_seats'));

    console.log("Select Flight : ", select_flight)
    console.log("Passenger list : ", passenger_list)
    console.log("Select Seats : ", select_seats)

    get_reservation(select_flight, passenger_list, select_seats)
});

async function get_reservation(select_flight, passenger_list, select_seats) {
      try {
            const response = await fetch(`${api}/pay_by_qr`, {
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
            const reservation = await response.json();

            console.log(reservation);

            //เพิ่มเช็คจ่ายตังไม่สำเร็จ

            console.log(reservation["booking_reference"]);
            console.log(reservation["flight_instance_list"]["departing_flight"]);

            const booking_ref = document.getElementById("booking_reference");
            const book_element = document.createElement("div");
            book_element.innerHTML = `
                <label>booking reference : ${reservation["booking_reference"]}</label>
            `;
            booking_ref.appendChild(book_element);


            const depart = document.getElementById("depart");
            const depat_element = document.createElement("div");
                depat_element.innerHTML = `
                    <div class="text-center">
                        <label>from : ${reservation["flight_instance_list"]["departing_flight"]["from"]}</label><br>
                        <label>to : ${reservation["flight_instance_list"]["departing_flight"]["to"]}</label><br>
                        <label>date : ${reservation["flight_instance_list"]["departing_flight"]["date"]}</label><br>
                        <label>flight_number : ${reservation["flight_instance_list"]["departing_flight"]["flight_number"]}</label><br>
                        <label>time : ${reservation["flight_instance_list"]["departing_flight"]["departure_time"]} - ${reservation["flight_instance_list"]["departing_flight"]["arrival_time"]}</label><br>
                        <label>aircraft : ${reservation["flight_instance_list"]["departing_flight"]["aircraft_number"]}</label><br>
                    </div>
                `;
            depart.appendChild(depat_element);
            
            if (reservation["flight_instance_list"]["returning_flight"]){
                const return_flight = document.getElementById("return");
                const return_element = document.createElement("div");
                    return_element.innerHTML = `
                        <div class="text-center">
                            <label>from : ${reservation["flight_instance_list"]["returning_flight"]["from"]}</label><br>
                            <label>to : ${reservation["flight_instance_list"]["returning_flight"]["to"]}</label><br>
                            <label>date : ${reservation["flight_instance_list"]["returning_flight"]["date"]}</label><br>
                            <label>flight_number : ${reservation["flight_instance_list"]["returning_flight"]["flight_number"]}</label><br>
                            <label>time : ${reservation["flight_instance_list"]["returning_flight"]["departure_time"]} - ${reservation["flight_instance_list"]["returning_flight"]["arrival_time"]}</label><br>
                            <label>aircraft : ${reservation["flight_instance_list"]["returning_flight"]["aircraft_number"]}</label><br>
                        </div>
                        `;
                return_flight.appendChild(return_element);
            
            }

            // console.log(reservation.passenger_list.length)
            const passenger = document.getElementById('passenger');
            const all_passenger = reservation["passenger_list"];
            all_passenger.forEach(data => {
                const passenger_element = document.createElement("div");
                if (data["_User__middle_name"]){
                    passenger_element.innerHTML = `
            
                        <div>
                            <p>>${data["_User__title"]}${data["_User__first_name"]} ${data["_User__middle_name"]} ${data["_User__last_name"]}</p>
                        </div> 
                
                    `;
                }else{
                    passenger_element.innerHTML = `
            
                        <div>
                            <p>>${data["_User__title"]}${data["_User__first_name"]} ${data["_User__last_name"]}</p>
                        </div> 
                
                    `;

                }
                passenger.appendChild(passenger_element);
            });
        

        } catch (error) {
            console.error('Error:', error);
        }    


}