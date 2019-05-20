import database_common


@database_common.connection_handler
def get_all_questions(cursor):
    query = """SELECT * FROM questions"""
    cursor.execute(query)
    return cursor.fetchall()

@database_common.connection_handler
def get_answers_by_question_id(cursor, question_id):
    query = f"""SELECT * FROM answers
                WHERE question_id = {question_id}"""
    cursor.execute(query)
    return cursor.fetchall()

@database_common.connection_handler
def get_question_by_id(cursor, question_id):
    query = f"""SELECT * FROM questions
                WHERE id={question_id}"""
    cursor.execute(query)
    return cursor.fetchone()