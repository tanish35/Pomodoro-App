import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from xgboost import XGBRegressor
from sklearn.preprocessing import LabelEncoder  # Import LabelEncoder
import pickle

data = pd.read_csv(r'/kaggle/input/pomodoro3/train.csv')

x = data.drop("BREAKS IN MINS /HOUR OF STUDY", axis=1)
y = data['BREAKS IN MINS /HOUR OF STUDY']

label_encoder = LabelEncoder()
x['Period'] = label_encoder.fit_transform(x['Period'])

X_train, X_test, y_train, y_test = train_test_split(x, y, test_size=0.1, random_state=42)
print("Number of rows in X_train:", X_train.shape[0])

xgb_model = XGBRegressor()
xgb_model.fit(X_train, y_train)

score = xgb_model.score(X_test, y_test)
print(f'Model R^2 score: {score}')

model_filename = 'trained.pkl'
label_encoder_filename = 'le.pkl'
with open(model_filename, 'wb') as file:
    pickle.dump(xgb_model, file)
with open(label_encoder_filename, 'wb') as file:
    pickle.dump(label_encoder, file)


print(f'Model saved to {model_filename}')
