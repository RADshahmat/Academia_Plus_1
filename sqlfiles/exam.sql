--------------------------------------------------------
--  File created - Wednesday-January-17-2024   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table EXAM
--------------------------------------------------------

  CREATE TABLE "ACADEMIA_PLUS_NEW"."EXAM" 
   (	"EXAM_STAT" VARCHAR2(20 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
REM INSERTING into ACADEMIA_PLUS_NEW.EXAM
SET DEFINE OFF;
Insert into ACADEMIA_PLUS_NEW.EXAM (EXAM_STAT) values ('1');
