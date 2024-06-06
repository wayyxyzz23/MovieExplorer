from flask import Flask, jsonify, request
import requests
import os
from dotenv import load_dotenv
from functools import lru_cache  # Import lru_cache for caching

load_dotenv()

app = Flask(__name__)

movie_list = []

API_KEY = os.getenv('MOV"IE_API_KEY')
OMDB_API_URL = "http://www.omdbapi.com/"

@lru_cache(maxsize=128)  # Cache the results of fetch_movie_from_omdb function
def fetch_movie_from_omdb(title):
    omdb_response = requests.get(f"{OMDB_API_URL}?t={title}&apikey={API_KEY}")
    return omdb_response.json()

def store_movie(movie_details):
    # Before storing, check not to duplicate if the movie already exists
    existing_movie = find_movie_by_title(movie_details.get("Title", ""))
    if existing_movie is None:
        movie_list.append(movie_details)

def find_movie_by_title(target_title):
    for movie in movie_list:
        if movie['Title'].lower() == target_title.lower():
            return movie
    return None

@app.route('/movie/fetch', methods=['POST'])
def fetch_movie_endpoint():
    request_data = request.get_json()
    movie_title = request_data.get('title')  # Fixed variable name here, should be request_data not request_status
    if not movie_title:
        return jsonify({'error': 'Title is required'}), 400
    movie_details = fetch_movie_from_omdb(movie_title)
    if movie_details.get("Response") == "False":
        return jsonify({'error': 'Movie not found'}), 404
    store_movie(movie_details)
    return jsonify(movie_details), 200

@app.route('/movie/add', methods=['POST'])
def add_movie_endpoint():
    movie_data = request.get_json()
    store_movie(movie_data)
    return jsonify(movie_data), 201

@app.route('/movie/<title>', methods=['GET'])
def get_movie_details_endpoint(title):
    movie = find_movie_by_title(title)
    if movie:
        return jsonify(movie), 200
    else:
        return jsonify({'error': 'Movie not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)