package springcome.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springcome.repository.CalendarRepository;
import springcome.vo.MemoVo;
import springcome.vo.ProjectVo;
import springcome.vo.TaskToProjectVo;
@Service
public class CalendarService {

	@Autowired
	private CalendarRepository calendarRepository;
	
	public List<ProjectVo> FindProject(Long long1){
		return calendarRepository.FindProject(long1);
	}
	
	public int insertMemo(Long long1, String title, String date, String n) {
		return calendarRepository.insertMemo(long1, title, date,n);
	}
	
	public List<MemoVo> findMemo(Long long1){
		return calendarRepository.findMemo(long1);
	}
	
	public int deleteMemo(String title, String date, Long long1, String no) {
		return calendarRepository.deleteMemo(title, date, long1,no);
	}
	
	public List<TaskToProjectVo> findTask(Long long1){
		return calendarRepository.findTask(long1);
	}
	
	public int updateMemo(String title, String date, Long long1, String no) {
		return calendarRepository.updateMemo(title, date, long1, no);
	}
	
	public String maxNo() {
		return calendarRepository.maxNo();
	}
	
	
}
