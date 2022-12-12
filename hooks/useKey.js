import { useEffect, useRef, useState } from "react";

const useKey = (key, cb) => {
    const callBackRef = useRef(cb);
    const [match, setMatch] = useState(false);
  
    useEffect(() => {
      function eventHandler(e) {
        if (e.code === key) {
          setMatch(true);
          callBackRef.current(e);
        } else {
          setMatch(false);
        }
      }
      document.addEventListener("keypress", eventHandler);
      return () => {
        document.removeEventListener("keypress", eventHandler);
      };
    }, [key]);
  
    return match;
  };

  export default useKey;