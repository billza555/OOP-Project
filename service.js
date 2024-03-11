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

      console.log(response_data )
      console.log(insurance_data)
      console.log(add_5kg_data)
      console.log(add_10kg_data)
      console.log(add_15kg_data)

      localStorage.setItem('insurance',(insurance_data["service_name"]));
      localStorage.setItem('add_5kg', (add_5kg_data["service_name"]));
      localStorage.setItem('add_10kg', (add_10kg_data["service_name"]));
      localStorage.setItem('add_15kg', (add_15kg_data["service_name"]));

      let passenger = JSON.parse(localStorage.getItem('passenger_data'))
      let passenger_num = passenger.length

      console.log("Passenger : ", passenger)
      console.log("Passenger 1 : ", passenger[0])
      console.log("Passenger 1 name : ", passenger[0].first_name)
      
      const container = document.getElementById("response");
      for (let i = 0 ; i < passenger_num; i++) {
            let element = document.createElement("div");
                  element.innerHTML = `
                  <div class="card-box">
                        <div class="card-detail">
                              <div class="card-body">
                                    <label class="card-text">${passenger[i].first_name} ${passenger[i].middle_name} ${passenger[i].last_name}</label>
                              </div>
                              <div class="form-check checked-box">
                                    <input class="form-check-input" type="checkbox" value="" id="insurance${i}">
                                    <label class="form-check-label" for="insurance${i}">
                                          ${insurance_data["service_name"]}
                                          price : ${insurance_data["price_per_unit"]} Baht
                                    </label>
                              </div>
                              <div class="form-check checked-box">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault${i}" id="no_kg_${i}">
                                    <label class="form-check-label" for="no_kg_${i}">
                                          +0 kg (No More Baggage)
                                    </label>
                              </div>
                              <div class="form-check checked-box">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault${i}" id="add_5kg_${i}">
                                    <label class="form-check-label" for="add_5kg_${i}">
                                          ${add_5kg_data["service_name"]} 
                                          price : ${add_5kg_data["price_per_unit"]} Baht
                                    </label>
                              </div>
                              <div class="form-check checked-box">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault${i}" id="add_10kg_${i}">
                                    <label class="form-check-label" for="add_10kg_${i}">
                                          ${add_10kg_data["service_name"]} 
                                          price : ${add_10kg_data["price_per_unit"]} Baht
                                    </label>
                              </div>
                              <div class="form-check checked-box">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault${i}" id="add_15kg_${i}">
                                    <label class="form-check-label" for="add_15kg_${i}">
                                          ${add_15kg_data["service_name"]} 
                                          price : ${add_15kg_data["price_per_unit"]} Baht
                                    </label>
                              </div>
                        </div>
                  </div>
            `;
            
            container.appendChild(element);
            
        }
        
      } catch (error) {
        console.error('Error:', error);
    }
}

function save_service_data(){

      //#0 = service_name
      const len_passenger = JSON.parse(localStorage.getItem('passenger_num'));

      // localStorage.setItem('all_passenger_added_service_depart',(passenger[i]));
      let new_passenger_data = []
      for (let i = 0 ; i < len_passenger ; i++) {
            let service_checked = []
            if (document.getElementById(`insurance${i}`).checked) {
                  service_checked.push(localStorage.getItem('insurance'));
            }
            
            if (document.getElementById(`add_5kg_${i}`).checked) {
                  service_checked.push(localStorage.getItem('add_5kg'));
            }

            if (document.getElementById(`add_10kg_${i}`).checked) {
                  service_checked.push(localStorage.getItem('add_10kg'));
            }

            if (document.getElementById(`add_15kg_${i}`).checked) {
                  service_checked.push(localStorage.getItem('add_15kg'));
            }

            let passenger = JSON.parse(localStorage.getItem('passenger_data'));
            passenger[i].service_list = service_checked
            console.log(passenger[i])
            // localStorage.setItem('passenger_added_service_depart',(passenger[i]));
            // console.log(localStorage.getItem('passenger_added_service_depart'))
            new_passenger_data.push(passenger[i])
      }

      localStorage.setItem('passenger_data',JSON.stringify(new_passenger_data));

      console.log("Passenger data", localStorage.getItem('passenger_data'))

      go_to_pay_page()
  }
  
  function go_to_pay_page() {

      document.location.href = "pay_page.html";
      //#0 = title, 1 = first_name, 2 = middle_name, 3 = last_name, 4 = birthday, 5 = phone_number, 6 = email, 7 = service_list
  }