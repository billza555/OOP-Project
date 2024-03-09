const api = "http://127.0.0.1:8000";

document.addEventListener('DOMContentLoaded', function () {
      get_all_airport();
});

async function get_all_airport() {
      try {
            const response = await fetch(`${api}/get_all_airports`);
            
            if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
            }
      
            const response_data = await response.json();
            console.log(response_data);
            
            const container_from = document.getElementById('from_select');
            
            response_data.forEach(data => {
                  const element = document.createElement("option");
                  element.value = data._Airport__name;
                  element.innerHTML = `${data._Airport__name} [${data._Airport__short_name}]`;
                  container_from.appendChild(element);
            });

            const container_to = document.getElementById('to_select');
            response_data.forEach(data => {
                  const element = document.createElement("option");
                  element.value = data._Airport__name;
                  element.innerHTML = `${data._Airport__name} [${data._Airport__short_name}]`;
                  container_to.appendChild(element);
            });

            } catch (error) {
            console.error('Error:', error);
      }
}


function search_flight() {
      
      let fromSelect = document.getElementById("from_select");
      let toSelect = document.getElementById("to_select");
      let input_from = fromSelect.options[fromSelect.selectedIndex].value;
      let input_to = toSelect.options[toSelect.selectedIndex].value;
      let input_depart_date = document.getElementById("departure_date").value;
      let input_return_date = document.getElementById("return_date").value;
      let passenger_num = document.getElementById("passenger_num").value;

      localStorage.setItem('input_from', JSON.stringify(input_from));
      localStorage.setItem('input_to', JSON.stringify(input_to));
      localStorage.setItem('input_depart_date', JSON.stringify(input_depart_date));
      localStorage.setItem('input_return_date', JSON.stringify(input_return_date));
      localStorage.setItem('passenger_num', JSON.stringify(passenger_num));

      document.location.href = "select_flight.html";
}