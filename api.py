from main import *
import uvicorn
from typing import Optional, List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

origins = [
    "http://localhost:5500",
    "http://127.0.0.1:5500"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/flight_instance_matches", tags=["Show + Get Flight Instance Matches"])
def get_flight_instances_matches(starting_location : str, destination : str, depart_date : str, return_date : Optional[str] = None):
    flight_instance_matches = nokair.get_flight_instance_matches(starting_location, destination, depart_date, return_date)
    return flight_instance_matches

@app.get("/get_all_seats", tags=["Show + Get Flight Instance Matches"])
def get_all_seats(flight_number : str, date : str):
    return nokair.get_flight_instance(flight_number, date).flight_seat_list

@app.get("/get_all_services", tags=["Services"])
def get_all_services():
    all_services_info = []
    for service in nokair.service_list:
        all_services_info.append(service.get_service_info_for_showing())
    return all_services_info

@app.get("/get_all_airports", tags=["Show + Get Flight Instance Matches"])
def get_all_airports():
    return nokair.airport_list

@app.post("/show_unpaid_reservation_cost", tags=["Paying"])
def show_unpaid_reservation_cost(flight_instance_list : List[dict], passenger_list : List[dict], flight_seats_list : List[list]):
    return nokair.show_unpaid_reservation_cost(flight_instance_list, passenger_list, flight_seats_list)

@app.post("/pay_by_credit", tags=["Paying"])
def pay_by_credit(card_number: str, cardholder_name: str, expiry_date: str, cvv: str, flight_instance_list : List[dict], passenger_list : List[dict], flight_seats_list : List[list]):
    return nokair.pay_by_credit_card(card_number, cardholder_name, expiry_date, cvv, flight_instance_list, passenger_list, flight_seats_list)

@app.post("/pay_by_qr", tags=["Paying"])
def pay_by_qr(flight_instance_list : List[dict], passenger_list : List[dict], flight_seats_list : List[list]):
    return nokair.pay_by_qr(flight_instance_list, passenger_list, flight_seats_list)

@app.post("/check_in", tags=["Check In"])
async def check_in(booking_reference: str, last_name: str):
    return nokair.check_in(booking_reference, last_name)

if __name__ == "__main__":
    uvicorn.run("api:app", host="127.0.0.1", port=8000, log_level="info")