from flask import Flask, request, json, jsonify, render_template
from flask_pymongo import PyMongo
from bson.json_util import dumps

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'gamescores'
app.config['MONGO_URI'] = 'mongodb://gestureproj:gest@ds121309.mlab.com:21309/gamescores'

mongo = PyMongo(app)

@app.route('/')
def index():
    user = mongo.db.users
    topscores = dumps(user.find())
    #for obj in user.find():
        #print(obj['username'])

    #userList = data['username']
    #scoreList = data['score']
    print(userdict)

    return render_template('index.html', topscores=topscores)

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