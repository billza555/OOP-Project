from datetime import datetime
from uuid import uuid4
import random
#API
#1.show_reservation
#2.pay_by_credit_card
#3.pay_by_qr
#4.get_flight_instance_matches
#5.select_flight //return flight_instance + show flight seats
#6.get_all_services //return services_list
#7.check_in //return boarding pass
#8.create_flight
#9.create_flight_instance



class AirportSystem:                                     
    def __init__(self):
        self.__airport_list = []
        self.__aircraft_list = []
        self.__flight_list = []
        self.__flight_instance_list = []
        self.__service_list = []
        self.__reservation_list = []

    @property
    def airport_list(self):
        return self.__airport_list

    @property
    def aircraft_list(self):
        return self.__aircraft_list
        
    @property
    def flight_list(self):
        return self.__flight_list
    
    @property
    def flight_instance_list(self):
        return self.__flight_instance_list
    
    @property
    def service_list(self):
        return self.__service_list

    @service_list.setter
    def service_list(self, service):
        self.__service_list.append(service)
    
    def get_flight_instance_matches(self, starting_location, destination, depart_date, return_date = None):
        departing_flight_instance = []
        returning_flight_instance = []

        for flight_instance in self.__flight_instance_list:
            if flight_instance.starting_location.name == starting_location and flight_instance.destination.name == destination and flight_instance.date == depart_date:
                flight_instance_info = {"departure_time": flight_instance.departure_time,
                                        "arrival_time": flight_instance.arrival_time,
                                        "flight_number": flight_instance.flight_number,
                                        "aircraft_number": flight_instance.aircraft.aircraft_number,
                                        "cost": flight_instance.cost,
                                        "departure_date": depart_date,
                                        "starting_location": starting_location,
                                        "destination": destination}
                
                departing_flight_instance.append(flight_instance_info)

        if return_date != None:
            for flight_instance in self.__flight_instance_list:
                if flight_instance.destination.name == starting_location and flight_instance.starting_location.name == destination and flight_instance.date == return_date:
                    flight_instance_info = {"departure_time": flight_instance.departure_time,
                                            "arrival_time": flight_instance.arrival_time,
                                            "flight_number": flight_instance.flight_number,
                                            "aircraft_number": flight_instance.aircraft.aircraft_number,
                                            "cost": flight_instance.cost,
                                            "departure_date": return_date,
                                            "starting_location": starting_location,
                                            "destination": destination}

                    returning_flight_instance.append(flight_instance_info)

        return (departing_flight_instance, returning_flight_instance)

    def get_flight_instance(self, flight_number, date):
        for flight_instance in self.__flight_instance_list:
            print(f"{flight_instance.flight_number} vs {flight_number} and {flight_instance.date} vs ")
            if flight_instance.flight_number == flight_number and flight_instance.date == date:
                return flight_instance 
        print(f"No matching flight_instance found for flight_number {flight_number} and date {date}")
        return None
    
    def pay_by_qr(self, flight_instance_list, passenger_list, flight_seats_list):
        reservation = self.create_reservation_for_paid(flight_instance_list, passenger_list, flight_seats_list)
        if reservation:
            payment_method = Qr()
            transaction = Transaction(payment_method)
            reservation.transaction = transaction
            reservation.generate_booking_reference()
            self.__reservation_list.append(reservation)
            return reservation
        return "error"

    def pay_by_credit_card(self, card_number, cardholder_name, expiry_date, cvv, flight_instance_list, passenger_list, flight_seats_list):
        reservation = self.create_reservation_for_paid(flight_instance_list, passenger_list, flight_seats_list)
        if reservation:
            payment_method = CreditCard(card_number, cardholder_name, expiry_date, cvv)
            transaction = Transaction(payment_method)
            reservation.transaction = transaction
            reservation.generate_booking_reference()
            self.__reservation_list.append(reservation)
            return reservation
        return "error"

    def get_service(self, service_name):
        for service in self.__service_list:
            if service.service_name == service_name:
                return service
        return None
    
    # #Reservation
    # {
    #     flight_instance_list: [{ขาไป},{ขากลับ}]
    #     passenger_list: [{passenger1},{passenger2}, ...]
    #     flight_seats_list: [[seat1, seat2, ...], [seat1, seat2, ...]]
    #     #แต่ละ list คือสำหรับ flight_instance แต่ละตัว ใน list ย่อยมี seat เท่ากับจำนวน passenger
    # }

    # #Flight_instance
    # {
    #     flight_number: str,
    #     date: str
    # }
    
    # #Passenger
    # {
    #     title: str,
    #     first_name: str,
    #     middle_name: str,
    #     last_name: str,
    #     birthday: str,
    #     phone_number: str,
    #     email: str,
    #     service_list: [{service1}, {service2}, ...]
    # }
    
    # #Service
    # {
    #     service_name: str,
    #     price_per_unit: int
    # }
    
    # #flight_seat
    # {
    #     seat_number: str,
    # }
    
    
    def create_reservation_for_paid(self, flight_instance_list, passenger_list, flight_seats_list):
        reservation = Reservation()
        
        #0 = title, 1 = first_name, 2 = middle_name, 3 = last_name, 4 = birthday, 5 = phone_number, 6 = email, 7 = service_list
        for passenger_data in passenger_list:
            passenger = Passenger(passenger_data.get("title"), passenger_data.get("first_name"), passenger_data.get("last_name"), passenger_data.get("birthday"), passenger_data.get("phone_number"), passenger_data.get("email"), passenger_data.get("middle_name"))
            service_list = passenger_data.get("service_list")
            for service_data in service_list:
                #0 = service_name, 1 = price_per_unit
                service = self.get_service(service_data)
                passenger.add_service(service)
            reservation.add_passenger(passenger)
        
        #0 = flight_number, 1 = date
        for flight_instance_data in flight_instance_list:
            flight_instance = self.get_flight_instance(flight_instance_data.get("flight_number"), flight_instance_data.get("date"))
            reservation.add_flight_instance(flight_instance)
        
        #flight_seat_list data structure: [[seat1, seat2], [seat3, seat4]]
        #                                        /\              /\
        #                                     departing       returning
        
        new_flight_seat_list = []
        
        for index, flight_instance in enumerate(reservation.flight_instances_list):
            sub_list_of_flight_seats = []
            #check each sub_list of flight_seats
            for flight_seat_number in flight_seats_list[index]:
                flight_seat = flight_instance.get_flight_seat(flight_seat_number)
                #if flight_seat not found or is occupied; unoccupy all previous checked flight_seats and abort
                if not flight_seat or flight_seat.occupied:
                    for checked_sub_list in new_flight_seat_list:
                        for checked_flight_seat in checked_sub_list:
                            checked_flight_seat.occupied = False
                    return None
                flight_seat.occupied = True
                sub_list_of_flight_seats.append(flight_seat)
            new_flight_seat_list.append(sub_list_of_flight_seats)
            
        return reservation

    def get_reservation(self, booking_reference):
        for reservation in self.__reservation_list:
            if reservation.booking_reference == booking_reference:
                return reservation
        return None
    
    def check_in(self, booking_reference, last_name):
        reservation = self.get_reservation(booking_reference)
        if reservation:
            passenger_list = reservation.get_passenger_list_by_last_name(last_name)
            boarding_passes_list = []
            for flight_instance in reservation.flight_instances_list:
                reservation.add_random_flight_seat(flight_instance)
            for passenger in passenger_list:
                boarding_pass = reservation.create_boarding_pass(passenger)
                if boarding_pass not in reservation.boarding_passes_list:
                    boarding_passes_list.append(boarding_pass)
        return boarding_passes_list
    
class Reservation:
    def __init__(self):
        self.__booking_reference = None
        self.__flight_instance_list = []
        self.__passenger_list = []
        self.__flight_seat_list = []
        self.__total_cost = 0                                                                                                   
        self.__transaction = None
        self.__boarding_passes_list = []
        
    @property
    def flight_instances_list(self):
        return self.__flight_instance_list

    @property
    def transaction(self):
        return self.__transaction
    
    @transaction.setter
    def transaction(self, transaction):
        self.__transaction = transaction

    @property
    def booking_reference(self):
        return self.__booking_reference

    @property
    def boarding_passes_list(self):
        return self.__boarding_passes_list
    
    def add_passenger(self, passenger):
        self.__passenger_list.append(passenger)
    
    def add_flight_seat(self, flight_seat):
        self.__flight_seat_list.append(flight_seat)
        
    def add_flight_instance(self, flight_instance):
        self.__flight_instance_list.append(flight_instance)
        
    def generate_booking_reference(self):
        split_uuid = str(uuid4()).split("-")
        short_uuid = split_uuid[0] + split_uuid[1]
        self.__booking_reference = short_uuid
    
    def get_passenger_list_by_last_name(self, last_name):
        matched_passenger_list = []
        for passenger in self.__passenger_list:
            if passenger.last_name == last_name:
                matched_passenger_list.append(passenger)
        return matched_passenger_list
    
    def calculate_total_cost(self):
        self.__total_cost = 0
        
        for flight_instance in self.__flight_instance_list:
            self.__total_cost += flight_instance.cost * len(self.__passenger_list)
        
        for flight_seats in self.__flight_seat_list:
            for flight_seat in flight_seats:
                self.__total_cost += flight_seat.seat_category.seat_price
        for passenger in self.__passenger_list:
            for service in passenger.service_list:
                self.__total_cost += service.total_cost
    
    def add_random_flight_seat(self, flight_instance):
        flight_instance_index = self.__flight_instance_list.index(flight_instance)
        chosen_seat_amount = len(self.__flight_seat_list[flight_instance_index])
        passenger_amount = len(self.__passenger_list)
        for i in range(chosen_seat_amount, passenger_amount+1):
            while(True):
                random_seat = random.choice(flight_instance.flight_seat_list)
                if random_seat.occupied == False and random_seat.seat_category.name == "normal_seat":
                    random_seat.occupied = True
                    self.__flight_seat_list[flight_instance_index].append(random_seat)
                    break
    
    def create_boarding_pass(self, passenger):
        #flight_number, flight_seat_number, booking_reference, depart_date, passenger
        passenger_index = self.__passenger_list.index(passenger)
        for index, flight_instance in enumerate(self.__flight_instance_list):
            flight_number = flight_instance.flight_number
            flight_seat_number = self.__flight_seat_list[index][passenger_index]
            depart_date = flight_instance.date
            boarding_pass = BoardingPass(flight_number, flight_seat_number, self.__booking_reference, depart_date, passenger)
        return boarding_pass
class User:
    def __init__(self, title, first_name, middle_name, last_name, birthday, phone_number, email):
        self.__title = title
        self.__first_name = first_name
        self.__middle_name = middle_name
        self.__last_name = last_name
        self.__birthday = birthday
        self.__phone_number = phone_number
        self.__email = email

class Passenger(User):
    def __init__(self, title, first_name, middle_name, last_name, birthday, phone_number, email):
        super().__init__(title, first_name, middle_name, last_name, birthday, phone_number, email)
        self.__service_list = []

    @property
    def service_list(self):
        return self.__service_list
    
    def add_service(self, service):
        self.__service_list.append(service)
class Admin(User):
    pass

class BoardingPass:
    def __init__(self, flight_number, flight_seat_number, booking_reference, depart_date, passenger):
        flight_instance = nokair.get_flight_instance(flight_number, depart_date)
        self.__flight_seat_number = flight_seat_number
        self.__flight_number = flight_number
        if passenger.middle_name:
            self.__passenger_name = f"{passenger.title} {passenger.first_name} {passenger.middle_name} {passenger.last_name}"
        else:
            self.__passenger_name = f"{passenger.title} {passenger.first_name} {passenger.last_name}"
        self.__aircraft_number = flight_instance.aircraft.aircraft_number
        self.__booking_reference = booking_reference
        self.__departure_date = depart_date
        self.__starting_location = flight_instance.starting_location.name
        self.__destination = flight_instance.destination.name

class Flight:
    def __init__(self, starting_location, destination):
        self.__starting_location = starting_location
        self.__destination = destination

    @property
    def starting_location(self):
        return self.__starting_location
    
    @property
    def destination(self):
        return self.__destination

class FlightInstance(Flight):
    def __init__(self, flight, flight_number, departure_time, arrival_time, aircraft, date, cost):
        super().__init__(flight.starting_location, flight.destination)
        self.__flight_seat_list = []
        for seat in aircraft.seat_list:
            self.__flight_seat_list.append(FlightSeat(seat))
        self.__flight_number = flight_number
        self.__departure_time = departure_time
        self.__arrival_time = arrival_time
        self.__aircraft = aircraft
        self.__date = date
        self.__cost = int(cost)
    
    @property
    def flight_number(self):
        return self.__flight_number
    
    @property
    def departure_time(self):
        return self.__departure_time
    
    @property
    def arrival_time(self):
        return self.__arrival_time
    
    @property
    def aircraft(self):
        return self.__aircraft
    
    @property
    def date(self):
        return self.__date
    
    @property
    def cost(self):
        return self.__cost

    @property
    def flight_seat_list(self):
        return self.__flight_seat_list

    def get_flight_seat(self, seat_number):
        for flight_seat in self.__flight_seat_list:
            print(flight_seat.seat_number, seat_number)
            if flight_seat.seat_number == seat_number:
                return flight_seat
    
class Aircraft:
    def __init__(self, aircraft_number):
        self.__seat_list = self.__init_default_seat_list()
        self.__aircraft_number = aircraft_number

    @property
    def aircraft_number(self):
        return self.__aircraft_number
    
    @property
    def seat_list(self):
        return self.__seat_list
    
    def __init_default_seat_list(self):
        seats_data = []
        for r in range(1,6):
            for c in range(0,3):
                alphabets = "ABCDEF"
                seat_id = f"{alphabets[c]}{r}"
                seat_category = SeatCategory("normal_seat", 200)
                if r <= 1:
                    seat_category = SeatCategory("premium_seat", 600)
                elif r <= 2:
                    seat_category = SeatCategory("happy_seat", 400)
                seats_data.append(Seats(seat_id, seat_category))
        return seats_data

class Airport:
    def __init__(self, name, short_name):
            self.__name = name
            self.__short_name = short_name
            
    @property
    def name(self):
            return self.__name

class Seats:
    def __init__(self, seat_number, seat_category):
        self.__seat_number = seat_number
        self.__seat_category = seat_category

    @property
    def seat_number(self):
        return self.__seat_number
    
    @property
    def seat_category(self):
        return self.__seat_category

class FlightSeat(Seats):
    def __init__(self, seat):
        super().__init__(seat.seat_number, seat.seat_category)
        self.__occupied = False
    
    @property
    def occupied(self):
        return self.__occupied
    
    @occupied.setter
    def occupied(self, occupied):
        self.__occupied = occupied
        return "Success"

class SeatCategory:
    def __init__(self, name, price_per_unit):
        self.__name = name
        self.__price = int(price_per_unit)

    @property
    def seat_price(self) :
        return self.__price


class PaymentMethod:
    def __init__(self):
        self.__payment_fee = 0
        
    @property
    def payment_fee(self):
        return self.__payment_fee


class CreditCard(PaymentMethod):
    def __init__(self, card_number, cardholder_name, expiry_date, cvv):
        self.__card_number = card_number
        self.__cardholder_name = cardholder_name
        self.__expiry_date = expiry_date
        self.__cvv = cvv
        self.__payment_fee = 240
    

class Qr(PaymentMethod):
    pass

class Transaction:
    def __init__(self, payment_method: PaymentMethod):
        self.__paid_time = datetime.now()
        self.__payment_method = payment_method

class Service:
    def __init__(self, service_name, price_per_unit):
        self.__service_name = service_name
        self.__price_per_unit = float(price_per_unit)
        self.__total_cost = price_per_unit

    @property
    def price_per_unit(self):
        return self.__price_per_unit

    @property
    def total_cost(self):
        return self.__total_cost
    
    @property
    def service_name(self):
        return self.__service_name

    @total_cost.setter
    def total_cost(self, total_cost):
        self.__total_cost = total_cost

    def get_service_info_for_showing(self):
        return {"service_name": self.__service_name, "total_cost": self.__total_cost}

class Insurance(Service):
    def __init__(self, service_name, price_per_unit):
        super().__init__(service_name, price_per_unit)
        self.total_cost = price_per_unit


class Baggage(Service):
    def __init__(self, service_name, price_per_unit, weight):
        super().__init__(service_name, price_per_unit)
        self.__weight = weight
        self.total_cost = price_per_unit * weight

nokair = AirportSystem()
nokair.airport_list.append(Airport("Don Mueang", "DMK"))
nokair.airport_list.append(Airport("Chiang Mai", "CNX"))
nokair.airport_list.append(Airport("Phuket", "HKT"))
nokair.airport_list.append(Airport("Hat Yai", "HDY"))
nokair.flight_list.append(Flight(nokair.airport_list[0], nokair.airport_list[1]))
nokair.flight_list.append(Flight(nokair.airport_list[1], nokair.airport_list[0]))

nokair.aircraft_list.append(Aircraft("101"))
nokair.flight_instance_list.append(FlightInstance(nokair.flight_list[0], "F1", "8:00", "10:00", nokair.aircraft_list[0], "2024-03-08", 1000))
nokair.flight_instance_list.append(FlightInstance(nokair.flight_list[1], "F2", "10:00", "12:00", nokair.aircraft_list[0], "2024-03-09", 1000))
nokair.flight_instance_list.append(FlightInstance(nokair.flight_list[0], "F3", "11:00", "13:00", nokair.aircraft_list[0], "2024-03-08", 2000))
nokair.flight_instance_list.append(FlightInstance(nokair.flight_list[1], "F4", "14:00", "15:00", nokair.aircraft_list[0], "2024-03-09", 2000))
nokair.flight_instance_list.append(FlightInstance(nokair.flight_list[0], "F5", "20:00", "22:00", nokair.aircraft_list[0], "2024-03-08", 800))
nokair.flight_instance_list.append(FlightInstance(nokair.flight_list[1], "F6", "20:00", "22:00", nokair.aircraft_list[0], "2024-03-09", 800))

nokair.service_list = Insurance("Insurance", 100)
nokair.service_list = Baggage("+5kg Baggage", 100, 5)
nokair.service_list = Baggage("+10kg Baggage", 100, 10)
nokair.service_list = Baggage("+15kg Baggage", 100, 15)