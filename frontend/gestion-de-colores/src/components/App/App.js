import './App.css';

//Imports agregados
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Index from './../../utils/index';
import Header from './../Header/Header';
import Main from './../Main/Main';
import Colores from './../Colores/Colores';
import Footer from './../Footer/Footer';
import { useEffect, useContext } from 'react';
import AuthContext from './../../auth-context.js';
import PrivateRoute from '../Routes/PrivateRoute';
import PublicRoute from '../Routes/PublicRoute';

export default function App() {
  const usuarioContext = useContext(AuthContext);

  //Segundo argumento es callback para condición de ejecutarse si cambia el estado referido al contexto
  useEffect(() => {
    if(usuarioContext.loggedIn == true)
      document.body.style = 'background: white;';
    else
      document.body.style = 'background: #cbccf7;';  
  }, [usuarioContext.loggedIn]);

  return (
    <div className="App">
      <div className="contenedor-componentes">
        <Router>
          <Header />
          
          <Switch>
            <PublicRoute restricted={true} component={Main} path="/" exact />
            <PrivateRoute component={Colores} path="/colores" exact />
          </Switch>

          <Footer />
        </Router> 
      </div>
    </div>
  );
}