import { createContext } from "react";

const CurrentUserContext = createContext({
  currentUser: {},
  handleUpdateAvatar: () => {},
  handleUpdateUser: () => {},
});

export default CurrentUserContext;
