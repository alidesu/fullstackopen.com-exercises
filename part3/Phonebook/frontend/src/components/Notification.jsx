import { useEffect, useState } from "react";

const Notification = ({ message }) => {
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
  
      return () => {
        clearTimeout(timer);
      };
    }, [message]);
  
    return isVisible ? (
      <div
        style={{
          color: "green",
          background: "lightgrey",
          fontSize: "21px",
          fontWeight: "400",
          border: "5px solid",
          borderRadius: "10px",
          paddingLeft: "10px",
          marginBottom: "10px",
        }}
      >
        <p>{message}</p>
      </div>
    ) : null;
  };

  export default Notification