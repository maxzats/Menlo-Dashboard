$(document).ready(function(){
    $('.category-action').tooltip();

    $('.delete-category').click(function(){
        $('#categoryId').val($(this).data('category-id'));
    });

    $('.edit-category').click(function(){
        $("#editCategoryName").val($(this).data('category-name'));
        $("#editCategoryId").val($(this).data('category-id'));
    })
});
