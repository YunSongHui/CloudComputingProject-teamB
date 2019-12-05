package kr.co.kim.Recruitment;

public class RecruitmentVO {

	private String company;
	private String title;
	private String titlelink;
	private String sitename;
	private String field1;
	private String field2;
	private String field3;
	private String career;
	private String academic; 
	private String area;
	private String workingcondition;
	private String deadline;
	private float star;
	private int income;
	private String publicTransport;
	private String car;
	private String walk;
	
	public RecruitmentVO() { // 생성자
		
	}
	
	public RecruitmentVO(String company, String title, String titlelink, String sitename, String field1, String field2, String field3
			, String career, String academic, String area, String workingcondition, String deadline, float star, int income
			, String publicTransport, String car, String walk) {
		super();
		this.company = company;
		this.title = title;
		this.titlelink = titlelink;
		this.sitename = sitename;
		this.field1 = field1;
		this.field2 = field2;
		this.field3 = field3;
		this.career = career;
		this.academic = academic;
		this.area = area;
		this.workingcondition = workingcondition;
		this.deadline = deadline;
		this.star = star;
		this.income = income;
		this.publicTransport = publicTransport;
		this.car = car;
		this.walk = walk;
		
	} // 생성자
	
	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getTitlelink() {
		return titlelink;
	}

	public void setTitlelink(String titlelink) {
		this.titlelink = titlelink;
	}

	public String getSitename() {
		return sitename;
	}

	public void setSitename(String sitename) {
		this.sitename = sitename;
	}

	public String getField1() {
		return field1;
	}

	public void setField1(String field1) {
		this.field1 = field1;
	}

	public String getField2() {
		return field2;
	}

	public void setField2(String field2) {
		this.field2 = field2;
	}

	public String getField3() {
		return field3;
	}

	public void setField3(String field3) {
		this.field3 = field3;
	}

	public String getCareer() {
		return career;
	}

	public void setCareer(String career) {
		this.career = career;
	}

	public String getAcademic() {
		return academic;
	}

	public void setAcademic(String academic) {
		this.academic = academic;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getWorkingcondition() {
		return workingcondition;
	}

	public void setWorkingcondition(String workingcondition) {
		this.workingcondition = workingcondition;
	}

	public String getDeadline() {
		return deadline;
	}

	public void setDeadline(String deadline) {
		this.deadline = deadline;
	}

	public float getStar() {
		return star;
	}

	public void setStar(float star) {
		this.star = star;
	}

	public int getIncome() {
		return income;
	}

	public void setIncome(int income) {
		this.income = income;
	}

	public String getPublicTransport() {
		return publicTransport;
	}

	public void setPublicTransport(String publicTransport) {
		this.publicTransport = publicTransport;
	}

	public String getCar() {
		return car;
	}

	public void setCar(String car) {
		this.car = car;
	}

	public String getWalk() {
		return walk;
	}

	public void setWalk(String walk) {
		this.walk = walk;
	}

}
