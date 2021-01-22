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
    
    GetMyData: function(){
        var method = this.HTTP_METHOD_POST;
        var url = this.API_URL + '/usuarios/me';
    
        return this.SendRequest(method, url);
    },

    GetUsersData: function(){
        var method = this.HTTP_METHOD_POST;
        var url = this.API_URL + '/usuarios/';

        return this.SendRequest(method, url);
    },
    
    LogoutUser: function(){
        var method = this.HTTP_METHOD_GET;
        var url = this.API_URL + '/usuarios/logout';
    
        return this.SendRequest(method, url);
    },
    
    GetColorsData: function(){
        var method = this.HTTP_METHOD_GET;
        var url = this.API_URL + '/colores/';

        return this.SendRequest(method, url);
    },

    AddColor: function(color){
        var method = this.HTTP_METHOD_POST;
        var url = this.API_URL + '/colores';
        var data = {nombre: color};

        return this.SendRequest(method, url, data);
    },

    RemoveColor: function(id){
        var method = this.HTTP_METHOD_DELETE;
        var url = this.API_URL + '/colores/eliminar';
        var data = { id: id }

        return this.SendRequest(method, url, data);
    }
}

export default AxiosService;