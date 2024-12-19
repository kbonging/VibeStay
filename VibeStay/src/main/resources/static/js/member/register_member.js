function fnSendEmail() {
    // 인증번호 입력창 표시
    document.getElementById('verificationCodeDiv').style.display = 'block';
    alert('인증번호가 전송되었습니다. 이메일을 확인하세요.');
}

$(function(){
	$('#memberRegisterBtn').click(function(){
		alert("회원가입 개발중..");
	});
});