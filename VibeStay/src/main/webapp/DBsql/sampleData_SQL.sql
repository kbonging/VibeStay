#############################  tb_member 테이블 샘플 데이터 #############################
INSERT INTO tb_member (MEMBER_ID, MEMBER_PWD, MEMBER_NAME, MEMBER_EMAIL,  REG_DATE, MOD_DATE) 
VALUES ('admin', '$2b$12$5D5ZkhMD/gRway0KpmIzzOtfLFWnoiwEIZxGryc4eKhUzxG.Bktyu', '관리자', 'apple75391@gmail.com', NOW(), NULL);
#####################################################################################
select * from tb_member;
