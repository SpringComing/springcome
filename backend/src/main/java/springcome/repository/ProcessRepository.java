package springcome.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import springcome.vo.ProcessVo;

@Repository
public class ProcessRepository {

	@Autowired
	private SqlSession sqlSession;
	
	public List<ProcessVo> findAllByProjectNo(Long no) {
		return sqlSession.selectList("process.findAllByProjectNo", no);
	}

	public Boolean insert(ProcessVo vo) {
		//System.out.println(vo);
		return 1 == sqlSession.insert("process.insert", vo);
	}

	public Long findMaxSeq(Long projectNo) {
		return sqlSession.selectOne("process.findMaxSeq", projectNo);
	}

	public Boolean update(ProcessVo vo) {
		return 1 == sqlSession.update("process.update", vo);
	}

	public Boolean delete(Long no) {
		return 1 == sqlSession.delete("process.delete", no);
	}

}
