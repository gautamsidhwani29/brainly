import { useContext } from "react";
import { ContentContext } from "../context/ContentContext";
const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be called inside of the Content Provider");
  }
  return context;
};

export default useContent;
