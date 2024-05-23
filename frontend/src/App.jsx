import { BrowserRouter ,Routes,Route} from "react-router-dom";

import { Login } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-black'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
        </div>
        <div className='relative z-0'>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/signin" element={<Login/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;