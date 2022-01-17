import React from 'react'
import '../App.css'

export default function CurrentResponse(props) {
    
    const copyToClip = ()=>{
        const text = "http://localhost:3000/"+props.shortURL;

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
        <div className='glass'>
            <div className="row resp">
                <div className="col-7"><p>{props.longURL}</p></div>
                <div className="col-3"><p>localhost:3000/{props.shortURL}</p></div>
                <button className='btn btn-danger col-2' style={{"line-height": "0"}} onClick={copyToClip}>copy</button>
            </div>
        </div>
    )
}
