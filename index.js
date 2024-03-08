const api = "http://127.0.0.1:8000";

async function search_flight() {
      try {
            const fromSelect = document.getElementById("from_select");
            const toSelect = document.getElementById("to_select");
            const input_from = fromSelect.options[fromSelect.selectedIndex].textContent;
            const input_to = toSelect.options[toSelect.selectedIndex].textContent;
            const input_depart_date = document.getElementById("departure_date").value;
            const input_return_date = document.getElementById("return_date").value;
            const len_passenger = document.getElementById("passenger_amount")

          
  
            localStorage.setItem('input_from', JSON.stringify(input_from));
            localStorage.setItem('input_to', JSON.stringify(input_to));
            localStorage.setItem('input_depart_date', JSON.stringify(input_depart_date));
            localStorage.setItem('input_return_date', JSON.stringify(input_return_date));
            localStorage.setItem('len_passenger'), JSON.stringify(len_passenger)
    
            document.location.href = "select_flight.html";
  
      } catch (error) {
          console.error('Error:', error);
      }
}
  
