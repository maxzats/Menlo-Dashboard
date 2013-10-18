$(document).ready(function(){
   $('.categoryTab').click(function(){
       event.preventDefault();
       var categoryId = $(this).data('category-id');
       $('.categoryTab').removeClass('active');
       $(this).addClass('active');
       $('.course').addClass('mzhidden');
       $('.course').each(function(){
         if($(this).data('in-category') == categoryId)
         {
             $(this).removeClass('mzhidden');
         }
       });
   });

    $('.first').click();
});