import { useState } from "react";

export function useRequiered(){
    const [isSubmit, setIsSubmit] = useState(false);

    function handleButtonClick (isSubmit) {
        setIsSubmit(isSubmit);
    };

    return {isSubmit, setIsSubmit, handleButtonClick};
}
