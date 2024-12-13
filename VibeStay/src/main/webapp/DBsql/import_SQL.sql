create database vibestay;
use vibestay;

######################### 회원 테이블 시작 ######################
create table tb_member(
	MEMBER_IDX INT primary key auto_increment COMMENT '회원 고유 번호',
    MEMBER_ID VARCHAR(60) NOT NULL COMMENT '회원 아이디',
    MEMBER_PWD VARCHAR(255) NOT NULL COMMENT '회원 비밀번호',
    MEMBER_EMAIL VARCHAR(60) NOT NULL COMMENT '회원 이메일',
    MEMBER_NAME VARCHAR(30) NOT NULL COMMENT '회원명',
    DEL_YN CHAR(1) NOT NULL default 'N' comment '삭제여부(Y, N)',
    REG_DATE DATETIME,
    MOD_DATE DATETIME
);
######################### 회원 테이블 끝 #######################

CREATE TABLE tb_member (
    MEMBER_IDX INT PRIMARY KEY AUTO_INCREMENT COMMENT '회원 고유번호',
    MEMBER_ID VARCHAR(60) UNIQUE COMMENT '자체 회원 아이디', -- 유니크 제약 추가
    MEMBER_PWD VARCHAR(255) COMMENT '자체 회원 비밀번호', -- 자체 회원 비밀번호 (소셜 로그인 계정은 비밀번호 없을 수 있음)
    MEMBER_NAME VARCHAR(30) NOT NULL COMMENT '회원명',
    SOCIAL_TYPE VARCHAR(20) default 'local' COMMENT '소셜 로그인 타입 (예: 카카오, 구글, 네이버 등)', -- 소셜 로그인 타입
    SOCIAL_ID VARCHAR(255) COMMENT '소셜 로그인 서비스의 사용자 고유 아이디', -- 소셜 로그인 ID
    SOCIAL_EMAIL VARCHAR(255) COMMENT '소셜 로그인 이메일', -- 소셜 로그인 서비스에서 제공하는 이메일
    DEL_YN CHAR(1) NOT NULL DEFAULT 'N' COMMENT '삭제여부(Y, N)',
    REG_DATE DATETIME NOT NULL COMMENT '가입일',
    MOD_DATE DATETIME COMMENT '수정일'
);
