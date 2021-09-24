import React from "react";
import SearchBox from "./components/searchBox"
import "./components/style.css"
import { QueryClientProvider, QueryClient } from "react-query";

const App = () =>{

    const queryClient = new QueryClient();

        return ( 
            <QueryClientProvider client={queryClient}>
                
                    <SearchBox 
                    />
                
            </QueryClientProvider>
         );
    }

 
export default App;