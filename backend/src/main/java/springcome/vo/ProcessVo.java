package springcome.vo;

import java.util.List;

public class ProcessVo {
	private Long no;
	private String name;
	private Long sequence;
	private Long projectNo;
	
	private List<TaskVo> tasks;

	public Long getNo() {
		return no;
	}

	public void setNo(Long no) {
		this.no = no;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getSequence() {
		return sequence;
	}

	public void setSequence(Long sequence) {
		this.sequence = sequence;
	}

	public Long getProjectNo() {
		return projectNo;
	}

	public void setProjectNo(Long projectNo) {
		this.projectNo = projectNo;
	}

	public List<TaskVo> getTasks() {
		return tasks;
	}

	public void setTasks(List<TaskVo> tasks) {
		this.tasks = tasks;
	}

	@Override
	public String toString() {
		return "ProcessVo [no=" + no + ", name=" + name + ", sequence=" + sequence + ", projectNo=" + projectNo
				+ ", tasks=" + tasks + "]";
	}
	
	
	
}
