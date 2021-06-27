import LocalStorageService from './localstorageService'
import jwt_decode from "jwt-decode";

export const USUARIO_LOGADO = '_usuario_logado'
export const TOKEN_KEY = "@airbnb-Token";

export default class AuthService {

    static isUsuarioAutenticado(){
        const usuario = LocalStorageService.obterItem(USUARIO_LOGADO)
        return usuario && usuario.id;
    }

    static removerUsuarioAutenticado(){
        LocalStorageService.removerItem(USUARIO_LOGADO)
    }

    static logar(usuario){
        LocalStorageService.adicionarItem(USUARIO_LOGADO, jwt_decode(usuario));
        LocalStorageService.adicionarItem(TOKEN_KEY, usuario);
    }

    static obterUsuarioAutenticado(){
        return LocalStorageService.obterItem(USUARIO_LOGADO);
    }

    //Novos JWT

    static isAuthenticated (){ 
        return localStorage.getItem(TOKEN_KEY) !== null;
    }
    static getToken (){ 
        const token = localStorage.getItem(TOKEN_KEY);
        return token && JSON.parse(token);
    }
    static login (token){ 
        localStorage.setItem(TOKEN_KEY, token);
    };
    
    static logout = () => {
        localStorage.removeItem(TOKEN_KEY);
    };


}