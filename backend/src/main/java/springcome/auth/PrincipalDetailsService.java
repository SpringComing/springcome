package springcome.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import springcome.repository.UserRepository;
import springcome.vo.UserVo;

/*
 * 클래스: PrincipalDetailsService
 * 작성자: 이동현
 * 책임: /login 요청이 오면 스프링 필터에서 요청을 가로채 loadUserByUsername 함수를 실행하여 로그인 작업을 수행함
   // 시큐리티 설정에서 loginProcessingUrl("/login"); 요청이 오면 자동으로 UserDetailsService 타입으로 IoC되어 있는 loadUserByUsername 함수가 실행
 */

@Service
public class PrincipalDetailsService implements UserDetailsService{

	@Autowired
	private UserRepository userRepository;
	
	/*
	* 함수: loadUserByUsername
	* 작성자: 이동현
	* 기능: /login 요청이 오면 자동으로 호출되어 UserVo 객체를 확인 후 Security Session에 접근할 수 있는 Athentification 객체를 return
	  // 시큐리티 session = Authentication (내부 UserDetails)
	*/
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

		UserVo userVo = userRepository.findByUseremail(email);
		if(userVo != null) {
 
			return new PrincipalDetails(userVo);
		}
		System.out.println("일치하는 정보 없음");
		
		return null;
	}
	
	
	
	

}
