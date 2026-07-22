import { createContext ,useState} from "react";

export const searchFunctionalContext= createContext()
export const searchFunctionalProvider= ({children})=>{
    const [product, setProduct] = useState([])

    return (
        <searchFunctionalContext.Provider value={product,setProduct}>
            {{children}}
        </searchFunctionalContext.Provider>
    )
}