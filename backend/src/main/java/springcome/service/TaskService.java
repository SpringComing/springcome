package springcome.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springcome.repository.ChecklistRepository;
import springcome.repository.TaskRepository;
import springcome.vo.FileVo;
import springcome.vo.CommentVo;
import springcome.vo.TaskDiffVo;
import springcome.vo.TaskSameVo;
import springcome.vo.TaskVo;
import springcome.vo.UserVo;

@Service
public class TaskService {

	@Autowired
	private TaskRepository taskRepository;
	@Autowired
	private ChecklistRepository checklistRepository;

	public Boolean updateTaskStatus(Long no) {
		return taskRepository.updateTaskStatus(no);
	}

	public Boolean insert(TaskVo vo) {
		Long maxSeq = taskRepository.findMaxSeqByProcessNo(vo.getProcessNo());
		if(maxSeq == null) {maxSeq=1L;}
		vo.setSequence(maxSeq+1);
		return taskRepository.insert(vo);
	}

	public List<TaskVo> getAllByProcessNo(Long no) {
		List<TaskVo> result = taskRepository.findAllByProcessNo(no);
		for(TaskVo tVo : result) {
			tVo.setChecklists(checklistRepository.findAllByTaskNo(tVo.getNo()));
		}
		
		return result;
	}

	public Boolean updateTaskSeq(TaskSameVo vo) {
		return taskRepository.updateTaskSeq(vo);
	}

	public Boolean updateProcessTaskSeq(TaskDiffVo vo) {
		return taskRepository.updateProcessTaskSeq(vo);
	}

	public Boolean updateTaskAttr(TaskVo vo) {
		return taskRepository.updateTaskAttr(vo);
	}
	
	public List<CommentVo> findComment(String no){
		return taskRepository.findComment(no);
	}
	
	public int addComment(String message, String task_no, Long userno) {
		return taskRepository.addComment(message, task_no, userno);
	}
	
	public CommentVo commentData(int no) {
		return taskRepository.commentData(no);
	}

	public List<UserVo> getTaskUser(Long no) {
		return taskRepository.getTaskUser(no);
	}

	public List<UserVo> getTaskNoneUser(HashMap<String, Long> map) {
		return taskRepository.getTaskNoneUser(map);
	}

	public Boolean insertAssign(HashMap<String, Long> map) {
		return taskRepository.insertAssign(map);
	}

	public Boolean deleteAssign(HashMap<String, Long> map) {
		return taskRepository.deleteAssign(map);
	}

	public Boolean deleteTask(Long no) {
		return taskRepository.deleteTask(no);
	}

	public List<FileVo> getFileList(Long no) {
		return taskRepository.getFileList(no);
	}

	public Boolean insertFile(FileVo vo) {
		return taskRepository.insertFile(vo);
	}

	public String getFileUserName(Long userNo) {
		return taskRepository.getFileUserName(userNo);
	}

	public Boolean deleteFile(Long no) {
		return taskRepository.deleteFile(no);
	}

	public FileVo getByFileNo(Long no) {
		return taskRepository.getByFileNo(no);
	}
}
