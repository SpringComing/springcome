package springcome.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import springcome.dto.JsonResult;
import springcome.service.ChecklistService;
import springcome.vo.ChecklistVo;
/*
 * 클래스: ChecklistController
 * 작성자: 전지은
 * 책임: 칸반화면 기능
 */
@RestController("ChecklistApiController")
@RequestMapping("/api/checklist")
public class ChecklistController {
	@Autowired
	private ChecklistService checklistService;
	
	/*
	 * 함수: delete
	 * 작성자: 전지은
	 * 기능: 선택한 no에 맞는 checklist삭제하기
	 */
	@RequestMapping(value="/{checklistNo}", method=RequestMethod.GET)
	public JsonResult delete(@PathVariable(value="checklistNo", required = true) Long no) {
		//System.out.println(no);
		return JsonResult.success(checklistService.deleteByChecklistNo(no));
	}
	
	/*
	 * 함수: insert
	 * 작성자: 전지은
	 * 기능: checklist 추가
	 */
	@PostMapping("")
	public JsonResult insert(@RequestBody ChecklistVo vo) {
		//System.out.println(vo);
		checklistService.insert(vo);
		return JsonResult.success(vo);
	}
	
	@PutMapping("/{checklistNo}")
	public JsonResult update(@PathVariable(value="checklistNo", required = true) Long no) {
		System.out.println(no);
		return JsonResult.success(checklistService.updateByChecklistNo(no));
	}

}
