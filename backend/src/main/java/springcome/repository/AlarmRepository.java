package springcome.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import springcome.vo.AlarmVo;

@Repository
public class AlarmRepository {
	@Autowired
	private SqlSession sqlSession;

	public boolean insertAlarm(Map<String, Object> alarmData) {
		return sqlSession.insert("alarm.insertAlarm", alarmData) == 1;
	}

	public List<AlarmVo> findAlarm(Long userNo) {
		return sqlSession.selectList("alarm.findAlarm", userNo);
	}

	public boolean insertAlarmBox(Map<String, Object> alarmData) {
		return sqlSession.insert("alarm.insertAlarmBox", alarmData) == 1;
	}

	public boolean updateAlarmBox(Long userNo, Long alarmNo) {
		Map<String, Long> map = new HashMap<>();
		map.put("userNo", userNo);
		map.put("alarmNo", alarmNo);
		return sqlSession.update("alarm.updateAlarmBox",map) == 1;
	}

	public boolean deleteAlarmBox(Long userNo, Long alarmNo) {
		Map<String, Long> map = new HashMap<>();
		map.put("userNo", userNo);
		map.put("alarmNo", alarmNo);
		return sqlSession.update("alarm.deleteAlarmBox",map) == 1;
	}

	public boolean updateAllAlarmBox(Long userNo) {
		return sqlSession.update("alarm.updateAllAlarmBox",userNo) == 1;
	}

	public boolean deleteAllAlarmBox(Long userNo) {
		return sqlSession.update("alarm.deleteAllAlarmBox",userNo) == 1;
	}

	public boolean deleteReadAlarmBox(Long userNo) {
		return sqlSession.update("alarm.deleteReadAlarmBox",userNo) == 1;
	}
	
	
}
