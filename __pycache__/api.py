from main import *
import uvicorn
from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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
def get_flight_instances_matches(froml : str, to : str, depart_date : str, return_date : Optional[str] = None):
    return nokair.get_flight_instance_matches(froml, to, depart_date, return_date)

@app.get("/get_all_seats", tags=["Show + Get Flight Instance Matches"])
def get_all_seats(flight_number : str, date : str):
    return nokair.get_flight_instance(flight_number, date).flight_seat_list

@app.get("/get_all_services", tags=["Services"])
def get_all_services():
    return nokair.service_list

@app.get("/get_all_airports", tags=["Show + Get Flight Instance Matches"])
def get_all_airports():
    return nokair.airport_list

if __name__ == "__main__":
    uvicorn.run("api:app", host="127.0.0.1", port=8000, log_level="info")