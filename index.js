const api = "http://127.0.0.1:8000";

function getCurrentDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
  }

  // Set initial values when the DOM is loaded
  document.addEventListener('DOMContentLoaded', function () {
      document.getElementById('depart_date').value = getCurrentDate();
      document.getElementById('return_date').value = getCurrentDate();
      document.getElementById('depart_date').min = getCurrentDate();
      document.getElementById('return_date').min = getCurrentDate();
  });

async function search_flight() {
      try {

            const input_from = document.getElementById("from-l").value
            const input_to = document.getElementById("to-d").value
            const input_depart_date = document.getElementById("departure_date").value
            const input_return_date = document.getElementById("return_date").value
            
            document.location.href = "select_flight.html";

      } catch (error) {
            console.error('Error :', error);
      }
    
}