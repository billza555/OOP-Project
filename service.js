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

      //   console.log(response_data)

        localStorage.setItem('insurance',(insurance_data._Service__service_name));
        localStorage.setItem('add_5kg', (add_5kg_data._Service__service_name));
        localStorage.setItem('add_10kg', (add_10kg_data._Service__service_name));
        localStorage.setItem('add_15kg', (add_15kg_data._Service__service_name));

        let passenger = JSON.parse(localStorage.getItem('passenger_data'))
        let passenger_num = passenger.length

        console.log("Passenger : ", passenger)
        console.log("Passenger 1 : ", passenger[0])
        console.log("Passenger 1 name : ", passenger[0].first_name)
        
        const container= document.getElementById("response");
        for(let i = 0 ; i < passenger_num; i++) {
            let element = document.createElement("div");
                  element.innerHTML = `
                  <div class="card" style="width: 18rem;">
                        <div class="card-body">
                              <p class="card-text">${passenger[i].first_name} ${passenger[i].middle_name} ${passenger[i].last_name}</p>
                        </div>
                        <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" id="insurance${i}">
                              <label class="form-check-label" for="insurance${i}">
                                    ${insurance_data._Service__service_name}
                                    price : ${insurance_data._Service__total_cost} Bath
                              </label>
                        </div>
                        <div class="form-check">
                              <input class="form-check-input" type="radio" name="flexRadioDefault${i}" id="no_kg_${i}">
                              <label class="form-check-label" for="no_kg_${i}">
                                   +0 kg (no more baggage)
                              </label>
                        </div>
                        <div class="form-check">
                              <input class="form-check-input" type="radio" name="flexRadioDefault${i}" id="add_5kg_${i}">
                              <label class="form-check-label" for="add_5kg_${i}">
                                    ${add_5kg_data._Service__service_name} 
                                    price : ${add_5kg_data._Service__total_cost} Bath
                              </label>
                        </div>
                        <div class="form-check">
                              <input class="form-check-input" type="radio" name="flexRadioDefault${i}" id="add_10kg_${i}">
                              <label class="form-check-label" for="add_10kg_${i}">
                                    ${add_10kg_data._Service__service_name} 
                                    price : ${add_10kg_data._Service__total_cost} Bath
                              </label>
                        </div>
                        <div class="form-check">
                              <input class="form-check-input" type="radio" name="flexRadioDefault${i}" id="add_15kg_${i}">
                              <label class="form-check-label" for="add_15kg_${i}">
                                    ${add_15kg_data._Service__service_name} 
                                    price : ${add_15kg_data._Service__total_cost} Bath
                              </label>
                        </div>

                  </div>
                  `;

            container.appendChild(element);
            
        }

        if (localStorage.getItem('type') != 'one_way'){

        const container_return = document.getElementById("response-return");
        for(let i=0 ; i<passenger_num;i++){
            let element_return = document.createElement("div");
            element_return.innerHTML = `
                  <div class="card" style="width: 18rem;">
                        <div class="card-body">
                              <p class="card-text">${passenger[i].first_name} ${passenger[i].middle_name} ${passenger[i].last_name}</p>
                        </div>
                        <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" id="insurance_returnn${i}">
                              <label class="form-check-label" for="insurance${i}">
                                    ${insurance_data._Service__service_name}
                                    price : ${insurance_data._Service__total_cost} Bath
                              </label>
                        </div>
                        <div class="form-check">
                              <input class="form-check-input" type="radio" name="flexRadioDefault${i+passenger_num}" id="no_kg_return${i}">
                              <label class="form-check-label" for="no_kg_${i}">
                                   +0 kg (no more baggage)
                              </label>
                        </div>
                        <div class="form-check">
                              <input class="form-check-input" type="radio" name="flexRadioDefault${i+passenger_num}" id="add_5kg_return${i}">
                              <label class="form-check-label" for="add_5kg_${i}">
                                    ${add_5kg_data._Service__service_name} 
                                    price : ${add_5kg_data._Service__total_cost} Bath
                              </label>
                        </div>
                        <div class="form-check">
                              <input class="form-check-input" type="radio" name="flexRadioDefault${i+passenger_num}" id="add_10kg_return${i}">
                              <label class="form-check-label" for="add_10kg_${i}">
                                    ${add_10kg_data._Service__service_name} 
                                    price : ${add_10kg_data._Service__total_cost} Bath
                              </label>
                        </div>
                        <div class="form-check">
                              <input class="form-check-input" type="radio" name="flexRadioDefault${i+passenger_num}" id="add_15kg_return${i}">
                              <label class="form-check-label" for="add_15kg_${i}">
                                    ${add_15kg_data._Service__service_name} 
                                    price : ${add_15kg_data._Service__total_cost} Bath
                              </label>
                        </div>

                  </div>
                  `;

            container_return.appendChild(element_return);
        }
      }

      if (localStorage.getItem('type')==='one_way'){
            document.querySelector('.return-container').style.display = 'none';
      }


    } catch (error) {
        console.error('Error:', error);
    }
}

function save_service_data(){

      //#0 = service_name
      const len_passenger = JSON.parse(localStorage.getItem('passenger_num'));

      // localStorage.setItem('all_passenger_added_service_depart',(passenger[i]));
      let new_passenger_data_depart = []
      for(let i = 0 ; i<len_passenger ; i++){
            let service_checked = []
            if(document.getElementById(`insurance${i}`).checked){
                  service_checked.push(localStorage.getItem('insurance'));
            }
            if(document.getElementById(`add_5kg_${i}`).checked){
                  service_checked.push(localStorage.getItem('add_5kg'));
            }
            if(document.getElementById(`add_10kg_${i}`).checked){
                  service_checked.push(localStorage.getItem('add_10kg'));
            }
            if(document.getElementById(`add_15kg_${i}`).checked){
                  service_checked.push(localStorage.getItem('add_15kg'));
            }
            let passenger = JSON.parse(localStorage.getItem('passenger_data'));
            passenger[i].service_list = service_checked
            console.log(passenger[i])
            // localStorage.setItem('passenger_added_service_depart',(passenger[i]));
            // console.log(localStorage.getItem('passenger_added_service_depart'))
            new_passenger_data_depart.push(passenger[i])
      }

      localStorage.setItem('passenger_data_depart',JSON.stringify(new_passenger_data_depart));

      let new_passenger_data_return = []
      if (localStorage.getItem('type')!='one_way'){
            for(let i = 0 ; i < len_passenger ; i++) {
                  let service_checked = []
                  if (document.getElementById(`insurance_returnn${i}`).checked) {
                        service_checked.push([[localStorage.getItem('insurance')]]);
                  }
                  if (document.getElementById(`add_5kg_return${i}`).checked) {
                        service_checked.push([[localStorage.getItem('add_5kg')]]);
                  }
                  if (document.getElementById(`add_10kg_return${i}`).checked) {
                        service_checked.push([[localStorage.getItem('add_10kg')]]);
                  }
                  if (document.getElementById(`add_15kg_return${i}`).checked) {
                        service_checked.push([[localStorage.getItem('add_15kg')]]);
                  }
                  let passenger_return = JSON.parse(localStorage.getItem('passenger_data'));
                  passenger_return[i].service_list = service_checked
                  // console.log(passenger_return[i])
                  // localStorage.setItem('passenger_added_service_return',(passenger_return[i]));
                  new_passenger_data_return.push(passenger_return[i])
            }
      }

      localStorage.setItem('passenger_data_return',JSON.stringify(new_passenger_data_return));

      console.log("Passenger data depart", localStorage.getItem('passenger_data_depart'))

      go_to_pay_page()
  }
  
  function go_to_pay_page() {

      
      document.location.href = "pay_page.html";
      //#0 = title, 1 = first_name, 2 = middle_name, 3 = last_name, 4 = birthday, 5 = phone_number, 6 = email, 7 = service_list
  }