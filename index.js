const api = "http://127.0.0.1:8000";

async function search_flight() {
      try {
            const booking_ref = document.getElementById("booking_ref").value;
            const last_name = document.getElementById("last_name").value;
            
            document.location.href = "select_ticket.html";

      } catch (error) {
            console.error('Error :', error);
      }
    
}