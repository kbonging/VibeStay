///////// 전역 변수 ////////////
let isMemberIdAvailable = false; // 사용 가능 아이디 확인 (추 후 본안 이슈로 제거(다른 방법) 예정)
let emailVerification = false; // 이메일 인증 체크 (기본값 flase로 바꿔야함 현재는 테스트중이라 ture) (추 후 본안 이슈로 제거(다른 방법) 예정)
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
            alert("이메일 인증 시간이 만료되었습니다.");
        } else {
            timeLeft--;  // 초 감소
        }
    }, 1000);  // 1초마다 실행
}

/*이메일 전송버튼 함수*/
function fnSendEmail() {
	let email = $('#memberEmail').val();
	
	if(!validateInput(email, /^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
		showErrorMessage('memberEmail', '올바른 이메일 형식을 입력하세요.');
	}else{
	    // 인증번호 입력창 표시
	    document.getElementById('verificationCodeDiv').style.display = 'block';
	    document.getElementById("verificationCodeBtn").disabled = false;  // 버튼 활성화
		
		// 타이머 표시 및 시작
	    document.getElementById('timer').style.display = 'inline';
	    startTimer();
		
		showErrorMessage('memberEmail', '인증번호가 전송되었습니다. 메일 전송에 잠시 시간이 소요될 수 있습니다.');
		
		// 이메일 전송버튼 연속 요청 방지 설정
        var sendButton = document.getElementById("sendEmailBtn");
        sendButton.disabled = true; // 버튼 비활성화
        
        // 5초 후에 버튼 활성화
        setTimeout(function() {
            sendButton.disabled = false; // 버튼 활성화
        }, 5000);
		
		$.ajax({
	        type: "POST",
	        url: "/email/sendEmail",
			contentType: "application/json",  // content-type을 application/json으로 설정
	        data: JSON.stringify({  // 데이터를 JSON 형식으로 변환
	            memberEmail: email
	        }),
	        dataType: "json", // 응답 데이터 타입을 JSON으로 설정
	        success: function(response) {
	            if (response) {
					console.log("이메일 전송 완료");
	            } else {
					console.log("이메일 전송 실패");
	            }
	        },
			error: function() {
	            alert("일시적인 오류가 발생했습니다. 다시 시도해주세요. 만일 문제가 계속될 경우 고객센터(02-1234-5678)로 연락해주세요.");
	        }
		}); // ajax 끝 (이메일 전송)
		
	} // else 끝
	
}

/*이메일 인증*/
function verifyCode() {
	var email = $("#memberEmail").val();
    var code = $("#verificationCode").val();
	
	$.ajax({
	           type: "POST",
	           url: "/email/verifyCode",
			   contentType: "application/json",  // content-type을 application/json으로 설정
	   	        data: JSON.stringify({  // 데이터를 JSON 형식으로 변환
	   	            email: email,
					code : code
	   	        }),
	   	        dataType: "json", // 응답 데이터 타입을 JSON으로 설정
	           success: function(response) {
					if (response === true) {
	                    alert("인증 성공!"); // 인증 성공 메시지
						emailVerification = true;
					    // 인증번호 입력 필드 및 버튼 숨기기
					    $('#sendEmailBtn').hide();
					    $('#verificationCodeDiv').hide();
					    $('#memberEmail').prop('disabled', true);
						showErrorMessage('memberEmail', '인증 완료', '#007bff');
	                } else {
	                    alert("인증 실패! 이메일 또는 인증 코드가 일치하지 않거나 만료되었습니다."); // 인증 실패 메시지
	                }
	           },
	           error: function() {
					alert("일시적인 오류가 발생했습니다. 다시 시도해주세요. 만일 문제가 계속될 경우 고객센터(02-1234-5678)로 연락해주세요.");
	           }
	       });
}

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
	
	/* 이메일 체크 */ // 이거 쓸지 말지 고민 중(01.05)
	/*if ($('#memberEmail').val() === "") {
		//alert('이메일 체크');
	    showErrorMessage('memberEmail', '이메일을 입력하세요.');
	    isValid = false;
	} else if (!validateInput($('#memberEmail').val(), /^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
	    showErrorMessage('memberEmail', '올바른 이메일 형식을 입력하세요.');
	    isValid = false;
	} else if (!emailVerification) {
	    showErrorMessage('memberEmail', '이메일 인증이 필요합니다.');
	    isValid = false;
	} else {
	    hideErrorMessage('memberEmail'); // 유효하면 메시지 제거
	}*/
	
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
function showErrorMessage(inputId, message, color='#dc941b') {
	// 해당 에러 메시지 영역 가져오기
	let errorDiv = $('#' + inputId).closest('.mb-3').find('.error-message-div');
    errorDiv.show(); // 에러 메시지 영역 표시
	let errorSpan = errorDiv.find('.error-message');
	errorSpan.css('color', color);
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
	
	/*이메일 인증 유무 사용자 알림 표시 */ // 여기에 넣어야될지 다른 곳 넣어야 될지 고민중(01.05)
	/*if(!emailVerification){
	    showErrorMessage('memberEmail', '이메일 인증이 필요합니다.');
	}else{
	    hideErrorMessage('memberEmail'); // 유효하면 메시지 제거
	}*/
	
	if(!fnValidation()){
		return;
	}else if(!isMemberIdAvailable){
		console.log("아이디 중복됨");
		$('#memberId').focus();
		return;
	}else if(!emailVerification){
		console.log("이메일 인증 안됨");
		$('#memberEmail').focus();
		alert('이메일 인증을 해주세요.');
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
				showErrorMessage('memberId', '사용가능한 아이디입니다.', '#007bFF')
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
	alert(`***** 필독 *****
	(25.01.07)회원가입 개발완료.. (세부적인 요소들은 개발중입니다 100%아님)
	(완) 이메일 인증 기능 개발 완료
	(완) 아이디 중복검사 및 입력 유효성검사완료.
	
	1. 해당 정규식 이외에 데이터를 입력 해보세요! 만일 해당 정규식에 맞지않은 데이터나 중복된 아이디가 서버로 넘어가는 경우 저한테 말좀 해주세요.. 
	2. 사용자 입장에서는 구현이 완료되었지만, 내부 로직은 완벽한 상태는 아닙니다. 사용자 입장에서 회원가입 진행해보시고 수정사항 있으면 얘기해주세요.
	3. 악의적인 요청 및 개발자 모드에서 악의적인 값 수정 했을 경우 서버에서 막는 로직은 현재 개발중 입니다. 
	
	본인 이메일 외 다른사람 이메일 웬만하면 쓰지마세요. 피싱으로 오해받습니다...ㅎ `);

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




