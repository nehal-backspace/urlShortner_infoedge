import React , {useState} from 'react'
import MyAppServices from '../Services/MyAppServices';
import CurrentResponse from './CurrentResponse';

export default function CustomLink() {

    const [longlink , setlonglink]=useState("");
    const [shortID , setshortID]=useState("");
    const [expDate , setexpDate]=useState("");
    const [currentObj , setCurrentObj] = useState(null);

    const isValidURL = (url) => {
        const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        const result = url.match(urlRegex);
        return result !== null;
    }

    const isValidShortId = (Id) =>{
        const Regex = /^[a-zA-Z0-9]+$/i
        const result = Id.match(Regex);
        return result !== null;
    }

    const formSubmit=(ev)=>
    {
        ev.preventDefault();
        if (isValidURL(longlink) && isValidShortId(shortID)) {
            
            let linkObj={
                longURL : longlink,
                shortURL : shortID,
                expiryDate : expDate,
                countsClicked : 0,
                lastClickedDate : null,
            };

            if(shortID === "" || shortID === "saveCustomLink" || shortID === "error")
            {
                alert("This short Id is not allowed");
                return;
            }

            MyAppServices.saveCustomLink(linkObj).then((res) =>{
                // console.log(res);
                if(res.data.longURL === "error")
                {
                    alert("Short Id already in use");
                }
                else{
                    setCurrentObj(res.data);
                }
                return;
            })
        }
        else {
            alert("invalid URL or short ID")
        }
    }

    return (
        <div>
            <h1 className='text-center'>Custom Link</h1>
            <hr/><br/>

            <div style={{"width":"80%" , "margin":"auto"}}>
                <form>
                <div className="mb-3">
                    <label for="longlink" class="form-label">Your Long URL</label>
                    <input type="text" class="form-control" id="longlink" placeholder="https://" onChange={(e) => setlonglink(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label for="shortID" class="form-label">Your short URL ID <small>(Alphanumeric only)</small></label>
                    <input id="shortID"type="text" class="form-control" placeholder="https://localhost:3000/ your short url ID" onChange={(e) => setshortID(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label for="shortID" class="form-label">Set expiry Date <small>(optional)</small></label>
                    <input type="date" class="form-control" onChange={(e) => setexpDate(e.target.value)}/>
                </div>
                <br/>
                <div className='mb-3 text-center' >
                    <button className='btn btn-warning' onClick={formSubmit} type='submit'>Save</button>
                </div>
                </form>
            </div>

            
            <br/><br/>
                {currentObj ? 
                <CurrentResponse longURL={currentObj.longURL} shortURL={currentObj.shortURL}/>
                : null}
            <br/><br/>
            
        </div>
    )
}
