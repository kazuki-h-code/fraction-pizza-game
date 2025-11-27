import { useReducer } from "react";
import { reducer, initialState } from "../../states/gameReducer";
import { Pizza } from "../game/Pizza";
import { Button } from "../ui/Button";
import { QuestionDisplay } from "../ui/QuestionDisplay";
import { FeedbackDisplay } from "../ui/FeedbackDisplay";
import { TextStyle } from "pixi.js";
import { useLayout } from "../../contexts/layoutContext";
import { ResizeContainer } from "../core/ResizeContainer";
import { HowToOverlay } from "../ui/HowToOverlay";

const MAX_QUESTIONS = 5;

export const GameScene = ({ onEndGame }: { onEndGame: () => void }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { virtual, isPortrait } = useLayout();

  const playerDenominator = state.selectedSlices.length;

  const handleSliceClick = (index: number) => {
    dispatch({ type: "toggle_slice", payload: index });
  };

  const handleIncreaseDenominator = () => {
    if (playerDenominator < 10) {
      dispatch({ type: "set_denominator", payload: playerDenominator + 1 });
    }
  };

  const handleDecreaseDenominator = () => {
    if (playerDenominator > 1) {
      dispatch({ type: "set_denominator", payload: playerDenominator - 1 });
    }
  };

  const handleReset = () => {
    dispatch({ type: "reset" });
  };

  const handleCheckAnswer = () => {
    dispatch({ type: "check_answer" });
  };

  const handleNextQuestion = () => {
    if (state.history.length + 1 > MAX_QUESTIONS) {
      onEndGame();
    } else {
      dispatch({ type: "set_question" });
    }
  };

  return (
    <>
      <ResizeContainer
        virtualWidth={virtual.width}
        virtualHeight={virtual.height}
      >
        <pixiText
          text={`${state.history.length} もんめ / ぜんぶで ${MAX_QUESTIONS} もん`}
          x={virtual.width * 0.5}
          y={isPortrait ? virtual.height * 0.15 : virtual.height * 0.05}
          anchor={0.5}
          style={new TextStyle({ fontSize: 20, fill: "white" })}
        />
        <QuestionDisplay
          x={virtual.width * 0.5}
          y={isPortrait ? virtual.height * 0.25 : virtual.height * 0.2}
          numerator={state.currentQuestion.numerator}
          denominator={state.currentQuestion.denominator}
        />
        <Pizza
          selectedSlices={state.selectedSlices}
          onSliceClick={handleSliceClick}
          radius={isPortrait ? 180 : 150}
          x={virtual.width * 0.5}
          y={virtual.height * 0.55}
        />
        <Button
          text="やりなおす"
          x={isPortrait ? virtual.width * 0.15 : virtual.width * 0.85}
          y={isPortrait ? virtual.height * 0.8 : virtual.height * 0.4}
          onClick={handleReset}
        />
        <Button
          text="切る"
          x={isPortrait ? virtual.width * 0.5 : virtual.width * 0.85}
          y={isPortrait ? virtual.height * 0.8 : virtual.height * 0.55}
          onClick={handleIncreaseDenominator}
        />
        <Button
          text="もどす"
          x={isPortrait ? virtual.width * 0.85 : virtual.width * 0.85}
          y={isPortrait ? virtual.height * 0.8 : virtual.height * 0.7}
          onClick={handleDecreaseDenominator}
        />
        <Button
          text="おわる"
          x={virtual.width * 0.1}
          y={virtual.height * 0.05}
          onClick={onEndGame}
          width={100}
        />
        {state.judgement === "pending" && (
          <Button
            text="これでどうだ！"
            x={virtual.width * 0.5}
            y={virtual.height * 0.9}
            onClick={handleCheckAnswer}
            width={200}
          />
        )}
      </ResizeContainer>
      <HowToOverlay />
      {state.judgement !== "pending" && (
        <FeedbackDisplay
          status={state.judgement}
          history={state.history}
          maxQuestion={MAX_QUESTIONS}
          virtualWidth={virtual.width}
          virtualHeight={virtual.height}
          onNextQuestion={handleNextQuestion}
        />
      )}
    </>
  );
};
