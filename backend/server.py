from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from pymongo import MongoClient
from dotenv import load_dotenv
import datetime

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# MongoDB connection
try:
    # MongoDB Atlas connection string
    MONGODB_URI = "mongodb+srv://Nyt3Blade:19206082@cluster0.j5ccuko.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    client = MongoClient(MONGODB_URI)
    db = client.madad_db
    print("Successfully connected to MongoDB Atlas!")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")

# Specify the path where images are stored
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/process_image', methods=['POST'])
def process_image():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400

        image = request.files['image']

        # Save the received image temporarily
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], 'temp_image.jpg')
        image.save(image_path)

        # Store image metadata in MongoDB
        image_metadata = {
            'filename': 'temp_image.jpg',
            'path': image_path,
            'uploaded_at': datetime.datetime.utcnow()
        }
        db.images.insert_one(image_metadata)

        # Return the processed image URL
        return jsonify({'image_url': f'/uploads/temp_image.jpg'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Add a route to serve uploaded images
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True)
