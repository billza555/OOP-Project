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


function prepare_data(){

    // localStorage.setItem('select_flight', JSON.stringify(select_flight_data));
    // localStorage.getItem('passenger_num')

    console.log(localStorage.getItem('select_flight'));
    console.log(localStorage.getItem('passenger_data_depart'));
    
    const test = [JSON.parse(localStorage.getItem('select_flight')),JSON.parse(localStorage.getItem('passenger_data_depart')),[{"seat_number":"A1","seat_number":"A2"},{"seat_number":"A1","seat_number":"A2"}]];
    console.log(test);
    localStorage.setItem('reservation', JSON.stringify(test));
    console.log(localStorage.getItem('reservation'));

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