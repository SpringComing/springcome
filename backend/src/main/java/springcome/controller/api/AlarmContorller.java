package springcome.controller.api;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springcome.auth.PrincipalDetails;
import springcome.dto.JsonResult;
import springcome.service.AlarmService;
import springcome.vo.AlarmVo;

/**
 * 클래스: AlarmContorller
 * 작성자: 성창현
 * 책임: 알람 CRUD
 */
@RestController("AlarmApiController")
@RequestMapping("/api/alarm")
public class AlarmContorller {
	@Autowired
	private AlarmService alarmService;
	
	/**
	 * 함수: getAlarm
	 * 작성자: 성창현
	 * 기능: 로그인 유저 알람 데이터 가져오기
	 */
	@GetMapping("")
	public JsonResult getAlarm(@AuthenticationPrincipal PrincipalDetails principalDetails) {
		if(principalDetails == null) {
			System.out.println("-------------------------------------------------------- 세션 만료");
			return JsonResult.fail("세면 만료");
		}
		
		Long userNo = principalDetails.getNo();
		
		List<AlarmVo> alarmVoList = alarmService.getAlarm(userNo);
		
		return JsonResult.success(alarmVoList);
	}
	
	/**
	 * 함수: addAlarm
	 * 작성자: 성창현
	 * 기능: 로그인 유저 알람 데이터 insert 
	 */
	@PostMapping("")
	public JsonResult addAlarm(
			@AuthenticationPrincipal PrincipalDetails principalDetails,
			@RequestBody Map<String,Object> alarmData) {
		if(principalDetails == null) {
			System.out.println("-------------------------------------------------------- 세션 만료");
			return JsonResult.fail("세면 만료");
		}
		
		boolean result = alarmService.addAlarm(alarmData);
	
		return JsonResult.success(result);
	}
	
	/**
	 * 함수: updateAlarm
	 * 작성자: 성창현
	 * 기능: 로그인 유저 알람 데이터 읽음으로 업데이트
	 */
	@PutMapping("/{alarmNo}")
	public JsonResult updateAlarm(
			@AuthenticationPrincipal PrincipalDetails principalDetails,
			@PathVariable(value="alarmNo", required=true) Long alarmNo ) {
		     
		if(principalDetails == null) {
			System.out.println("-------------------------------------------------------- 세션 만료");
			return JsonResult.fail("세면 만료");
		}
		
		//System.out.println("--------------------------------------------------------- alarmNo : " + alarmNo);
		
		Long userNo = principalDetails.getNo();
		
		boolean result = alarmService.updateAlarmBox(userNo,alarmNo);
	
		return JsonResult.success(result);
	}
	
	/**
	 * 함수: deleteAlarm
	 * 작성자: 성창현
	 * 기능: 로그인 유저 알람 데이터 삭제
	 */
	@DeleteMapping("/{alarmNo}")
	public JsonResult deleteAlarm(
			@AuthenticationPrincipal PrincipalDetails principalDetails,
			@PathVariable(value="alarmNo", required=true) Long alarmNo ) {
		     
		if(principalDetails == null) {
			System.out.println("-------------------------------------------------------- 세션 만료");
			return JsonResult.fail("세면 만료");
		}
		
		//System.out.println("--------------------------------------------------------- alarmNo : " + alarmNo);
		
		Long userNo = principalDetails.getNo();
		
		boolean result = alarmService.deleteAlarmBox(userNo,alarmNo);
	
		return JsonResult.success(result);
	}
	
	/**
	 * 함수: updateAllAlarm
	 * 작성자: 성창현
	 * 기능: 로그인 유저 모든 알람 읽음처리
	 */
	@PutMapping("/all")
	public JsonResult updateAllAlarm(@AuthenticationPrincipal PrincipalDetails principalDetails) {
		     
		if(principalDetails == null) {
			System.out.println("-------------------------------------------------------- 세션 만료");
			return JsonResult.fail("세면 만료");
		}
		
		//System.out.println("--------------------------------------------------------- alarmNo : " + alarmNo);
		
		Long userNo = principalDetails.getNo();
		
		boolean result = alarmService.updateAllAlarmBox(userNo);
	
		return JsonResult.success(result);
	}
	
	/*
	* 함수: deleteReadAlarm
	* 작성자: 성창현
	* 기능: 읽은 모든 알람 삭제
	*/
	@DeleteMapping("/read")
	public JsonResult deleteReadAlarm(@AuthenticationPrincipal PrincipalDetails principalDetails) {
		
		if(principalDetails == null) {
			System.out.println("-------------------------------------------------------- 세션 만료");
			return JsonResult.fail("세면 만료");
		}
		
		//System.out.println("--------------------------------------------------------- alarmNo : " + alarmNo);
		
		Long userNo = principalDetails.getNo();
		
		boolean result = alarmService.deleteReadAlarmBox(userNo);
	
		return JsonResult.success(result);

	}
	
	/*
	* 함수: deleteAllAlarm
	* 작성자: 성창현
	* 기능: 읽은 모든 알람 삭제
	*/
	@DeleteMapping("/all")
	public JsonResult deleteAllAlarm(@AuthenticationPrincipal PrincipalDetails principalDetails) {
		
		if(principalDetails == null) {
			System.out.println("-------------------------------------------------------- 세션 만료");
			return JsonResult.fail("세면 만료");
		}
		
		//System.out.println("--------------------------------------------------------- alarmNo : " + alarmNo);
		
		Long userNo = principalDetails.getNo();
		
		boolean result = alarmService.deleteAllAlarmBox(userNo);
	
		return JsonResult.success(result);

	}
}
