
var  drinkName = "";
function getDrink(){
  var input = document.getElementById("drinkName").value;
  drinkName = input;
}

function makeApiCall(){
  document.getElementById("homePic").innerHTML = '';
  console.log(drinkName);
  url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`;
console.log(url);

$(document).ready(function() {
      $.ajax({url:url, dataType:"json"}).then(function(data) {
        if(data.drinks){
          console.log(data.drinks[0])
          document.getElementById("picDiv").innerHTML = "";
          $('#picDiv').append('<img src="'+data.drinks[0].strDrinkThumb+'" width = 500mm>');


        document.getElementById("nameDiv").innerHTML = data.drinks[0].strDrink;
        document.getElementById("glassTypeDiv").innerHTML = data.drinks[0].strGlass;
        document.getElementById("instructDiv").innerHTML = data.drinks[0].strInstructions;
        document.getElementById("alcohol").innerHTML = data.drinks[0].strAlcoholic;
        document.getElementById("drinkInput").setAttribute("value",data.drinks[0].strDrink);
        document.getElementById("wordDiv").style.visibility = 'visible';
        }
        else {
          console.log('Not Found');
        }

      })
    })
}
