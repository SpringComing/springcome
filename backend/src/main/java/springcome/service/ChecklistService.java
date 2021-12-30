package springcome.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springcome.repository.ChecklistRepository;
import springcome.vo.ChecklistVo;

@Service
public class ChecklistService {

	@Autowired
	private ChecklistRepository checklistRepository; 
	
	public Boolean deleteByChecklistNo(Long no) {
		return checklistRepository.deleteByChecklistNo(no);
	}

	public Boolean insert(ChecklistVo vo) {
		return checklistRepository.insert(vo);
		
	}

	public Boolean updateByChecklistNo(Long no) {
		return checklistRepository.update(no);
	}

}
