import { Typography } from "@material-ui/core";
import './Footer.css';

export default function Footer(){
    return(
        <div className="footer-sitio">
            <Typography className="texto-footer">
                Sitio de ejemplo para aprender React hecho por Jonatan Gimenez
            </Typography>
        </div>
    );
}