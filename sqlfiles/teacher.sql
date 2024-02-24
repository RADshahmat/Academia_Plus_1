--------------------------------------------------------
--  File created - Wednesday-December-27-2023   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table TEACHERS
--------------------------------------------------------

  CREATE TABLE "ACADEMIA_PLUS_NEW"."TEACHERS" 
   (	"TEACHERID" VARCHAR2(6 BYTE), 
	"TEACHERFIRSTNAME" VARCHAR2(50 BYTE), 
	"TEACHERLASTNAME" VARCHAR2(50 BYTE), 
	"TEACHERDATEOFBIRTH" DATE, 
	"TEACHERGENDER" VARCHAR2(1 BYTE), 
	"TEACHERADDRESS" VARCHAR2(100 BYTE), 
	"TEACHERPHONENUMBER" VARCHAR2(15 BYTE), 
	"TEACHEREMAIL" VARCHAR2(100 BYTE)
   ) 
Insert into ACADEMIA_PLUS_NEW.TEACHERS (TEACHERID,TEACHERFIRSTNAME,TEACHERLASTNAME,TEACHERDATEOFBIRTH,TEACHERGENDER,TEACHERADDRESS,TEACHERPHONENUMBER,TEACHEREMAIL) values ('587835','John','Doe',to_date('15-JAN-80','DD-MON-RR'),'M','123 Main St, Cityville','555-1234','john.doe@example.com');
--------------------------------------------------------
--  DDL for Index SYS_C008224
--------------------------------------------------------

  CREATE UNIQUE INDEX "ACADEMIA_PLUS_NEW"."SYS_C008224" ON "ACADEMIA_PLUS_NEW"."TEACHERS" ("TEACHERID") 
 
--------------------------------------------------------
--  DDL for Trigger GENERATE_TEACHER_ID
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE TRIGGER "ACADEMIA_PLUS_NEW"."GENERATE_TEACHER_ID" 
BEFORE INSERT ON Teachers
FOR EACH ROW
BEGIN
    :NEW.TeacherID := LPAD(TO_CHAR(DBMS_RANDOM.VALUE(1, 999999)), 6, '0');
END;

/
ALTER TRIGGER "ACADEMIA_PLUS_NEW"."GENERATE_TEACHER_ID" ENABLE;
--------------------------------------------------------
--  Constraints for Table TEACHERS
--------------------------------------------------------

  ALTER TABLE "ACADEMIA_PLUS_NEW"."TEACHERS" ADD PRIMARY KEY ("TEACHERID")

