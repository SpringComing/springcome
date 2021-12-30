package springcome.vo;

public class UserVo {

	private Long no;
	private String email;
	private String password;
	private String name;
	private String tel;
	private String birth;
	private String join_date;
	private String profile;
	private String image;
	
	public Long getNo() {
		return no;
	}
	public void setNo(Long no) {
		this.no = no;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}


	
	
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;

	}
	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getBirth() {
		return birth;
	}
	public void setBirth(String birth) {
		this.birth = birth;
	}
	public String getJoin_date() {
		return join_date;
	}
	public void setJoin_date(String join_date) {
		this.join_date = join_date;
	}
	public String getProfile() {
		return profile;
	}
	public void setProfile(String profile) {
		this.profile = profile;
	}
	@Override
	public String toString() {
		return "UserVo [no=" + no + ", email=" + email + ", password=" + password + ", name=" + name + ", tel=" + tel
				+ ", birth=" + birth + ", join_date=" + join_date + ", profile=" + profile + ", image=" + image + "]";
	}

}
