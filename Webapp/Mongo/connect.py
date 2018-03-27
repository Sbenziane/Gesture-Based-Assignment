from flask import Flask, request, json, jsonify, render_template
from flask_pymongo import PyMongo
import pymongo
from pymongo import MongoClient
from bson.json_util import dumps, loads

app = Flask(__name__)

mongo = PyMongo(app)
client = MongoClient() 
db = client.gestproj # DB = database
collection = db.leaderboard # DB holds a collection which stores documents (document = entry, one document per score)

@app.route('/')
def index():
    return app.send_static_file('index.html') # Just displaying the index file

@app.route('/getScoreList', methods=['GET'])
def getScoreList():
    cursor = collection.find() # collection.find returns all documents in a Cursor object 
    topten = cursor.sort([('score', pymongo.ASCENDING)]).limit(10) # Sort the returned documents based on score (ascending - lower score(quicker time) is better), limit results to 10 (only need top 10). Adapted from - https://api.mongodb.com/python/current/api/pymongo/cursor.html?highlight=sort#pymongo.cursor.Cursor.sort
    topscores = dumps(topten) # adapted from https://stackoverflow.com/a/30400268/7232648
    return topscores

@app.route('/save', methods=['POST'])
def save():
    print("Reached save backend") # Making sure the Save button actually reaches here
    scoreData = request.json # Get the JSON data that came with the POST request
    print("score data: " + str(scoreData)) # Making sure the data looks right
    collection.insert(scoreData) # Add the data to the collection

if __name__ == '__main__':
    app.run(debug=True)