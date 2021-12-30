package springcome.controller.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springcome.auth.PrincipalDetails;
import springcome.dto.JsonResult;
import springcome.service.CalendarService;
import springcome.service.ProjectService;
import springcome.vo.MemoVo;
import springcome.vo.ProjectVo;
import springcome.vo.TaskToProjectVo;

@RestController
public class CalendarController {


	@Autowired
	private ProjectService projectService;
	
	@Autowired
	private CalendarService calendarService;
	
	@RequestMapping("/api/addMemo")
	public JsonResult addMemo(@RequestBody String args,@AuthenticationPrincipal PrincipalDetails principalDetails) {
		
		try {
			JSONParser jsonParse = new JSONParser();
			JSONObject jsonObj = (JSONObject) jsonParse.parse(args);
			JSONObject inf = (JSONObject) jsonObj.get("args");
			
			int result = calendarService.insertMemo(principalDetails.getNo(),inf.get("title").toString(), inf.get("date").toString(), inf.get("no").toString());
			
		}catch(Exception e) {
			e.printStackTrace();
		}

		return JsonResult.success("ok");
	}
	
	@RequestMapping("/api/deleteMemo")
	public JsonResult deleteMemo(@RequestBody String args,@AuthenticationPrincipal PrincipalDetails principalDetails) {
		
		try {
			JSONParser jsonParse = new JSONParser();
			JSONObject jsonObj = (JSONObject) jsonParse.parse(args);

			String title = jsonObj.get("title").toString();
			String date = jsonObj.get("date").toString();
			String no = jsonObj.get("no").toString();
			
					
			int result = calendarService.deleteMemo(title, date, principalDetails.getNo(),no);
		
		}catch(Exception e) {
			e.printStackTrace();
			return JsonResult.fail("fail");
		}

		return JsonResult.success("ok");
	}
	
	@RequestMapping("/api/updateMemo")
	public JsonResult updateMemo(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody String args) {	
		

		try {
			JSONParser jsonParse = new JSONParser();
			JSONObject jsonObj = (JSONObject) jsonParse.parse(args);

			String title = jsonObj.get("title").toString();
			String date = jsonObj.get("date").toString();
			String no = jsonObj.get("no").toString();
			System.out.println(no);
			
			int result = calendarService.updateMemo(title, date, principalDetails.getNo(), no);
			
		}catch(Exception e) {
			e.printStackTrace();
			return JsonResult.fail("fail");
		}
		
		return JsonResult.success("ok");
	}
	
	@RequestMapping("/api/schedule")
	public Object api(@AuthenticationPrincipal PrincipalDetails principalDetails, HttpServletRequest request) {

		if(principalDetails != null) {
		
			
		
		Cookie[] cookies = request.getCookies();	
		String checkCookie = null;
		
		if(cookies != null) {
			for(Cookie c : cookies) {
				if(c.getName().equals("useremail")) {
					checkCookie = c.getValue();
				}
			}
		}
		
		List<TaskToProjectVo> taskList = calendarService.findTask(principalDetails.getNo());
		List<MemoVo> memoList = calendarService.findMemo(principalDetails.getNo());
		List<ProjectVo> projectList = calendarService.FindProject(principalDetails.getNo());
		String getMaxNo = calendarService.maxNo();
		int maxNo;
		if(getMaxNo != null) {
			maxNo = Integer.parseInt(getMaxNo);
		}else {
			maxNo = 0;
		}
		

		Map a = new HashMap<>();
		a.put("memo", memoList);
		a.put("project", projectList);
		a.put("task", taskList);
		a.put("maxNo", maxNo);
		
		
			return JsonResult.success(a);

		
		
		}else {
		

		return JsonResult.fail("fail");
		}

	}

}
