###################################  공지사항  ###################################
-- 파일에 작성된 데이터들은 "반드시" 모두 실행 해주시길 바랍니다.
-- 데이터를 넣지않아 프로그램 오류가 발생할 수 있습니다.
###############################################################################

#############################  tb_member 테이블 샘플 데이터 #############################
INSERT INTO tb_member (MEMBER_ID, MEMBER_PWD, MEMBER_NAME, MEMBER_EMAIL,  REG_DATE, MOD_DATE) 
VALUES ('superadmin', '$2a$10$icZ9WU92wGzRuGJLBvWwmOWUuCtEp4vezbFUS7RUaM0C3UwuFamnS', '메인관리자', 'apple75391@gmail.com', NOW(), NULL);
INSERT INTO tb_member (MEMBER_ID, MEMBER_PWD, MEMBER_NAME, MEMBER_EMAIL,  REG_DATE, MOD_DATE) 
VALUES ('devadmin', '$2b$12$/lenMCtwsZPw.JJQzb8sJOgTHwpq3Ca6J43rtToUIzrjXf8AIN.8W', '개발팀', 'devadmin01@vibestay.com', NOW(), NULL);

-- devadmin 계정(개발팀 공동 계정)의 비밀번호는 개발 문서 확인해주세요.
-- 개발시 개발팀 계정 사용하시면됩니다. 본인 계정 필요 시 사이트 회원가입해서 사용바랍니다. 
-- 만일 데이터베이스에서 직접 insert 필요 시 관리자에게 문의 바랍니다.
-- (superadmin, devadmin, 일반 유저 권한 차이 없음 걍 만든거 ㅎ 나중에 필요시 권한설정 할 예정)

select * from tb_member;
-- delete from tb_member where member_idx=3; -- 인덱스 번호로 회원 삭제(잘못 넣었을때만 사용)
#####################################################################################






