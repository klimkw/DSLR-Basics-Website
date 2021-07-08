from flask import Flask, url_for
from flask import render_template
from flask import request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/learn')
def learn():
    return render_template('learn.html')

@app.route('/experiment')
def experiment():
    return render_template('exp_home.html')

@app.route('/portrait')
def portrait():
    return render_template('exp_portrait.html')

@app.route('/landscape')
def landscape():
    return render_template('exp_landscape.html')

@app.route('/dynamic')
def dynamic():
    return render_template('exp_dynamic.html')

@app.route('/lowlight')
def lowlight():
    return render_template('exp_lowlight.html')

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

