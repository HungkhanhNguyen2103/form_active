import {
  HashRouter,
   Route, Routes
} from "react-router-dom";
import { ConfirmEmail } from "./component/ConfirmEmail";
import Home from "./component/Home";
import { cookieFilter } from "./helper";

function App() {

  // const token = word[1]
  // const word = window.location.href.split('?jwt=')
  const token = cookieFilter()

  const PATH = {
    email_confirm : 'email_confirm',
    home : '/',
    confirm_success : 'success'
  }
  
  // console.log(field);

  return (
    <HashRouter>
    <div className="App"> 
        <Routes>
            <Route path={PATH.home} element={<Home/>}/>
      {
        token !== undefined ? (
          <Route path={PATH.email_confirm}  element={<ConfirmEmail/>}/>
        ) : (
          <Route path={PATH.home} element={<Home/>}/>
        )
      }
            
          <Route path={PATH.confirm_success} element={<Home/>}/>

        </Routes>
    </div>
    </HashRouter>
  );
}

export default App;
