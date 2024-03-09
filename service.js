const api = "http://127.0.0.1:8000";

document.addEventListener('DOMContentLoaded', function () {
    get_all_service();
});

async function get_all_service() {
    try {
        const response = await fetch(`${api}/get_all_services`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const response_data = await response.json();
        const insurance_data = response_data[0];
        const add_5kg_data = response_data[1];
        const add_10kg_data = response_data[2];
        const add_15kg_data = response_data[3];

        console.log(insurance_data)
        console.log(insurance_data._Service__service_name)

    } catch (error) {
        console.error('Error:', error);
    }
}