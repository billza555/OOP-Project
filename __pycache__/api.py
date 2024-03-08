from main import *
import uvicorn
from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#junior add
@app.get("/select_ticket")
async def check_in(booking_ref:str, last_name:str):
    return [{"type":"depart","date":"01-01-2000", "flight number":"ABC", "Aircraft":"101", "from":"bangkok","to":"chaingm mai", "depart time":"08:00","arrival time":"10:00"},
            {"type":"return","date":"02-01-2000", "flight number":"ZXC", "Aircraft":"122", "from":"chaing mai","to":"bangkok", "depart time":"12:00","arrival time":"14:00"}]
@app.get("/boarding_pass")

async def get_boarding_pass(booking_ref:str, last_name:str, type:str):
    return {"eiei":"check"}

@app.get("/flight_instance_matches", tags=["Show + Get Flight Instance Matches"])
def get_flight_instances_matches(starting_location : str, destination : str, depart_date : str, return_date : Optional[str] = None):
    # flight_instance_matches = nokair.get_flight_instance_matches(starting_location, destination, depart_date, return_date)
    # return json.dumps(flight_instance_matches)
    return nokair.get_flight_instance_matches(starting_location, destination, depart_date, return_date)

@app.get("/get_all_seats", tags=["Show + Get Flight Instance Matches"])
def get_all_seats(flight_number : str, date : str):
    return nokair.get_flight_instance(flight_number, date).flight_seat_list

@app.get("/get_all_services", tags=["Services"])
def get_all_services():
    return nokair.service_list

@app.get("/get_all_airports", tags=["Show + Get Flight Instance Matches"])
def get_all_airports():
    return nokair.airport_list

@app.post("/pay_by_credit", tags=["Paying"])
def pay_by_credit(card_number: str, cardholder_name: str, expiry_date: str, cvv: str, paid_time: str, reservation_dict : dict):
    return nokair.pay_by_credit_card(card_number, cardholder_name, expiry_date, cvv, paid_time, reservation_dict)

@app.post("/pay_by_qr", tags=["Paying"])
def pay_by_qr(paid_time: str, reservation_dict : dict):
    return nokair.pay_by_qr_code(paid_time, reservation_dict)

@app.post("/check_in", tags=["Check In"])
async def check_in(booking_reference: str, last_name: str):
    return nokair.check_in(booking_reference, last_name)

if __name__ == "__main__":
    uvicorn.run("api:app", host="127.0.0.1", port=8000, log_level="info")