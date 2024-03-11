const api = "http://127.0.0.1:8000";

document.addEventListener('DOMContentLoaded', function () {
    const booking_ref_data = JSON.parse(localStorage.getItem('booking_ref'));
    const last_name_data = JSON.parse(localStorage.getItem('last_name'));
    console.log(booking_ref_data);
    console.log(last_name_data);
    get_boarding_pass(booking_ref_data, last_name_data);
});

async function get_boarding_pass(booking_ref, last_name) {
    const data = {"booking_reference": booking_ref,
                  "last_name": last_name}
    new_url = api + "/check_in?booking_reference=" + booking_ref + "&last_name=" + last_name
    console.log(data)
    try {
        const response = await fetch(new_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // http://127.0.0.1:8000/check_in?booking_reference=b5262c54cae1&last_name=a

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const response_data = await response.json();
        console.log(response_data);

    } catch (error) {
        console.error('Error:', error);
    }
}