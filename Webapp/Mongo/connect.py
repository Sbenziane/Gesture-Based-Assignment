from flask import Flask, request, json, jsonify, render_template
from flask_pymongo import PyMongo
import pymongo
from bson.json_util import dumps, loads

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'gamescores'
app.config['MONGO_URI'] = 'mongodb://gestureproj:gest@ds121309.mlab.com:21309/gamescores'

mongo = PyMongo(app)

@app.route('/')
def index():
    user = mongo.db.users
    topscores = user.find() # adapted from https://stackoverflow.com/a/30400268/7232648
    return app.send_static_file('index.html')

@app.route('/getScoreList', methods=['GET'])
def getScoreList():
    user = mongo.db.users
    cursor = user.find()
    topten = cursor.sort([('score', pymongo.ASCENDING)]).limit(10)
    topscores = dumps(topten) # adapted from https://stackoverflow.com/a/30400268/7232648

    #topscores = loads(topscoresL)
    return topscores

@app.route('/save', methods=['POST'])
def save():
    print("Reached save backend")
    scoreData = request.json
    print("score data: " + str(scoreData))
    
    user = mongo.db.users
    user.insert(scoreData)

    return print("saved score")


if __name__ == '__main__':
    app.run(debug=True)