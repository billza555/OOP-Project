// #Reservation
//     {
//         flight_instance_list: [{ขาไป},{ขากลับ}]
//         passenger_list: [{passenger1},{passenger2}, ...]
//         flight_seats_list: [[seat1, seat2, ...], [seat1, seat2, ...]]
//         #แต่ละ list คือสำหรับ flight_instance แต่ละตัว ใน list ย่อยมี seat เท่ากับจำนวน passenger
//     }

//     #Flight_instance
//     {
//         flight_number: str,
//         date: str
//     }
    
//     #Passenger
//     {
//         title: str,
//         first_name: str,
//         middle_name: str,
//         last_name: str,
//         birthday: str,
//         phone_number: str,
//         email: str,
//         service_list: [{service1}, {service2}, ...]
//     }
    
//     #Service
//     {
//         service_name: str,
//         price_per_unit: int
//     }
    
//     #flight_seat
//     {
//         seat_number: str,
//     }


function prepare_data() {

    // localStorage.setItem('select_flight', JSON.stringify(select_flight_data));
    // localStorage.getItem('passenger_num')

    let all_respon = []
    JSON.parse(localStorage.getItem('input_from'))
    const response = {flight_instance_list : JSON.parse(localStorage.getItem('select_flight'))}
    const response2 = {passenger_list : JSON.parse(localStorage.getItem('passenger_data_depart'))}
    const response3 = {flight_seats_list : JSON.parse(localStorage.getItem('selected_seats'))}

    console.log("response : ", response )
    console.log("response 2 : ", response2)
    console.log("response 3 : ", response3)


    all_respon.push(response)
    all_respon.push(response2)
    all_respon.push(response3)

    console.log("All : ", all_respon)

    localStorage.setItem('passengers_data', JSON.stringify(all_respon));

    document.location.href = "reservation.html";

    // const storedData = localStorage.getItem('myData');

    // // Parse the storedData from a string to an object
    // const parsedData = JSON.parse(storedData);

    // // Format the data as per your requirement
    // const formattedData = {
    //     "flight_instance_list": JSON.parse(parsedData[0].flight_instance_list),
    //     "passenger_list": JSON.parse(parsedData[1].passenger_list),
    //     "flight_seats_list": JSON.parse(parsedData[2].flight_seats_list),
    // };

    // console.log(formattedData);


    // localStorage.setItem('reservation',JSON.stringify(all_respon));

    // console.log(localStorage.getItem('reservation'))
    // console.log((localStorage.getItem('reservation')))
    // document.location.href = "reservation.html";


    // const test = [JSON.parse(localStorage.getItem('select_flight')),JSON.parse(localStorage.getItem('passenger_data_depart')),[{"seat_number":"A1","seat_number":"A2"},{"seat_number":"A1","seat_number":"A2"}]];
    // console.log(test);
    // localStorage.setItem('reservation', JSON.stringify(test));
    // console.log(localStorage.getItem('reservation'));

    //ยังใส่ข้อมูลไม่เสร็จ

    // if (localStorage.getItem('type')!='one_way'){
    //       const reservation = [localStorage.getItem('select_flight'),
    //                            [localStorage.getItem('passenger_data_depart'),localStorage.getItem('passenger_data_return')],
    //                            [localStorage.getItem('seat_repart'),localStorage.getItem('seat_return')]
    //                            ]
    //       localStorage.setItem('reservation', JSON.stringify(reservation));
    // }else{

    //       const reservation = {
    //             flight_instance_list : localStorage.getItem('select_flight'),
    //             passenger_list: [localStorage.getItem('passenger_data_depart')],
    //             flight_seats_list: [localStorage.getItem('seat_repart')]
    //       }
    //       localStorage.setItem('reservation', JSON.stringify(reservation));
    // }

    // console.log(localStorage.getItem('reservation'))
}