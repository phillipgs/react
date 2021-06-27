import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'

import JwtService from '../app/service/jwtService'
import LocalStorageService from '../app/service/localstorageService'
import { mensagemErro } from '../components/toastr'
import { AuthContext  } from '../main/provedorAutenticacao'
import jwt_decode from "jwt-decode";

class Login extends React.Component{

    state = {
        username: '',
        password: ''
    }

    constructor(){
        super();
        this.service = new JwtService();
    }

    entrar = () => {
        this.service.autenticar({
            username: this.state.username,
            password: this.state.password
        }).then( response => {
            console.log(response.data);
            console.log(jwt_decode(response.data.token));            
            this.context.iniciarSessao(response.data.token);
            this.props.history.push('/home');
        }).catch( erro => {
           mensagemErro(erro.response.data)
        })
    }

    prepareCadastrar = () => {
        this.props.history.push('/cadastro-usuarios')
    }

    render(){
        return (

            <div className="row">
                <div className="col-md-6" style={ {position : 'relative', left: '300px'} }>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Username: *" htmlFor="exampleInputEmail1">
                                                <input type="text" 
                                                    value={this.state.username}
                                                    onChange={e => this.setState({username: e.target.value})}
                                                    className="form-control" 
                                                    id="usernameInputEmail1" 
                                                    placeholder="Digite o Username" />
                                            </FormGroup>
                                            <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                                <input type="password" 
                                                        value={this.state.password}
                                                        onChange={e => this.setState({password: e.target.value})}
                                                        className="form-control" 
                                                        id="exampleInputPassword1" 
                                                        placeholder="Password" />
                                            </FormGroup>
                                            <button onClick={this.entrar} className="btn btn-success">
                                                <i className="pi pi-sign-in"></i>Entrar</button>
                                            <button onClick={this.prepareCadastrar} 
                                                    className="btn btn-danger">
                                                    <i className="pi pi-plus"></i>  Cadastrar
                                            </button>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

        )
    }
}

Login.contextType = AuthContext

export default withRouter( Login )