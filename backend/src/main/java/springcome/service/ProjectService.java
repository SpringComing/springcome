package springcome.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import springcome.repository.ProjectRepository;
import springcome.vo.GuestVo;
import springcome.vo.ProjectVo;

@Service
public class ProjectService {

	@Autowired
	private ProjectRepository projectRepository; 
	
	public List<ProjectVo> getAll(Long no) {
		return projectRepository.findAll(no);
	}

	public boolean addProject(Long userNo, ProjectVo projectVo) {
		boolean result = true;
		
		result = projectRepository.insertProject(projectVo);

		Long lastSequence = projectRepository.findLastSequence(userNo);
		
		if(lastSequence == null) {
			result = projectRepository.insertAttend(userNo, projectVo.getNo(), "ADMIN", 0L);
		} else {
			result = projectRepository.insertAttend(userNo, projectVo.getNo(), "ADMIN", lastSequence + 1);
		}
		
		return result;
	}

	public boolean updateBasicProject( Long userNo, ProjectVo projectVo) {
		
		projectRepository.updateBasicAtAttend(userNo,projectVo);
		
		return projectRepository.updateBasic( projectVo);
	}
	
	public List<ProjectVo> findTest(){
		return projectRepository.findTest();
	}


	public boolean addAttendProject(Long no, Long projectNo) {
		
		//attend table에 있는 테이터인지 확인
		if(projectRepository.findAttend(no,projectNo) != null) {
			//System.out.println("--------------------------------------------------이미 프로젝트에 참석함");
			return true;
		}
		
		Long lastSequence = projectRepository.findLastSequence(no);
		
		if(lastSequence == null) {
			lastSequence = 0L;
		}
		
		projectRepository.insertAttend(no, projectNo, "USER",lastSequence + 1L);
		
		return false;
	}

	public boolean addGuest(String email, Long projectNo) {
		List<GuestVo> guestVoList = projectRepository.findGuestByEmail(email);
		//System.out.println("--------------------------------------------------------guestVoList : " + guestVoList);
		
		if(guestVoList != null && guestVoList.isEmpty()) {
			//System.out.println("--------------------------------------------------------insertGuest 실행 ");
			return projectRepository.insertGuest(email, projectNo);
		}
		
		return true;
	}
	

	public boolean deleteGuest(Long userNo) {
		return projectRepository.deleteGuest(userNo);
	}

	public GuestVo getGuest(String guestEmail) {
		return projectRepository.findGuest(guestEmail);
	}

	public boolean deleteProject(Long projectNo) {
		return projectRepository.deleteProject(projectNo);
	}

	public List<Long> getAllUserNoByProjectNo(Long projectNo) {
		return projectRepository.findAllUserNoByProjectNo(projectNo);
	}



	public ProjectVo findByProjectNo(Long no) {
		return projectRepository.findByProjectNo(no);
	}

}

