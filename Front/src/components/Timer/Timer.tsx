import { useDispatch, useSelector } from "react-redux";
import { Time, TimerContainer } from "./CssTimer";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { endGame } from "../../outils/endGame";
import { setIsAnswerSelected } from "../../store/gameReducer";

function Timer() {
  const [time, setTime] = useState<number>(40);
  const [isdangertime, setisdangertime] = useState<string>("false");

  const isStartTimer = useSelector(
    (state: RootState) => state.game.isStartTimer
  );
  const isNewGame = useSelector((state: RootState) => state.game.isNewGame);

  const isAnswerSelected = useSelector(
    (state: RootState) => state.game.isAnswerSelected
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Utilise un effet pour réinitialiser le compte à rebours à 30 lorsque isStartTimer change
  useEffect(() => {
    setTime(40);
    setisdangertime("false");
    dispatch(setIsAnswerSelected(false));
  }, [isStartTimer]);

  useEffect(() => {
    if (time !== 0) {
      if (time < 10) {
        setisdangertime("true");
      }
      if (!isAnswerSelected) {
        const intervalId = setInterval(() => {
          setTime(time - 1);
        }, 1000);
        return () => {
          clearInterval(intervalId);
        };
      }
    } else if (time === 0) {
      if (!isAnswerSelected) {
        setTimeout(() => {
          endGame(navigate, dispatch, isNewGame, isStartTimer, "lost");
        }, 1500);
      }
    }
  }, [time]);

  return (
    <TimerContainer
      className={isdangertime === "true" ? "animate__animated animate__heartBeat" : ""}
    >
      TIMER
      <Time isdangertime={isdangertime}>{time}</Time>
    </TimerContainer>
  );
}

export default Timer;
