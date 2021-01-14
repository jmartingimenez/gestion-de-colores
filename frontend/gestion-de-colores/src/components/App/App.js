import './App.css';

//Imports agregados
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Index from './../../utils/index';
import Header from './../Header/Header';
import Main from './../Main/Main';
import Footer from './../Footer/Footer';
import { useEffect } from 'react';



export default function App() {

  //Segundo argumento es callback para la condición de que se vuelva a ejecutar (en este caso nunca)
  useEffect(() => {
    document.body.style = 'background: #cbccf7;';
  }, []);

  return (
    <div className="App">
      <div className="contenedor-componentes">
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
}