import { AppBar, Toolbar, Typography } from "@material-ui/core";
import './Header.css';

export default function Header() {
  //Logo. Se toma el tamaño del H6, pero el componente es un H1 por tema de accesibilidad
  //Ver: https://medium.com/better-programming/building-a-basic-header-with-materialui-and-react-js-d650f75b4b0a
  const logoAplicacion = (
    <Typography variant="h6" component="h1">
      Gestor de colores
    </Typography>
  );

  const header = () => {
     return <Toolbar className="header">{logoAplicacion}</Toolbar>;
  };
    
  return (
    <header>
      <AppBar>{header()}</AppBar>
    </header>
  );
}