package springcome.controller.api;

import java.util.Base64;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import springcome.auth.PrincipalDetails;
import springcome.dto.JsonResult;
import springcome.service.FileUploadService;
import springcome.service.TaskService;
import springcome.vo.FileVo;
import springcome.vo.CommentVo;
import springcome.vo.TaskDiffVo;
import springcome.vo.TaskSameVo;
/*
 * 클래스: ChecklistController
 * 작성자: 전지은
 * 책임: 칸반화면 기능
 */
import springcome.vo.TaskVo;
@RestController("TaskApiController")
@RequestMapping("/api/task")
public class TaskController {
	@Autowired
	private TaskService taskService;
	
	@Autowired
	private FileUploadService fileService;
	
	@PostMapping("")
	public JsonResult insert(@RequestBody TaskVo vo) {
		taskService.insert(vo);
		return JsonResult.success(taskService.getAllByProcessNo(vo.getProcessNo()));
	}
	
	@PutMapping("/{taskNo}")
	public JsonResult update(@PathVariable(value="taskNo", required = true) Long no) {
		//System.out.println(no);
		return JsonResult.success(taskService.updateTaskStatus(no));
	}
	

	@DeleteMapping("/{taskNo}")
	public JsonResult delete(@PathVariable(value="taskNo", required = true) Long no) {
		return JsonResult.success(taskService.deleteTask(no));
	}
	
	@PutMapping("/attr")
	public JsonResult updateTaskAttr(
			@RequestBody TaskVo vo) {
		//System.out.println(vo);
		return JsonResult.success(taskService.updateTaskAttr(vo));
	}
	
	@PutMapping("/same")
	public JsonResult updateTaskSeq(
			@RequestBody TaskSameVo vo) {
		//System.out.println(vo);
		return JsonResult.success(taskService.updateTaskSeq(vo));
	}
	
	@PutMapping("/diff")
	public JsonResult updateProcessTaskSeq(
			@RequestBody TaskDiffVo vo) {
		//System.out.println(vo);
		return JsonResult.success(taskService.updateProcessTaskSeq(vo));
		
	}
	
	@GetMapping("/file/{taskNo}")
	public JsonResult getFileList(@PathVariable(value="taskNo", required = true) Long no) {
		
		return JsonResult.success(taskService.getFileList(no));
	}

	@PutMapping("/comment")
	public JsonResult getComment(
			@RequestBody String args) {
		
		List<CommentVo> vo;
		try {
		JSONParser jsonParse = new JSONParser();
		JSONObject jsonObj = (JSONObject) jsonParse.parse(args);
		String taskNo = jsonObj.get("no").toString();
		
		vo = taskService.findComment(taskNo);
		System.out.println(vo);
		}catch(Exception e) {
			e.printStackTrace();
			return JsonResult.fail(null);
		}
		
		return JsonResult.success(vo);
		
	}
	
	@PutMapping("/addComment")
	public JsonResult addComment(
			@RequestBody String args, @AuthenticationPrincipal PrincipalDetails principalDetails) {
		
		try {
		JSONParser jsonParse = new JSONParser();
		JSONObject jsonObj = (JSONObject) jsonParse.parse(args);
		
		String taskNo = jsonObj.get("no").toString();
		String Message = jsonObj.get("message").toString();
		Long userno = principalDetails.getNo();
		int result = taskService.addComment(Message, taskNo, userno);
		CommentVo vo = taskService.commentData(result);
		
		
		if(result != 0) {
			return JsonResult.success(vo);
		}else {
			return JsonResult.fail(null);
		}
		
		
		}catch(Exception e) {
			e.printStackTrace();
			return JsonResult.fail(null);
		}
		
		
	}
	

	@PostMapping("/file")
	public JsonResult insertFile(
			MultipartFile file,
			@RequestParam(value="userNo", required = true) Long userNo,
			@RequestParam(value="taskNo", required = true) Long taskNo) throws Exception {

		FileVo vo = new FileVo();
		vo.setUserNo(userNo);
		vo.setTaskNo(taskNo);
		fileService.restoreImage(file, vo);
		vo.setUserName(taskService.getFileUserName(vo.getUserNo()));
		if(taskService.insertFile(vo)) return JsonResult.success(vo);
		else return JsonResult.fail(null);
	}
	
	@DeleteMapping("/file/{fileNo}")
	public JsonResult deleteFile(@PathVariable(value="fileNo", required = true) Long no) {
		return JsonResult.success(taskService.deleteFile(no));
	}
	
	@GetMapping("/taskUser/{taskNo}")
	public JsonResult getTaskUser(@PathVariable(value="taskNo", required = true) Long no) {
		return JsonResult.success(taskService.getTaskUser(no));
	}
	
	@GetMapping("/taskNoneUser")
	public JsonResult getTaskNoneUser(
			@RequestParam(value="projectNo", required = true) Long projectNo,
			@RequestParam(value="taskNo", required = true) Long taskNo) {
		HashMap<String, Long> map = new HashMap<String, Long>();
		map.put("projectNo", projectNo);
		map.put("taskNo", taskNo);
		return JsonResult.success(taskService.getTaskNoneUser(map));
	}
	
	@PostMapping("/assign")
	public JsonResult insertAssign(
			@RequestParam(value="userNo", required = true) Long userNo,
			@RequestParam(value="taskNo", required = true) Long taskNo) {
		System.out.println(userNo);
		System.out.println(taskNo);
		HashMap<String, Long> map = new HashMap<String, Long>();
		map.put("userNo", userNo);
		map.put("taskNo", taskNo);
		return JsonResult.success(taskService.insertAssign(map));
	}
	
	@DeleteMapping("/assign")
	public JsonResult deleteAssign(
			@RequestParam(value="userNo", required = true) Long userNo,
			@RequestParam(value="taskNo", required = true) Long taskNo) {
		HashMap<String, Long> map = new HashMap<String, Long>();
		map.put("userNo", userNo);
		map.put("taskNo", taskNo);
		return JsonResult.success(taskService.deleteAssign(map));
	}
    
	@GetMapping("/fileData/{fileNo}")
	public JsonResult getFileData(@PathVariable(value="fileNo", required = true) Long no) {
		//System.out.println(no);
		FileVo fileVo = taskService.getByFileNo(no);
		//System.out.println(fileVo);
		
		String[] fileUrl = fileVo.getUrl().split("/");
		
		String url =  "/upload-springcome/" + fileUrl[2];
		byte[] binary = fileService.getFileBinary(url);
		String base64data = Base64.getEncoder().encodeToString(binary);

		return JsonResult.success(base64data);
	}
    

}
