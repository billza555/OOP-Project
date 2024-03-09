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

        console.log(response_data)

        localStorage.setItem('insurance',JSON.stringify(insurance_data._Service__service_name));
        localStorage.setItem('add_5kg', JSON.stringify(add_5kg_data._Service__service_name));
        localStorage.setItem('add_10kg', JSON.stringify(add_10kg_data._Service__service_name));
        localStorage.setItem('add_15kg', JSON.stringify(add_15kg_data._Service__service_name));

        let passenger = JSON.parse(localStorage.getItem('passenger_data'))
        let passenger_num = passenger.length

        console.log(passenger)
        console.log(passenger[0])
        console.log(passenger[0].firstName)
        
        const container= document.getElementById("response");
        for(let i=0 ; i<passenger_num;i++){
            let element = document.createElement("div");
                  element.innerHTML = `
                  <div class="card" style="width: 18rem;">
                        <div class="card-body">
                              <p class="card-text">${passenger[i].firstName} ${passenger[i].middleName} ${passenger[i].lastName}</p>
                        </div>
                        <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" id="insurance${i}">
                              <label class="form-check-label" for="insurance${i}">
                                    ${insurance_data._Service__service_name}
                                    price : ${insurance_data._Service__total_cost} Bath
                              </label>
                        </div>
                        <div class="form-check">
                              <input class="form-check-input" type="radio" name="flexRadioDefault" id="no_kg_${i}">
                              <label class="form-check-label" for="no_kg_${i}">
                                   +0 kg (no more baggage)
                              </label>
                        </div>
                        <div class="form-check">
                              <input class="form-check-input" type="radio" name="flexRadioDefault" id="add_5kg_${i}">
                              <label class="form-check-label" for="add_5kg_${i}">
                                    ${add_5kg_data._Service__service_name} 
                                    price : ${add_5kg_data._Service__total_cost} Bath
                              </label>
                        </div>
                        <div class="form-check">
                              <input class="form-check-input" type="radio" name="flexRadioDefault" id="add_10kg_${i}">
                              <label class="form-check-label" for="add_10kg_${i}">
                                    ${add_10kg_data._Service__service_name} 
                                    price : ${add_10kg_data._Service__total_cost} Bath
                              </label>
                        </div>
                        <div class="form-check">
                              <input class="form-check-input" type="radio" name="flexRadioDefault" id="add_15kg_${i}">
                              <label class="form-check-label" for="add_15kg_${i}">
                                    ${add_15kg_data._Service__service_name} 
                                    price : ${add_15kg_data._Service__total_cost} Bath
                              </label>
                        </div>

                  </div>
                  `;

            container.appendChild(element);
            
        }

        const container_return= document.getElementById("response-return");
        for(let i=0 ; i<passenger_num;i++){
            let element_return = document.createElement("div");
            element_return.innerHTML = `
                  <div class="card" style="width: 18rem;">
                        <div class="card-body">
                              <p class="card-text">${passenger[i].firstName} ${passenger[i].middleName} ${passenger[i].lastName}</p>
                        </div>
                        <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" id="insurance_returnn${i}">
                              <label class="form-check-label" for="insurance${i}">
                                    ${insurance_data._Service__service_name}
                                    price : ${insurance_data._Service__total_cost} Bath
                              </label>
                        </div>
                        <div class="form-check">
                              <input class="form-check-input" type="radio" name="flexRadioDefault" id="no_kg_return${i}">
                              <label class="form-check-label" for="no_kg_${i}">
                                   +0 kg (no more baggage)
                              </label>
                        </div>
                        <div class="form-check">
                              <input class="form-check-input" type="radio" name="flexRadioDefault" id="add_5kg_return${i}">
                              <label class="form-check-label" for="add_5kg_${i}">
                                    ${add_5kg_data._Service__service_name} 
                                    price : ${add_5kg_data._Service__total_cost} Bath
                              </label>
                        </div>
                        <div class="form-check">
                              <input class="form-check-input" type="radio" name="flexRadioDefault" id="add_10kg_return${i}">
                              <label class="form-check-label" for="add_10kg_${i}">
                                    ${add_10kg_data._Service__service_name} 
                                    price : ${add_10kg_data._Service__total_cost} Bath
                              </label>
                        </div>
                        <div class="form-check">
                              <input class="form-check-input" type="radio" name="flexRadioDefault" id="add_15kg_return${i}">
                              <label class="form-check-label" for="add_15kg_${i}">
                                    ${add_15kg_data._Service__service_name} 
                                    price : ${add_15kg_data._Service__total_cost} Bath
                              </label>
                        </div>

                  </div>
                  `;

            container_return.appendChild(element_return);
        }


    } catch (error) {
        console.error('Error:', error);
    }
}

function save_service_data(){

      //#0 = service_name
      let passenger = JSON.parse(localStorage.getItem('passenger_data'))
      let passenger_num = passenger.length

      for(let i = 0 ; i<passenger_num ; i++){
            console.log(document.getElementById(`insurance${i}`))
            // localStorage.setItem(`insurance${i}`, JSON.stringify(document.getElementById(`insurance${i}`)));
            // localStorage.setItem(`no_kg_${i}`, JSON.stringify(document.getElementById(`no_kg_${i}`)));
            // localStorage.setItem(`add_5kg_${i}`, JSON.stringify(document.getElementById(`add_5kg_${i}`)));
            // localStorage.setItem(`add_10kg_${i}`, JSON.stringify(document.getElementById(`add_10kg_${i}`)));
            // localStorage.setItem(`add_15kg_${i}`, JSON.stringify(document.getElementById(`add_15kg_${i}`)));
            // localStorage.setItem(`insurance_return${i}`, JSON.stringify(document.getElementById(`insurance_return${i}`)));
            // localStorage.setItem(`no_kg_return${i}`, JSON.stringify(document.getElementById(`no_kg_return${i}`)));
            // localStorage.setItem(`add_5kg_return${i}`, JSON.stringify(document.getElementById(`add_5kg_return${i}`)));
            // localStorage.setItem(`add_10kg_return${i}`, JSON.stringify(document.getElementById(`add_10kg_return${i}`)));
            // localStorage.setItem(`add_15kg_return${i}`, JSON.stringify(document.getElementById(`add_15kg_return${i}`)));
      }

      console.log(JSON.parse(localStorage.getItem('insurane1')))
      
  }
  
  function go_to_pay_page(){
      // document.location.href = "pay.html";
  }