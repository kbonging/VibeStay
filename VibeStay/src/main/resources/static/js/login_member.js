//입력 값 체크
function fnValidation(){
	if($('#memberId').val()==""){
		$('.error-message-div').show();
		$('#memberId').focus();
		$('#error-message').text('아이디를 입력해 주세요');
		return false;		
	}else if(!validate_memberId($('#memberId').val())){
		$('.error-message-div').show();
		$('#memberId').focus();
		$('#error-message').text('아이디는 영문, 숫자, _(밑줄문자)만 가능합니다.');
		return false;
	}
	if(!validate_memberId($('#memberId').val())){
		//alert('id');
		return false;
	}
	if($('#memberPwd').val()==""){
		//alert('pwd');
		$('.error-message-div').show();
		$('#memberPwd').focus();
		$('#error-message').text('비밀번호를 입력해 주세요');
		return false;
	}
	return true;
}

/*로그인 처리*/
function fnMemberLogin(){
	//alert("로그인 버튼");
	
	if(!fnValidation()) return;
	
	// AJAX 요청
	$.ajax({
        type: "POST",
        url: "/member/login.do", // 서버 요청 URL
        contentType: "application/json",  // content-type을 application/json으로 설정
        data: JSON.stringify({  // 데이터를 JSON 형식으로 변환
            memberId: $('#memberId').val(),
            memberPwd: $('#memberPwd').val()
        }),
        dataType: "json",  // 서버에서 JSON 형식으로 응답
        success: function(response) {
            if (response === true) {
                window.location.href = "/main.do"; // 로그인 성공 시 홈 화면으로 리다이렉트
            } else {
                $('.error-message-div').show();
                $('#error-message').text('아이디 또는 비밀번호가 맞지 않아요. 다시 입력해 주세요');
            }
        },
        error: function() {
            alert("일시적인 오류가 발생했습니다. 다시 시도해주세요. 만일 문제가 계속될 경우 고객센터(02-1234-5678)로 연락해주세요.");
        }
    }); //AJAX 끝
} //fnMemberLogin() 끝

$(function(){
	$('.error-message-div').hide();
	
	$('#loginForm').on('keydown', function(event){
		if (event.key === "Enter") {
            // 엔터키가 눌리면 로그인 버튼 클릭
            fnMemberLogin();
            event.preventDefault(); // 엔터키 기본 동작인 폼 제출을 막음
        }
	});
}); // $(function() 끝

//아이디 영문, 숫자, 특수문자(_)만 가능
function validate_memberId(id) {
	var pattern = new RegExp(/^[a-zA-Z0-9_]+$/g);
	return pattern.test(id);
}