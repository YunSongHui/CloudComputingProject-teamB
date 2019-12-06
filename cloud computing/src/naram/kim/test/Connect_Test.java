package naram.kim.test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class Connect_Test {
	public static void main(String args[]) {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			Connection con = DriverManager.getConnection("jdbc:mysql://ec2-184-72-68-146.compute-1.amazonaws.com/Crawler", "cloud", "1111");
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT company, title, titlelink FROM Recruitment_Info");
			
			while(rs.next())
				System.out.println(rs.getString(1)+ " "+rs.getString(2)+" "+rs.getString(3)+"\n");
				
			con.close();
		}catch(Exception e) { System.out.println(e); }
	}
}
