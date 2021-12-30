package springcome.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springcome.repository.AlarmRepository;
import springcome.vo.AlarmVo;

@Service
public class AlarmService {
	@Autowired
	private AlarmRepository alarmRepository;

	public boolean addAlarm(Map<String, Object> alarmData) {
		
		boolean result = alarmRepository.insertAlarm(alarmData);
		
		if(result == false) {
			return result;
		}
		//System.out.println("---------------------------------------------------------alarmVo : " + alarmData);
		result = alarmRepository.insertAlarmBox(alarmData);
		
		return result;
	}

	public List<AlarmVo> getAlarm(Long userNo) {
		return alarmRepository.findAlarm(userNo);
	}

	public boolean updateAlarmBox(Long userNo, Long alarmNo) {
		return alarmRepository.updateAlarmBox(userNo,alarmNo);
	}

	public boolean deleteAlarmBox(Long userNo, Long alarmNo) {
		return alarmRepository.deleteAlarmBox(userNo,alarmNo);
	}

	public boolean updateAllAlarmBox(Long userNo) {
		return alarmRepository.updateAllAlarmBox(userNo);
	}

	public boolean deleteAllAlarmBox(Long userNo) {
		return alarmRepository.deleteAllAlarmBox(userNo);
	}

	public boolean deleteReadAlarmBox(Long userNo) {
		return alarmRepository.deleteReadAlarmBox(userNo);
	}
	
	
}
