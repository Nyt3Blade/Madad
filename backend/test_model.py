import os
import tensorflow as tf
from tensorflow import keras
import json

print("Current working directory:", os.getcwd())
print("Model path:", os.path.abspath("models/SoilNet_93_86.h5"))
print("JSON path:", os.path.abspath("soil_types.json"))

try:
    print("\nAttempting to load model...")
    model = keras.models.load_model("models/SoilNet_93_86.h5")
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {str(e)}")
    import traceback
    print(f"Full traceback: {traceback.format_exc()}")

try:
    print("\nAttempting to load JSON...")
    with open("soil_types.json", 'r') as file:
        soil_types = json.load(file)
    print("JSON loaded successfully:", soil_types)
except Exception as e:
    print(f"Error loading JSON: {str(e)}")
    import traceback
    print(f"Full traceback: {traceback.format_exc()}") 