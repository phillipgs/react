package br.com.estudos.minhasfinancas.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.estudos.minhasfinancas.model.entity.Usuario;
import br.com.estudos.minhasfinancas.model.jwt.UserJwt;

@Service
public class JwtUserDetailsService implements UserDetailsService {
	
	@Autowired
	private UsuarioService service;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		try {
			Usuario usuarioAutenticado = service.obterPorNome(username);
			
			UserJwt userJwt = new UserJwt(usuarioAutenticado.getNome(), usuarioAutenticado.getSenha(),
					new ArrayList<>());
			
			userJwt.setId(usuarioAutenticado.getId());
			
			return userJwt;
			/*
			return new User("javainuse", "$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6",
					new ArrayList<>());
			*/
			
			//return ResponseEntity.ok(usuarioAutenticado);
		}catch (Exception e) {
			throw new UsernameNotFoundException("User not found with username: " + username);
			//return ResponseEntity.badRequest().body(e.getMessage());
		}
		
		/*
		if ("javainuse".equals(username)) {
			return new User("javainuse", "$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6",
					new ArrayList<>());
		} else {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		*/
	}

}