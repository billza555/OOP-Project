// const api = "http://127.0.0.1:8000";

// document.addEventListener('DOMContentLoaded', function () {
//       get_all_airport();
// });

// async function get_all_airport() {
//       try {
//             const response = await fetch(`${api}/get_all_airports`);
            
//             if (!response.ok) {
//                   throw new Error(`HTTP error! Status: ${response.status}`);
//             }
      
//             const response_data = await response.json();
//             console.log(response_data);
            
//             const container_from = document.getElementById('from_select');
            
//             response_data.forEach(data => {
//                   const element = document.createElement("option");
//                   element.value = data._Airport__name;
//                   element.innerHTML = `${data._Airport__name} [${data._Airport__short_name}]`;
//                   container_from.appendChild(element);
//             });

//             const container_to = document.getElementById('to_select');
//             response_data.forEach(data => {
//                   const element = document.createElement("option");
//                   element.value = data._Airport__name;
//                   element.innerHTML = `${data._Airport__name} [${data._Airport__short_name}]`;
//                   container_to.appendChild(element);
//             });

//             } catch (error) {
//             console.error('Error:', error);
//       }
// }

const api = "http://127.0.0.1:8000";

let all_airports = [];

document.addEventListener('DOMContentLoaded', function () {
      get_all_airport();
      document.getElementById('from_select').addEventListener('change', insert_airport_drop_down);
      document.getElementById('to_select').addEventListener('change', insert_airport_drop_down);
});

async function get_all_airport() {
      try {
            const response = await fetch(`${api}/get_all_airports`);
            
            if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
            }
      
            all_airports = await response.json();
            console.log(all_airports);
            insert_airport_drop_down();
            } catch (error) {
            console.error('Error:', error);
      }
}

function insert_airport_drop_down(){
      const container_from = document.getElementById('from_select');
      const container_to = document.getElementById('to_select');

      const new_container_from = document.createElement("select");
      const new_container_to = document.createElement("select");
      
      all_airports.forEach(data => {
            if (data._Airport__name != container_to.value){
                  const element = document.createElement("option");
                  element.value = data._Airport__name;
                  element.innerHTML = `${data._Airport__name} [${data._Airport__short_name}]`;
                  new_container_from.appendChild(element);
            }
      });


      all_airports.forEach(data => {
            if (data._Airport__name != container_from.value){
                  const element = document.createElement("option");
                  element.value = data._Airport__name;
                  element.innerHTML = `${data._Airport__name} [${data._Airport__short_name}]`;
                  new_container_to.appendChild(element);
            }
      });

      // Store the selected values
      const selectedFrom = container_from.value;
      const selectedTo = container_to.value;

      // Update the innerHTML
      container_from.innerHTML = new_container_from.innerHTML;
      container_to.innerHTML = new_container_to.innerHTML;

      // Restore the selected values
      container_from.value = selectedFrom;
      container_to.value = selectedTo;
}


function search_flights() {
      
      let fromSelect = document.getElementById("from_select");
      let toSelect = document.getElementById("to_select");
      let input_from = fromSelect.options[fromSelect.selectedIndex].value;
      let input_to = toSelect.options[toSelect.selectedIndex].value;
      let input_depart_date = document.getElementById("departure_date").value;
      let passenger_num = document.getElementById("passenger_num").value;

      localStorage.setItem('input_from', JSON.stringify(input_from));
      localStorage.setItem('input_to', JSON.stringify(input_to));
      localStorage.setItem('input_depart_date', JSON.stringify(input_depart_date));
      localStorage.setItem('passenger_num', JSON.stringify(passenger_num));
      localStorage.setItem('type', 'one_way');

      if (fromSelect && toSelect && input_from && input_to && input_depart_date && passenger_num) {
            localStorage.setItem('input_from', JSON.stringify(input_from));
            localStorage.setItem('input_to', JSON.stringify(input_to));
            localStorage.setItem('input_depart_date', JSON.stringify(input_depart_date));
            localStorage.setItem('passenger_num', JSON.stringify(passenger_num));
            localStorage.setItem('type', 'one_way');

            document.location.href = "select_flight_oneway.html";

      } else {
            
            alert("Please enter complete informations.");
      }
}