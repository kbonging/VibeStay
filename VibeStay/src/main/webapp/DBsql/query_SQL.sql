################# 이메일로 회원 조회 ####################
SELECT 
    MEMBER_IDX,
	MEMBER_ID,
	MEMBER_PWD,
	MEMBER_NAME,
	MEMBER_EMAIL,
	DEL_YN,
	REG_DATE,
	MOD_DATE
FROM tb_member
WHERE MEMBER_EMAIL='apple75391@gmail.com'AND DEL_YN = 'N';
#####################################################
################# 아이디로 회원 조회 ####################
SELECT 
    MEMBER_IDX,
	MEMBER_ID,
	MEMBER_PWD,
	MEMBER_NAME,
	MEMBER_EMAIL,
	DEL_YN,
	REG_DATE,
	MOD_DATE
FROM tb_member
WHERE MEMBER_ID='admin'AND DEL_YN = 'N';
#####################################################
