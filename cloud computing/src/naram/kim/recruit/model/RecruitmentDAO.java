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
	
	String url = "jdbc:mysql://ec2-54-235-0-24.compute-1.amazonaws.com/Crawler";
	String user = "cloud";
	String upw = "1111";
	
	Connection conn = null;
	PreparedStatement pstmt = null;
	Statement stmt = null;
	ResultSet rs = null;
	int total = 0;
	
	public ArrayList<RecruitmentVO> listRecruitment() {
		
		ArrayList<RecruitmentVO> list = new ArrayList<>();
		
		String sql = "select * from Recruitment_Info order by id";
		
		try {
			
			conn = DriverManager.getConnection(url,user,upw);
			
			pstmt = conn.prepareStatement(sql);
			
			rs = pstmt.executeQuery(); // executeQuery()를 통해 select문 실행
			
			while(rs.next()) {
				
				int id = rs.getInt(1);
				String company = rs.getString(2);
				String title = rs.getString(3);
				String titlelink = rs.getString(4);
				String sitename = rs.getString(5);
				String field1 = rs.getString(6);
				String field2 = rs.getString(7);
				String field3 = rs.getString(8);
				String career = rs.getString(9);
				String academic = rs.getString(10);
				String area = rs.getString(11);
				String workingcondition = rs.getString(12);
				String deadline = rs.getString(13);
				float star = rs.getFloat(14);
				int income = rs.getInt(15);
				String publicT = rs.getString(16);
				String car = rs.getString(17);
				String walk = rs.getString(18);
				
				RecruitmentVO vo = new RecruitmentVO(id, company, title, titlelink, sitename
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
	
	public ArrayList<RecruitmentVO> searchRecruitment(String search) {
		
		ArrayList<RecruitmentVO> list = new ArrayList<>();
		
		String sql = "select * from Recruitment_Info where company like ?";
		 
		
		try {
			conn = DriverManager.getConnection(url,user,upw);
			
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, "%"+search+"%");
			
			rs = pstmt.executeQuery(); // executeQuery()를 통해 select문 실행
			
			while(rs.next()) {
				
				int id = rs.getInt(1);
				String company = rs.getString(2);
				String title = rs.getString(3);
				String titlelink = rs.getString(4);
				String sitename = rs.getString(5);
				String field1 = rs.getString(6);
				String field2 = rs.getString(7);
				String field3 = rs.getString(8);
				String career = rs.getString(9);
				String academic = rs.getString(10);
				String area = rs.getString(11);
				String workingcondition = rs.getString(12);
				String deadline = rs.getString(13);
				float star = rs.getFloat(14);
				int income = rs.getInt(15);
				String publicT = rs.getString(16);
				String car = rs.getString(17);
				String walk = rs.getString(18);
				
				RecruitmentVO vo = new RecruitmentVO(id, company, title, titlelink, sitename
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