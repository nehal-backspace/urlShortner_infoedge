import React , {useState , useEffect}   from 'react'
import { useNavigate } from "react-router-dom";
import MyAppServices from '../Services/MyAppServices';
import CurrentResponse from './CurrentResponse';


export default function AllLinks() {
    
    const [longURL, setlongURL] = useState("");
    const [All_links , setAll_Links] = useState([]);
    const [currentObj , setCurrentObj] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        MyAppServices.getAllLinks().then((resp) =>{
            setAll_Links(resp.data);
        })
      },[] );

    const isValidURL = (url) => {
        const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        const result = url.match(urlRegex);
        return result !== null;
    }

    const handleChange = (e) => {
        setlongURL(e.target.value);
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();
       
        if (isValidURL(longURL)) {
            
            let linkObj={
                longURL : longURL,
                expiryDate : null,
                countsClicked : 0,
                lastClickedDate : null,
            };

            MyAppServices.saveLink(linkObj).then((res) =>{
                setCurrentObj(res.data);
            })
        }
        else {
            alert("invalid URL")
        }
    }

    const customBtnClicked = () =>{
        navigate("/saveCustomLink");
    }


    const copyToClip = (shortURL)=>{
        const text = "http://localhost:3000/"+shortURL;
    
        if (window.clipboardData && window.clipboardData.setData) {
            // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
            return window.clipboardData.setData("Text", text);
    
        }
        else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
            var textarea = document.createElement("textarea");
            textarea.textContent = text;
            textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
            document.body.appendChild(textarea);
            textarea.select();
            try {
                return document.execCommand("copy");  // Security exception may be thrown by some browsers.
            }
            catch (ex) {
                console.warn("Copy to clipboard failed.", ex);
                return prompt("Copy to clipboard: Ctrl+C, Enter", text);
            }
            finally {
                document.body.removeChild(textarea);
            }
        }
    }
    
    return (
            <div className='containt text-center bucket'>
                <h1>Hey Stranger !!</h1>
                <br/>
                <h4>Paste the long URL below :</h4>
                <div className='row'>
                    <form action=''>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Your Long URL"
                            aria-describedby="button-addon2" onChange={handleChange} value={longURL} />
                            <button className="btn btn-warning" type="submit" id="button-addon2" onClick={handleSubmit}>
                            <strong>Short it !</strong>
                            </button>
                        </div>
                    </form>
                </div >


                <br/><br/>
                {currentObj ? 
                <CurrentResponse longURL={currentObj.longURL} shortURL={currentObj.shortURL}/>
                : null}
                <br/><br/>


                <div className='row '>
                    <button className="btn btn-info custom " onClick={customBtnClicked}><strong>Make Your Own Custom Short URL</strong></button>
                </div >
                <br/><br/>


                <h2 className="text-center">All Available Links</h2>
                <hr />
                <div className="row">
                    <table class="table table-striped table-bordered" >
                    <thead>
                        <tr>
                        <th>Long URL</th>
                        <th>Short URL</th>
                        <th>Actions</th>
                        <th>Clicks count</th>
                        <th>Last Clicked</th>
                        </tr>
                    </thead>
                    <tbody>
                        {All_links.map((AllLinkObj) =>
                        <tr key={AllLinkObj.shortURL}>
                            <td><small>{AllLinkObj.longURL}</small></td>
                            <td>http://localhost:3000/{AllLinkObj.shortURL}</td>
                            <td>
                                <button className='btn btn-info' onClick={() =>copyToClip(AllLinkObj.shortURL)}>copy </button> 
                            </td> 
                            <td>{AllLinkObj.countsClicked}</td>
                            <td>{AllLinkObj.lastClickedDate}</td>
                        </tr>
                        )}
                    </tbody>
                    </table>
                </div>
            </div>
        
    );
}
