package springcome.controller;


import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import springcome.auth.PrincipalDetails;

/*
 * 클래스: MainController
 * 작성자: 이동현
 * 책임: 요청에 따른 View를 리턴 (회원가입, ID/PWD찾기, 로그인, 메인)
 */

@Controller
public class MainController {
		
	@RequestMapping({"", "/main"})
	public String index(@AuthenticationPrincipal PrincipalDetails principalDetails, HttpServletRequest req, HttpServletResponse resp) {		

		Cookie cookie = new Cookie("useremail", principalDetails.getEmail());
		cookie.setMaxAge(-1);
		resp.addCookie(cookie);


		Cookie cookie2 = new Cookie("userno", principalDetails.getNo().toString());
		cookie2.setMaxAge(-1);
		resp.addCookie(cookie2);
		return "index";
	}
	
	@RequestMapping({"/user"})
	public @ResponseBody String user() {
		return "user";
	}
	
	@RequestMapping({"/joinForm" ,"/joinForm/{guestEmail}"})
	public String joinForm(
			@ModelAttribute @PathVariable(value="guestEmail", required=false) String guestEmail) {
		return "joinForm";
	}
	
	@RequestMapping({"/loginForm", "/loginForm/{guestEmail}"})
	public String loginForm(HttpServletRequest req, HttpServletResponse resp,
			@ModelAttribute @PathVariable(value="guestEmail", required=false) String guestEmail) {
		
		Cookie[] cookies = req.getCookies();
		
		if(cookies != null) {
		
			for(Cookie c : cookies) {
				if(c.getName().equals("useremail")) {
					c.setMaxAge(0);
					resp.addCookie(c);
				}
			}
		}
		
		return "loginForm";
	}
	
	@RequestMapping({"/findForm"})
	public String findForm() {
		return "findForm";
	}
	
	@RequestMapping({"/loginFailForm"})
	public String loginFailForm() {
		return "loginFailForm";
	}
		
}