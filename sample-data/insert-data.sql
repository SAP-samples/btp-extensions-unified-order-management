TRUNCATE TABLE IOM.COMMENTS;
INSERT INTO IOM.COMMENTS(CREATED_DATE,COMMENT_TEXT,AUTHOR,MATNO_PLANT,SD_NO_ITEM,PD_NO_ITEM,ID) VALUES ('12/18/2020, 17:24:16','Improved date not possible','Buyer/SME',NULL,'30000000_01',NULL,1);
INSERT INTO IOM.COMMENTS(CREATED_DATE,COMMENT_TEXT,AUTHOR,MATNO_PLANT,SD_NO_ITEM,PD_NO_ITEM,ID) VALUES ('12/18/2020, 17:25:34','please find alternate vendor or material','CSR','100010_999',NULL,NULL,2);

TRUNCATE TABLE IOM.MATERIAL_STOCK;
INSERT INTO IOM.MATERIAL_STOCK(MAT_NO,MFG_NO,UNIT,SOURCING_CAT,MFG_NAME,ABC,MRP_CONTROLLER,PLANNED_DELIVERY_TIME,GR_PROCESSING_TIME,SAFETY_STOCK,ROP,PROCUREMENT_TYPE,PURCH_GROUP,MAX_STOCK_LEVEL,MATNO_PLANT,PLANT,PPU,AVAILABLE_STOCK,MAT_DESC,MAT_STATUS,MAT_GRP,ESCALATION_STATUS) VALUES ('100010','17000','EA',NULL,'RECTANGLE A','A','1','58','0','0','100','F','2','0','100010_999','999','8.26','517','POLYGON AA','Backorder','RECt 00000',NULL);
INSERT INTO IOM.MATERIAL_STOCK(MAT_NO,MFG_NO,UNIT,SOURCING_CAT,MFG_NAME,ABC,MRP_CONTROLLER,PLANNED_DELIVERY_TIME,GR_PROCESSING_TIME,SAFETY_STOCK,ROP,PROCUREMENT_TYPE,PURCH_GROUP,MAX_STOCK_LEVEL,MATNO_PLANT,PLANT,PPU,AVAILABLE_STOCK,MAT_DESC,MAT_STATUS,MAT_GRP,ESCALATION_STATUS) VALUES ('100012','17000','EA',NULL,'RECTANGLE B','A','1','86','0','0','10','F','2','0','100012_999','999','9.66','32','POLYGON BB','Backorder','RECT 00000',NULL);

TRUNCATE TABLE IOM.PO_SCHEDULE_LINE;
INSERT INTO IOM.PO_SCHEDULE_LINE(PD_NO,PD_ITEM,SCHEDULE_LINENO,DELIVERY_DATE,SCHEDULED_QTY,COMMITTED_QTY) VALUES ('4000000000','01','1','20200727','3',0);
INSERT INTO IOM.PO_SCHEDULE_LINE(PD_NO,PD_ITEM,SCHEDULE_LINENO,DELIVERY_DATE,SCHEDULED_QTY,COMMITTED_QTY) VALUES ('4000000000','02','1','20200713','1',0);

TRUNCATE TABLE IOM.PURCHASE_ITEM;
INSERT INTO IOM.PURCHASE_ITEM(PD_NO,PD_ITEM,PD_NO_ITEM,STATUS,MAT_NO,PLANT,TRACKING_NUMBER,ORD_ACK,ORD_QTY,CUSTOMER,CREATED_BY,CREATED_ON) VALUES ('4000000000','01','4000000000_01','Ordered','100012','999',NULL,'43000000','50',NULL,'BATCHID','20200713');
INSERT INTO IOM.PURCHASE_ITEM(PD_NO,PD_ITEM,PD_NO_ITEM,STATUS,MAT_NO,PLANT,TRACKING_NUMBER,ORD_ACK,ORD_QTY,CUSTOMER,CREATED_BY,CREATED_ON) VALUES ('4000000000','01','4000000000_02','Ordered','100010','999',NULL,'43000000','150',NULL,'BATCHID','20200713');

TRUNCATE TABLE IOM.SALES_ITEM;
INSERT INTO IOM.SALES_ITEM(SD_ITEM,SD_NO,SD_NO_ITEM,MAT_NO,DESC,PLANT,REQD_QTY,REQ_DEL_DATE,SOLD_TO_PARTY,CREATED_ON,CREATED_BY,FLAG_ACK,FLAG_TRACK,FLAG_EXP,CMIR,LAST_MODIFIED,MPI) VALUES ('01','30000000','30000000_01','100010','POLYGON AA','999','50','20200713','PARTY','20200713','ADAM',NULL,NULL,NULL,NULL,NULL,NULL);