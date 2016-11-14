<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@page session="true"%>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<body>
	<h1><spring:message code="title"/> : ${titleContent}</h1>
	<h1><spring:message code="message"/> : ${messageContent}</h1>

	<c:if test="${pageContext.request.userPrincipal.name != null}">
		<h2><a href="<c:url value="/logout" />" ><spring:message code="logout"/></a></h2>  
	</c:if>
<a href="welcome">WELCOME</a>
</body>
</html>