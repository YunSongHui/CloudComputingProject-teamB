SELECT id, 
       company,title,sitename, 
       count(*) as cnt 
  FROM Recruitment_Info
   GROUP BY company,title,sitename  
HAVING count(id)>1; 