<%@page session="false"%>
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script type="text/javascript">
</script>
<body>
	<form action="upload" method="post" enctype="multipart/form-data">
		<input type="file" name="file" width="100px" />
		<input type="submit" value="上传">
	</form>
</body>
</html>