import { useState } from "react";

export function usePassword(){
    const [isVisible, setIsVisible] = useState(false);
    const [password, setPassword] = useState("password");
    const [eye, setEye] = useState("../eye-close.png");

    function handlePasswordClick (isVisible) {
        if (isVisible){
          setPassword("text");
          setEye("../eye-open.png");
          setIsVisible(isVisible);
        } else {
          setPassword("password");
          setEye("../eye-close.png");
          setIsVisible(isVisible);
        }
      };

    return {isVisible, password, eye, handlePasswordClick};
}
