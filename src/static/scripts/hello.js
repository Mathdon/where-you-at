(function () {
    'use strict';

    const employees = [];
    const locations = [];
    // const locationSelectHtml = "<td><select name=\"location\">\n" +
    //     "                                <option value=\"none\">None of your business</option>\n" +
    //     "                                <option value=\"home\">Home</option>\n" +
    //     "                                <option value=\"office\">Office</option>\n" +
    //     "                            </select></td>"
    // const locationSelectHtml = "<td><select name=location>\n" + "<option value=\'location\'" + locations + "</option></select></td>"

    // function setLocations() {
    //     return "<td><select name=location>\n<option value=location>locations</option></select></td>
    // }

    function setLocations() {
        let dropdown = "<td><select name=\"location\">\n ";
        locations.forEach(function(location) {
            dropdown = dropdown + "<option value=\"location\">" + location + "</option>\n)";
        });
        return dropdown + "</select</td>";
    }


    function renderTable() {
        const table = document.getElementsByTagName('table')[0];
        // loop around each employee
        employees.forEach(function (employee) {
            // set header to employee name
            const headerRow = document.getElementById("tableHeaderRow");
            headerRow.innerHTML = headerRow.innerHTML + "<th>" + employee + "</th>";
            // set select dropdowns in non header rows
            const rows = table.tBodies[0].children;
            for (let row of rows) {
                if (row.id !== 'tableHeaderRow') {
                    const rowToUpdate = row
                    // rowToUpdate.innerHTML = rowToUpdate.innerHTML + locationSelectHtml;
                    rowToUpdate.innerHTML = rowToUpdate.innerHTML + setLocations();
                }
            }
        });
    }

    document.getElementById('addEmployeeButton').onclick = function () {
        const nameInput = document.getElementById('nameInput');
        employees.push(nameInput.value);
        nameInput.value = "";
    };

    document.getElementById('addLocationButton').onclick = function () {
        const locationInput = document.getElementById('locationInput');
        locations.push(locationInput.value);
        locationInput.value = "";
    };

    document.getElementById('buildTableButton').onclick = function () {
        renderTable();
    };

    document.getElementById('nameInput').oninput = function (event) {
        name = event.target.value;
    }

    document.getElementById('display').onclick = function (event) {
        console.log(employees);
    }
})();
