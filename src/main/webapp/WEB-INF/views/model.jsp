<%@page session="false"%>
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>model</title>
<script type="text/javascript">
function save(){
	document.forms['neworder'].submit();
}


</script>
</head>
<body>
	<div >
	<input type="button" value="新增" onclick="save()" ></input>
	<input type="button" value="修改"></input>
	<input type="button" value="删除"></input>
	<input type="button" value="查询"></input>
	<input type="button" value="根据ID查询"></input>
	<input type="button" value="分页查询"></input>
	</div>
	<div style="width:400px;height:250px;border:1px solid #ccc;margin-top:20px;padding:10px;"><br>
	<form action="<%=request.getContextPath()%>/order/save" name="neworder" method="POST">
		<span style="width:200px;">订单ID：</span><span><input type="text" name="datas.oid" ></input></span><br><br>
		<span style="width:200px;">订单名称：</span><span><input type="text"  name="datas.name" ></input></span><br><br>
		<span style="width:200px;">订单金额：</span><span><input type="text"  name="datas.cost"></input></span><br><br>
		<span style="width:200px;">顺序号：</span><span><input type="text"  name="datas.sequences"></input></span><br><br>
		<span style="width:200px;">录入人ID：</span><span><input type="text"  name="datas.modifier"></input></span><br><br>
	</form>
	</div>
	<div style="width:400px;height:250px;border:1px solid #ccc;margin-top:20px;padding:10px;"><br>
	<form action="<%=request.getContextPath()%>/order/save" name="oldorder">
		<span style="width:200px;">订单ID：</span><span><input type="text" ></input></span><br><br>
		<span style="width:200px;">订单名称：</span><span><input type="text" ></input></span><br><br>
		<span style="width:200px;">订单金额：</span><span><input type="text" ></input></span><br><br>
		<span style="width:200px;">顺序号：</span><span><input type="text" ></input></span><br><br>
		<span style="width:200px;">录入人ID：</span><span><input type="text" ></input></span><br><br>
	</form>
	</div>
	<!-- <div style="width:400px;height:200px;border:1px solid #ccc;margin-top:20px;padding:10px;">
	<form action="">
		<span style="width:200px;">订单名称：</span><span><input type="text" ></input></span><br><br>
		<span style="width:200px;">订单金额：</span><span><input type="text" ></input></span><br><br>
		<span style="width:200px;">顺序号：</span><span><input type="text" ></input></span><br><br>
		<span style="width:200px;">录入人ID：</span><span><input type="text" ></input></span><br><br>
	</form>
	</div> -->
	
</body>
</html>