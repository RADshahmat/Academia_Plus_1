--------------------------------------------------------
--  File created - Wednesday-January-17-2024   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table MESSAGE
--------------------------------------------------------

  CREATE TABLE "ACADEMIA_PLUS_NEW"."MESSAGE" 
   (	"COLUMN1" LONG
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
REM INSERTING into ACADEMIA_PLUS_NEW.MESSAGE
SET DEFINE OFF;
Insert into ACADEMIA_PLUS_NEW.MESSAGE (COLUMN1) values (' Welcome to Notre Dame College, an educational institute founded and administered by the Congregation of Holy Cross which has been serving the nation with a long standing tradition of excellence in academics, the Science, Business and Arts. Education is considered to be the core instrument of human development. Our objective at Notre Dame is the harmonious development of the intellectual, physical, social, moral and spiritual faculties of the students.');
