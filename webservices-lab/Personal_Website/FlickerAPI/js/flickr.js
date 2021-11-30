var apiExplorer = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0e69fce8d33063ed69f695a5081c183a&tags=tags&privacy_filter=1&safe_search=1&extras=url_sq&page=pageToReturn&format=json&nojsoncallback=1`;
var apiExplorer1 = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0e69fce8d33063ed69f695a5081c183a&tags=tags&privacy_filter=1&safe_search=1&extras=url_sq&per_page=30&page=pageToReturn&format=json&nojsoncallback=1`

var numPick = 0;
function picValue(value){
  //update inner html
  var dropdownLabel = document.getElementById("selectNumberButton");
  dropdownLabel.innerHTML = value;
  numPick = value;
  return numPick;
}

var  searchTags = "";
function getTags(){
  var textBox = document.getElementById("tagSearch").value;
  searchTags = textBox;
  searchTags = searchTags.replace(/\s/g, '');
  return searchTags;
}

var url = "";
function makeApiCall(){
  console.log(numPick);
  console.log(searchTags);
  url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0e69fce8d33063ed69f695a5081c183a&tags=${searchTags}&privacy_filter=1&safe_search=1&extras=url_sq&per_page=${numPick}&page=pageToReturn&format=json&nojsoncallback=1`;
  console.log(url);

  $(document).ready(function() {
        $.ajax({url:url, dataType:"json"}).then(function(data) {
          // console.log(data);
          // console.log(data.photos);
          console.log(data.photos.photo[0]);
          console.log("Image title: " + data.photos.photo[0].title);
          // items.data.results[i].byline
          // console.log(data.data.results[1].id);
          if((data.photos.photo).length>0){
            document.getElementById("cardClass").innerHTML = "";
    				// $('#testing1').append("<p>"+data.photos.photo[0].title+"</p>");
            // $('#cardClass').append(`<div class="card" style="width: 18rem;"><img class="card-img-top" src="" alt="Card image cap"><p>TitleGoesHere</p></div>`);
            // console.log((data.photos.photo).length);
            // `<div class="card" style="width: 18rem;"><img class="card-img-top" src="" alt="Card image cap"><p>TitleGoesHere</p></div>`
            for(i = 0; i < (data.photos.photo).length; i++){
              $('#cardClass').append(`<div class="card" style="width: 8rem;"><img class="card-img-top" src="`+data.photos.photo[i].url_sq+`" alt="Card image cap"><p>`+data.photos.photo[i].title+`</p></div>`);
            }
    			}
    			else{
            console.log('error');
    			}

        })
      })
  }
