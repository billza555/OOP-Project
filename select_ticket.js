const api = "http://127.0.0.1:8000";

document.addEventListener('DOMContentLoaded', function () {

      const booking_ref_data = JSON.parse(localStorage.getItem('booking_ref'));
      const last_name_data = JSON.parse(localStorage.getItem('last_name'));
      handle_select_ticket_page_data(booking_ref_data, last_name_data);
});
  
async function handle_select_ticket_page_data(booking_ref_data, last_name_data) {

      try {
            const response = await fetch(`${api}/select_ticket?booking_ref=${booking_ref_data}&last_name=${last_name_data}`);
            const data = await response.json();
            
            console.log(data)

      } catch (error) {
            console.error('Error:', error);
      }
    
}

// const api = "http://127.0.0.1:8000";

// async function click_check_in() {
//     booking_ref = localStorage.getItem('booking_ref');
//     last_name = localStorage.getItem('last_name')
//     // const response = await fetch(`${api}/check_in?booking_ref=${booking_ref}&last_name=${last_name}`);
//     // const data = await response.json();
//     console.log(booking_ref)
// }

// const api = "http://127.0.0.1:8000";

// document.addEventListener('DOMContentLoaded', function () {

//       const booking_ref_data = JSON.parse(localStorage.getItem('booking_ref'));
//       const last_name_data = JSON.parse(localStorage.getItem('last_name'));
//       console.log(booking_ref_data)
//       console.log(last_name_data)
//       handle_select_ticket_page_data(booking_ref_data, last_name_data);
// });
  
// async function handle_select_ticket_page_data(booking_ref_data, last_name_data) {

//     console.log(booking_ref_data)
//     console.log(last_name_data)
//     try {
//         const response = await fetch(`${api}/select_ticket?booking_ref=${booking_ref_data}&last_name=${last_name_data}`);
//         const data = await response.json();
        
//         console.log(data)

//     } catch (error) {
//         console.error('Error:', error);
//     }
    //   console.log(booking_ref_data)
    //   console.log(last_name_data)
    //   try {
    //         const response = await fetch(`${api}/select_ticket?booking_ref=${booking_ref_data}&last_name=${last_name_data}`);
    //         const data = await response.json();
    //         console.log(data)

    //         // const container = document.getElementById("type")
    //         // data.forEach(data => {
    //         //     const element = document.createElement("div");
    //         //     element.textContent = data;
    //         //     container.appendChild(element);
    //         // });


    //   } catch (error) {
    //         console.error('Error:', error);
    //   }