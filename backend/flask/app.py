from flask import Flask
from flask_restful import Api, Resource

import persistence

app = Flask(__name__)
api = Api(app)


class QuestionListAPI(Resource):
    def get(self):
        questions = persistence.get_all_questions()
        print(questions)
        return questions


class QuestionAPI(Resource):
    def get(self, question_id):
        question = persistence.get_question_by_id(question_id)
        answers = persistence.get_answers_by_question_id(question_id)
        return {'question': question, 'answers': answers}

    def post(self, id):
        pass

    def put(self, id):
        pass

    def delete(self, id):
        pass


api.add_resource(QuestionListAPI, '/api/questions', endpoint='questions')
api.add_resource(QuestionAPI, '/api/question/<int:question_id>', endpoint='question')

if __name__ == '__main__':
    app.run(
        debug=True,
        host='0.0.0.0',
        port=8080)
