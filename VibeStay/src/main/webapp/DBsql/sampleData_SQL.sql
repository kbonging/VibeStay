#############################  tb_member 테이블 샘플 데이터 #############################
INSERT INTO tb_member (MEMBER_ID, MEMBER_PWD, MEMBER_NAME, MEMBER_EMAIL,  REG_DATE, MOD_DATE) 
VALUES ('superadmin', '$2b$12$0pslUhe1HCugHukoKkvJD.JQY/8Aavh6t6ZdekC6ZroZuCfLz.40C', '메인관리자', 'apple75391@gmail.com', NOW(), NULL);
#####################################################################################
select * from tb_member;





