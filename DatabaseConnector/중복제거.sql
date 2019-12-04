DELETE FROM Recruitment_Info
WHERE id not in ( SELECT id from ( SELECT id from Recruitment_Info group by company,title,sitename) as id )