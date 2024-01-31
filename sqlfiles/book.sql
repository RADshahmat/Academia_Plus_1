--------------------------------------------------------
--  File created - Friday-January-19-2024   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table BOOKS
--------------------------------------------------------

CREATE TABLE "ACADEMIA_PLUS_NEW"."BOOKS" 
   (	
    "BOOK_ID" NUMBER,
    "BOOK_NAME" VARCHAR2(255 BYTE), 
    "TYPE" VARCHAR2(50 BYTE), 
    "AUTHOR" VARCHAR2(100 BYTE), 
    "BOOK_FILE" VARCHAR2(1000BYTE),
    
   ) SEGMENT CREATION DEFERRED 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  TABLESPACE "USERS" 
 LOB ("BOOK_FILE") STORE AS SECUREFILE (
  TABLESPACE "USERS" ENABLE STORAGE IN ROW 4000 CHUNK 8192
  NOCACHE LOGGING  NOCOMPRESS  KEEP_DUPLICATES ) ;

-- Creating a sequence for auto-incrementing BOOK_ID
CREATE SEQUENCE "ACADEMIA_PLUS_NEW"."BOOK_ID_SEQ"
   START WITH 1
   INCREMENT BY 1
   NOMAXVALUE
   NOCYCLE
   NOCACHE;

-- Creating a trigger to auto-increment BOOK_ID on insert
CREATE OR REPLACE TRIGGER "ACADEMIA_PLUS_NEW"."BOOKS_TRIGGER"
BEFORE INSERT ON "ACADEMIA_PLUS_NEW"."BOOKS"
FOR EACH ROW
BEGIN
   SELECT "BOOK_ID_SEQ".NEXTVAL INTO :NEW."BOOK_ID" FROM DUAL;
END;
/

REM INSERTING into ACADEMIA_PLUS_NEW.BOOKS
SET DEFINE OFF;

--------------------------------------------------------
--  DDL for Index SYS_C008231
--------------------------------------------------------

CREATE UNIQUE INDEX "ACADEMIA_PLUS_NEW"."SYS_C008231" ON "ACADEMIA_PLUS_NEW"."BOOKS" ("BOOK_ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 
  TABLESPACE "USERS";

--------------------------------------------------------
--  Constraints for Table BOOKS
--------------------------------------------------------

ALTER TABLE "ACADEMIA_PLUS_NEW"."BOOKS" ADD PRIMARY KEY ("BOOK_ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 
  TABLESPACE "USERS"  ENABLE;
