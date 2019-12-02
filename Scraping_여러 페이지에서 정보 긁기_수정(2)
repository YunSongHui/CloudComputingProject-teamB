import requests
import re
import lxml.html
import MySQLdb

conn = MySQLdb.connect(db='Crawler', user='cloud', passwd='1111', charset='utf8mb4')

c=conn.cursor()

def crawling(page_count):
    front_url="http://www.jobkorea.co.kr/Starter/?JoinPossible_Stat=0&schOrderBy=0&LinkGubun=0&LinkNo=0&schType=0&schGid=0&Page="

    result=[]

    for i in range(1, page_count+1):
        url = front_url+str(i)

        list_page=requests.get(url)
        root=lxml.html.fromstring(list_page.content)
        for everything in root.cssselect('.filterList'):
            for thing in everything.cssselect('li'):

                companies = thing.cssselect('.co .coTit a')
                company = companies[0].text.strip()
                result.append(company)

                titles = thing.cssselect('.info .tit a')
                title = titles[0].text_content().strip()
                result.append(title)
                title_url = titles[0].get('href')
                result.append(title_url)

                site_name = '잡코리아'

                result.append(site_name)

                field1 = thing.cssselect('.info .sTit span:nth-child(1)')
                field1 = field1[0].text
                result.append(field1)

                field2 = thing.cssselect('.info .sTit span:nth-child(2)')
                if not field2:
                    field2 = 'NULL'
                    result.append('')
                elif field2:
                    field2 = field2[0].text
                    result.append(field2)

                field3 = thing.cssselect('.info .sTit span:nth-child(3)')
                if not field3:
                    field3 = 'NULL'
                    result.append('')
                elif field3:
                    field3 = field3[0].text
                    result.append(field3)

                careers = thing.cssselect('.sDesc strong')
                career = careers[0].text

                result.append(career)

                academics = thing.cssselect('.sDesc span:nth-child(2)')
                academic = academics[0].text
                result.append(academic)

                title_url = 'http://www.jobkorea.co.kr'+title_url
                detail_page = requests.get(title_url)
                work = lxml.html.fromstring(detail_page.content)
                working = work.cssselect('.tbRow.clear div:nth-child(2) dd:nth-child(2) .addList .col_1')
                if not working:
                    workingcondition = ''
                    result.append('')
                elif working:
                    workingcondition = working[0].text
                    result.append(workingcondition)

                areas = thing.cssselect('.sDesc span:nth-child(3)')
                area = areas[0].text
                area = area.split(', ')[0]
                result.append(area)

                deadlines = thing.cssselect('.side .day')
                deadline = deadlines[0].text

                result.append(deadline)

                insert_sql = 'INSERT INTO Recruitment_Info(company, title, titlelink, sitename, field1, field2, field3, career, academic, area, workingcondition, deadline) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'

                insert_val = company, title, title_url, site_name, field1, field2, field3, career, academic, area, workingcondition, deadline

                c.execute(insert_sql, insert_val)
                conn.commit()

    return result

def main():
    page_count = 4
    result=crawling(page_count)

    print(result)
    print()

    conn.close()

main()
