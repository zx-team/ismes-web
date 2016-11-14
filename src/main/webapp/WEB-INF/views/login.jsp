<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="refresh" content="0;url=login/login/login" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
<meta name="description" content="">
<meta name="author" content="">
<script src="//cdn.bootcss.com/jquery/1.8.0/jquery-1.8.0.min.js"></script>
<title>Log in with your account</title>
</head>

<body>
<%-- 
	<div class="container">

		<form method="POST" action="${contextPath}/login" class="form-signin">
			<h2 class="form-heading">登录</h2>

			<div class="form-group ${error != null ? 'has-error' : ''}">
				${message}</span> <input name="username" type="text"
					class="form-control" placeholder="工号" autofocus="true"  value="10010"/> <input
					name="password" type="password" class="form-control"
					placeholder="密码" value="abcd" /> <span>${error}
				<button class="btn btn-lg btn-primary btn-block" type="submit">
					使用工号登录</button>
			</div>

		</form>
		<!-- 
		<form method="POST" action="${contextPath}/login/authToken" class="form-signin">
			<div>
				<input type="text" name="token" class="form-control"
					placeholder="token" value="1234567" /> <input type="submit"
					 value="使用Token登录" />
			</div>
		</form> -->
.
	</div> --%>
</body>
</html>
