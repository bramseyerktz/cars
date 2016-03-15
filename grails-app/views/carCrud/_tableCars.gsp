<g:javascript src="app/pagination.js"/>
<table class="table ajax" id="tableCars">
    <tr>
        <g:sortableColumn title="Id" property="id" action="searchAjax" params="${filters}"/>
        <g:sortableColumn title="Make" property="make" action="searchAjax" params="${filters}"/>
        <g:sortableColumn title="Model" property="model" action="searchAjax" params="${filters}"/>
        <g:sortableColumn title="Year" property="year" action="searchAjax" params="${filters}"/>
        <g:sortableColumn title="Plate" property="plate" action="searchAjax" params="${filters}"/>
        <th>Owner</th>
    </tr>
    <tbody>
        <g:render template="findingCars" collection="${cars}" var="car"/>
    </tbody>
</table>

<div class="col-md-offset-2 col-md-9">
    <div class="pagination" id="pagination" style="display: none;">
        <g:paginate total="${carsTotal}" action="searchAjax" update="allCars" params="${filters}" omitNext="true" omitPrev="true"/>
    </div>
</div>