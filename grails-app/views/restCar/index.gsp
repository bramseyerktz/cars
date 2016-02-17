<%--
  Created by IntelliJ IDEA.
  User: bramseyer
  Date: 17/02/16
  Time: 13:45
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>Find a car</title>
</head>

<body>
    <h1>Search</h1>
    <g:form action="search">
        <label for="year">Year</label>
        <g:textField name="year" value="${params?.year}"/>
        <label for="make">Make by...</label>
        <g:textField name="make" value="${params?.make}"/>
        <label for="model">Model</label>
        <g:textField name="model" value="${params?.model}"/>
        <g:submitButton name="search" value="Search"/>
    </g:form>
</body>
</html>