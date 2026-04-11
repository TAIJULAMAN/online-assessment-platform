import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BehavioralEvent {
  type: 'tab-switch' | 'fullscreen-exit';
  timestamp: string;
}

interface ExamSession {
  testId: string;
  startTime: string;
  timeLeft: number; // in seconds
  answers: Record<string, string | string[]>; // questionId -> answer
  behavioralLogs: BehavioralEvent[];
  isSubmitted: boolean;
}

interface ExamState {
  currentSession: ExamSession | null;
  isActive: boolean;
}

const initialState: ExamState = {
  currentSession: null,
  isActive: false,
};

const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    startExam: (state, action: PayloadAction<{ testId: string; duration: number }>) => {
      state.currentSession = {
        testId: action.payload.testId,
        startTime: new Date().toISOString(),
        timeLeft: action.payload.duration * 60,
        answers: {},
        behavioralLogs: [],
        isSubmitted: false,
      };
      state.isActive = true;
      if (typeof window !== 'undefined') {
        localStorage.setItem('exam_state', JSON.stringify(state));
      }
    },
    tick: (state) => {
      if (state.currentSession && state.currentSession.timeLeft > 0) {
        state.currentSession.timeLeft -= 1;
        if (typeof window !== 'undefined' && state.currentSession.timeLeft % 5 === 0) {
          localStorage.setItem('exam_state', JSON.stringify(state));
        }
      }
    },
    updateAnswer: (state, action: PayloadAction<{ questionId: string; answer: string | string[] }>) => {
      if (state.currentSession) {
        state.currentSession.answers[action.payload.questionId] = action.payload.answer;
        if (typeof window !== 'undefined') {
          localStorage.setItem('exam_state', JSON.stringify(state));
        }
      }
    },
    logBehavior: (state, action: PayloadAction<BehavioralEvent>) => {
      if (state.currentSession) {
        state.currentSession.behavioralLogs.push(action.payload);
        if (typeof window !== 'undefined') {
          localStorage.setItem('exam_state', JSON.stringify(state));
        }
      }
    },
    submitExam: (state) => {
      if (state.currentSession) {
        state.currentSession.isSubmitted = true;
      }
      state.isActive = false;
      if (typeof window !== 'undefined') {
        localStorage.setItem('exam_state', JSON.stringify(state));
      }
    },
    resetExam: (state) => {
      state.currentSession = null;
      state.isActive = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('exam_state');
      }
    },
    rehydrateExam: (state, action: PayloadAction<ExamState>) => {
      return action.payload;
    },
  },
});

export const { startExam, tick, updateAnswer, logBehavior, submitExam, resetExam, rehydrateExam } = examSlice.actions;
export default examSlice.reducer;
