package springcome.controller;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import springcome.service.ProjectService;

@RestController 
public class WebSocketController { 
	@Autowired 
	private SimpMessagingTemplate template; 
	@Autowired
	private ProjectService projectService;
	
	@MessageMapping("/project") 
	public void sendProejctMSG(Map<String, Object> socketData) { 
		
		Long projectNo = Long.parseLong(socketData.get("projectNo").toString());
		
		List<Long> userNoList = projectService.getAllUserNoByProjectNo(projectNo);

		for(int i=0; i < userNoList.size();i++) {
			template.convertAndSend("/topics/project/" + userNoList.get(i) , socketData); 
		}
		
	} 
	
	
	
	/**
	 * 메세지 받고 보내는 다른 방법들
	 */
	//@SendTo 보내기
//	@MessageMapping("/sendTo") 
//	@SendTo("/topics/sendTo") 
//	public String SendToMessage(Map<String, Object> socketData) throws Exception { 
//		System.out.println("--------------------------------------------------SendToMessage called" + socketData);
//		String msg = (String) socketData.get("msg");
//		System.out.println("--------------------------------------------------msg : " + msg);
//		return msg; 
//	} 
	
	//@RequestMapping으로도 가능
//	@RequestMapping(value="/api") 
//	public void SendAPI() { 
//		System.out.println("--------------------------------------------------SendAPI called");
//		template.convertAndSend("/topics/api" , "API"); 
//	} 
	
}


