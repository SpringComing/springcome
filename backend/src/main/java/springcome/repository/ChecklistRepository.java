package springcome.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import springcome.vo.ChecklistVo;

@Repository
public class ChecklistRepository {

	@Autowired
	private SqlSession sqlSession;
	
	public List<ChecklistVo> findAllByTaskNo(Long no) {
		return sqlSession.selectList("checklist.findAllByTaskNo", no);
	}

	public Boolean deleteByChecklistNo(Long no) {
		return 1 == sqlSession.delete("checklist.deleteByChecklistNo", no);
	}

	public Boolean insert(ChecklistVo vo) {
		//System.out.println(vo);
		return 1 == sqlSession.insert("checklist.insert", vo);
	}

	public Boolean update(Long no) {
		return 1 == sqlSession.update("checklist.update", no);
	}

}
