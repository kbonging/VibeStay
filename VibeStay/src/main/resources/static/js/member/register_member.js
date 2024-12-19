function fnSendEmail() {
    // 인증번호 입력창 표시
    document.getElementById('verificationCodeDiv').style.display = 'block';
    alert('인증번호가 전송되었습니다. 이메일을 확인하세요.');
}

//입력 값 체크
function fnValidation() {
    if ($('#memberId').val() == "") {
        $('#memberId').focus();
        return false;
    }
    if ($('#memberPwd').val() == "") {
        $('#memberPwd').focus();
        return false;
    }
    if ($('#memberEmail').val() == "") {
        $('#memberEmail').focus();
        return false;
    }
    if ($('#memberName').val() == "") {
        $('#memberName').focus();
        return false;
    }

    return true;
}

/* 회원가입 처리*/
function fnMemberRegist(){
	alert("회원가입 버튼");
	
	if(!fnValidation()) return;
	
	// AJAX 요청
	$.ajax({
        type: "POST",
        url: "/member/regist.do", // 서버 요청 URL
        contentType: "application/json",  // content-type을 application/json으로 설정
        data: JSON.stringify({  // 데이터를 JSON 형식으로 변환
            memberId: $('#memberId').val(),
            memberPwd: $('#memberPwd').val(),
            memberName: $('#memberName').val(),
            memberEmail: $('#memberEmail').val()
        }),
        dataType: "json",  // 서버에서 JSON 형식으로 응답
        success: function(response) {
            if (response === true) {
				alert("회원가입이 완료되었습니다. 로그인 후 서비스를 이용해 주세요.");
                window.location.href = "/main.do"; // 회원가입 성공 시 홈 화면으로 리다이렉트
            } else {
                alert("회원가입실패");
            }
        },
        error: function() {
            alert("일시적인 오류가 발생했습니다. 다시 시도해주세요. 만일 문제가 계속될 경우 고객센터(02-1234-5678)로 연락해주세요.");
        }
    }); //AJAX 끝
} //fnMemberRegist() 끝

$(function(){
	$('#memberRegisterBtn').click(function(){
		alert("회원가입 개발중..");
	});
});




