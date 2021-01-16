import axios from 'axios';

class AxiosService{
    static API_URL = process.env.REACT_APP_API_URL;
    static HTTP_METHOD_GET = 'GET';
    static HTTP_METHOD_POST = 'POST';
    static HTTP_METHOD_PUT = 'PUT';
    static HTTP_METHOD_DELETE = 'DELETE';
}

AxiosService.SendRequest = function (method, url, data){
    //Previniendo respuestas cacheadas
    url = url + '?timestamp=' + new Date().getTime();

    return axios({
        method: method, 
        url: url, 
        data: data,
        withCredentials: true
    }).then(res => {
        var respuesta = {
            esValido: true,
            status: res.status,
            mensaje: res.data
        };

        return respuesta;
    }).catch(err => {
        var respuesta = {
            esValido: false,
            status: err.response.status,
            mensaje: err.response.data
        };
        
        return respuesta;
    });
}

AxiosService.LoginUser = function(username, password){
    var method = this.HTTP_METHOD_POST;
    var url = this.API_URL + '/usuarios/login';
    var data = {
        username: username,
        password: password
    }

    return AxiosService.SendRequest(method, url, data);
}

AxiosService.AddUser = function(username, password, nombre, apellido, edad){
    var method = this.HTTP_METHOD_POST;
    var url = this.API_URL + '/usuarios/add';
    var data = {
        username: username,
        password: password,
        nombre: nombre,
        apellido: apellido,
        edad: edad
    }

    return AxiosService.SendRequest(method, url, data);
}

AxiosService.GetUserData = function(){
    var method = this.HTTP_METHOD_POST;
    var url = this.API_URL + '/usuarios/me';

    return AxiosService.SendRequest(method, url);
}

AxiosService.LogoutUser = function(){
    var method = this.HTTP_METHOD_GET;
    var url = this.API_URL + '/usuarios/logout';

    return AxiosService.SendRequest(method, url);
}

export default AxiosService;