package springcome.vo;

public class TaskDiffVo {
	Long oriProcessNo;
	Long newProcessNo;
    Long taskNo;
    Long oriTaskSeq;
    Long newTaskSeq;
	public Long getOriProcessNo() {
		return oriProcessNo;
	}
	public void setOriProcessNo(Long oriProcessNo) {
		this.oriProcessNo = oriProcessNo;
	}
	public Long getNewProcessNo() {
		return newProcessNo;
	}
	public void setNewProcessNo(Long newProcessNo) {
		this.newProcessNo = newProcessNo;
	}
	public Long getTaskNo() {
		return taskNo;
	}
	public void setTaskNo(Long taskNo) {
		this.taskNo = taskNo;
	}
	public Long getOriTaskSeq() {
		return oriTaskSeq;
	}
	public void setOriTaskSeq(Long oriTaskSeq) {
		this.oriTaskSeq = oriTaskSeq;
	}
	public Long getNewTaskSeq() {
		return newTaskSeq;
	}
	public void setNewTaskSeq(Long newTaskSeq) {
		this.newTaskSeq = newTaskSeq;
	}
	@Override
	public String toString() {
		return "TaskDiffVo [oriProcessNo=" + oriProcessNo + ", newProcessNo=" + newProcessNo + ", taskNo=" + taskNo
				+ ", oriTaskSeq=" + oriTaskSeq + ", newTaskSeq=" + newTaskSeq + "]";
	}
    
    
}
