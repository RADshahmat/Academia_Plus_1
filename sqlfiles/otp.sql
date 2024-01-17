--------------------------------------------------------
--  File created - Wednesday-January-17-2024   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table OTP
--------------------------------------------------------

  CREATE TABLE "ACADEMIA_PLUS_NEW"."OTP" 
   (	"EMAIL" VARCHAR2(255 BYTE), 
	"OTP" VARCHAR2(20 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
REM INSERTING into ACADEMIA_PLUS_NEW.OTP
SET DEFINE OFF;
Insert into ACADEMIA_PLUS_NEW.OTP (EMAIL,OTP) values ('asrafulislamsabbir72@gmail.com','687908');
