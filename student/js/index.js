$(document).ready(function() {
    $("#content").load("html/home.html");

    $("#homeButton").click(function () {
        $("#content").load("html/home.html");
    });

    $("#listManu").click(function () {
        initListManu();
    });

    $("#addManu").click(function () {
        initAddManu();
    });

    $("#listCars").click(function () {
        initListCars();
    });

    $("#addCars").click(function () {
        initAddCar();
    });
});



function initListManu(){
    $("#content").html("");
    listManu();
}

function initAddManu(){
    $("#content").html("");
    addManu();
}

function initListCars(){
    $("#content").html("");
    listCars();
}

function initAddCar(){
    $("#content").html("");
    addCar();
}



function addManu(){
    var contentId = $("#content");
    var formHTML = $("<form action=\"addManufacturers\" method=\"POST\">");
    var tableHTML = $("<table></table>");

    var nameRow = $("<tr></tr>");
    var nameCell = $("<td>Name</td>");
    var nameInput = '<td><input type="text" name="name" required="required" autofocus="true"></td>';
    nameRow.append(nameCell, nameInput);

    var countryCell = $('<td>Country</td>');
    var countryRow = $("<tr></tr>");
    var countryInput = '<td><input type="text" name="country" required="required" autofocus="true"></td>';
    countryRow.append(countryCell, countryInput);

    var foundedCell = $('<td>Founded</td>');
    var foundedRow = $("<tr></tr>");
    var foundedInput = '<td><input type="date" min="1810-01-01" name="founded" required="required" autofocus="true"></td>';
    //In this case, we consider Peugeot as the first car manufacturer, as it was founded in 1810.
    foundedRow.append(foundedCell, foundedInput);

    var submitRow=$("<tr></tr>");
    var submit = '<td><input type="submit" value="Add Manufacturer"/></td>';
    submitRow.append(submit);


    contentId.append(
        formHTML.append(
            tableHTML.append(
                nameRow, countryRow, foundedRow, submitRow
            )
        )
    );

    $(formHTML).submit(function (event) {
        event.preventDefault();
        $.ajax({
            url: 'addManufacturers',
            type: 'POST',
            data: $(formHTML).serialize(),
            success: function() {
                alert("Successfully added Manufacturer to list.");
            },
            error: function() {
                alert("Unsuccessful operation. Unknown error.");
            }
        })
    });
}

function addCar() {
    var contentId = $("#content");
    var formHTML = $("<form action=\"addCar\" method=\"POST\">");
    var tableHTML = $("<table></table>");

    var nameRow = $("<tr></tr>");
    var nameCell = $("<td>Name</td>");
    var nameInput = '<td><input type="text" name="name" required="required" autofocus="true"></td>';
    nameRow.append(nameCell, nameInput);

    var consumptionCell = $('<td>Consumption</td>');
    var consumptionRow = $("<tr></tr>");
    var consumptionInput = '<td><input type="text" name="consumption" required="required" autofocus="true"></td>';
    consumptionRow.append(consumptionCell, consumptionInput);

    var colorCell = $('<td>Color</td>');
    var colorRow = $("<tr></tr>");
    var colorInput = '<td><input type="text" name="color" required="required" autofocus="true"></td>';
    colorRow.append(colorCell, colorInput);

    var manufacturerCell = $('<td>Manufacturer</td>');
    var manufacturerRow = $("<tr></tr>");
    var manufacturerInput = $('<td></td>');
    var manufacturerSelect = $('<select type="text" name="manufacturer" required="required" autofocus="true"></select>')

    $.getJSON("manufacturerNames", function(data){
        $.each(data, function (key, value){
            var options = '<option value='+'"'+value+'"'+'>'+''+value+''+'</option>';
            manufacturerSelect.append(options);
        });

        manufacturerInput.append(manufacturerSelect);
        manufacturerRow.append(manufacturerCell, manufacturerInput);
    });

    var availableCell = $('<td>Available</td>');
    var availableRow = $("<tr></tr>");
    var availableInput = '<td><input type="number" min="0" name="available" required="required" autofocus="true"></td>';
    availableRow.append(availableCell, availableInput);

    var yearCell = $('<td>Year</td>');
    var yearRow = $("<tr></tr>");
    var yearInput = '<td><input type="number" min="1908" name="year" required="required" autofocus="true"></td>';
    //Ford's Model T was the first commercially available car for the common folk. It was first manufactured in 1908.
    yearRow.append(yearCell, yearInput);

    var horsepowerCell = $('<td>Horsepower</td>');
    var horsepowerRow = $("<tr></tr>");
    var horsepowerInput = '<td><input type="number" min="1" name="horsepower" required="required" autofocus="true"></td>';
    horsepowerRow.append(horsepowerCell, horsepowerInput);

    var submitRow=$("<tr></tr>");
    var submit = '<td><input type="submit" value="Add Car"/></td>';
    submitRow.append(submit);


    contentId.append(
        formHTML.append(
            tableHTML.append(
                nameRow, consumptionRow, colorRow , manufacturerRow ,yearRow, availableRow, horsepowerRow, submitRow
            )
        )
    );

    $(formHTML).submit(function (event) {
            event.preventDefault();
            $.ajax({
                url: 'addCar',
                type: 'POST',
                data: $(formHTML).serialize(),
                success: function() {
                    alert("Successfully added Car to list.");
                },
                error: function() {
                    alert("Unsuccessful operation. Unknown error.");
                }
            })
        });
}

    function listCars(){
        var contentId = $("#content");

            $.getJSON("cars", function(data){
                var table = $('<table id="fancyTable"></table>');
                table.append("<tr><th>Name</th><th>Consumption</th><th>Color</th><th>Manufacturer</th><th>Available</th><th>Year</th><th>Horsepower</th></tr>");

                $.each(data, function (key, value){
                    var row = $('<tr></tr>');
                    var nameCell = $('<td>' + value.name + '</td>');
                    var consumptionCell = $('<td>' + value.consumption + '</td>');
                    var colorCell = $('<td>' + value.color + '</td>');
                    var manufacturerCell = $('<td>' + value.manufacturer + '</td>');
                    var availableCell = $('<td>' + value.available + '</td>');
                    var yearCell = $('<td>' + value.year + '</td>');
                    var horsepowerCell = $('<td>' + value.horsepower + '</td>');

                    row.append(nameCell, consumptionCell, colorCell, manufacturerCell,
                        availableCell, yearCell, horsepowerCell);
                    table.append(row);
                });

                contentId.append(table);
            })
        }

function listManu(){
    var contentId = $("#content");

    $.getJSON("manufacturers", function(data){
        var table = $('<table id="fancyTable"></table>');
        table.append("<tr><th>Name</th><th>Country</th><th>Founded</th>");

        $.each(data, function (key, value){
            var row = $('<tr></tr>');
            var nameCell = $('<td onclick="addCookie(' + "'" + value.name + "'" +')">' + value.name + '</td>');

            var countryCell = $('<td>' + value.country + '</td>');
            var foundedCell = $('<td>' + value.founded + '</td>');

            row.append(nameCell, countryCell, foundedCell);
            table.append(row);
        });

        contentId.append(table);
    })
}

function addCookie(manufacturer){
    document.cookie="name=" + manufacturer;
    $("#cookieBox").html("Cookies: [" + document.cookie + "]");
    var contentId = $("#content");
    $(contentId).html("");

    $.getJSON("manufacturer", function(data){
        var table = $('<table id="fancyTable"></table>');
        table.append("<tr><th>Name</th><th>Consumption</th><th>Color</th><th>Manufacturer</th><th>Available</th><th>Year</th><th>Horsepower</th></tr>");

        $.each(data, function (key, value){
            var row = $('<tr></tr>');
            var nameCell = $('<td>' + value.name + '</td>');
            var consumptionCell = $('<td>' + value.consumption + '</td>');
            var colorCell = $('<td>' + value.color + '</td>');
            var manufacturerCell = $('<td>' + value.manufacturer + '</td>');
            var availableCell = $('<td>' + value.available + '</td>');
            var yearCell = $('<td>' + value.year + '</td>');
            var horsepowerCell = $('<td>' + value.horsepower + '</td>');

            row.append(nameCell, consumptionCell, colorCell, manufacturerCell,
                availableCell, yearCell, horsepowerCell);
            table.append(row);
        });

        contentId.append(table);

        var backButton = $('<button onclick="initListManu()" type="button">Back</button>');
        contentId.append(backButton);
    })
}



