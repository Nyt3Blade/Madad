from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from pymongo import MongoClient
from dotenv import load_dotenv
import datetime
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from functools import wraps
import certifi
from bson.objectid import ObjectId
import tensorflow as tf
import keras
import numpy as np
import uuid
import json

# Load environment variables
load_dotenv()

app = Flask(__name__)
# Configure CORS to allow requests from the frontend
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

app.config['SECRET_KEY'] = 'your-secret-key'  # Change this to a secure secret key in production

# Initialize models as None
model = None
soil_model = None
plant_disease = None
soil_types = None

# Load the plant disease model
try:
    model = keras.models.load_model("models/plant_disease_recog_model_pwp.keras")
    with open("plant_disease.json", 'r') as file:
        plant_disease = json.load(file)
    print("Successfully loaded plant disease model!")
except Exception as e:
    print(f"Error loading plant disease model: {e}")

# Load the soil type model
try:
    print("Attempting to load soil model from:", os.path.abspath("models/SoilNet_93_86.h5"))
    soil_model = keras.models.load_model("models/SoilNet_93_86.h5")
    print("Soil model loaded successfully!")
    
    print("Attempting to load soil_types.json from:", os.path.abspath("soil_types.json"))
    with open("soil_types.json", 'r') as file:
        soil_types = json.load(file)
    print("Soil types loaded successfully:", soil_types)
except Exception as e:
    print(f"Error loading soil type model: {str(e)}")
    print(f"Error type: {type(e)}")
    import traceback
    print(f"Full traceback: {traceback.format_exc()}")

# MongoDB connection
try:
    # MongoDB Atlas connection string with SSL parameters
    MONGODB_URI = "mongodb+srv://Nyt3Blade:19206082@cluster0.j5ccuko.mongodb.net/madad_db?retryWrites=true&w=majority&appName=Cluster0&ssl=true&tlsAllowInvalidCertificates=true"
    client = MongoClient(MONGODB_URI, tlsCAFile=certifi.where())
    db = client.madad_db
    print("Successfully connected to MongoDB Atlas!")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")

# Add error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

# Add a test route to verify server is running
@app.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'Server is running!'}), 200

# Token required decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Token is missing!'}), 401
        try:
            token = token.split(" ")[1]  # Remove 'Bearer ' prefix
            try:
                data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            except jwt.ExpiredSignatureError:
                return jsonify({'error': 'Token has expired!'}), 401
            except jwt.InvalidTokenError:
                return jsonify({'error': 'Invalid token!'}), 401

            try:
                current_user = db.users.find_one({'_id': ObjectId(data['user_id'])})
            except Exception as e:
                print(f"Error finding user: {str(e)}")
                return jsonify({'error': 'Error finding user!'}), 401

            if not current_user:
                return jsonify({'error': 'User not found!'}), 401

            return f(current_user, *args, **kwargs)
        except Exception as e:
            print(f"Token validation error: {str(e)}")
            return jsonify({'error': 'Token validation failed!'}), 401
    return decorated

@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        
        # Check if required fields are present
        if not all(k in data for k in ['email', 'password', 'name']):
            return jsonify({'error': 'Missing required fields'}), 400

        # Check if user already exists
        if db.users.find_one({'email': data['email']}):
            return jsonify({'error': 'Email already registered'}), 400

        # Create new user
        user = {
            'email': data['email'],
            'password': generate_password_hash(data['password']),
            'name': data['name'],
            'farms': 0,  # Initialize farms count to 0
            'created_at': datetime.datetime.utcnow()
        }

        # Insert user into database
        result = db.users.insert_one(user)
        
        # Generate token
        token = jwt.encode({
            'user_id': str(result.inserted_id),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
        }, app.config['SECRET_KEY'])

        return jsonify({
            'message': 'User created successfully',
            'token': token,
            'user': {
                'id': str(result.inserted_id),
                'email': data['email'],
                'name': data['name'],
                'farms': 0
            }
        }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/signin', methods=['POST'])
def signin():
    try:
        data = request.get_json()
        
        # Check if required fields are present
        if not all(k in data for k in ['email', 'password']):
            return jsonify({'error': 'Missing required fields'}), 400

        # Find user by email
        user = db.users.find_one({'email': data['email']})
        if not user:
            return jsonify({'error': 'User not found'}), 404

        # Check password
        if not check_password_hash(user['password'], data['password']):
            return jsonify({'error': 'Invalid password'}), 401

        # Generate token
        token = jwt.encode({
            'user_id': str(user['_id']),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
        }, app.config['SECRET_KEY'])

        return jsonify({
            'message': 'Login successful',
            'token': token,
            'user': {
                'id': str(user['_id']),
                'email': user['email'],
                'name': user['name']
            }
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Protected route example
@app.route('/profile', methods=['GET'])
@token_required
def get_profile(current_user):
    return jsonify({
        'user': {
            'id': str(current_user['_id']),
            'email': current_user['email'],
            'name': current_user['name']
        }
    }), 200

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

@app.route('/basic_details', methods=['GET'])
@token_required
def get_basic_details(current_user):
    try:
        # Fetch user details from MongoDB
        user = db.users.find_one({'_id': current_user['_id']})
        if not user:
            return jsonify({'error': 'User not found'}), 404

        # Return basic user details
        return jsonify({
            'user': {
                'id': str(user['_id']),
                'email': user['email'],
                'name': user['name'],
                'farms': user.get('farms', 0)  # Include farms count in response
            }
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/farms', methods=['GET'])
@token_required
def get_farms(current_user):
    try:
        # Fetch farms for the current user
        farms = list(db.farms.find({'userId': str(current_user['_id'])}))
        
        # Convert ObjectId to string for JSON serialization
        for farm in farms:
            farm['_id'] = str(farm['_id'])
        
        return jsonify({'farms': farms}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/farms', methods=['POST'])
@token_required
def add_farm(current_user):
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'location', 'size', 'cropType', 'soilType', 'irrigationSystem', 'harvestingDate']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400

        # Create new farm document
        farm = {
            'userId': str(current_user['_id']),
            'name': data['name'],
            'location': data['location'],
            'size': float(data['size']),
            'cropType': data['cropType'],
            'soilType': data['soilType'],
            'irrigationSystem': data['irrigationSystem'],
            'harvestingDate': data['harvestingDate'],
            'createdAt': datetime.datetime.utcnow()
        }

        # Insert farm into database
        result = db.farms.insert_one(farm)
        
        # Increment farms count for the user
        db.users.update_one(
            {'_id': current_user['_id']},
            {'$inc': {'farms': 1}}
        )
        
        # Add the ID to the response
        farm['_id'] = str(result.inserted_id)
        
        return jsonify({
            'message': 'Farm added successfully',
            'farm': farm
        }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/farms/<farm_id>', methods=['DELETE'])
@token_required
def delete_farm(current_user, farm_id):
    try:
        # Verify farm belongs to user
        farm = db.farms.find_one({
            '_id': ObjectId(farm_id),
            'userId': str(current_user['_id'])
        })
        
        if not farm:
            return jsonify({'error': 'Farm not found or unauthorized'}), 404

        # Delete the farm
        db.farms.delete_one({'_id': ObjectId(farm_id)})
        
        # Decrement farms count for the user
        db.users.update_one(
            {'_id': current_user['_id']},
            {'$inc': {'farms': -1}}
        )
        
        return jsonify({'message': 'Farm deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/farms/<farm_id>', methods=['PUT'])
@token_required
def update_farm(current_user, farm_id):
    try:
        data = request.get_json()
        
        # Verify farm belongs to user
        farm = db.farms.find_one({
            '_id': ObjectId(farm_id),
            'userId': str(current_user['_id'])
        })
        
        if not farm:
            return jsonify({'error': 'Farm not found or unauthorized'}), 404

        # Validate required fields
        required_fields = ['name', 'location', 'size', 'cropType', 'soilType', 'irrigationSystem', 'harvestingDate']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400

        # Update farm document
        updated_farm = {
            'name': data['name'],
            'location': data['location'],
            'size': float(data['size']),
            'cropType': data['cropType'],
            'soilType': data['soilType'],
            'irrigationSystem': data['irrigationSystem'],
            'harvestingDate': data['harvestingDate']
        }

        # Update in database
        db.farms.update_one(
            {'_id': ObjectId(farm_id)},
            {'$set': updated_farm}
        )
        
        # Add the ID to the response
        updated_farm['_id'] = farm_id
        
        return jsonify({
            'message': 'Farm updated successfully',
            'farm': updated_farm
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

def extract_features(image_path):
    image = tf.keras.utils.load_img(image_path, target_size=(160,160))
    feature = tf.keras.utils.img_to_array(image)
    feature = np.array([feature])
    return feature

def model_predict(image_path):
    img = extract_features(image_path)
    prediction = model.predict(img)
    prediction_label = plant_disease[prediction.argmax()]
    return prediction_label

@app.route('/analyze/plant-disease', methods=['POST'])
@token_required
def analyze_plant_disease(current_user):
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400

        image = request.files['image']
        if image.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        # Create uploads directory if it doesn't exist
        upload_dir = 'uploads'
        if not os.path.exists(upload_dir):
            os.makedirs(upload_dir)

        # Save the image with a unique name
        temp_name = f"{upload_dir}/temp_{uuid.uuid4().hex}_{image.filename}"
        image.save(temp_name)

        # Get prediction
        prediction = model_predict(temp_name)

        # Clean up the temporary file
        os.remove(temp_name)

        return jsonify({
            'success': True,
            'prediction': prediction
        }), 200

    except Exception as e:
        print(f"Error in plant disease analysis: {str(e)}")
        return jsonify({'error': str(e)}), 500

def extract_soil_features(image_path):
    image = tf.keras.utils.load_img(image_path, target_size=(224, 224))
    feature = tf.keras.utils.img_to_array(image)
    feature = np.array([feature])
    return feature

def predict_soil_type(image_path):
    img = extract_soil_features(image_path)
    prediction = soil_model.predict(img)
    prediction_label = soil_types[prediction.argmax()]
    return prediction_label

@app.route('/analyze/soil-type', methods=['POST'])
@token_required
def analyze_soil_type(current_user):
    try:
        if soil_model is None or soil_types is None:
            return jsonify({'error': 'Soil type model is not available'}), 503

        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400

        image = request.files['image']
        if image.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        # Create uploads directory if it doesn't exist
        upload_dir = 'uploads'
        if not os.path.exists(upload_dir):
            os.makedirs(upload_dir)

        # Save the image with a unique name
        temp_name = f"{upload_dir}/temp_{uuid.uuid4().hex}_{image.filename}"
        image.save(temp_name)

        # Get prediction
        prediction = predict_soil_type(temp_name)

        # Clean up the temporary file
        os.remove(temp_name)

        return jsonify({
            'success': True,
            'prediction': prediction
        }), 200

    except Exception as e:
        print(f"Error in soil type analysis: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')
