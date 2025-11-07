# This is your complete AI backend service.
# This code loads the model from your "local_model" folder.

import io
import os  # <-- MAKE SURE OS IS IMPORTED
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
from transformers import ViTFeatureExtractor, ViTForImageClassification

print("Loading model... This might take a moment.")

# --- THIS IS THE FINAL, CORRECT CODE ---

# This gets the full path to the folder your script is in
# (e.g., D:\CattleBreed\backend\ai_server)
script_directory = os.path.dirname(os.path.realpath(__file__))

# This creates the full, absolute path to your downloaded model
# (e.g., D:\CattleBreed\backend\ai_server\local_model)
model_name = os.path.join(script_directory, "local_model")

print(f"Attempting to load model from this local path: {model_name}")
# ----------------------------------------

# This code will now load from your local folder
feature_extractor = ViTFeatureExtractor.from_pretrained(model_name)
model = ViTForImageClassification.from_pretrained(model_name)
print("Model loaded successfully!")

# Initialize the Flask app
app = Flask(__name__)
# Enable CORS (Cross-Origin Resource Sharing) to allow your HTML file
# to send requests to this server
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        try:
            # Read the image file from the request
            img_bytes = file.read()
            image = Image.open(io.BytesIO(img_bytes)).convert("RGB")

            # 1. Process the image
            # This prepares the image for the model (resizing, normalizing, etc.)
            inputs = feature_extractor(images=image, return_tensors="pt")

            # 2. Run the model prediction
            outputs = model(**inputs)
            logits = outputs.logits

            # 3. Get the top prediction
            # Find the class with the highest score (logit)
            predicted_class_idx = logits.argmax(-1).item()
            
            # Get the human-readable name of that class
            predicted_breed = model.config.id2label[predicted_class_idx]
            
            # Get the confidence score
            # We apply softmax to logits to get probabilities (0-1 range)
            probabilities = logits.softmax(-1)
            confidence = probabilities[0, predicted_class_idx].item()

            print(f"Prediction: {predicted_breed}, Confidence: {confidence:.4f}")

            # 4. Send the result back as JSON
            return jsonify({
                'breed': predicted_breed,
                'confidence': round(confidence, 4)
            })

        except Exception as e:
            print(f"Error during prediction: {e}")
            return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Run the Flask server on port 5000
    # Your frontend will send requests to http://127.0.0.1:5000/predict
    app.run(port=5000, debug=True)