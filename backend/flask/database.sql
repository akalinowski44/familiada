CREATE TABLE questions
(
  id             SERIAL NOT NULL
    CONSTRAINT questions_pkey
    PRIMARY KEY,
  question          VARCHAR(255)
);


CREATE TABLE answers
(
  id             SERIAL NOT NULL
    CONSTRAINT answers_pkey
    PRIMARY KEY,
  score    INTEGER,
  question_id    INTEGER
    CONSTRAINT answers_question_id_fkey
    REFERENCES questions,
  message        VARCHAR(30)
);
