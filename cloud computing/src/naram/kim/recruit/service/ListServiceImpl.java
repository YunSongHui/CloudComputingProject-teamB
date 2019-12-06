package naram.kim.recruit.service;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import naram.kim.recruit.model.*;

public interface ListServiceImpl extends IrecruitService {
	@Override
	public void excute(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub

		RecruitmentDAO dao = RecruitmentDAO.getInstance(); // 모든 게시글 정보를 가져오는 메서드 실행
		
		ArrayList<RecruitmentVO> list = dao.listRecruitment();
		
		// 포워드로 값을 넘기기 전에 request 객체에 list를 저장해 줍니다.
		request.setAttribute("recruit_list", list);
	}
}