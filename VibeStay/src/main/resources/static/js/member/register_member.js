///////// 전역 변수 ////////////
let isMemberIdAvailable = false; // 사용 가능 아이디 확인
let emailVerification = true; // 이메일 인증 체크 (기본값 flase로 바꿔야함 현재는 테스트중이라 ture)
let countdown;  // 타이머를 관리할 변수
////////////////////////////// 

// 타이머 시작 함수
function startTimer() {
	let timeLeft = 300;  // 5분 (300초)
	
    // 타이머가 이미 실행 중이면 멈추지 않도록 처리
    if (countdown) {
        clearInterval(countdown);
    }

    // 타이머 갱신 함수
    countdown = setInterval(function() {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        
        // 1자리 수는 0을 추가해서 표시 (예: 05)
        document.getElementById("timer").innerHTML = 
            `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        
        // 시간이 다 되면 타이머 멈추고 버튼 숨김
        if (timeLeft <= 0) {
            clearInterval(countdown);
            document.getElementById("timer").style.display = "none";  // 타이머 숨기기
            document.getElementById("verificationCodeBtn").disabled = true;  // 버튼 비활성화
            alert("인증 시간이 만료되었습니다.");
        } else {
            timeLeft--;  // 초 감소
        }
    }, 1000);  // 1초마다 실행
}

/*이메일 전송버튼 함수*/
function fnSendEmail() {
    // 인증번호 입력창 표시
    document.getElementById('verificationCodeDiv').style.display = 'block';
    document.getElementById("verificationCodeBtn").disabled = false;  // 버튼 활성화
	
	// 타이머 표시 및 시작
    document.getElementById('timer').style.display = 'inline';
    startTimer();
	
	showErrorMessage('memberEmail', '인증번호가 전송되었습니다. 메일 전송에 잠시 시간이 소요될 수 있습니다.');
	// 인증번호 전송 버튼 비활성화
    //document.getElementById('sendEmailBtn').disabled = true;
    //alert('인증번호가 전송되었습니다. 이메일을 확인하세요.');
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
	if($('#confirmMemberPwd').val() === ""){
		showErrorMessage('confirmMemberPwd', '비밀번호 확인을 입력하세요.');
	}else if($('#memberPwd').val() !== $('#confirmMemberPwd').val()){
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
	if(!fnValidation()){
		return;
	}else if(!isMemberIdAvailable){
		console.log("아이디 중복됨");
		$('#memberId').focus();
		return;
	}else if(!emailVerification){
		console.log("이메일 인증 안됨");
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
	alert("회원가입 개발중..(25.01.03)\n이메일 인증 기능 개발중\n아이디 중복검사 및 입력 유효성검사완료.\n\n현재 이메일인증 없이 정규식에 맞는 데이터를 넣으면 회원가입 처리는 됩니다 \n만일 해당 정규식에 맞지않은 데이터나 중복된 아이디가 서버로 넘어가는 경우 저한테 말좀 해주세요.. - bong");
	//$('.error-message-div').hide();
	
	////////////////////// 아이디 중복 체크 시작 (입력값이 변할때마다 호출) ///////////////////
	$('#memberId').on('propertychange change keyup paste input ', function(){
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




