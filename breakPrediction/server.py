from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import prediction

app = FastAPI()

# Allow requests from all origins (you might want to restrict this in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # This allows requests from all origins
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

class PredictRequest(BaseModel):
    period: int
    totalHours: float
    age: int

@app.get("/")
def read_root():
    return {"message": "Server is running"}

@app.post("/predict")
def predict_endpoint(request: PredictRequest):
    try:
        if(request.period>=18 or request.period<6):
            period="Night"
        else:
            period="Day"

        prediction1 = prediction.predict_breaks(period, request.totalHours, request.age)
        return {"break": int(prediction1*request.totalHours),"period":period}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
