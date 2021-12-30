package springcome.controller.api;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

import org.apache.commons.codec.binary.Base64;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import springcome.auth.PrincipalDetails;
import springcome.dto.JsonResult;
import springcome.service.UserService;
import springcome.vo.UserVo;

@RestController
public class SettingController {
	
	@Autowired
	private UserService userservice;

	@RequestMapping("/api/profile")
	public JsonResult profile(@AuthenticationPrincipal PrincipalDetails principalDetails) {
		String base64Str = null;

		if(principalDetails != null) {
						
			UserVo vo = userservice.findAll(principalDetails.getNo());
			
			return JsonResult.success(vo);
			
		}else {
			return JsonResult.fail("fail");
		}
	}
	
	@RequestMapping("/api/changeImage")
	public JsonResult changeImage(@AuthenticationPrincipal PrincipalDetails principalDetails, MultipartHttpServletRequest request) throws IllegalStateException, IOException {
		String base64Str = null;
		MultipartFile report = request.getFile("image");	
		System.out.println(report.getOriginalFilename());
		InputStream fis =  report.getInputStream();
		byte[] b = new byte[fis.available()];
		fis.read(b);
		byte[] encoded = Base64.encodeBase64(b);
		base64Str = new String(encoded);
		int result = userservice.updateImage(base64Str, principalDetails.getNo());
		
		return JsonResult.success(base64Str);
	}
	
	@RequestMapping("/api/changeProfile")
	public JsonResult changeProfile(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody String args) {

		if(principalDetails != null) {
			
			try {
				JSONParser jsonParse = new JSONParser();
				JSONObject jsonObj = (JSONObject) jsonParse.parse(args);

				String name = jsonObj.get("name").toString();
				String birth = jsonObj.get("birth").toString();
				String profile ="";
				if(jsonObj.get("profile") != null) {
				profile = jsonObj.get("profile").toString();
				}
				userservice.updateProfile(name, birth, principalDetails.getNo(),profile);
				return JsonResult.success(null);		
			}catch(Exception e) {
				e.printStackTrace();
				return JsonResult.fail("fail");
			}
	
		}else {
			return JsonResult.fail("fail");
		}
	}
	
}
