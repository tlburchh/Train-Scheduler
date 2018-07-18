var tbody = $("tbody");

.foreach(function(v) {
    var row = $('<tr>');
    var td1 = $('<td>').text(v.col1);
    var td2 = $('<td>').text(v.col2);
})
row.append(td1).append(td2)
tbody.append(row)
};