$(document).ready(function () {
    // html elements
    var table = $('.table');

    function generateTableData({ id, namePoll }) {
        return `<tr>
                            <td scope="row">${id}</td>
                            <td>${namePoll}</td>
                            <td>
                                <button class="btn" style="border: 1px solid #3d3d3d">View result</button>
                                <button class="btn" style="border: 1px solid #3d3d3d">Close poll</button>
                                <button class="btn" style="border: 1px solid #3d3d3d">Delete</button>
                            </td>
                        </tr>`;
    }

    // add data from Local Storage to table
    var interviews = JSON.parse(localStorage.getItem('interviews'));

    interviews.forEach(function (interview) {
        table.find('tbody').append(generateTableData(interview));
    });

    console.log(interviews);
});
