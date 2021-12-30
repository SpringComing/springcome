package springcome.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import springcome.vo.GuestVo;
import springcome.vo.ProjectVo;

@Repository
public class ProjectRepository {

	@Autowired
	private SqlSession sqlSession;
	
	public List<ProjectVo> findAll(Long no) {
		return sqlSession.selectList("project.findAllByNo",no);
	}

	public boolean insertProject( ProjectVo projectVo) {
		return sqlSession.insert("project.insertProject",  projectVo) == 1;
	}

	public boolean insertAttend(Long userNo, Long projectNo, String role,Long sequence) {
		Map<String, Object> map = new HashMap<>();
		map.put("userNo", userNo);
		map.put("projectNo", projectNo);
		map.put("sequence", sequence);
		map.put("role", role);
		return sqlSession.insert("project.insertAttend",  map) == 1;
	}

	public Long findLastSequence(Long userNo) {
		return sqlSession.selectOne("project.findLastSequence", userNo);
	}

	public boolean updateBasic(ProjectVo projectVo) {
		return sqlSession.update("project.updateBasic", projectVo) == 1;
	}

	public List<ProjectVo> findTest(){
		return sqlSession.selectList("project.testFind");
		
	}


	public boolean insertGuest(String email, Long projectNo) {
		Map<String, Object> map = new HashMap<>();
		map.put("email", email);
		map.put("no", projectNo);
		return sqlSession.insert("project.insertGuest", map) ==  1;
	}

	public Object findAttend(Long no, Long projectNo) {
		Map<String, Object> map = new HashMap<>();
		map.put("userNo", no);
		map.put("projectNo", projectNo);
		return sqlSession.selectOne("project.findAttend", map);
	}

	public boolean deleteGuest(Long userNo) {
		return sqlSession.delete("project.deleteGuestByUserNo", userNo) == 1;
	}

	public GuestVo findGuest(String guestEmail) {
		return sqlSession.selectOne("project.findGuset",guestEmail);
	}

	public boolean deleteProject(Long projectNo) {
		return sqlSession.delete("project.deleteProjectAtAttend", projectNo) == 1;
	}

	public List<Long> findAllUserNoByProjectNo(Long projectNo) {
		return sqlSession.selectList("project.findAllUserNoByProjectNo", projectNo);
	}
	


	public ProjectVo findByProjectNo(Long no) {
		return sqlSession.selectOne("project.findByProjectNo", no);
	}

	public List<GuestVo> findGuestByEmail(String email) {
		return sqlSession.selectList("project.findGuestByEmail",email);
	}
	
	public boolean updateBasicAtAttend(Long userNo, ProjectVo projectVo) {
		if(projectVo == null) {
			return false;
		}
		Map<String, Object> map = new HashMap<>();
		map.put("userNo", userNo);
		map.put("projectNo", projectVo.getNo());
		map.put("color", projectVo.getColor());
		return sqlSession.update("project.updateBasicAtAttend", map) == 1;
	}
}

