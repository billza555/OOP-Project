const api = "http://127.0.0.1:8000";

let lastChecked = null;

    function toggleRadioButton(id) {
    const currentChecked = document.getElementById(id);

    if (lastChecked === currentChecked) {

        currentChecked.checked = false;  // click again = not choose
        lastChecked = null;

    } else {
        lastChecked = currentChecked;
    }
  }

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

        const container_insurance = document.getElementById("response-insurance");
        const element_insurance = document.createElement("div");
            element_insurance.innerHTML = `
                                        <div class="card" style="width: 18rem;">
                                            <img src="/src/add5.jpg" class="card-img-top">
                                            <div class="card-body">
                                                <p class="card-text">${insurance_data._Service__service_name}</p>
                                                <p class="card-text">${insurance_data._Baggage__total_cost}</p>
                                            </div>
                                            <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off">
                                            <label class="btn btn-outline-primary" for="btncheck1">select</label>
                        </div>
                  `;
        container_insurance.appendChild(element_insurance);

        const container_5kg = document.getElementById("response-5kg");
        const element_5kg = document.createElement("div");
                  element_5kg.innerHTML = `
                        <div class="card" style="width: 18rem;">
                              <img src="/src/add5.jpg" class="card-img-top">
                              <div class="card-body">
                                    <p class="card-text">${add_5kg_data._Service__service_name}</p>
                                    <p class="card-text">${add_5kg_data._Insurance__total_cost}</p>
                              </div>
                              <input type="radio" class="btn-check" name="btnradio" id="radio1" onclick="toggleRadioButton('radio1')" autocomplete="off">
                              <label class="btn btn-outline-primary" for="radio1">select</label>
                        </div>
                  `;
        container_5kg.appendChild(element_5kg);

        const container_10kg = document.getElementById("response-10kg");
        const element_10kg = document.createElement("div");
                  element_10kg.innerHTML = `
                        <div class="card" style="width: 18rem;">
                              <img src="/src/add10.jpg" class="card-img-top">
                              <div class="card-body">
                                    <p class="card-text">${add_10kg_data._Service__service_name}</p>
                                    <p class="card-text">${add_10kg_data._Insurance__total_cost}</p>
                              </div>
                              <input type="radio" class="btn-check" name="btnradio" id="radio2" onclick="toggleRadioButton('radio2')" autocomplete="off">
                              <label class="btn btn-outline-primary" for="radio2">select</label>
                              
                        </div>
                  `;
        container_10kg.appendChild(element_10kg);

        const container_15kg = document.getElementById("response-15kg");
        const element_15kg = document.createElement("div");
                  element_15kg.innerHTML = `
                        <div class="card" style="width: 18rem;">
                              <img src="/src/add15.jpg" class="card-img-top">
                              <div class="card-body">
                                    <p class="card-text">${add_15kg_data._Service__service_name}</p>
                                    <p class="card-text">${add_15kg_data._Insurance__total_cost}</p>
                              </div>
                              <input type="radio" class="btn-check" name="btnradio" id="radio3" onclick="toggleRadioButton('radio3')" autocomplete="off">
                              <label class="btn btn-outline-primary" for="radio3">select</label>
                        </div>
                  `;
        container_15kg.appendChild(element_15kg);
    } catch (error) {
        console.error('Error:', error);
    }
}





//     <input type="radio" name="radioGroup" id="radio1" onclick="toggleRadioButton('radio1')"> Option 1
//   </label>
  
//   <label>
//     <input type="radio" name="radioGroup" id="radio2" onclick="toggleRadioButton('radio2')"> Option 2
//   </label>
  
//   <label>
//     <input type="radio" name="radioGroup" id="radio3" onclick="toggleRadioButton('radio3')"> Option 3
//   </label>
// </form>

// <script>
//   let lastChecked = null;

//   function toggleRadioButton(id) {
//     const currentChecked = document.getElementById(id);

//     if (lastChecked === currentChecked) {
//       currentChecked.checked = false;  // ถ้าคลิกซ้ำกับตัวที่เคยเลือกไว้แล้ว ให้ไม่เลือก (unchecked)
//       lastChecked = null;
//     } else {
//       lastChecked = currentChecked;
//     }
//   }
// </script>