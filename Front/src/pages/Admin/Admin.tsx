import { useEffect, useState } from "react";
import {
  AdminContainer,
  ColItem,
  ColTitle,
  Line,
  LineTitle,
  ListContainer,
  Table,
  Title,
} from "./CssAdmin";
import Question from "../../interfaces/QuestionInterface";
import { getAdminQuestions } from "../../fetch/fetchAdminQuestions";
import {
  levelNormalize,
  questionAwardNormalize,
} from "../../outils/gameNormalize";
import ViewQuestion from "../../components/Admin/ViewQuestion";
import { getQuestionById } from "../../fetch/fetchQuestionById";

function Admin() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [modalShow, setModalShow] = useState(false);
  const [questionToView, setQuestionToView] = useState<any>();

  useEffect(() => {
    async function getQuestionData() {
      const questionsData = await getAdminQuestions();
      setQuestions(questionsData);
    }

    getQuestionData();
  }, []);

  function handleViewQuestion(idQuestion: number) {
    async function getQuestionDatas() {
      const datas = await getQuestionById(idQuestion);
      setQuestionToView(datas);
      setModalShow(true);
    }
    getQuestionDatas();
  }

  return (
    <AdminContainer>
      <Title>Administration</Title>
      <ViewQuestion
        show={modalShow}
        setModalShow={setModalShow}
        onHide={() => setModalShow(false)}
        questionToView={questionToView}
      />
      <Table>
        <LineTitle className="title-line">
          <ColTitle className="col-admin-award">Prix</ColTitle>
          <ColTitle className="col-admin-question">Question</ColTitle>
          <ColTitle className="col-admin-level">Niveau</ColTitle>
          <ColTitle className="col-admin-view"></ColTitle>
          <ColTitle className="col-admin-update"></ColTitle>
          <ColTitle className="col-admin-delete"></ColTitle>
        </LineTitle>
        <ListContainer>
          {questions.map((question) => (
            <Line key={question.id}>
              <ColItem className="col-admin-award">
                {questionAwardNormalize(question.award)} €
              </ColItem>
              <ColItem className="col-admin-question">{question.title}</ColItem>
              <ColItem className="col-admin-level">
                {levelNormalize(question.levelDifficulty.level)}
              </ColItem>
              <ColItem
                className="col-admin-view"
                onClick={() => handleViewQuestion(question.id)}
              >
                <i className="fa-regular fa-eye"></i>
              </ColItem>
              <ColItem className="col-admin-update">
                <i className="fa-regular fa-pen-to-square"></i>
              </ColItem>
              <ColItem className="col-admin-delete">
                <i className="fa-solid fa-trash-can"></i>
              </ColItem>
            </Line>
          ))}
        </ListContainer>
      </Table>
    </AdminContainer>
  );
}

export default Admin;
