// Loading Screen
$(window).load(function() {

});

var loginFailureCount = 0;
// document ready
$(document).ready(function() {
    // Carousel slider
    $('.carousel').carousel({
        interval : 2000
    });

    // Normal Login
    //document.loginForm.j_username.focus();
    if(window.top == window.self) {
       document.loginForm.j_username.focus();
    }
});
// Press 'Enter' to process Login
function submitenter(myfield, e) {
    var keycode;
    if (window.event)
        keycode = window.event.keyCode;
    else if (e)
        keycode = e.which;
    else
        return true;
    if (keycode == 13) {
        processLogin(document.loginForm);
        return false;
    } else {
        return true;
    }
}

function newSubmitenter(myfield, e) {
    var keycode;
    if (window.event)
        keycode = window.event.keyCode;
    else if (e)
        keycode = e.which;
    else
        return true;
    if (keycode == 13) {
        processNewLogin(document.loginForm);
        return false;
    } else {
        return true;
    }
}

// Process Login
function processLogin(form) {

    console.log("processLogin: Login with Username/Password");

    if (validateForm(form)) {
        var urlParams = getUrlVars();
        $.ajax({
            method : 'POST',
            url : 'rest/auth/authenticate',
            beforeSend : function() {
                $(".loader").show();
            },
            data : {
                username : document.loginForm.j_username.value,
                password : document.loginForm.j_password.value,
                svc : urlParams['svc']
            },

            success : function(response) {
                gotoRedirect();
            },

            error : function(xhr, status, error) {
                var httpStatus = xhr.status;
                var desc = JSON.parse(xhr.responseText).description;
                handleError(httpStatus, desc);
                $(".loader").hide();
            },
            complete : function() {
            }
        }); // End of Ajax

    }

}

function processNewLogin(form) {

    console.log("processLogin: Login with Username/Password");
    if (validateSubmit(form)) {
        var urlParams = getUrlVars();
        $.ajax({
            method : 'POST',
            url : 'rest/auth/authenticate',
            beforeSend : function() {
                $(".loader").show();
            },
            data : {
                username : document.loginForm.j_username.value,
                password : document.loginForm.j_password.value,
                svc : urlParams['svc']
            },

            success : function(response) {
                gotoRedirect();
            },

            error : function(xhr, status, error) {
                var httpStatus = xhr.status;
                var desc = JSON.parse(xhr.responseText).description;
                handleError(httpStatus, desc);
                $(".loader").hide();
            },
            complete : function() {
            }
        }); // End of Ajax

    }

}

function handleError(httpStatus, desc) {
    if(window.location.pathname.includes("newLogin")){
        handleErrorForNewLogin(httpStatus, desc)
        return;
    }
    if (httpStatus == 401 && desc == "Authentication Failed") {
        document.getElementById("errormsgAuthFailed").style.display = "block";
    } else if (httpStatus == 401 && desc == "Your account has been locked.") {
        window.location.href = LOCKED_URL;
    } else if (httpStatus == 500) {
        document.getElementById("errormsgSysError").style.display = "block";
    } else if (httpStatus == 403) { // Concurrency Exceeded
        window.location.href = desc;
    } else if (httpStatus == 401 && desc == "jwtAuthenticate") {
        // JWT Authentication Failed
        // Do Nothing
    }
}

function handleErrorForNewLogin(httpStatus, desc) {

    document.getElementById("errormsgAuthFailed").style.display = "none";
    document.getElementById("errormsgSysError").style.display = "none";
    document.getElementById("errormsgUserLocked").style.display = "none";
    document.getElementById("errormsgUserNotActive").style.display = "none";
    document.getElementById("errorMessageContainer").style.display = "none";
    document.getElementById("recaptchaWrapper").style.display = "none";
    
    if (httpStatus == 401 && desc == "Authentication Failed") {
        loginFailureCount +=1;
        
        document.getElementById("errormsgAuthFailed").style.display = "block";
        document.getElementById("errorMessageContainer").style.display = "block";
        document.getElementById("do-not-have-account").style.marginTop='85px';

        if(loginFailureCount > 2){
            document.getElementById("do-not-have-account").style.marginTop='26px';
            document.getElementById("recaptchaWrapper").style.display = "block";
            grecaptcha.reset();
        }
    } else if (httpStatus == 401 && desc == "Your account has been locked.") {
        document.getElementById("errormsgUserLocked").style.display = "block";
        document.getElementById("errorMessageContainer").style.display = "block";
    } else if (httpStatus == 500) {
        document.getElementById("errormsgSysError").style.display = "block";
        document.getElementById("errorMessageContainer").style.display = "block";
    } else if (httpStatus == 403) { // Concurrency Exceeded
        window.location.href = desc;
    } else if (httpStatus == 401 && desc == "jwtAuthenticate") {
        // JWT Authentication Failed
        // Do Nothing
    } else if (httpStatus == 401 && desc == "User not Active") {
        document.getElementById("errormsgUserNotActive").style.display = "block";
        document.getElementById("errorMessageContainer").style.display = "block";
    }
}

// Get URL Param
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function gotoRedirect() {
    var urlParams = getUrlVars();
    var gotoUrl = urlParams['goto'];
    // Check for goto, else redirect to AM Profile Page
    if (gotoUrl !== null && gotoUrl !== undefined) {

        if (window.location.href.indexOf("RequestID") != -1) {
            console.log("request Id Found");
            window.location.href = getRedirectURL();
        } else {
            window.location.href = decodeURIComponent(gotoUrl);
        }
    } else {
        window.location.href = DEFAULT_URL;
    }
}

function getRedirectURL() {
    var urlParam = getUrlVars();
    var url = AM_URL + "/cdcservlet?";
    url += "TARGET=" + urlParam["goto"];
    url += "&RequestID=" + urlParam['RequestID'];
    url += "&MajorVersion=" + urlParam['MajorVersion'];
    url += "&MinorVersion=" + urlParam['MinorVersion'];
    url += "&ProviderID=" + urlParam['ProviderID'];
    url += "&IssueInstant=" + urlParam['IssueInstant'];
    return url;
}

function parseUrlVars(URLparam) {
    var vars = {};
    var parts = decodeURIComponent(URLparam).replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}