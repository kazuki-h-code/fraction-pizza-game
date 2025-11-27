// stateの型
export type GameState = {
  selectedSlices: boolean[];
  currentQuestion: {
    numerator: number;
    denominator: number;
  };
  history: {
    numerator: number;
    denominator: number;
    result: "pending" | "correct" | "wrong";
  }[];
  judgement: "pending" | "correct" | "wrong";
};

// actionの型
export type GameAction =
  | { type: "toggle_slice"; payload: number }
  | { type: "set_denominator"; payload: number }
  | { type: "reset" }
  | { type: "check_answer" }
  | { type: "set_question" };

// 初期状態
const firstQuestion = generateQuestion();
export const initialState: GameState = {
  selectedSlices: [false],
  currentQuestion: firstQuestion,
  history: [{ ...firstQuestion, result: "pending" }],
  judgement: "pending",
};

function generateQuestion() {
  const denominator = Math.floor(Math.random() * 9) + 2;
  const numerator = Math.floor(Math.random() * denominator) + 1;
  return { numerator, denominator };
}

// reducer関数
export function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "toggle_slice": {
      const idx = action.payload;
      if (idx < 0 || idx > state.selectedSlices.length) {
        return state;
      }
      const newSelectedSlices = [...state.selectedSlices];
      newSelectedSlices[action.payload] = !newSelectedSlices[action.payload];
      return { ...state, selectedSlices: newSelectedSlices };
    }
    case "set_denominator": {
      return { ...state, selectedSlices: Array(action.payload).fill(false) };
    }
    case "reset": {
      return { ...state, selectedSlices: [false] };
    }
    case "check_answer": {
      const selectedCount = state.selectedSlices.filter(Boolean).length;
      const isCorrect =
        selectedCount === state.currentQuestion.numerator &&
        state.selectedSlices.length === state.currentQuestion.denominator;

      const result: "correct" | "wrong" = isCorrect ? "correct" : "wrong";

      const updatedHistory = [...state.history];
      updatedHistory[updatedHistory.length - 1] = {
        ...updatedHistory[updatedHistory.length - 1],
        result: result,
      };

      return {
        ...state,
        history: updatedHistory,
        judgement: result,
      };
    }
    case "set_question": {
      const newQuestion = generateQuestion();

      return {
        ...state,
        selectedSlices: [false],
        currentQuestion: newQuestion,
        history: [
          ...state.history,
          {
            ...newQuestion,
            result: "pending",
          },
        ],
        judgement: "pending",
      };
    }
    default:
      throw new Error("Unkown action type");
  }
}
