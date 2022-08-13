
import './App.css';

//Router
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

//Hook
import { useAuth } from './hooks/useAuth';

//components
import Navbar from "./components/Navbar"
import Footer from './components/Footer';

//pages
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import EditProfile from "./pages/EditProfile/EditProfile";
import Profile from './pages/Profile/Profile';


function App() {
  const { auth, loading} = useAuth();

  console.log(loading)

  if(loading){
    return<p>Carregando</p>
  }


  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
       <div className="container">
       <Routes>
          <Route path="/" element={auth ? <Home /> : <Navigate to="/login" />}/>
          <Route path="/profile" element={auth ? <EditProfile /> : <Navigate to="/login" />}/>
          <Route path="/users/:id" element={auth ? <Profile /> : <Navigate to="/login" />}/>
          {/*Rotas não autenticados abaixo */}
          <Route path="/login" element={!auth ? <Login /> : <Navigate to="/login" />}/>
          <Route path="/register" element={!auth ? <Register /> : <Navigate to="/home" />}/>
        </Routes>
       </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
