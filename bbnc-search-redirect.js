var bbncCurtinSearch = (function() {
  //variables available to all donationSelector functions
  var globalSearchURI = 'https://search.curtin.edu.au/s/search.html?query=';
  var globalSearchSufix = '&collection=curtin-university&clive=curtin-web,curtin-staff,curtin-jobs,curtin-maps,curtin-entities'
  var courseSearchURI = 'https://study.curtin.edu.au/search/?search_text=';
 
  //functions that don't need to be public
  var generateSearchURI = function(uri, string) {
    // console.log('generateSearchURI fired');
    var splitStringArray = string.split(' ');
    var delimeter = '+';
    var queryString = "";
    for (var i = 0; i < splitStringArray.length; i++) {
      i != (splitStringArray.length - 1) ? queryString += splitStringArray[i] + '+' : queryString += splitStringArray[i]
    }
    uri === globalSearchURI ? uri = uri + queryString + globalSearchSufix : uri = uri + queryString;
    console.log("uri =" + uri);
    return encodeURI(uri);
  };
 
  var addURItoSearchButton = function(jQueryObject) {
    // console.log('jQueryObject');
    jQueryObject.each(function(){
      var $target = $(this).siblings('a.search-submit');
      var targetURI = $(this).attr('id') === 'curtin-global-search' ? globalSearchURI : courseSearchURI;
      var queryStringURI;
      $(this).on('keyup', function(e) {
          queryStringURI = generateSearchURI(targetURI, $(this).val() );
          
          $target.attr('href', queryStringURI );
          
          if(e.keyCode == 13 || e.keyCode == 10) {
            window.location.href = queryStringURI;
          }
      });
 
    });
  };
 
  //public functions
  var init = function() {
      addURItoSearchButton( $('#curtin-global-search,#curtin-course-search') );
  }
 
  //make these functions public
  return {
    init: init
  };
})(); //end modulePattern
 
bbncCurtinSearch.init();