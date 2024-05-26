import { createContext, useState } from "react";
import runChat from "../gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState('')
    const [recentprompt, setRecentprompt] = useState('')
    const [prevprompt, setPrevprompt] = useState([])
    const [showresult, setShowresult] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resultdata, setResultdata] = useState('')
    const delaypara = (index, nextword) => {
        setTimeout(function () {
            setResultdata(prev => prev + nextword);

        }, 75 * index)

    }
    const newchat = () => {
        setLoading(false)
        setShowresult(false)

    }

    const onSent = async (prompt) => {
        setResultdata("")
        setLoading(true)
        setShowresult(true)
        let response;
        if (prompt !== undefined) {
            response = await runChat(prompt);
            setRecentprompt(prompt)
        }
        else {
            setPrevprompt(prev => [...prev, input])
            setRecentprompt(input)
            response = await runChat(input)
        }

        let responseArray = response.split("**");
        let newresponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newresponse += responseArray[i];

            }
            else {
                newresponse += "<b>" + responseArray[i] + "</b>";
            }
        }
        let newresponse2 = newresponse.split("*").join("</br>");
        let newresponseArray = newresponse2.split(" ");
        for (let i = 0; i < newresponseArray.length; i++) {
            const nextword = newresponseArray[i];
            delaypara(i, nextword + " ");
        }
        setLoading(false)
        setInput("")
    }



    const contextValue = {
        prevprompt,
        setPrevprompt,
        onSent,
        setRecentprompt,
        recentprompt,
        showresult,
        loading,
        resultdata,
        input,
        setInput,
        newchat


    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider 