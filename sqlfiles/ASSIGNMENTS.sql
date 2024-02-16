--------------------------------------------------------
--  File created - Friday-February-09-2024   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table ASSIGNMENTS
--------------------------------------------------------

  CREATE TABLE "ACADEMIA_PLUS_NEW"."ASSIGNMENTS" 
   (	"COURSE_TITLE" VARCHAR2(512 BYTE), 
	"ASSIGNMENT_TITLE" VARCHAR2(512 BYTE), 
	"INSTRUCTIONS" VARCHAR2(512 BYTE), 
	"SUB_DATE" DATE, 
	"CLASS" VARCHAR2(50 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
REM INSERTING into ACADEMIA_PLUS_NEW.ASSIGNMENTS
SET DEFINE OFF;
Insert into ACADEMIA_PLUS_NEW.ASSIGNMENTS (COURSE_TITLE,ASSIGNMENT_TITLE,INSTRUCTIONS,SUB_DATE,CLASS) values ('bangla','poem','write a short poem',to_date('08-FEB-24','DD-MON-RR'),'class2');
Insert into ACADEMIA_PLUS_NEW.ASSIGNMENTS (COURSE_TITLE,ASSIGNMENT_TITLE,INSTRUCTIONS,SUB_DATE,CLASS) values ('CSE 17 CCE 313 Jan June 22','Final Assignment in a Single word file','1. Add a cover page
2. Add Index  as Assignment  1 to Assignment N',to_date('08-FEB-24','DD-MON-RR'),'class10');
Insert into ACADEMIA_PLUS_NEW.ASSIGNMENTS (COURSE_TITLE,ASSIGNMENT_TITLE,INSTRUCTIONS,SUB_DATE,CLASS) values ('English','poem','short poem',to_date('08-FEB-24','DD-MON-RR'),'class5');
