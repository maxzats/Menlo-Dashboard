$(document).ready(function(){
    var selectedCategory = $('.first').data('category-id');

    $('.categoryTab').click(function(){

       var categoryId = $(this).data('category-id');

       $('.categoryTab').removeClass('active');
       $(this).addClass('active');

       $('.course').addClass('mzhidden');

        selectedCategory = categoryId;
       $('.course').each(function(){
         if($(this).data('in-category') == categoryId)
         {
             $(this).removeClass('mzhidden');
         }
       });

        $('.filterPill.active').click();
   });

    $('.first').click();

    $('.filterPill').click(function() {

        $(".filterPill").removeClass("active");

        $(this).addClass("active");

        $('.course').addClass('mzhidden');

        var suggestedFor = $(this).data('filter');

        if(suggestedFor == "all")
        {
            $(".course").each(function() {
                if($(this).data('in-category') == selectedCategory)
                {
                    $(this).removeClass('mzhidden');
                }
            });

            return 0;
        }
        $(".course").each(function(){
            var suggestedDiv = $(this).find(".suggestedFor");
            var suggestedForText = suggestedDiv.html().toLowerCase();

            if(suggestedForText.indexOf(suggestedFor.toLowerCase()) != -1 && selectedCategory == $(this).data('in-category'))
            {
                $(this).removeClass('mzhidden');
            }
        });
    });
});