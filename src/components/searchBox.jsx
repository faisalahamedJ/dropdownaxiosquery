import React, {useState, useEffect} from "react";
import axios from 'axios';
import {DownOutlined } from '@ant-design/icons';
import { useQuery } from "react-query";

 
const fetchdata = async ()=>{
    const data = await axios.get('https://api.instantwebtools.net/V1/passenger?page=0&size=15')
     return data.data.data;
 }

const SearchBox = () =>{
    
    const [text, setText] = useState("");
    const [searchText, setSearchText] = useState([]);
    const [selectedText, setSelectedText]  = useState([]);
    const [dropdownList, setDropDownList] = useState([]);
    const {data, status} = useQuery('search', fetchdata);

    
   useEffect(() =>{
       setDropDownList(data);

   },[data])
    

    const handleFocus = () =>{         
         document.querySelector(".dropdown").style.display = "block";
         const results =dropdownList.map(ele => {return ele});
         setSearchText(results);

}
    useEffect(()=>{
        
        const result = dropdownList.filter(element =>{            
            return element._id.includes(text)
        });    
        setSearchText(result);
    },[text])
    
    const handleChange = e =>{
        setText(e.target.value);
    }

    
    const handleSelect =(e) =>{
        if(selectedText.length){
            if(!selectedText.includes(e.target.value)){
                setSelectedText([...selectedText, e.target.value]);
                document.querySelector(".closeIcon").style.display = "block";
                setText("");
            }
            }
       
       else{
        setSelectedText([...selectedText, e.target.value,]);
        setText("");
       }
        
        
    }


    const handleDelete =(e) =>{
        const clickedValue = e.target.id;
        const result = selectedText.filter(ele =>{                
             if(ele !== clickedValue){
                 return ele;
             } 
             return false;         
        });
  
        setSelectedText(result);
    }


    const handleClearAll = () =>{
        setSelectedText([]);
        setText("");
        document.querySelector(".closeIcon").style.display = "none";

    }

    const toggleDropdown = () =>{
        const dropdown = document.querySelector(".dropdown");
        dropdown.style.display =dropdown.style.display === "block" ? "none" : "block";
        const results =dropdownList.map(ele => {return ele});
        setSearchText( results);
    }

    if(status === "loading"){
        return <span>loading</span>
    }
    if(status === "error"){
        return <span>Error on fetching data</span>
    }

    
    return(
        <div className="searchContainer">
            <div className="inputContainer">
                <div className="showSelect">
                    <div className="slectedTextContainer">
                        {selectedText.map(ele =>{
                                return(
                                    <div className="selectedText" key={ele}> 
                                    {ele}  <span  id={ele} onClick={e =>handleDelete(e)}>&#10006;</span> </div>
                                );
                        })}
                    </div>
                    <input
                    className="searchInput"
                    placeholder= "Search..."
                    value={[text]}
                    onChange = {e =>handleChange(e)}
                    onFocus = {handleFocus}
                    type="text"/>
                </div>

                <div className="icons">
                        <div 
                            className="closeIcon"
                            onClick={handleClearAll}
                        >   &#10006;
                        </div>
                    
                        <div><DownOutlined
                            onClick = {toggleDropdown}
                        /></div>
                </div>

            </div>
            
                        <div className="dropdown">
                {searchText.map(ele =>{
                    return(
                        <option
                            key={ele._id}
                            onClick = {(e) => handleSelect(e)} 
                            value = {ele._id}
                            className="dropdownItem"
                            >
                            {ele._id}
                        </option>
                    )
                })}
                
             </div>
        </div>
    );
}

export default SearchBox;