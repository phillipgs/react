import ApiService from '../apiservice'

class JwtService extends ApiService {

    constructor(){
        super('')
    }

    autenticar(credenciais){
        return this.post('/authenticate', credenciais)
    }
}

export default JwtService;