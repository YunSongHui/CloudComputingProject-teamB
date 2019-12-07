<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page import="naram.kim.recruit.model.*" %>
<%@page import="java.util.ArrayList" %>

<%
	RecruitmentDAO dao = RecruitmentDAO.getInstance();

	ArrayList<RecruitmentVO> list = dao.listRecruitment();
	
	pageContext.setAttribute("list", list);
%>

<!DOCTYPE html>
<html>

<head>
<link rel="stylesheet" href="../CSS/content.css">
<link rel="stylesheet" href="../CSS/major.css">
<link rel="stylesheet" href="../CSS/tbody.css">
</head>

<body>
	<div class="area_public_content srch_wrap">
		<form id="searchForm" method="get"
			action="/zf_user/jobs/public/list#searchTitle">
			<div class="category_area">
				<fieldset>
					<h2 class="ico_category tit_career">경력</h2>
					<ul class="category">
						<li><input type="checkbox" id="pr_exp_lv-1"
							name="pr_exp_lv[]" value="1"> <label for="pr_exp_lv-1"
							title="신입">신입</label></li>
						<li><input type="checkbox" id="pr_exp_lv-2"
							name="pr_exp_lv[]" value="2"> <label for="pr_exp_lv-2"
							title="경력">경력</label></li>
						<li><input type="checkbox" id="pr_exp_lv-0"
							name="pr_exp_lv[]" value="0"> <label for="pr_exp_lv-0"
							title="경력무관">경력무관</label></li>
					</ul>
				</fieldset>
				<fieldset>
					<h2 class="ico_category tit_location">지역</h2>
					<ul class="category">
						<li><input type="checkbox" id="loc_mcd-101000"
							name="loc_mcd[]" value="101000"> <label
							for="loc_mcd-101000" title="서울">서울</label></li>
						<li><input type="checkbox" id="loc_mcd-106000"
							name="loc_mcd[]" value="106000"> <label
							for="loc_mcd-106000" title="부산">부산</label></li>
						<li><input type="checkbox" id="loc_mcd-108000"
							name="loc_mcd[]" value="108000"> <label
							for="loc_mcd-108000" title="인천">인천</label></li>
						<li><input type="checkbox" id="loc_mcd-104000"
							name="loc_mcd[]" value="104000"> <label
							for="loc_mcd-104000" title="대구">대구</label></li>
						<li><input type="checkbox" id="loc_mcd-105000"
							name="loc_mcd[]" value="105000"> <label
							for="loc_mcd-105000" title="대전">대전</label></li>
						<li><input type="checkbox" id="loc_mcd-103000"
							name="loc_mcd[]" value="103000"> <label
							for="loc_mcd-103000" title="광주">광주</label></li>
						<li><input type="checkbox" id="loc_mcd-107000"
							name="loc_mcd[]" value="107000"> <label
							for="loc_mcd-107000" title="울산">울산</label></li>
						<li><input type="checkbox" id="loc_mcd-102000"
							name="loc_mcd[]" value="102000"> <label
							for="loc_mcd-102000" title="경기">경기</label></li>
						<li><input type="checkbox" id="loc_mcd-111000"
							name="loc_mcd[]" value="111000"> <label
							for="loc_mcd-111000" title="경북">경북</label></li>
						<li><input type="checkbox" id="loc_mcd-110000"
							name="loc_mcd[]" value="110000"> <label
							for="loc_mcd-110000" title="경남">경남</label></li>
						<li><input type="checkbox" id="loc_mcd-113000"
							name="loc_mcd[]" value="113000"> <label
							for="loc_mcd-113000" title="전북">전북</label></li>
						<li><input type="checkbox" id="loc_mcd-112000"
							name="loc_mcd[]" value="112000"> <label
							for="loc_mcd-112000" title="전남">전남</label></li>
						<li><input type="checkbox" id="loc_mcd-114000"
							name="loc_mcd[]" value="114000"> <label
							for="loc_mcd-114000" title="충북">충북</label></li>
						<li><input type="checkbox" id="loc_mcd-115000"
							name="loc_mcd[]" value="115000"> <label
							for="loc_mcd-115000" title="충남">충남</label></li>
						<li><input type="checkbox" id="loc_mcd-109000"
							name="loc_mcd[]" value="109000"> <label
							for="loc_mcd-109000" title="강원">강원</label></li>
						<li><input type="checkbox" id="loc_mcd-116000"
							name="loc_mcd[]" value="116000"> <label
							for="loc_mcd-116000" title="제주">제주</label></li>
						<li><input type="checkbox" id="loc_mcd-118000"
							name="loc_mcd[]" value="118000"> <label
							for="loc_mcd-118000" title="세종">세종</label></li>
						<li><input type="checkbox" id="loc_mcd-200000"
							name="loc_mcd[]" value="200000"> <label
							for="loc_mcd-200000" title="해외">해외</label></li>
					</ul>
				</fieldset>
				<fieldset>
					<h2 class="ico_category tit_education">학력</h2>
					<ul class="category">
						<li><input type="checkbox" id="final_edu-1"
							name="final_edu[]" value="1"> <label for="final_edu-1"
							title="고등학교 졸업">고등학교 졸업</label></li>
						<li><input type="checkbox" id="final_edu-2"
							name="final_edu[]" value="2"> <label for="final_edu-2"
							title="대학 졸업(2,3년)">대학 졸업(2,3년)</label></li>
						<li><input type="checkbox" id="final_edu-3"
							name="final_edu[]" value="3"> <label for="final_edu-3"
							title="대학교 졸업(4년)">대학교 졸업(4년)</label></li>
						<li><input type="checkbox" id="final_edu-4"
							name="final_edu[]" value="4"> <label for="final_edu-4"
							title="석/박사 졸업">석/박사 졸업</label></li>
						<li><input type="checkbox" id="final_edu-5"
							name="final_edu[]" value="5"> <label for="final_edu-5"
							title="학력무관">학력무관</label></li>
					</ul>
				</fieldset>
				<fieldset>
					<h2 class="ico_category tit_company_type">기업형태</h2>
					<ul class="category">
						<li><input type="checkbox" id="company_scale-1"
							name="company_scale[]" value="1"> <label
							for="company_scale-1" title="대기업">대기업</label></li>
						<li><input type="checkbox" id="company_scale-2"
							name="company_scale[]" value="2"> <label
							for="company_scale-2" title="매출1000대기업">매출1000대기업</label></li>
						<li><input type="checkbox" id="company_scale-3"
							name="company_scale[]" value="3"> <label
							for="company_scale-3" title="중견기업">중견기업</label></li>
						<li><input type="checkbox" id="company_scale-4"
							name="company_scale[]" value="4"> <label
							for="company_scale-4" title="공사·공기업">공사·공기업</label></li>
						<li><input type="checkbox" id="company_scale-5"
							name="company_scale[]" value="5"> <label
							for="company_scale-5" title="코스닥">코스닥</label></li>
						<li><input type="checkbox" id="company_scale-6"
							name="company_scale[]" value="6"> <label
							for="company_scale-6" title="코스피">코스피</label></li>
						<li><input type="checkbox" id="company_scale-7"
							name="company_scale[]" value="7"> <label
							for="company_scale-7" title="외국계">외국계</label></li>
						<li><input type="checkbox" id="company_scale-8"
							name="company_scale[]" value="8"> <label
							for="company_scale-8" title="중소기업">중소기업</label></li>
					</ul>
				</fieldset>
				<fieldset>
					<h2 class="ico_category tit_business_type">업종</h2>
					<ul class="category">
						<li><input type="checkbox" id="up_cd-1" name="up_cd[]"
							value="1"> <label for="up_cd-1" title="서비스업">서비스업</label>
						</li>
						<li><input type="checkbox" id="up_cd-2" name="up_cd[]"
							value="2"> <label for="up_cd-2" title="제조업">제조업</label></li>
						<li><input type="checkbox" id="up_cd-3" name="up_cd[]"
							value="3"> <label for="up_cd-3" title="IT">IT</label></li>
						<li><input type="checkbox" id="up_cd-4" name="up_cd[]"
							value="4"> <label for="up_cd-4" title="금융업">금융업</label></li>
						<li><input type="checkbox" id="up_cd-5" name="up_cd[]"
							value="5"> <label for="up_cd-5" title="미디어">미디어</label></li>
						<li><input type="checkbox" id="up_cd-6" name="up_cd[]"
							value="6"> <label for="up_cd-6" title="교육업">교육업</label></li>
						<li><input type="checkbox" id="up_cd-7" name="up_cd[]"
							value="7"> <label for="up_cd-7" title="유통업">유통업</label></li>
						<li><input type="checkbox" id="up_cd-8" name="up_cd[]"
							value="8"> <label for="up_cd-8" title="건설업">건설업</label></li>
						<li><input type="checkbox" id="up_cd-9" name="up_cd[]"
							value="9"> <label for="up_cd-9" title="기타">기타</label></li>
					</ul>
				</fieldset>
				<fieldset>
					<h2 class="ico_category tit_work_type">근무형태</h2>
					<ul class="category">
						<li><input type="checkbox" id="jobtype-1" name="jobtype[]"
							value="1"> <label for="jobtype-1" title="정규직">정규직</label>
						</li>
						<li><input type="checkbox" id="jobtype-2" name="jobtype[]"
							value="2"> <label for="jobtype-2" title="계약직">계약직</label>
						</li>
						<li><input type="checkbox" id="jobtype-3" name="jobtype[]"
							value="3"> <label for="jobtype-3" title="인턴">인턴</label></li>
						<li><input type="checkbox" id="jobtype-4" name="jobtype[]"
							value="4"> <label for="jobtype-4" title="전환형 인턴">전환형
								인턴</label></li>
					</ul>
				</fieldset>
			</div>
			<div class="area_condition">
				<div class="btn_area" id="listTop">
					<button type="button" class="btn_reset" data-id="btn_reset"
						data-type="public">선택 초기화</button>
					<button type="button" class="btn_srch" data-id="btn_search"
						data-type="public">선택한 조건으로 검색</button>
				</div>
			</div>
		</form>
	</div>

	<div class="major_list_wrap">

		<div class="recruilt_list_wrap">

			<div class="list_info">
				<div class="cm_name_searchbox">
					<form name="frm" id="frm" method="get" action="#listTop">
						<input type="text" name="search_keyword" id="search_keyword"
							placeholder="기업명, 채용공고제목">
						<button type="button" id="btn_company_search"
							onmousedown="try{n_trackEvent('public-recruit','search_btn','','');}catch(e){}">검색</button>
					</form>
				</div>
			</div>
			
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
							<div class="source_logo" style="padding-top: 7px">
								<a href="https://www.incruit.com/" target="_blank">
								<img src="../image/incruit.png" alt="출처 사이트" width="90" height="30"></a>
							</div>
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
		</div>
	</div>

</body>

</html>