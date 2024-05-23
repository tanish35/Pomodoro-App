import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Layout from './components/Layout/Layout';
// import BoardPage from './pages/Board/Board';
import Calendar from './pages/Calendar/Calendar';
import Dashboard from './pages/Dashboard/Dashboard';
import DataGrid from './pages/DataGrid/DataGrid';
import { Login } from "./components";



const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
        </div>
        <div className='relative z-0'>
        
      <Routes>
        {/* <Route path="/" element={<Login/>}/> */}
        <Route path="/signin" element={<Login/>}/>

        <Route path="/" element={<MainLayout/>}>

          <Route path="dashboard" element={<Dashboard/>}/>
          {/* <Route path="calendar" element={<Calendar/>}/> */}
          {/* <Route path="board" element={<BoardPage/>}/> */}
          {/* <Route path="users" element={<DataGrid/>}/> */}
          
        </Route>

      </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
  return (
    <>

    <BrowserRouter>
      <Routes>
   
        <Route path="/signin" element={<Login/>}/>
        

        <Route path="/"  element={<MainLayout />}>

          <Route path="dashboard" element={<Dashboard/>}/>
          {/* <Route path="calendar" element={<Calendar/>}/> */}
          {/* <Route path="users" element={<DataGrid/>}/> */}
          
        </Route>
      
  

      </Routes>
    </BrowserRouter>
    </>
  )
}

function MainLayout() {
  return (
    <div id="dashboard">
      <Layout />
    </div>
  );
}

export default App;