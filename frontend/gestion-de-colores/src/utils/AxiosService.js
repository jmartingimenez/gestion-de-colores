import axios from 'axios';

//Parámetros en orden utiles para Axios (url, data, headers)
class AxiosService{
    static API_URL = process.env.REACT_APP_API_URL;
    static HTTP_OK = 200;
    static HTTP_BAD_REQUEST = 400;
    static HTTP_FORBIDDEN = 403;
    static HTTP_NOT_FOUND = 404;
}

AxiosService.LoginUser = async function(username, password){
    return await axios.post(this.API_URL + '/usuarios/login', 
    { 
        username: username, 
        password: password 
    },
    {
        withCredentials: true
    })
    .then(res => {
        var respuesta = {
            esValido: true,
            status: res.status,
            mensaje: res.data
        };

        return respuesta;
    })
    .catch(err => {  
        var respuesta = {
            esValido: false,
            status: err.response.status,
            mensaje: err.response.data
        };
        
        return respuesta;
    });  
}

export default AxiosService;