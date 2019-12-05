package kr.co.kim.Recruitment;

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
				
				String bcomp = rs.getString("company");
				String btitle = rs.getString("title");
				String btitlelink = rs.getString("titlelink");
				String bsitename = rs.getString("sitename");
				String bfield1 = rs.getString("field1");
				String bfield2 = rs.getString("field2");
				String bfield3 = rs.getString("field3");
				String bcareer = rs.getString("career");
				String bacademic = rs.getString("academic");
				String barea = rs.getString("area");
				String bworkingcondition = rs.getString("workingcondition");
				String bdeadline = rs.getString("deadline");
				float bstar = rs.getFloat("star");
				int bincome = rs.getInt("income");
				String bpublicT = rs.getString("publicTransport");
				String bcar = rs.getString("car");
				String bwalk = rs.getString("walk");
				
				RecruitmentVO vo = new RecruitmentVO(bcomp, btitle, btitlelink, bsitename
						, bfield1, bfield2, bfield3, bcareer, bacademic, barea, bworkingcondition
						, bdeadline, bstar, bincome, bpublicT, bcar, bwalk);
				
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
