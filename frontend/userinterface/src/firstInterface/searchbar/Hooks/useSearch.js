import { useContext } from "react";
import { searchFunctionalContext } from "../search.context";
import { searchResult } from "../service/searchResult.api";
import { useAuth } from "../../../hooks/useAuth";
/**
 * @use we use usecontext when we dont want to insert uneccesary prop into files , we can use the specific we want . for details check auth.context.js
 * @description we can say we need to pass the data from the authprovider so we ise the createContext there and we make use context here, 
 * @role this file we make because we dont want that our every file to intervine with that file so we made seperate one
 */

export  const useSearch =()=>{
    const context = useContext(searchFunctionalContext)
    const {product , setProduct} = context()
    const {loading,setLoading} = useAuth()
    const searchResultHandel =({name})=>{
        setLoading(true)
        try {
            const response = await searchResult({name})
            return response
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    return{
        searchFunctionalContext
    }
}