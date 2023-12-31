import { useEffect, useState } from "react";
import {
  AdminContainer,
  ColItem,
  ColTitle,
  Line,
  LineTitle,
  ListContainer,
  SearchContainer,
  Table,
} from "./CssAdminQuestions";
import Question from "../../interfaces/QuestionInterface";
import { getAdminQuestions } from "../../fetch/fetchAdminQuestions";
import {
  levelNormalize,
  questionAwardNormalize,
} from "../../outils/gameNormalize";
import ViewQuestion from "../../components/AdminQuestions/ViewQuestion";
import { getQuestionById } from "../../fetch/fetchAdminQuestionById";
import UpdateQuestion from "../../components/AdminQuestions/UpdateQuestion";
import QuestionToHandle from "../../interfaces/QuestionToHandle";
import { deleteQuestionModal } from "../../outils/deleteQuestion";
import NewQuestion from "../../components/AdminQuestions/NewQuestion";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function AdminQuestionsList() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>();
  const [modalViewShow, setModalViewShow] = useState<boolean>(false);
  const [modalUpdateShow, setModalUpdateShow] = useState<boolean>(false);
  const [modalNewShow, setModalNewShow] = useState<boolean>(false);
  const [questionToHandle, setQuestionToHandle] = useState<QuestionToHandle>();
  const [isDeleteQuestion, setIsDeleteQuestion] = useState<boolean>(false);
  const roleCurrentUser = useSelector(
    (state: RootState) => state.user.user?.role?.name
  );

  // Utilise useEffect pour récupérer les questions lorsque
  // modalUpdateShow ou isDeleteQuestion changent
  useEffect(() => {
    async function getQuestionData() {
      // Appelle la fonction asynchrone pour récupérer les questions
      const questionsData = await getAdminQuestions();

      // Met à jour l'état des questions avec les données récupérées
      setQuestions(questionsData);
    }
    getQuestionData();
  }, [modalUpdateShow, modalNewShow, isDeleteQuestion]);

  // Fonction pour afficher les détails d'une question
  function handleViewQuestion(idQuestion: number) {
    async function getQuestionDatas() {
      // Appelle la fonction pour récupérer les détails de la question par son ID
      const datas = await getQuestionById(idQuestion);

      setQuestionToHandle(datas);

      // Affiche le modal pour visualiser la question
      setModalViewShow(true);
    }
    getQuestionDatas();
  }

  // Fonction pour gérer la mise à jour d'une question
  function handleUpdateQuestion(idQuestion: number) {
    async function getQuestionDatas() {
      // Appelle la fonction pour récupérer les détails de la question par son ID
      const datas = await getQuestionById(idQuestion);
      setQuestionToHandle(datas);
      // Affiche le modal pour la mise à jour de la question
      setModalUpdateShow(true);
    }
    getQuestionDatas();
  }

  // Fonction pour gérer la suppression d'une question
  async function handleDeleteQuestion(
    questionId: number,
    questionTitle: string
  ) {
    // Appelle la fonction pour confirmer la suppression de la question
    deleteQuestionModal(
      questionId,
      questionTitle,
      setIsDeleteQuestion,
      isDeleteQuestion,
      roleCurrentUser
    );
  }

  function handleSearch(e: any) {
    // Filtrer les questions en fonction de la valeur de recherche
    const questionsFiltered = questions?.filter(
      (question: Question) =>
        // Vérifier si le titre de la question contient la valeur de recherche (insensible à la casse)
        question.title.toUpperCase().includes(e.target.value.toUpperCase()) ||
        // Vérifier si le niveau de difficulté de la question contient la valeur de recherche (insensible à la casse)
        levelNormalize(question.levelDifficulty.level).includes(
          e.target.value.toUpperCase()
        ) ||
        // Vérifier si la récompense de la question contient la valeur de recherche (insensible à la casse)
        questionAwardNormalize(question.award)
          .replace(/\./g, "")
          .includes(e.target.value.toUpperCase())
    );

    // Mettre à jour la liste des questions filtrées dans le state
    setFilteredQuestions(questionsFiltered);
}

  return (
    <>
      <SearchContainer>
        <label>Recherche</label>
        <input onChange={(e) => handleSearch(e)} type="text" />
      </SearchContainer>
      <AdminContainer>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <button
            onClick={() => setModalNewShow(true)}
            type="button"
            className="btn btn-outline-light btn-new-question"
          >
            <i className="fa-solid fa-pencil"></i> NOUVELLE QUESTION
          </button>
        </div>
        <ViewQuestion
          show={modalViewShow}
          setModalShow={setModalViewShow}
          onHide={() => setModalViewShow(false)}
          questionToHandle={questionToHandle}
          setModalUpdateShow={setModalUpdateShow}
          setIsDeleteQuestion={setIsDeleteQuestion}
          isDeleteQuestion={isDeleteQuestion}
        />
        <UpdateQuestion
          show={modalUpdateShow}
          setModalShow={setModalUpdateShow}
          onHide={() => setModalUpdateShow(false)}
          questionToHandle={questionToHandle}
        />
        <NewQuestion
          show={modalNewShow}
          setModalShow={setModalNewShow}
          onHide={() => setModalNewShow(false)}
        />
        <Table>
          <LineTitle className="title-line">
            <ColTitle className="col-admin-award">Gain</ColTitle>
            <ColTitle className="col-admin-question">Question</ColTitle>
            <ColTitle className="col-admin-level">Niveau</ColTitle>
            <ColTitle className="col-admin-view"></ColTitle>
            <ColTitle className="col-admin-update"></ColTitle>
            <ColTitle className="col-admin-delete"></ColTitle>
          </LineTitle>
          <ListContainer>
            {(filteredQuestions ? filteredQuestions : questions).map(
              (question) => (
                <Line key={question.id}>
                  <ColItem className="col-admin-award">
                    {questionAwardNormalize(question.award)} €
                  </ColItem>
                  <ColItem className="col-admin-question">
                    {question.title}
                  </ColItem>
                  <ColItem className="col-admin-level">
                    {levelNormalize(question.levelDifficulty.level)}
                  </ColItem>
                  <ColItem
                    className="col-admin-view"
                    onClick={() => handleViewQuestion(question.id)}
                  >
                    <i className="fa-regular fa-eye"></i>
                  </ColItem>
                  <ColItem
                    className="col-admin-update"
                    onClick={() => handleUpdateQuestion(question.id)}
                  >
                    <i className="fa-regular fa-pen-to-square"></i>
                  </ColItem>
                  <ColItem
                    className="col-admin-delete"
                    onClick={() =>
                      handleDeleteQuestion(question.id, question.title)
                    }
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </ColItem>
                </Line>
              )
            )}
          </ListContainer>
        </Table>
      </AdminContainer>
    </>
  );
}

export default AdminQuestionsList;
