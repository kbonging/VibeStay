///////// 전역 변수 ////////////
let isMemberIdAvailable = false;
////////////////////////////// 

function fnSendEmail() {
    // 인증번호 입력창 표시
    document.getElementById('verificationCodeDiv').style.display = 'block';
    alert('인증번호가 전송되었습니다. 이메일을 확인하세요.');
}

/*//영문, 숫자만 가능
function validate_memberId(id) {
	var pattern = new RegExp(/^[a-zA-Z0-9]+$/g);
	return pattern.test(id);
}

//영문, 숫자, 특수문자(_)만 가능 (비밀번호체크)
function validate_userid(id) {
	var pattern = new RegExp(/^[a-zA-Z0-9_]+$/g);
	return pattern.test(id);

}*/

function validateInput(input, pattern) {
    var regex = new RegExp(pattern);
    return regex.test(input);
}

//입력 값 체크
function fnValidation() {
	let isValid = true;
	
	/*아이디 체크*/
	if ($('#memberId').val() === "") {
        showErrorMessage('memberId', '아이디를 입력하세요.');
        isValid = false;
    } else if (!validateInput($('#memberId').val(), /^[a-z][a-z0-9]{5,19}$/)) {
        showErrorMessage('memberId', '영문으로 시작하는 6~20자 영문(소문자), 숫자만 사용 가능합니다.');
        isValid = false;
    } else {
       // hideErrorMessage('memberId'); // 유효하면 메시지 제거
    }
	
	/*비밀번호 체크*/
	if ($('#memberPwd').val() === "") {
        showErrorMessage('memberPwd', '비밀번호를 입력하세요.');
        isValid = false;
    } else if (!validateInput($('#memberPwd').val(), /^[a-zA-Z0-9!@#$%^&*]{8,12}$/)) {
        showErrorMessage('memberPwd', '8~12자 영문, 숫자, 특수문자만 가능합니다.');
        isValid = false;
    } else {
        hideErrorMessage('memberPwd'); // 유효하면 메시지 제거
    }
    
	/*비밀번호 확인 체크*/
	if($('#memberPwd').val() !== $('#confirmMemberPwd').val()){
		showErrorMessage('confirmMemberPwd', '비밀번호가 일치하지않습니다.');
        isValid = false;
	}else{
        hideErrorMessage('confirmMemberPwd'); // 유효하면 메시지 제거
	}
	
	/* 이메일 체크 */
	if ($('#memberEmail').val() === "") {
		//alert('이메일 체크');
	    showErrorMessage('memberEmail', '이메일을 입력하세요.');
	    isValid = false;
	} else if (!validateInput($('#memberEmail').val(), /^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
	    showErrorMessage('memberEmail', '올바른 이메일 형식을 입력하세요.');
	    isValid = false;
	} else {
	    hideErrorMessage('memberEmail'); // 유효하면 메시지 제거
	}
	
	/* 이름 체크 */
	if ($('#memberName').val() === "") {
	    showErrorMessage('memberName', '이름을 입력하세요.');
	    isValid = false;
	} else if (!validateInput($('#memberName').val(),	/^[가-힣]+$/)) {
	    showErrorMessage('memberName', '이름은 한글만 가능합니다.');
	    isValid = false;
	} else {
	    hideErrorMessage('memberName'); // 유효하면 메시지 제거
	}

    return isValid;
}

// 에러 메시지 표시 함수
function showErrorMessage(inputId, message) {
	// 해당 에러 메시지 영역 가져오기
	let errorDiv = $('#' + inputId).closest('.mb-3').find('.error-message-div');
    errorDiv.show(); // 에러 메시지 영역 표시
	let errorSpan = errorDiv.find('.error-message');
    errorSpan.text(message); // 에러 메시지 설정
	
	errorDiv.addClass('shake-effect'); // 흔들림 효과 추가
	// 흔들림 효과를 제거 (0.5초 후)
    setTimeout(function () {
        errorDiv.removeClass('shake-effect');
    }, 500); // 애니메이션 지속 시간과 동일하게 설정
}

// 에러 메시지 표시 숨기기 함수
function hideErrorMessage(inputId) {
    // 해당 에러 메시지 영역 가져오기
    let errorDiv = $('#' + inputId).closest('.mb-3').find('.error-message-div');
    errorDiv.hide(); // 에러 메시지 영역 숨기기
	let errorSpan = errorDiv.find('.error-message');
    errorSpan.text(""); // 에러 메시지 설정
}

/* 회원가입 처리*/
function fnMemberRegist(){
	//alert("회원가입 버튼");
	console.log(isMemberIdAvailable);
	if(!fnValidation() || !isMemberIdAvailable){
		if(!isMemberIdAvailable){
			$('#memberId').focus();
		}
		return;
	}else{
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
	}// else 끝
	
} //fnMemberRegist() 끝

/*아이디 중복 체크 함수*/
function checkMemberIdDuplicate(memberId) {
    $.ajax({
        type: 'POST',
        url: '/member/checkDuplicate', 
		contentType: "application/json",
		data: JSON.stringify({  // 데이터를 JSON 형식으로 변환
            memberId: memberId,
        }),
		dataType: "json", 
        success: function (response) {
			//console.log(response);
			if(response){
				showErrorMessage('memberId', '사용가능한 아이디입니다.')
				isMemberIdAvailable = true;
			}else{
				showErrorMessage('memberId', '이미 사용중인 아이디입니다.')
				isMemberIdAvailable = false;
			}
        },
        error: function () {
            alert("일시적인 오류가 발생했습니다. 다시 시도해주세요. 만일 문제가 계속될 경우 고객센터(02-1234-5678)로 연락해주세요.");
        }
    });
}
	
$(function(){
	alert("회원가입 개발중..\n현재 아이디 중복체크 개발 중입니다.\n입력값 유효성은 완료했지만 \"이미 사용중인 아이디입니다.\" 문구가떠도 서버요청 접근제한을 막지않아서 회원가입 시 주의 바람!");
	//$('.error-message-div').hide();
	
	////////////////////// 아이디 중복 체크 시작 (입력값이 변할때마다 호출) ///////////////////
	$('#memberId').on('input', function(){
		console.log("test");
		if ($('#memberId').val() === "") {
	        showErrorMessage('memberId', '아이디를 입력하세요.');
			isMemberIdAvailable = false;
	    } else if (!validateInput($('#memberId').val(), /^[a-z][a-z0-9]{5,19}$/)) {
	        showErrorMessage('memberId', '영문으로 시작하는 6~20자 영문(소문자), 숫자만 사용 가능합니다.');
			isMemberIdAvailable = false;
	    } else {
	        checkMemberIdDuplicate($('#memberId').val());
//	        hideErrorMessage('memberId'); // 유효하면 메시지 제거
	    }
	});
	//////////////////////////////// 아이디 중복 체크 끝 ////////////////////////////////
});




