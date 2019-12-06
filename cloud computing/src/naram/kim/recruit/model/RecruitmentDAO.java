package naram.kim.recruit.model;

import java.sql.*;
import java.util.ArrayList;

public class RecruitmentDAO {
	
	private static RecruitmentDAO dao = new RecruitmentDAO();

	private RecruitmentDAO() {
		
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	//외부로부터 접근 가능한 public 메서드로 객체를 return
  
	public static RecruitmentDAO getInstance() {
		if(dao == null) { //안전장치
			dao = new RecruitmentDAO();
		}
		return dao;
	}
	
	String url = "jdbc:mysql://ec2-184-72-68-146.compute-1.amazonaws.com/Crawler";
	String user = "cloud";
	String upw = "1111";
	
	Connection conn = null;
	PreparedStatement pstmt = null;
	Statement stmt = null;
	ResultSet rs = null;
	
	public ArrayList<RecruitmentVO> listRecruitment() {
		
		ArrayList<RecruitmentVO> list = new ArrayList<>();
		
		String sql = "select * from Recruitment_Info order by id";
		
		try {
			
			conn = DriverManager.getConnection(url,user,upw);
			
			pstmt = conn.prepareStatement(sql);
			
			rs = pstmt.executeQuery(); // executeQuery()를 통해 select문 실행
			
			while(rs.next()) {
				
				String comp = rs.getString("company");
				String title = rs.getString("title");
				String titlelink = rs.getString("titlelink");
				String sitename = rs.getString("sitename");
				String field1 = rs.getString("field1");
				String field2 = rs.getString("field2");
				String field3 = rs.getString("field3");
				String career = rs.getString("career");
				String academic = rs.getString("academic");
				String area = rs.getString("area");
				String workingcondition = rs.getString("workingcondition");
				String deadline = rs.getString("deadline");
				float star = rs.getFloat("star");
				int income = rs.getInt("income");
				String publicT = rs.getString("publicTransport");
				String car = rs.getString("car");
				String walk = rs.getString("walk");
				
				RecruitmentVO vo = new RecruitmentVO(comp, title, titlelink, sitename
						, field1, field2, field3, career, academic, area, workingcondition
						, deadline, star, income, publicT, car, walk);
				
				list.add(vo);
			}
			
		} catch (Exception e) {
			 
			e.printStackTrace();
		
		} finally {
				
				try {
					
				if(conn != null) conn.close();
				if(pstmt != null) pstmt.close();
				if(rs != null) rs.close();
				
			} catch (Exception e2) {
				
				e2.printStackTrace();
				
			}

		}
		
		return list;
	}
}