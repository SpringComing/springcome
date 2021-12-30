package springcome.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import springcome.service.ProjectService;
import springcome.service.UserService;
import springcome.utility.MailSender;
import springcome.utility.MessageSender;
import springcome.utility.Sha256;
import springcome.vo.GuestVo;
import springcome.vo.UserVo;

/*
 * 클래스: UserController
 * 작성자: 이동현
 * 책임: 유저관련 (회원가입, 로그인, ID/PWD찾기) 요청을 처리하는 컨트롤러
 */

@Controller
@RequestMapping("/user")
public class UserController {

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Autowired
	private UserService userService;
	
	@Autowired
	private ProjectService projectService;
	
	/*
	* 함수: checkemail
	* 작성자: 이동현
	* 기능: 정규표현식과 이메일 중복확인을 통해 사용자가 입력한 이메일의 사용가능 여부를 리턴
	*/
	
	@ResponseBody
	@RequestMapping(value = "/checkemail", method = RequestMethod.POST)
	public String checkemail(UserVo vo) {

		String emailPattern = "^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$";

		if (vo.getEmail().matches(emailPattern)) {
			UserVo check = userService.findByUseremail(vo.getEmail());
			if (check == null) {
				return "success";
			}
		} else {
			return "fail";
		}

		return "exist";
	}
	
	/*
	* 함수: checkpassword
	* 작성자: 이동현
	* 기능: 정규표현식과 비밀번호, 비밀번호 확인 폼의 일치 여부를 판단하여 입력값 검증
	*/

	@ResponseBody
	@RequestMapping(value = "/checkpassword", method = RequestMethod.POST)
	public String checkpassword(HttpServletRequest request) {

		String passwordPattern = "^[a-zA-Z0-9]{5,30}$";
		String pwd1 = request.getParameter("password");
		String pwd2 = request.getParameter("check_password");

		if (pwd1.equals(pwd2)) {
			if (pwd1.matches(passwordPattern) && pwd2.matches(passwordPattern)) {
				return "success"; // 비밀번호가 일치하고 정규표현식에 만족
			} else {
				return "fail"; // 비밀번호가 일치하지만 정규표현식에 불만족
			}

		} else {
			return "nomatches"; // 비밀번호가 일치하지 않음
		}
	}
	
	/*
	* 함수: checktel
	* 작성자: 이동현
	* 기능: 정규표현식과 휴대폰번호 중복 여부를 판단하여 사용자가 입력한 휴대폰 번호의 유효성 검증
	*/

	@ResponseBody
	@RequestMapping(value = "/checktel", method = RequestMethod.POST)
	public String checktel(HttpServletRequest request) {

		String telPattern = "^01(?:0|1|[6-9])(\\d{3}|\\d{4})(\\d{4})$";
		String tel = request.getParameter("tel");
		
		UserVo vo = userService.findTel(tel);

		if (tel.matches(telPattern) && vo == null) {
			return "success";
		} else if(!tel.matches(telPattern)){
			return "fail";
		} else {
			return "used";
		}

	}
	
	/*
	* 함수: sendemail
	* 작성자: 이동현
	* 기능: 회원가입 요청 시 이메일 인증을 수행하는 함수
	*      4자리 random번호를 생성 후 SHA256 해시함수로 암호화하여 전달
	*      javax mail을 통해 폼에 입력한 이메일로 인증 메일 전송
	*/

	@ResponseBody
	@RequestMapping(value = "/sendemail", method = RequestMethod.POST)
	public Map sendemail(HttpServletRequest request) {

		String email = request.getParameter("email");
		MailSender mailSender = new MailSender();

		Map<String, String> map = new HashMap<>();
		map.put("result", "success");
		map.put("rand", Sha256.getHash(mailSender.randnum));
		map.put("email", email);
		System.out.println("--------------------------------------------------랜덤값 확인 : " + mailSender.randnum);
		try {
			mailSender.sendVerifiNum(email);
			return map;
		} catch (Exception e) {
			return map;
		}

	}
	
	/*
	* 함수: authmail
	* 작성자: 이동현
	* 기능: random으로 생성한 4자리 인증번호를 SHA256 해시함수로 암호화 하여 쿠키에 등록 -> 사용자 의 인증코드와 비교하여 일치여부 판단
	*     메일 인증 성공 시 회원가입 진행 ( 비밀번호 bCrypt 암호화(SHA1+salt값) ) 
	* 추가: guestEmail이 존재한다면 attend테이블에 레코드를 삽입해서 가입한 유저를 프로젝트에 참석시키고 guest테이블의 있는 같은 email의 레코드를 지운다
	*/

	@ResponseBody
	@RequestMapping(value = "/authemail", method = RequestMethod.POST)
	public String authemail(HttpServletRequest request, String guestEmail) {

		String input = Sha256.getHash(request.getParameter("authNum"));
		String cookie = request.getParameter("cookie");
		Boolean results;

		if (input.equals(cookie)) {
			UserVo userVo = new UserVo();
			userVo.setEmail(request.getParameter("email"));
			userVo.setName(request.getParameter("name"));
			userVo.setPassword(bCryptPasswordEncoder.encode(request.getParameter("password")));
			userVo.setBirth(request.getParameter("birth"));
			userVo.setTel(request.getParameter("tel"));
		
			results = userService.join(userVo);
			
			//guestEmail이 존재한다면 attend테이블에 레코드를 삽입해서 가입한 유저를 프로젝트에 참석시키고 guest테이블의 있는 같은 email의 레코드를 지운다
			if(guestEmail != null && !guestEmail.equals("") ) {
				//System.out.println("------------------------------------------------------------guestEmail : " + guestEmail );
				GuestVo guestVo = projectService.getGuest(guestEmail);
				//System.out.println("------------------------------------------------------------guestVo : " + guestVo );
				if(guestVo != null) {
					//System.out.println("------------------------------------------------------------userVo :  " + userVo );
					projectService.addAttendProject(userVo.getNo(), guestVo.getProjectNo());
					//System.out.println("------------------------------------------------------------addAttendProject success " );
					projectService.deleteGuest(guestVo.getNo());
					//System.out.println("------------------------------------------------------------deleteGuest success" );
				}
			}
			
			
			if (results) {
				return "success";
			} else {
				return "serverError";
			}

		} else {
			return "authError";
		}

	}
	
	/*
	* 함수: find
	* 작성자: 이동현
	* 기능: 아이디 찾기 기능
	*     사용자가 입력한 정보와 일치하는 데이터의 유무 확인 / 등록된 휴대폰 번호로 인증코드 전송 
	*/
	
	@ResponseBody
	@RequestMapping(value = "/find", method = RequestMethod.POST)
	public Map find(HttpServletRequest request) {
		
		String name = request.getParameter("name");
		String tel = request.getParameter("tel");
		String authCode = Integer.toString(((int)(Math.random() * (9999-1000)) + 1000));
		
		UserVo vo = userService.findEmail(name, tel);
		
		Map<String, String> map = new HashMap<>();
		
		if(vo == null) {
			map.put("result", "fail");
			return map;
		}else {
			map.put("result", "success");
			map.put("rand", Sha256.getHash(authCode));
			MessageSender sender = new MessageSender();
			sender.send(tel, authCode);
			
			return map;
		}

	}
	
	/*
	* 함수: find2
	* 작성자: 이동현
	* 기능: 비밀번호 찾기 기능
	*     사용자가 입력한 정보와 일치하는 데이터의 유무 확인 / 등록된 휴대폰 번호로 인증코드 전송
	*/
	
	@ResponseBody
	@RequestMapping(value = "/find2", method = RequestMethod.POST)
	public Map find2(HttpServletRequest request) {
		
		String email2 = request.getParameter("email2");
		String tel = request.getParameter("tel");
		String authCode = Integer.toString(((int)(Math.random() * (9999-1000)) + 1000));
		
		UserVo vo = userService.findPassword(email2, tel);
		Map<String, String> map = new HashMap<>();
		
		if(vo == null) {
			map.put("result", "fail");
			return map;
		}else {
			map.put("result", "success");
			map.put("rand", Sha256.getHash(authCode));
			MessageSender sender = new MessageSender();
			sender.send(tel, authCode);
			return map;
		}

	}
	
	/*
	* 함수: auth
	* 작성자: 이동현
	* 기능: 아이디 찾기 인증코드 검증
	*     SHA256 으로 암호화되어 쿠키에 등록되어 있는 인증코드와 사용자가 입력한 인증코드의 일치여부 검증
	*/
	
	@ResponseBody
	@RequestMapping(value = "/auth", method = RequestMethod.POST)
	public Map auth(HttpServletRequest request) {
		
		String input = request.getParameter("input");
		String cookie = request.getParameter("cookie");
		String name = request.getParameter("name");
		String tel = request.getParameter("tel");
		
		Map<String, String> map = new HashMap<>();
		
		if(Sha256.getHash(input).equals(cookie)) {
			UserVo vo = userService.findEmail(name, tel);			
			map.put("result", "success");
			map.put("email", vo.getEmail());
			map.put("join_date", vo.getJoin_date());
			return map;
		}else {
			map.put("result", "fail");
			return map;
		}

	}
	
	/*
	* 함수: auth2
	* 작성자: 이동현
	* 기능: 비밀번호 찾기 인증코드 검증
	*     SHA256 으로 암호화되어 쿠키에 등록되어 있는 인증코드와 사용자가 입력한 인증코드의 일치여부 검증
	*/
	
	@ResponseBody
	@RequestMapping(value = "/auth2", method = RequestMethod.POST)
	public Map auth2(HttpServletRequest request) {
		
		String input = request.getParameter("input");
		String cookie = request.getParameter("cookie");
		String email2 = request.getParameter("email2");
		String tel2 = request.getParameter("tel2");
		
		Map<String, String> map = new HashMap<>();
		
		if(Sha256.getHash(input).equals(cookie)) {
			UserVo vo = userService.findPassword(email2, tel2);	
			map.put("result", "success");
			return map;
		}else {
			map.put("result", "fail");
			return map;
		}

	}
	
	/*
	* 함수: changePWD
	* 작성자: 이동현
	* 기능: 비밀번호 찾기(변경) 기능
	*      새로 설정할 비밀번호의 유효성 검사 수행
	*/
	
	@ResponseBody
	@RequestMapping(value = "/changePWD", method = RequestMethod.POST)
	public String changePWD(HttpServletRequest request) {
		
		String email2 = request.getParameter("email2");
		String pass1 = request.getParameter("pass1");
		String pass2 = request.getParameter("pass2");
		String passwordPattern = "^[a-zA-Z0-9]{5,30}$";
		
		if(!pass1.equals(pass2)) {
			return "nomatch";
		}else if(!pass1.matches(passwordPattern)) {
			return "fail";
		}else {
			int result = userService.updatePWD(email2, bCryptPasswordEncoder.encode(pass1));
			
			System.out.println(result);
			if(result == 1) {
				return "success";
			}else {
				return "servererror";
			}
		}
	}

}
