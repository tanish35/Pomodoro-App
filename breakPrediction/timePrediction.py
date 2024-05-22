import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import pickle

# Load data
data = pd.read_csv(r'C:\Users\HP\Desktop\break\train.csv')

# Prepare features and target variable
x = data.drop("BREAKS IN MINS /HOUR OF STUDY", axis=1)
label_encoder = LabelEncoder()
x['Period'] = label_encoder.fit_transform(x['Period'])


y = data['BREAKS IN MINS /HOUR OF STUDY']


X_train, X_test, y_train, y_test = train_test_split(x, y, test_size=0.1, random_state=42)


RDF = RandomForestClassifier()
RDF.fit(X_train, y_train)


score = RDF.score(X_test, y_test)
print(f'Model accuracy: {score}')


model_filename = 'trained.pkl'
label_encoder_filename = 'le.pkl'
with open(model_filename, 'wb') as file:
    pickle.dump(RDF, file)

with open(label_encoder_filename, 'wb') as file:
    pickle.dump(label_encoder, file)

print(f'Model saved to {model_filename}')
