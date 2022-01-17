import './App.css';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import AllLinks from './Components/AllLinks';
import CustomLink from './Components/CustomLink';
import MyAppServices from './Services/MyAppServices';
import Error404 from './Components/Error404';


const getPath = () => {
  
  const route = window.location.pathname;
  switch (route) {
    case "/":
    console.log("Home Page"); break;
    case "/all-links":
      console.log("Home Page"); break;
    case "/saveCustomLink":
      console.log("Custom Add Page"); break;
    case "/error":
      console.log("Custom ERROR Page"); break;
    default:
      {
        //call axios here
        MyAppServices.getMylink(route).then((res)=>{
          
          if(res.data.longURL === "error")
          {
            window.location.replace("http://localhost:3000/error");
          }
          else{
            window.location.replace(res.data.longURL);
          }
        })
      }
  }
}
      

function App() {
  
  getPath();
  return (
    <Router>
      <div className='container'>
        <Routes>
          <Route path="/" element={<AllLinks/>}></Route>
          <Route path="/all-links" element={<AllLinks/>}></Route>
          <Route path="/saveCustomLink" element={<CustomLink/>}></Route>
          <Route path="/error" element={<Error404/>}></Route>
        </Routes>
      </div>
      </Router >
  );
}

export default App;
