from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict

app = FastAPI()

# Enable CORS so frontend can access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3001",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/predict")
def predict(hour: int):
    """Predict energy consumption for a given hour"""
    return {"consumption": hour * 5 + 4}

@app.get("/predict_all")
def predict_all():
    """Return predictions for all 24 hours"""
    results: List[Dict] = []
    for hour in range(24):
        results.append({"hour": hour, "consumption": hour * 5 + 4})
    return results
