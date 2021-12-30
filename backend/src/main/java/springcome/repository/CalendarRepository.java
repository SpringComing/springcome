package springcome.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import springcome.vo.MemoVo;
import springcome.vo.ProjectVo;
import springcome.vo.TaskToProjectVo;

@Repository
public class CalendarRepository {

	@Autowired
	private SqlSession sqlSession;

	public List<ProjectVo> FindProject(Long test) {

		Map<String, String> map = new HashMap<>();
		map.put("no", test.toString());

		return sqlSession.selectList("calendar.FindProject", map);
	}

	public int insertMemo(Long test, String title, String date, String n) {
		Map<String, String> map = new HashMap<>();
		map.put("no", test.toString());
		map.put("title", title);
		map.put("date", date);
		map.put("n", n);

		return sqlSession.insert("insertMemo", map);
	}

	public List<MemoVo> findMemo(Long test) {

		Map<String, String> map = new HashMap<>();
		map.put("no", test.toString());
		return sqlSession.selectList("calendar.FindMemo", map);

	}

	public int deleteMemo(String title, String date, Long test, String no) {
		Map<String, String> map = new HashMap<>();
		map.put("title", title);
		map.put("date", date);
		map.put("no", test.toString());
		map.put("n", no);

		return sqlSession.delete("calendar.deleteMemo", map);

	}

	public List<TaskToProjectVo> findTask(Long test) {
		Map<String, String> map = new HashMap<>();
		map.put("no", test.toString());
		return sqlSession.selectList("calendar.FindTask", map);

	}
	
	public int updateMemo(String title, String date, Long test, String no) {
		Map<String, String> map = new HashMap<>();
		map.put("title", title);
		map.put("date", date);
		map.put("no", test.toString());
		map.put("n", no);

		return sqlSession.update("calendar.updateMemo", map);
	}
	
	public String maxNo() {
		return sqlSession.selectOne("calendar.maxNo");
	}
	
}
