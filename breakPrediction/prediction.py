import pandas as pd
import pickle

# Load the trained model and LabelEncoder from the file
model_filename = 'trained.pkl'
label_encoder_filename = 'le.pkl'
with open(model_filename, 'rb') as model_file:
    RDF = pickle.load(model_file)

with open(label_encoder_filename, 'rb') as le_file:
    label_encoder = pickle.load(le_file)

# Function to take user input and make a prediction
def predict_breaks(period: str, total_hours: float, age: int):
    
    period_encoded = label_encoder.transform([period])[0]

    
    user_data = pd.DataFrame({
        'Period': [period_encoded],
        'Total Hours': [total_hours],
        'Age': [age]
    })

    
    prediction = RDF.predict(user_data)
    return prediction[0]
