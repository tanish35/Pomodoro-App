from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import prediction


app = FastAPI()


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
