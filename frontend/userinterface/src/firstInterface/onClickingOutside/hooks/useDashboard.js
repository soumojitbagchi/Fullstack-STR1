import { useContext } from "react";
import { DashboardContext} from "../dashboard.context";

export const useAuth =()=>{
    const context = useContext(DashboardContext)
    if(!context){
        console.log("create a context first ")
    }

    return context
}