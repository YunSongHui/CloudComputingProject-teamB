# CloudComputingProject-teamB

## 1. 프로젝트의 내용 - 실시간 채용 공고 및 합격 예측 제공 서비스
#### 실시간 채용 공고
```
[잡코리아, 인쿠르트] 채용 공고
[잡플래닛] 기업 평점 및 연봉 정보
[카카오 맵] 집에서 회사까지 출퇴근 소요시간 측정
```
#### 합격 예측 제공 서비스
```
[잡코리아] 합격 스펙 데이터를 분석하여 사용자 입력 합격 점수 측정 및 합격 예측
```

## 2. 사용법
#### 결과물 url
http://54.235.0.24:8080/cloud_computing/HTML/main_page.html

#### 1. 기업별 합격예측 클릭
1. 학점, 오픽, 토익, 토익스피킹, 외국어, 자격증, 해외경험, 인턴, 수상내역, 교내/사회/봉사 내역 입력<br>
1-1) 기업별 자신의 스펙 점수와 합격가능성 확인 가능 <br>
1-2) show 부분에서 페이지에 보이는 데이터 수 증감 가능 <br>
1-3) search 기능을 통해 회사명, 스펙점수, 합격예측 확인 가능

#### 채용 공고 조회 클릭

2. 기업 채용 공고, 기업 평점, 평균 연봉 정보, 
대중교통, 자동차 소요시간 확인 가능<br>
2-1) 공고명 클릭시 채용 공고 상세 정보로 이동

## 3. 설치
#### Python3 및 pip3 설치  
$sudo apt-get install -y python3 python3-venv

$python3 -m venv scraping

$sudo apt-get install python3-pip

#### 라이브러리 설치  
$pip3 install requests

$pip3 install lxml

$pip3 install cssselect  

#### MySQL 설치 및 MySQL client 설치, 3306 포트 열기  
$sudo apt-cache search mysql-server

$sudo apt-get install -y mysql-server-5.7 libmysqlclient-dev

$sudo service mysql status

$sudo service mysql start

$vi /etc/mysql/conf.d/mysql.conf

[mysqld]  
datadir=/var/lib/mysql  
socket=/var/lib/mysql/mysql.sock  
user=mysql  
character-set-server=utf8  
collation-server=utf8_general_ci  
init_connect = set collation_connection = utf8_general_ci  
init_connect = set names utf8  
  
[mysql]  
default-character-set=utf8  
  
[mysqld_safe]  
log-error=/var/log/mysqld.log  
pid-file=/var/run/mysqld/mysqld.pid  
default-character-set=utf8  
  
[client]  
default-character-set=utf8  
  
[mysqldump]  
default-character-set=utf8  
  
$sudo /etc/init.d/mysql restart  

$mysql -u root -p  

```sql 
create user 'cloud'@'%' identified by '1111';  

GRANT ALL PRIVILEGES ON *.* TO 'cloud'@'%' IDENTIFIED BY '1111';  

quit  
```  

$sudo ufw allow 3306/tcp  

$pip3 install mysqlclient  

#### MySQL 테이블  
$mysql -u cloud -p

```sql
CREATE DATABASE IF NOT EXISTS `Crawler` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `Crawler`;

CREATE TABLE IF NOT EXISTS `Recruitment_Info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company` varchar(40) CHARACTER SET utf8 NOT NULL,
  `title` varchar(100) CHARACTER SET utf8 NOT NULL,
  `titlelink` varchar(100) CHARACTER SET utf8 NOT NULL,
  `sitename` varchar(20) CHARACTER SET utf8 NOT NULL,
  `field1` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `field2` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `field3` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `career` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `academic` varchar(10) CHARACTER SET utf8 DEFAULT NULL,
  `area` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `workingcondition` varchar(10) CHARACTER SET utf8 DEFAULT NULL,
  `deadline` varchar(15) CHARACTER SET utf8 DEFAULT NULL,
  `star` float DEFAULT NULL,
  `income` int(6) DEFAULT NULL,
  `publicTransport` time DEFAULT NULL,
  `car` time DEFAULT NULL,
  `walk` time DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


CREATE TABLE IF NOT EXISTS `SuccessSpec` (
  `company` varchar(50) NOT NULL,
  `grade` float DEFAULT NULL,
  `toeic` float DEFAULT NULL,
  `toeicSpeaking` float DEFAULT '0',
  `opic` float DEFAULT NULL,
  `language` float DEFAULT NULL,
  `certificate` float DEFAULT NULL,
  `oversea` float DEFAULT NULL,
  `intern` float DEFAULT NULL,
  `award` float DEFAULT NULL,
  `volunteer` float DEFAULT NULL,
  PRIMARY KEY (`company`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


```
  
#### 크롤러 정기적으로 실행하기
#!/bin/bash  

$cd $(dirname $0)  

$. /home/ubuntu/scraping/bin/activate  

$python3 /home/ubuntu/JobKorea.py > /home/ubuntu/run_JobKorea.sh

$chmod +x /home/ubuntu/run_JobKorea.sh  

$sudo vi /etc/crontab  
50 * * * * ubuntu home/ubuntu/run_JobKorea.sh > /tmp/JobKorea.log 2>&1  


## Node.js 기반 크롤러 실행 방법
#### node.js 설치
``` sudo apt-get install nodejs```

#### npm 설치
``` sudo apt-get install npm```

#### 의존성 모듈 설치
``` npm install ```

#### 데이터베이스 사용자 정보 입력
```
데이터베이스 설정 파일 경로 : ./DatabaseConnector/db_config.json

{
    "host": "데이터베이스 서버 IP",
    "user": "데이터베이스 사용자 이름",
    "password": "데이터베이스 사용자 비밀번호",
    "database": "데이터베이스 이름"
}
```

#### 인크루트 크롤러 실행
```
node incruitCrawling/incruitcrawling
```
#### 잡플래닛 크롤러 실행
```
node jobPlanetCrawling/jobplanet
```
#### 카카오 맵 크롤러 실행
```
node kakaomapCrawling/kakaoMap
```
#### 잡코리아 스펙정보 크롤러 실행
```
node jobkoreaSuccess/jobkoreaSuccess
```
#### 잡코리아 합격예측 서버 실행
```
node jobkoreaSuccess/jobkoreaSuccessServer/bin/www
```

### 참고) Node.js 백그라운드 실행방법
#### pm2 모듈 설치
```
sudo npm i pm2 -g
```
#### 백그라운드에서 실행
```
sudo pm2 start incruitCrawling/incruitcrawling.js
sudo pm2 start jobPlanetCrawling/jobplanet.js
sudo pm2 start kakaomapCrawling/kakaoMap.js
sudo pm2 start jobkoreaSuccess/jobkoreaSuccess.js
sudo pm2 start jobkoreaSuccess/jobkoreaSuccessServer/bin/www
```
#### 백그라운드 프로세스 리스트 확인
```
sudo pm2 list
```
#### 백그라운드 프로세스 로그 확인
```
sudo pm2 logs
```
#### 모든 백그라운드 프로세스 죽이기
```
sudo pm2 kill
```