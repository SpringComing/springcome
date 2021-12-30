package springcome.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import springcome.auth.PrincipalDetailsService;

/*
 * 클래스: SecurityConfig
 * 작성자: 이동현
 * 책임: 스프링 시큐리티 enable 여부와 보안 관련 설정을 하는 클래스
 */

@Configuration
@EnableWebSecurity // 스프링 시큐리티 필터가 스프링 필터체인에 등록이 됨.
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	// 비밀번호 암호화를 위한 Bean객체 생성 
	@Bean
	public BCryptPasswordEncoder encodePwd() {
		return new BCryptPasswordEncoder();
	}
	
	@Autowired
	private PrincipalDetailsService principalDetailsService;
	
	
	
	/*
	* 함수: configure
	* 작성자: 이동현
	* 기능: Security 관련 설정 (url 접근제한, 권한 제어, 로그인 처리 등을 담당)
	*/

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		http.csrf().disable();
		http.authorizeRequests()
			.antMatchers("/").authenticated()        // /user는 로그인 한 사람만
//			.antMatchers("/main").authenticated()  
			.anyRequest().permitAll()
			.and()
			.formLogin()           // 인증되지 않은 사용자가 해당 페이지 방문 시 로그인 페이지로 이동
			.loginPage("/loginForm")
			.usernameParameter("email")
			.loginProcessingUrl("/login") // /login이라는 주소가 호출이되면 시큐리티가 낚아채서 대신 로그인을 진행 
			.defaultSuccessUrl("/",true)
			.failureUrl("/loginFailForm")
			.and()
			.logout()
			.logoutSuccessUrl("/loginForm");
			
	}
	
	/*
	* 함수: configure
	* 작성자: 이동현
	* 기능: 로그인 시 회원가입때와 동일한 암호화 알고리즘을 수행
	*/
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth
			.userDetailsService(principalDetailsService)
			.passwordEncoder(encodePwd());

	}
	
}
