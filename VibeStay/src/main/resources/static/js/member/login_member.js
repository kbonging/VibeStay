//입력 값 체크
function fnValidation() {
    if ($('#memberId').val() == "") {
        showErrorMessage('아이디를 입력해 주세요');
        $('#memberId').focus();
        return false;
    } else if (!validate_memberId($('#memberId').val())) {
        showErrorMessage('아이디는 영문, 숫자만 가능합니다.');
        $('#memberId').focus();
        return false;
    }

    if ($('#memberPwd').val() == "") {
        showErrorMessage('비밀번호를 입력해 주세요.');
        $('#memberPwd').focus();
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
                showErrorMessage('아이디 또는 비밀번호가 맞지 않아요. 다시 입력해 주세요.');
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

//아이디 영문, 숫자만 가능
function validate_memberId(id) {
	var pattern = new RegExp(/^[a-zA-Z0-9]+$/g);
	return pattern.test(id);
}

// 에러 메시지 표시 함수
function showErrorMessage(message) {
    $('.error-message-div').show(); // 에러 메시지 영역 표시
    $('#error-message').text(message); // 에러 메시지 설정
    $('.error-message-div').addClass('shake-effect'); // 흔들림 효과 추가

    // 흔들림 효과를 제거 (0.5초 후)
    setTimeout(function () {
        $('.error-message-div').removeClass('shake-effect');
    }, 500); // 애니메이션 지속 시간과 동일하게 설정
}