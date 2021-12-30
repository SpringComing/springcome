package springcome.auth;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import springcome.vo.UserVo;

/*
 * 클래스: PrincipalDetails
 * 작성자: 이동현
 * 책임: UserDetails를 상속받는 즉, Authentification 클래스에 감싸져 Security Session 으로 들어가는 클래스
   
   // 시큐리티가 /login 주소 요청이 오면 낚아채서 로그인을 진행시킨다.
   // 로그인이 완료되면 시큐리티 Session을 만들어준다. (Security ContextHolder)
   // 들어갈 수 있는 오브젝트 => Authentication 객체
   // Authentication 안에 User 정보가 있어야 됨.
   // User 오브젝트 타입 => UserDetails 타입 객체
   // Security Session => Authentication => UserDetails (PrincipalDetails)
 
 */

public class PrincipalDetails implements UserDetails {

	private static final long serialVersionUID = 1L;
	private UserVo userVo; // 컴포지션
	public PrincipalDetails(UserVo userVo) {
		System.out.println("테스트 : " + userVo);
		this.userVo = userVo;
	}
	
	/*
	* 함수: getAuthorities()
	* 작성자: 이동현
	* 기능: 해당 유저의 권한을 확인 (권한에 따른 접근은 config 파일에서 처리)
	*/
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<GrantedAuthority> collect = new ArrayList<>();
		collect.add(new GrantedAuthority() {

			private static final long serialVersionUID = 1L;

			@Override
			public String getAuthority() {
				return "User";
			}
		});
		return null;
	}
	@Override
	public String getPassword() {
		return userVo.getPassword();
	}

	@Override
	public String getUsername() {
		return userVo.getName();
	}
	
	public String getImage() {
		return userVo.getImage();
	}

	public String getJoindate() {
		return userVo.getJoin_date();
	}
	
	public Long getNo() {
		return userVo.getNo();
	}
  
	public String getEmail() {
		return userVo.getEmail();
	}
	public String getTel() {
		return userVo.getTel();
	}
	public String getBirth() {
		return userVo.getBirth();
	}
	
	/*
	* 함수: 이하 모든 함수들
	* 작성자: 이동현
	* 기능: 비밀번호 만료기간 체크, 휴먼유저 체크 등을 할 때 사용할 함수
	*/
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	@Override
	public boolean isEnabled() {
		return true;
	}

}
