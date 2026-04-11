import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type QuestionType = 'MCQ' | 'Checkbox' | 'Text';

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  title: string;
  type: QuestionType;
  score: number;
  options: QuestionOption[];
}

export interface OnlineTest {
  id: string;
  title: string;
  totalCandidates: number;
  totalSlots: number;
  questionSets: number;
  questionType: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  questions: Question[];
  createdAt: string;
}

interface TestState {
  tests: OnlineTest[];
  currentTestDraft: OnlineTest | null;
  loading: boolean;
}

const initialState: TestState = {
  tests: [],
  currentTestDraft: null,
  loading: false,
};

const testSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: {
    setTests: (state, action: PayloadAction<OnlineTest[]>) => {
      state.tests = action.payload;
    },
    addTest: (state, action: PayloadAction<OnlineTest>) => {
      state.tests.push(action.payload);
    },
    updateTest: (state, action: PayloadAction<OnlineTest>) => {
      const index = state.tests.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.tests[index] = action.payload;
      }
    },
    deleteTest: (state, action: PayloadAction<string>) => {
      state.tests = state.tests.filter(t => t.id !== action.payload);
    },
    setDraft: (state, action: PayloadAction<OnlineTest | null>) => {
      state.currentTestDraft = action.payload;
    },
  },
});

export const { setTests, addTest, updateTest, deleteTest, setDraft } = testSlice.actions;
export default testSlice.reducer;
