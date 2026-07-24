import { createContext ,useState} from "react";

export const SearchFunctionalContext= createContext()
export const SearchFunctionalProvider= ({children})=>{
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)

    return (
        <SearchFunctionalContext.Provider value={{product,setProduct , loading, setLoading}}>
            {children}
        </SearchFunctionalContext.Provider>
    )
}