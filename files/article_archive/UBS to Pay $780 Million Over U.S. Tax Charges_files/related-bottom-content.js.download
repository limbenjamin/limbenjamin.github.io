function initHotContent() {
   document.write("<style>\n");
   document.write("dl#hotcontent-results { display:block; }\n");
   document.write("#hotcontent-box-bottom_strip { display:block; }\n");
   document.write("</style>\n");
}
function placeHotContentBox(m) {
   var output = "";
   output += '<dl id="hotcontent-results">' ;
   if ( m[0].type.match(/Galleries/) )
      output += '<dt style="font:bold 12px arial; color:#333;">Most Viewed Galleries</dt>' ;
   else
      output += '<dt style="font:bold 12px arial; color:#333;">Most Viewed '+m[0].name+' Articles</dt>' ;
   for (i=0; i < m[0].content.length && i < 4; i++)
   {
      output += '<dd class="article">' ;
      output += '<a href="'+m[0].content[i].url+'tmv" target="_top">'+m[0].content[i].linkText+'</a>' ;
      output += '</dd>' ;
   }
   output += '</dl>' ;
   document.write(output);
}