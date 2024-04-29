let meals = [];
let searchByName = document.querySelector("#searchByName");
let searchByLetter = document.querySelector("#searchByLetter");


//loading screen
$(document).ready(function () {
    $("body").css({ "overflow": "auto" })
    $(".loading-screen").fadeOut(1000)
});



//open nav function
function openNav() {
    $(".side-nav").animate({ "left": "0px" }, 500);
    $("#navClick").removeClass("fa-bars").addClass("fa-x");

    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100);
    };
};

//colse nav function
function closeNav() {
    $(".side-nav").animate({ "left": "-256.562px" }, 500);
    $("#navClick").removeClass("fa-x").addClass("fa-bars");
    $(".links li").animate({ "top": "300px" })
};

//open-close event 
$("#navClick").click(function () {
    if ($(".side-nav").css("left") == "0px") {
        closeNav();
    } else {
        openNav();
    };
});



async function getMeals() {

    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    var data = await response.json();
    meals = data.meals;
    console.log(meals);
    displayMeals();
}
getMeals();


function displayMeals() {
    let container = ``;
    for (let i = 0; i < meals.length; i++) {
        container += `<div class="col-md-3 p-3">
        <div onclick="getDetails(${meals[i].idMeal})" class="col-inner position-relative rounded-3 overflow-hidden">
            <img class="w-100 rounded-3" src="${meals[i].strMealThumb}" alt="">
        
            <div
                class="col-cover rounded-3 position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center align-content-center">
                <h3 class="fs-2">${meals[i].strMeal}</h3>
            </div>
        </div>
        </div>
        </div>`

        $("#rowData").html(container);
    }
}


$("#searchClick").click(function () {
    closeNav();
    $(".search").removeClass("d-none").addClass("d-flex");
    $("#rowData").html(null)
})

async function getMealsByName() {

    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchByName.value}`);
    var data = await response.json();
    meals = data.meals;
    console.log(meals);
    displayMeals();
}
$("#searchByName").keyup(function () {
    getMealsByName()
})




async function getMealsByLetter() {

    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchByLetter.value}`);
    var data = await response.json();
    meals = data.meals;
    console.log(meals);
    displayMeals();
}
$("#searchByLetter").keyup(function () {
    getMealsByLetter()
})

$("#searchByName").keyup(function () {
    getMealsByName()
})




$("#categoriesClick").click(function () {
    closeNav();
    getMealsCategories();

})

async function getMealsCategories() {

    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    var data = await response.json();
    meals = data.categories;
    console.log(meals);
    displayMealsCategoris();
}


function displayMealsCategoris() {
    let container = ``;
    for (let i = 0; i < meals.length; i++) {
        container += `<div class="col-md-3 p-3">
        <div onclick="getCategoryMeals('${meals[i].strCategory}')" class="col-inner position-relative rounded-3 overflow-hidden">
            <img class="w-100 rounded-3" src="${meals[i].strCategoryThumb}" alt="">
        
            <div
                class="col-cover rounded-3 position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center align-content-center">
                <h3 class="fs-2">${meals[i].strCategory}</h3>
            </div>
        </div>
        </div>
        </div>`

        $("#rowData").html(container);

    }
}




async function getCategoryMeals(x) {
    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${x}`);
    var data = await response.json();
    meals = data.meals;
    console.log(meals);
    displayMeals();

}

$("#areaClick").click(function () {
    closeNav();
    getAreas()
})

async function getAreas() {
    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    var data = await response.json();
    meals = data.meals;
    console.log(meals);
    displayAreas();

}
function displayAreas() {

    let container = ``;
    for (let i = 0; i < meals.length; i++) {
        container += `<div class="col-md-3 p-3">
        <div onclick="areaFilter('${meals[i].strArea}')"  class="area col-inner d-flex flex-column justify-content-center align-items-center text-white position-relative rounded-3">
        <i class="fa-solid fa-house-laptop"></i>
        <h3 class="fs-2">${meals[i].strArea}</h3>
    
        </div>
        </div>
        `

        $("#rowData").html(container);

    }
}
async function areaFilter(y) {

    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${y}`);
    var data = await response.json();
    meals = data.meals;
    console.log(meals);
    displayMeals();
}







$("#IngredientsClick").click(function () {

    closeNav();
    getIngredients();

})


async function getIngredients() {
    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    var data = await response.json();
    meals = data.meals;
    console.log(meals);
    displayIngredients();

}




function displayIngredients() {

    let container = ``;
    for (let i = 0; i < 20; i++) {
        container += `<div class="col-md-3 p-3">
        <div onclick="ingredientsFilter('${meals[i].strIngredient}')"  class="area col-inner d-flex flex-column justify-content-center align-items-center text-white position-relative rounded-3">
        <i class="fa-solid fa-drumstick-bite"></i>
        <h3 class="fs-4">${meals[i].strIngredient}</h3>
        <P>${meals[i].strDescription.split(" ").slice(0, 20).join(' ')}</p>
    
        </div>
        </div>
        `

        $("#rowData").html(container);

    }
}


async function ingredientsFilter(z) {

    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${z}`);
    var data = await response.json();
    meals = data.meals;
    console.log(meals);
    displayMeals();
}




async function getDetails(mealID) {
    closeNav()
    rowData.innerHTML = ""
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayDetails(respone.meals[0])

}
function displayDetails(mealDetail) {
    let container = ''

    let Recipes = ``;
    for (let i = 1; i <= 20; i++) {
        let ingreadent = `${mealDetail[`strIngredient${i}`]}`
        let mesures = `${mealDetail[`strMeasure${i}`]}`
        console.log(ingreadent);
        if (ingreadent == '' || mesures == '') {
            i == 20
        }
        else {
            Recipes += ` <li class="p-2 rounded-3 m-2 bg-info-subtle text-black">${mesures} ${ingreadent}</li>`
        }

    }
    let tags = mealDetail.strTags?.split(",")

    if (!tags) tags = []

    let tagsString = ''
    for (let i = 0; i < tags.length; i++) {
        tagsString += `
        <li class="alert alert-danger me-1 p-1">${tags[i]}</li>`
    }


    container += `
    
    
    
    <div class="col-md-5 p-5 text-white">
    <img class="w-100" src="${mealDetail.strMealThumb}" alt="">
    <h3>${mealDetail.strMeal}</h3>
</div>

    
    
    <div class="col-md-7 text-white">
                <h3>Instructions</h3>
                <p>${mealDetail.strInstructions}</p>


                <h3>Area : ${mealDetail.strArea}</h3>
                <h3>Category : ${mealDetail.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex flex-wrap">
                    ${Recipes}
                </ul>
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex flex-wrap">
                ${tagsString}
                </ul>
                <div class="d-flex my-3">
                    <a class="bg-success text-decoration-none text-white py-2 px-3 rounded-3" target="_blank" href="${mealDetail.strSource}">Source</a>
                    <a class="bg-danger text-decoration-none text-white py-2 px-3 mx-1 rounded-3" target="_blank" href="${mealDetail.strYoutube}">Youtube</a>
                </div>
            </div>
`
    $("#rowData").html(container);

}


$("#contactClick").click(function () {
    closeNav();
    $(".search").removeClass("d-flex").addClass("d-none");
    $("#rowData").html(`

<div
class="  formm container bg-black justify-content-center align-items-center align-content-center position-fixed top-0 bottom-0 end-0 start-0 flex-wrap ">

<div class="col-md-6 p-2">

    <input id="nameInput" placeholder="Enter Your Name" oninput="nameValidation()" class="form-control  bg-white my-2 text-black" type="text">
    <div id="nameAlert" class="alert alert-danger d-none" role="alert">
    Special characters and numbers not allowed
    </div>
</div>
<div class="col-md-6 p-2">
    <input id="emailInput" placeholder="Enter Your Email" oninput="emailValidation()" class="form-control  bg-white my-2 text-black" type="text">
    <div id="emailAlert" class="alert alert-danger d-none" role="alert">
    Email not valid *exemple@yyy.zzz
    </div>
</div>
<div class="col-md-6 p-2">
    <input id="phoneInput" oninput="phoneValidation()" placeholder="Enter Your Phone" class="form-control  bg-white my-2 text-black" type="text">
    <div id="phoneAlert" class="alert alert-danger d-none" role="alert">
    Enter valid Phone Number
    </div>
</div>
<div class="col-md-6 p-2">
    <input id="age" oninput="ageValidation()" placeholder="Enter Your Age" class="form-control  bg-white my-2 text-black" type="text">
    <div id="ageAlert" class="alert alert-danger d-none" role="alert">
    Enter valid age
    </div>
</div>
<div class="col-md-6 p-2">
    <input id="passwordInput" oninput="passwordValidation()" placeholder="Enter Your Password" class="form-control  bg-white my-2 text-black" type="password">
    <div id="passwordAlert" class="alert alert-danger d-none" role="alert">
    Enter valid password *Minimum eight characters, at least one letter and one number:*
    </div>
</div>
<div class="col-md-6 p-2">
    <input id="repasswordInput" oninput="repasswordValidation()" placeholder="Repassword" class="form-control  bg-white my-2 text-black" type="password">
    <div id="repasswordAlert" class="alert alert-danger d-none" role="alert">
    Enter valid repassword
    </div>
</div>

<div class="col-md-12 d-flex justify-content-center">
    <button id="submitBtn" class="btn btn-outline-danger disabled mt-4">Submit</button>
</div>

`)
})









let flag1 =false;
let flag2 =false;
let flag3 =false;
let flag4 =false;
let flag5 =false;
let flag6 =false;


function nameValidation() {
    let regex= /^[a-zA-Z ]+$/
    let nameInput =document.querySelector("#nameInput")
   

    if (regex.test(nameInput.value)) {

        document.getElementById("nameAlert").classList.replace("d-block","d-none");
        flag1 =true;
      
      } else {

          document.getElementById("nameAlert").classList.replace("d-none","d-block");
          flag1 =false
      }
      button()
    
}

function emailValidation() {
    let regex= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let  emailInput =document.querySelector("#emailInput")
    if (regex.test(emailInput.value)) {

        document.getElementById("emailAlert").classList.replace("d-block","d-none");
        flag2=true;
        
      } else {

          document.getElementById("emailAlert").classList.replace("d-none","d-block");
         flag2=false;
      
      }
      button()
    

}

function phoneValidation() {
    let regex=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

    let  phoneInput =document.querySelector("#phoneInput")
    if (regex.test(phoneInput.value)) {

        document.getElementById("phoneAlert").classList.replace("d-block","d-none");
        flag3=true;
        
      } else {

          document.getElementById("phoneAlert").classList.replace("d-none","d-block");
          flag3=false;
         
      
      }
      button()



}

function ageValidation() {
    let regex=/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/

    let  age =document.querySelector("#age")
    if (regex.test(age.value)) {

        document.getElementById("ageAlert").classList.replace("d-block","d-none");
        flag4=true;
        
      } else {

          document.getElementById("ageAlert").classList.replace("d-none","d-block");
          flag4=false;
         
      
      }
      button()


}


function passwordValidation() {
    let regex=/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
    let  passwordInput =document.querySelector("#passwordInput")
    if (regex.test(passwordInput.value)) {

        document.getElementById("passwordAlert").classList.replace("d-block","d-none");
        flag5=true;
        
      } else {

          document.getElementById("passwordAlert").classList.replace("d-none","d-block");
          flag5=false;
         
      
      }
      button()
}


function repasswordValidation() {
    let regex= document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value

    if (regex) {

        document.getElementById("repasswordAlert").classList.replace("d-block","d-none");
        flag6=true;
        
      } else {

          document.getElementById("repasswordAlert").classList.replace("d-none","d-block");
          flag6=false;
         
      }
      button()
}



function button() {
  
    let submitBtn=document.querySelector("#submitBtn")

 if (flag1 ==true && flag2 ==true && flag3 == true && flag4 ==true && flag5 == true && flag6 == true) {
    

    submitBtn.classList.remove("disabled")


    submitBtn.classList.replace("btn-outline-danger","btn-danger")


 
}
}



























































