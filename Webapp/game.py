from pymongo import MongoClient
from bson.objectid import ObjectId
from flask import Flask,render_template,jsonify,json,request

app = Flask(__name__)

client = MongoClient('localhost:27017')
db = client.ScoreData

@app.route("/addScore",methods=['POST'])
def addScore():
    try:
        json_data = request.json['info']
        userName = json_data['username']
        score = json_data['score']

        db.Scores.insert_one({
            'username':score['username'], 'score':score['score'],
            })
        return jsonify(status='OK',message='inserted successfully')

    except Exception as e:
        return jsonify(status='ERROR',message=str(e))

@app.route('/')
def showScoreList():
    return render_template('home.html')

@app.route('/getScore',methods=['POST'])
def getScore():
    try:
        scoreId = request.json['id']
        score = db.Scores.find_one({'_id':ObjectId(scoreId)})
        scoreDetail = {
                'username':score['username'],
                'score':score['score'],
                'id':str(score['_id'])
                }
        return json.dumps(scoreDetail)
    except Exception as e:
        return str(e)

@app.route("/getScoreList",methods=['POST'])
def getScoreList():
    try:
        scores = db.Scores.find()
        
        scoreList = []
        for score in scores:
            print(score)
            scoreItem = {
                    'username':score['username'],
                    'score':score['score'],
                    'id':str(score['_id'])
                    }
            scoreList.append(scoreItem)
    except Exception as e:
        return str(e)
    return json.dumps(scoreList)

@app.route("/execute",methods=['POST'])
def execute():
    try:
        scoreInfo = request.json['info']
        userName = json_data['username']
        score = json_data['score']
        with settings(warn_only=True):
            if isRoot:
                resp = sudo(command)
            else:
                resp = run(command)

        return jsonify(status='OK',message=resp)
    except Exception as e:
        print('Error is ' + str(e))
        return jsonify(status='ERROR',message=str(e))

if __name__ == "__main__":
    app.run(host='0.0.0.0')