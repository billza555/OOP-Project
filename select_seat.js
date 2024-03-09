const api = "http://127.0.0.1:8000";

document.addEventListener('DOMContentLoaded', function () {
    const flight_list = JSON.parse(localStorage.getItem('select_flight'));
    const depart_date = JSON.parse(localStorage.getItem('input_depart_date'));
    const return_date = JSON.parse(localStorage.getItem('input_return_date'));
    const date_list = [depart_date, return_date]
    show_all_seats(flight_list, date_list);
});

//show all seats of flight instance
async function show_all_seats(flight_list, date_list){
    try{
        all_seats = [];
        for (let index = 0; index < flight_list.length; index++) {
            const flight_instance_data = flight_list[index];
            const flight_number = flight_instance_data["flight_number"];
            console.log(flight_number)
            console.log(date_list)
            url = api + "/get_all_seats?" + "flight_number=" + flight_number + "&date=" + date_list[index]
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            all_seats.push(data)
        };
    
        const seat_container = document.getElementById("seat_container");

        // order = "ABCDEF"
        // for (var i = 0 ; i < 7 ; i++) {
        //     const element = document.createElement("div");
        //     for(var j = 0; j < 7; j++)
        //     {
        //         if(i == 0)
        //         {
        //             element.innerHTML = `
        //             order[j]&nbsp;`;
        //         }
        //         else if(j == 0)
        //         {
        //             element.innerHTML = `
        //             ${i}&nbsp;`;
        //         }
        //         else
        //         {
        //             element.innerHTML = `
        //         <button class="btn btn-light" id="${order[j]+i}">`;
        //         }
        //     }
        //     seat_container.append(element)
        // }
    }catch(error){
        console.error('Error:', error);
    }
    
}