@echo off
REM Copyright (c) 2012-2020, EnterpriseDB Corporation.  All rights reserved

REM PostgreSQL server psql runner script for Windows

SET server=ec2-3-214-121-14.compute-1.amazonaws.com


SET database=d8pa8mo2pvn7jr


SET port=5432
SET password=3006e3ce48b6783627ef3efb34a99f33ec675ea3a91db28429ff8e6dd5789533

SET username=psfdvhgvlhcnpl


for /f "delims=" %%a in ('chcp ^|find /c "932"') do @ SET CLIENTENCODING_JP=%%a
if "%CLIENTENCODING_JP%"=="1" SET PGCLIENTENCODING=SJIS
if "%CLIENTENCODING_JP%"=="1" SET /P PGCLIENTENCODING="Client Encoding [%PGCLIENTENCODING%]: "

REM Run psql
"C:\Soft\Postgresql\bin\psql.exe" -h %server% -U %username% -d %database% -p %port%

pause


