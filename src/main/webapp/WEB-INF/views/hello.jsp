<%@page session="false"%>
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="refresh" content="0;url=user/manage/listUser" />
<script type="text/javascript">
	function radioChange(lang_value) {
		location.href = "welcome?lang="+lang_value;
	}
</script>
<body>
	<%-- <h1><spring:message code="title"/> : ${titleContent}</h1>
	<h1><spring:message code="message"/> : ${messageContent}</h1>
	
	<br>
	<c:if test="${pageContext.request.userPrincipal.name != null}">
		<h2><a href="<c:url value="/logout" />" ><spring:message code="logout"/></a></h2>  
	</c:if>
	<br>
	<a href="<c:url value="/testException" />" ><spring:message code="test.exception"/></a>
	<a href="<c:url value="/accessException" />" >测试权限不足异常页</a>
	<a href="<c:url value="/rest" />" >REST JSON</a>
	<a href="<c:url value="/framework/user/manage/index" />" >UI demo</a>
	<br>
	<h1><input type="radio" name="lang" value="zh_CN" onchange="radioChange(this.value);" onClick="this.blur();">中文</h1>
	<h1><input type="radio" name="lang" value="en" onchange="radioChange(this.value);" onClick="this.blur();">English</h1>
	<br>
	<h1><a href="dba">DBA</a></h1>
	<h1><a href="admin">ADMIN</a></h1>
	<h1><a href="welcome">WELCOME</a></h1>
	<h1><a href="uploadPage">UPLOAD</a></h1> --%>
</body>
</html>