# CloudComputingProject-teamB

#### Python3 및 pip3 설치
$sudo apt-get install -y python3 python3-venv

$python3 -m venv scraping

$sudo apt-get install python3-pip

#### Crawling lib 설치
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

mysql> create user 'cloud'@'%' identified by '1111';

mysql> GRANT ALL PRIVILEGES ON *.* TO 'cloud'@'%' IDENTIFIED BY '1111';

mysql> quit

$sudo ufw allow 3306/tcp

$pip3 install mysqlclient  

#### MySQL 테이블 
