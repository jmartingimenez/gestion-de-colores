import axios from 'axios';

const AxiosService = {
    API_URL: process.env.REACT_APP_API_URL,
    HTTP_METHOD_GET: 'GET',
    HTTP_METHOD_POST: 'POST',
    HTTP_METHOD_PUT: 'PUT',
    HTTP_METHOD_DELETE: 'DELETE',

    SendRequest: function(method, url, data){
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
    },

    LoginUser: function(username, password){
        var method = this.HTTP_METHOD_POST;
        var url = this.API_URL + '/usuarios/login';
        var data = {
            username: username,
            password: password
        }
    
        return this.SendRequest(method, url, data);
    },
    
    AddUser: function(username, password, nombre, apellido, edad){
        var method = this.HTTP_METHOD_POST;
        var url = this.API_URL + '/usuarios/add';
        var data = {
            username: username,
            password: password,
            nombre: nombre,
            apellido: apellido,
            edad: edad
        }
    
        return this.SendRequest(method, url, data);
    },
    
    GetUserData: function(){
        var method = this.HTTP_METHOD_POST;
        var url = this.API_URL + '/usuarios/me';
    
        return this.SendRequest(method, url);
    },
    
    LogoutUser: function(){
        var method = this.HTTP_METHOD_GET;
        var url = this.API_URL + '/usuarios/logout';
    
        return this.SendRequest(method, url);
    }    
}

export default AxiosService;