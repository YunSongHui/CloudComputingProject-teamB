<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page import="naram.kim.recruit.model.*" %>
<%@page import="java.util.ArrayList" %>

<%
	String search = request.getParameter("search_keyword");

	System.out.println(search);

	RecruitmentDAO dao = RecruitmentDAO.getInstance();

	ArrayList<RecruitmentVO> search_list = dao.searchRecruitment(search);
	
	pageContext.setAttribute("list", search_list);

%>    

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Searching Page</title>
</head>
<body>
<c:forEach var="li" items="${list }">
			<table class="common_recruit_list">
				<tbody>
					<tr id="rec-37345602" class="noti_list">
						<td class="company_nm" rowspan="2">
						<span class="str_tit">${li.company }</span>
						</td>
						<td class="notification_info">
							<div class="job_tit">
								<a class="str_tit" href="" target="_blank"
									style="text-decoration: none"><span>${li.title }</span>
								</a>
							</div>
							<div class="job_sector">
								<span>${li.field1 }</span><span>${li.field2 }</span><span>${li.field3 }</span>
							</div>
							<div class="recruit_condition">
								<span class="career">${li.career } </span><span class="education">${li.academic }</span>
							</div>
						</td>
						<td class="company_info">
							<p class="employment_type"  style="padding-top: 15px">${li.workingcondition }</p>
							<p class="work_place" style="padding-top: 10px">${li.area }</p>
						</td>
						<td class="support_info">
							<p class="deadlines" style="padding-top: 10px">마감 ${li.deadline }</p>
							<%
							%>
							<c:if test="${li.sitename eq '잡코리아' }">
							<div class="source_logo" style="padding-top: 7px">
								<a href="https://www.jobkorea.co.kr" target="_blank">
								<img src="../image/jobkorea.png" alt="출처 사이트" width="90" height="30"></a>
							</div>
							</c:if>
							<c:if test="${li.sitename eq '인크루트' }">
							<div class="source_logo" style="padding-top: 7px">
								<a href="https://www.incruit.com/" target="_blank">
								<img src="../image/incruit.png" alt="출처 사이트" width="90" height="30"></a>
							</div>
							</c:if>
						</td>
					</tr>
					<tr>
						<td class="average_info" colspan="3">
						<span style="margin-right:20px">평점 ${li.star }</span>
						<span>평균연봉 ${li.income }만</span></br>
						<span style="margin-right:20px">대중교통 소요시간 ${li.publicTransport }</span>
						<span style="margin-right:20px">자동차 소요시간 ${li.car }</span>
						<span>도보 소요시간 ${li.walk }</span>
						</td>
					</tr>
				</tbody>
			</table>
			</c:forEach>
</body>
</html>