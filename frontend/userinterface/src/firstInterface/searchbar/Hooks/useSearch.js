import { useContext } from "react";
import { SearchFunctionalContext } from "../search.context";
import { searchResult ,filterByCatagory , catagoryList} from "../service/searchResult.api";
/**
 * @use we use usecontext when we dont want to insert uneccesary prop into files , we can use the specific we want . for details check auth.context.js
 * @description we can say we need to pass the data from the authprovider so we ise the createContext there and we make use context here, 
 * @role this file we make because we dont want that our every file to intervine with that file so we made seperate one
 */

export  const useSearch =()=>{
    const context = useContext(SearchFunctionalContext)
    const {product , setProduct, loading , setLoading} = context
    const searchResultHandler = async ({name})=>{
        setLoading(true)
        try {
            const response = await searchResult({name})
            setProduct(response)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    const searchResultbyCaragoryHandler = async ({catagory})=>{
        setLoading(true)
        try {
            const response = await filterByCatagory({catagory})
            setProduct(response)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    const catagoriesHandeler= async()=>{
        try{
            const response =await catagoryList()
            return response
        }catch(error){
            console.log(error)
        }
    }
    return({
        loading,product , catagoriesHandeler,searchResultHandler,searchResultbyCaragoryHandler
    })
}