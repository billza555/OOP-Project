
const api = "http://127.0.0.1:8000";

document.addEventListener('DOMContentLoaded', function () {
    const booking_ref_data = JSON.parse(localStorage.getItem('booking_ref'));
    const last_name_data = JSON.parse(localStorage.getItem('last_name'));
    handleSelectTicketPageData(booking_ref_data, last_name_data);
});

async function handleSelectTicketPageData(booking_ref_data, last_name_data) {
    try {
        const response = await fetch(`${api}/select_ticket?booking_ref=${booking_ref_data}&last_name=${last_name_data}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}