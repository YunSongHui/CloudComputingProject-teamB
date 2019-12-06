package naram.kim.recruit.controller;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import naram.kim.recruit.service.*;

/**
 * Servlet implementation class RecruitmentController
 */
@WebServlet("*.recruit")
public class RecruitmentController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RecruitmentController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doRequest(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doRequest(request, response));
	}
	
	protected void doRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
request.setCharacterEncoding("utf-8");
		
		String uri = request.getRequestURI();
		String conPath = request.getContextPath();
		String com = uri.substring( conPath.length() );
		
		System.out.println(com);
		
		String ui = null; //화면을 지정할 변수
		if(com.equals("/recruit/list.recruit")) {
			// list.board 요청이 들어오면
			// DB에서 모든 게시글 정보를 조회하는 작업을 추가합니다.
			
			IrecruitService sv = new ListServiceImpl();
			sv.excute(request, response);
						
			ui = "recruitment_page.jsp";
			// 자바에서 forward를 얻는 방법
			RequestDispatcher dp = request.getRequestDispatcher(ui);
			dp.forward(request, response);
			
			response.sendRedirect(ui);
		} 
	}
}
