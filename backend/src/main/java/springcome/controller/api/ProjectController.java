package springcome.controller.api;



import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import springcome.auth.PrincipalDetails;
import springcome.dto.JsonResult;
import springcome.service.ProjectService;
import springcome.service.UserService;
import springcome.utility.MailSender;
import springcome.vo.GuestVo;
import springcome.vo.ProjectVo;
import springcome.vo.UserVo;

/*
 * 클래스: ProjectController
 * 작성자: 성창현
 * 책임: 프로젝트화면 컨트롤러
 */
@RestController("ProjectApiController")
@RequestMapping("/api/project")
public class ProjectController {
	
	/**
	 *  Logger 생성
	 */
	private static final Log LOG = LogFactory.getLog( ProjectController.class );
	
	@Autowired
	private ProjectService projectService;
	
	@Autowired
	private UserService userService;
	
	/*
	 * 함수: getProject
	 * 작성자: 성창현
	 * 기능: 로그인한 유저({userNo})의 프로젝트 목록 가져오기
	 */ 
	@GetMapping("")
	public JsonResult getProject(@AuthenticationPrincipal PrincipalDetails principalDetails) {
		List<ProjectVo> projectList = null;
		
		if(principalDetails == null) {
			System.out.println("-------------------------------------------------------- 세션 만료");
			return JsonResult.fail("세면 만료");
		}
		
	    projectList = projectService.getAll(principalDetails.getNo());
		
		//System.out.println("------------------------------projectList : " + projectList);
		
		return JsonResult.success(projectList);
	}
	
	/*
	 * 함수: addProject
	 * 작성자: 성창현
	 * 기능: 로그인 유저({userNo}) 새 프로젝트 디비에 insert
	 */
	@PostMapping("")
	public JsonResult addProject(@AuthenticationPrincipal PrincipalDetails principalDetails,
								 @RequestBody ProjectVo projectVo) {
		
		if(principalDetails == null) {
			System.out.println("-------------------------------------------------------- 세션 만료");
			return JsonResult.fail("세면 만료");
		}
		
		boolean result = false;
		//System.out.println("insert start");
		//System.out.println("-------------------------------------------------projectVo"+ projectVo);
		
		result = projectService.addProject(principalDetails.getNo(), projectVo);
		
		return JsonResult.success(result);
	}
	
	/*
	 * 함수: upDateBasicProject
	 * 작성자: 성창현
	 * 기능: 프로젝트 기본내용 업데이트 
	 */
	@PutMapping("")
	public JsonResult updateBasicProject(@AuthenticationPrincipal PrincipalDetails principalDetails,
										 @RequestBody ProjectVo projectVo) {
		if(principalDetails == null) {
			System.out.println("-------------------------------------------------------- 세션 만료");
			return JsonResult.fail("세면 만료");
		}
		
		boolean result = false;
		//System.out.println("-------------------------------------------------update projectVo"+ projectVo);
		
		result = projectService.updateBasicProject(principalDetails.getNo(), projectVo);
		
		return JsonResult.success(result);
	}
	
	/*
	 * 함수: deletePoject
	 * 작성자: 성창현
	 * 기능: 프로젝트와 관련된 데이터 전부 삭제
	 */
	@DeleteMapping("/{projectNo}")
	public JsonResult deletePoject(@PathVariable(value="projectNo", required=true) Long projectNo) {
		
		System.out.println("-------------------------------------------------projectNo"+ projectNo);
		boolean result = projectService.deleteProject(projectNo);
		
		
		return JsonResult.success(result);
	}
	
	/*
	* 함수: sendInvitationMail
	* 작성자: 이동현, 성창현
	* 기능: 회원가입 요청 시 이메일 인증을 수행하는 함수
	*      4자리 random번호를 생성 후 SHA256 해시함수로 암호화하여 전달
	*      javax mail을 통해 폼에 입력한 이메일로 인증 메일 전송
	*      프로젝트 초대 메일 보내기
	*      초대 보낸 이메일이 시스템에 가입한 유저인지 확인하고 비회원이면 guest테이블에 생성
	*/
	@PostMapping("/sendemail")
	public JsonResult Invitation(
						@AuthenticationPrincipal PrincipalDetails principalDetails,
						@RequestBody GuestVo guestVo) {
		
		if(principalDetails == null) {
			System.out.println("-------------------------------------------------------- 세션 만료");
			return JsonResult.fail("세면 만료");
		}
		
		boolean existAttend = false;
		MailSender mailSender = new MailSender();
		
		String email = guestVo.getEmail();
		String sender = principalDetails.getUsername();
		
		UserVo userVo = userService.findByUseremail(email);
		
		//가입한 유저라면 attend 테이블에 데이터 추가 비회원이면 guest테이블에 데이터 추가
		if(userVo != null) { 
			//System.out.println("----------------------------------------------guestVo : " + guestVo);
			//System.out.println("----------------------------------------------userVo : " + userVo);
			existAttend = projectService.addAttendProject(userVo.getNo(),guestVo.getProjectNo());
		} else {			
			projectService.addGuest(email, guestVo.getProjectNo());
		}
			
		Map<String, Object> map = new HashMap<>();
		map.put("existAttend",existAttend);
		
		//이미 참석한 경우 메일을 보내지 않는다
		if(existAttend) {
			return JsonResult.success(map);
		}
		
		//초대 이메일 보내기
		try {
			LOG.info( "#mail - mail send start" );
			mailSender.sendInvitationMail(email,sender);
		} catch (Exception e) {
			System.out.println(e.toString());
			LOG.error( "#mail - mail send fail" );
			return JsonResult.success("mail send failed : " + e.toString());
		}
		
		return JsonResult.success(map);

	}
	
	/*
	* 함수: getProjectPeople
	* 작성자: 성창현
	* 기능: 프로젝트 인원 데이터 가져오기
	*/
	@GetMapping("/people/{projectNo}")
	public JsonResult getProjectPeople(@PathVariable(value="projectNo", required=true) Long projectNo) {
		
		List<UserVo> userVoList = userService.findProjectPeople(projectNo);
		//System.out.println("-----------------------------------------------userVoList : " + userVoList);
		
		return JsonResult.success(userVoList);

	}
	
	/*
	* 함수: updateAttend
	* 작성자: 성창현
	* 기능: 프로젝트 인원 제외하는 요청을 받고 attend 테이블에 해당 유저 속성을 업데이트한다
	*/
	@PutMapping("/people")
	public JsonResult updateAttend(
			@RequestParam(value="projectNo", required=true) Long projectNo,
			@RequestParam(value="userNo", required=true) Long userNo) {
		
		//System.out.println("-----------------------------------------------파라미터 : " + projectNo +" , " + userNo);
		boolean result = userService.updateProjectPeople(projectNo,userNo);
		
		return JsonResult.success(result);

	}
	


	
	@GetMapping("/attr/{no}")
	public JsonResult findByProjectNo(@PathVariable(value = "no", required = true) Long no) {
		//System.out.println("------------------------------projectNo : " + no);
		ProjectVo vo = projectService.findByProjectNo(no);
		//System.out.println("------------------------------projectVo : " + vo);
		return JsonResult.success(vo);
	}
	
}

