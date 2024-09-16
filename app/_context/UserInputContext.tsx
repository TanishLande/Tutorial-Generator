import { createContext, Dispatch, SetStateAction } from 'react';

// Define the context type
interface UserInputContextType {
  userTutorialInput: string;
  setUserTutorialInput: Dispatch<SetStateAction<string>>;
}

// Provide a default value for the context
export const UserInputContext = createContext<UserInputContextType>({
  userTutorialInput: "",
  setUserTutorialInput: () => {}
});
