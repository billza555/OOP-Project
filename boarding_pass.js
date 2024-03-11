const api = "http://127.0.0.1:8000";

document.addEventListener('DOMContentLoaded', function () {
    const booking_ref_data = localStorage.getItem('booking_ref');
    const last_name_data = localStorage.getItem('last_name');
    console.log(booking_ref_data);
    console.log(last_name_data);
    get_boarding_pass(booking_ref_data, last_name_data);
});

async function get_boarding_pass(booking_ref, last_name) {
    try {
        const response = await fetch(`${api}/check_in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'cache': 'no-store',
            },
            body: JSON.stringify({
                "booking_reference": booking_ref,
                "last_name": last_name,
            }),
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
