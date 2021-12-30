package springcome.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springcome.dto.JsonResult;
import springcome.service.ProcessService;
import springcome.vo.ProcessVo;

/*
 * 클래스: ProcessController
 * 작성자: 전지은
 * 책임: 칸반화면 기능
 */
@RestController("ProcessApiController")
@RequestMapping("/api/process")
public class ProcessController {
	@Autowired
	private ProcessService processService;
	
	/*
	 * 함수: getProcess
	 * 작성자: 전지은
	 * 기능: 선택한 프로젝트에 맞는 프로세스(칸반) 들고오기
	 */
	@GetMapping("/{no}")
	public JsonResult getProcess(@PathVariable(value = "no", required = true) Long no) {
		
		List<ProcessVo> processList = processService.getAllByProjectNo(no);
		
		//System.out.println("------------------------------processList : " + processList);
		
		return JsonResult.success(processList);
	}
	
	@PostMapping("")
	public JsonResult insert(@RequestBody ProcessVo vo) {
		//System.out.println(vo);
		processService.insert(vo);
		return JsonResult.success(processService.getAllByProjectNo(vo.getProjectNo()));
	}
	
	@PutMapping("")
	public JsonResult update(@RequestBody ProcessVo vo) {
		System.out.println(vo);
		return JsonResult.success(processService.updateProcess(vo));
	}
	
	@DeleteMapping("/{no}")
	public JsonResult delete(@PathVariable(value = "no", required = true) Long no){
		return JsonResult.success(processService.delete(no));
	}
	
}
