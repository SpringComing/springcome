package springcome.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springcome.repository.ChecklistRepository;
import springcome.repository.ProcessRepository;
import springcome.repository.TaskRepository;
import springcome.vo.ProcessVo;
import springcome.vo.TaskVo;



@Service
public class ProcessService {

	@Autowired
	private ProcessRepository processRepository;
	@Autowired
	private TaskRepository taskRepository;
	@Autowired
	private ChecklistRepository checklistRepository;
	
	public List<ProcessVo> getAllByProjectNo(Long no) {
		List<ProcessVo> result = processRepository.findAllByProjectNo(no);
		for(ProcessVo pVo : result) {
			pVo.setTasks(taskRepository.findAllByProcessNo(pVo.getNo()));
			for(TaskVo tVo : pVo.getTasks()) {
				tVo.setChecklists(checklistRepository.findAllByTaskNo(tVo.getNo()));
			}	
		}

		return result;
	}

	public Boolean insert(ProcessVo vo) {
		Long maxSeq = processRepository.findMaxSeq(vo.getProjectNo());
		if(maxSeq == null) {maxSeq=1L;}
		vo.setSequence(maxSeq+1);
		return processRepository.insert(vo);
	}

	public Long findMaxSeq(Long projectNo) {
		return processRepository.findMaxSeq(projectNo);
	}

	public Boolean updateProcess(ProcessVo vo) {
		return processRepository.update(vo);
	}

	public Boolean delete(Long no) {
		return processRepository.delete(no);
	}

}
