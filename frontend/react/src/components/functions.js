
function getQuestionById(question_id) {
    return fetch('http://127.0.0.1:8000/api/question/' + question_id)
        .then(data => data.json())
        .then(function (data) {
            return data
        });
}

export default getQuestionById