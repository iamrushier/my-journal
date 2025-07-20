import React from "react";
import { createContext, ReactNode, useContext, useReducer } from "react";
import { JournalEntry } from "../types";

// State
type JournalState = {
  entriesList: JournalEntry[];
  currentEntry?: JournalEntry;
};

// Actions
type JournalAction =
  | { type: "SET_ENTRIES"; payload: JournalEntry[] }
  | { type: "ADD_ENTRY"; payload: JournalEntry }
  | { type: "UPDATE_ENTRY"; payload: JournalEntry }
  | { type: "DELETE_ENTRY"; payload: string } // payload is entry id
  | { type: "SET_CURRENT_ENTRY"; payload?: JournalEntry };

// Reducer
const reducer = (state: JournalState, action: JournalAction): JournalState => {
  switch (action.type) {
    case "SET_ENTRIES":
      return { ...state, entriesList: action.payload };
    case "ADD_ENTRY":
      return { ...state, entriesList: [...state.entriesList, action.payload] };
    case "UPDATE_ENTRY":
      return {
        ...state,
        entriesList: state.entriesList.map((entry) =>
          entry.id === action.payload.id ? action.payload : entry
        ),
      };
    case "DELETE_ENTRY":
      return {
        ...state,
        entriesList: state.entriesList.filter(
          (entry) => entry.id !== action.payload
        ),
      };
    case "SET_CURRENT_ENTRY":
      return { ...state, currentEntry: action.payload };
    default:
      return state;
  }
};

// Context
type JournalEntriesContextType = {
  state: JournalState;
  dispatch: React.Dispatch<JournalAction>;
};

const JournalEntriesContext = createContext<
  JournalEntriesContextType | undefined
>(undefined);

// Provider
export const JournalEntriesContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, {
    entriesList: [],
    currentEntry: undefined,
  });

  return (
    <JournalEntriesContext.Provider value={{ state, dispatch }}>
      {children}
    </JournalEntriesContext.Provider>
  );
};

// Custom Hook
export const useJournalEntries = () => {
  const context = useContext(JournalEntriesContext);
  if (!context) {
    throw new Error(
      "useJournalEntries must be used within a JournalEntriesContextProvider"
    );
  }
  return context;
};
