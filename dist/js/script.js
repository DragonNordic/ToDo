var toDo = [];
var setItems;
var shake = 0; 
var listName;

$("input#listName").on("keyup", function() {
    listName = $(this).val();
    localStorage.setItem("listName", listName);
})

$("#todo").on("keyup", function() {
    toDo = $(this).val();
})

$("input#todo").on("keypress", function(e) {
    if (e.which == 13) {
        if ($(this).val().length <= 0) {
            shake = 1;
            if (shake == 1) {
                $(this).addClass("shake");
                return false;
            } 
        }

        var toDoItem = $("<div class='todo__list-item' data-value='0'>" + "<p>" + toDo + "</p>" + "<i id='delete' class='material-icons'>check_circle</i>");
        setItems = setItems + ',' + toDo;
        localStorage.setItem("set", setItems);
        $(".todo__content").append(toDoItem);
        toDoItem.delay(100).animate({
            'opacity': '1'
        }, 100);
        $(this).val(''); 
    
        shake = 0;
        if (shake == 0) {
            $("input").removeClass("shake");
        }
    }
})

$(".todo__content").on("click", "#delete", function() {
    $(this).parent().remove();
})

$(".save").on("click", function() {
    localStorage.setItem("set", setItems);
    localStorage.setItem("listName", listName);
})

$(".delete").on("click", function() {
    localStorage.clear();
    $(".todo__list-item").remove();
})

$(".loadList").on("click", function() {
    var listNameHeader = localStorage.getItem("listName");
    $("input#listName").attr('value', listNameHeader);
    var retrieve = localStorage.getItem("set").split(',');
    for (i = 0; i < retrieve.length - 1; i++)
        $(".todo__content").append($("<div class='todo__list-item' data-value='0' style='opacity: 1'>" + "<p>" + retrieve[i + 1] + "</p>" + "<i id='delete' class='material-icons'>check_circle</i>"));
})