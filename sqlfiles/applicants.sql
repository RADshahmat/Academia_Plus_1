--------------------------------------------------------
--  File created - Wednesday-December-27-2023   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table APPLICANTS
--------------------------------------------------------

  CREATE TABLE "ACADEMIA_PLUS_NEW"."APPLICANTS" 
   (	"APPLICANT_ID" VARCHAR2(6 BYTE), 
	"APPLICANT_NAME" VARCHAR2(255 BYTE), 
	"MOBILE_NO" VARCHAR2(15 BYTE), 
	"FATHER_NAME" VARCHAR2(255 BYTE), 
	"MOTHER_NAME" VARCHAR2(255 BYTE), 
	"P_ADDRESS" VARCHAR2(255 BYTE), 
	"C_ADDRESS" VARCHAR2(255 BYTE), 
	"DOB" DATE, 
	"CLASS" VARCHAR2(50 BYTE), 
	"IMAGE_ADDRESS" VARCHAR2(255 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
REM INSERTING into ACADEMIA_PLUS_NEW.APPLICANTS
SET DEFINE OFF;
Insert into ACADEMIA_PLUS_NEW.APPLICANTS (APPLICANT_ID,APPLICANT_NAME,MOBILE_NO,FATHER_NAME,MOTHER_NAME,P_ADDRESS,C_ADDRESS,DOB,CLASS,IMAGE_ADDRESS) values ('000001','habibur Rhaman Khan Ratin','+8801747697661',null,'parvin akhter','new college row','KalusahSarak,Barisal',to_date('04-DEC-23','DD-MON-RR'),'three','1702150262250-istockphoto-1190402070-1024x1024.jpg');
Insert into ACADEMIA_PLUS_NEW.APPLICANTS (APPLICANT_ID,APPLICANT_NAME,MOBILE_NO,FATHER_NAME,MOTHER_NAME,P_ADDRESS,C_ADDRESS,DOB,CLASS,IMAGE_ADDRESS) values ('000002','habibur Rhaman Khan Ratin','01304875529',null,'gsvxsvxhagvxhs','new college row','KalusahSarak,Barisal',to_date('08-DEC-23','DD-MON-RR'),'one','1702151623958-love-hearts-4k-full-screen-wallpaper-preview.jpg');
Insert into ACADEMIA_PLUS_NEW.APPLICANTS (APPLICANT_ID,APPLICANT_NAME,MOBILE_NO,FATHER_NAME,MOTHER_NAME,P_ADDRESS,C_ADDRESS,DOB,CLASS,IMAGE_ADDRESS) values ('000003','habibur Rhaman Khan Ratin','01304875529efe',null,'gsvxsvxhagvxhs','new college row','KalusahSarak,Barisal',to_date('08-DEC-23','DD-MON-RR'),'one','1702151686866-FireShot Capture 006 - School_College Management system - localhost.png');
Insert into ACADEMIA_PLUS_NEW.APPLICANTS (APPLICANT_ID,APPLICANT_NAME,MOBILE_NO,FATHER_NAME,MOTHER_NAME,P_ADDRESS,C_ADDRESS,DOB,CLASS,IMAGE_ADDRESS) values ('000004','habibur Rhaman Khan Ratin','+880efef',null,'efef','efefef','efeff',to_date('05-JAN-24','DD-MON-RR'),'eight','1702151709684-1606987343353.jpg');
Insert into ACADEMIA_PLUS_NEW.APPLICANTS (APPLICANT_ID,APPLICANT_NAME,MOBILE_NO,FATHER_NAME,MOTHER_NAME,P_ADDRESS,C_ADDRESS,DOB,CLASS,IMAGE_ADDRESS) values ('000006','habibur Rhaman Khan Ratin','+8801747697661',null,'parvin akhter','new college row','KalusahSarak,Barisal',to_date('22-DEC-23','DD-MON-RR'),'eight','1703496972584-istockphoto-1190402070-1024x1024.jpg');
Insert into ACADEMIA_PLUS_NEW.APPLICANTS (APPLICANT_ID,APPLICANT_NAME,MOBILE_NO,FATHER_NAME,MOTHER_NAME,P_ADDRESS,C_ADDRESS,DOB,CLASS,IMAGE_ADDRESS) values ('000007','habibur Rhaman Khan Ratin','+88017476',null,'parvin akhter','new college row','KalusahSarak,Barisal',to_date('28-DEC-23','DD-MON-RR'),'four','1703497331411-1606987343353.jpg');
Insert into ACADEMIA_PLUS_NEW.APPLICANTS (APPLICANT_ID,APPLICANT_NAME,MOBILE_NO,FATHER_NAME,MOTHER_NAME,P_ADDRESS,C_ADDRESS,DOB,CLASS,IMAGE_ADDRESS) values ('000012','habibur Rhaman Khan Ratin','+88017476rf','taybur Rahman','parvin akhter','new college row','KalusahSarak,Barisal',to_date('21-DEC-23','DD-MON-RR'),'two','1703598619734-B612_20200902_173931_111.jpg');
Insert into ACADEMIA_PLUS_NEW.APPLICANTS (APPLICANT_ID,APPLICANT_NAME,MOBILE_NO,FATHER_NAME,MOTHER_NAME,P_ADDRESS,C_ADDRESS,DOB,CLASS,IMAGE_ADDRESS) values ('000008','baten','+880174769',null,'parvin akhter','new college row','KalusahSarak,Barisal',to_date('15-DEC-23','DD-MON-RR'),'four','1703569732608-desktop-wallpaper-apex-legends-caustic.jpg');
Insert into ACADEMIA_PLUS_NEW.APPLICANTS (APPLICANT_ID,APPLICANT_NAME,MOBILE_NO,FATHER_NAME,MOTHER_NAME,P_ADDRESS,C_ADDRESS,DOB,CLASS,IMAGE_ADDRESS) values ('000009','habibur Rhaman Khan Ratin','+88017476925',null,'parvin akhter','new college row','KalusahSarak,Barisal',to_date('14-DEC-23','DD-MON-RR'),'four','1703569915242-Screenshot (66).png');
Insert into ACADEMIA_PLUS_NEW.APPLICANTS (APPLICANT_ID,APPLICANT_NAME,MOBILE_NO,FATHER_NAME,MOTHER_NAME,P_ADDRESS,C_ADDRESS,DOB,CLASS,IMAGE_ADDRESS) values ('000013','HR khan Ratin','01747697','taybur Rahman','parvin akhter','new college row','KalusahSarak,Barisal',to_date('30-DEC-23','DD-MON-RR'),'nine','1703620869626-B612_20200922_000606_694.jpg');
Insert into ACADEMIA_PLUS_NEW.APPLICANTS (APPLICANT_ID,APPLICANT_NAME,MOBILE_NO,FATHER_NAME,MOTHER_NAME,P_ADDRESS,C_ADDRESS,DOB,CLASS,IMAGE_ADDRESS) values ('000005','Khan baba','+880174769766',null,'Mokha','Dhaka','Bsbsbsb',to_date('15-DEC-23','DD-MON-RR'),'eight','1702327234584-1690573887743-images (3).jpeg');
Insert into ACADEMIA_PLUS_NEW.APPLICANTS (APPLICANT_ID,APPLICANT_NAME,MOBILE_NO,FATHER_NAME,MOTHER_NAME,P_ADDRESS,C_ADDRESS,DOB,CLASS,IMAGE_ADDRESS) values ('000010','habibur Rhaman Khan Ratin','+88017476976612','taybur Rahman','parvin akhter','new college row','KalusahSarak,Barisal',to_date('19-DEC-23','DD-MON-RR'),'three','1703574844379-Screenshot (28).png');
Insert into ACADEMIA_PLUS_NEW.APPLICANTS (APPLICANT_ID,APPLICANT_NAME,MOBILE_NO,FATHER_NAME,MOTHER_NAME,P_ADDRESS,C_ADDRESS,DOB,CLASS,IMAGE_ADDRESS) values ('000011','habibur Rhaman Khan Ratin','+88017476976613','taybur Rahman','parvin akhter','new college row','KalusahSarak,Barisal',to_date('30-NOV-01','DD-MON-RR'),'ten','1703585167920-B612_20210324_154021_586.jpg');
--------------------------------------------------------
--  DDL for Trigger APPLICANT_ID_TRIGGER
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE TRIGGER "ACADEMIA_PLUS_NEW"."APPLICANT_ID_TRIGGER" 
BEFORE INSERT ON APPLICANTS
FOR EACH ROW
BEGIN
    SELECT TO_CHAR(applicant_id_seq.NEXTVAL, 'FM000000') INTO :NEW.APPLICANT_ID FROM DUAL;
END;

/
ALTER TRIGGER "ACADEMIA_PLUS_NEW"."APPLICANT_ID_TRIGGER" ENABLE;
