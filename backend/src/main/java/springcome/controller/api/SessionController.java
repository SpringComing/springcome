package springcome.controller.api;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import springcome.auth.PrincipalDetails;

@Controller
public class SessionController {

	@RequestMapping("/api/checkSession")
	public String checkSession (@AuthenticationPrincipal PrincipalDetails principalDetails, HttpServletRequest request) {

		
		Cookie[] cookies = request.getCookies();	
		String checkCookie = null;
		
		if(cookies != null) {
			for(Cookie c : cookies) {
				if(c.getName().equals("useremail")) {
					checkCookie = c.getValue();
				}
			}
		}
		
		if(principalDetails == null || checkCookie == null) {


			return "loginForm";

		}else {
			return "/";
		}

	}
}
