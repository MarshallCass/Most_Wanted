"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people) {
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch (searchType) {
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = multiTraitSearch(people);
      break;
    default:
      app(people); // restart app
      break;

  }

  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people) {
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", letterValidation);

  switch (displayOption) {
    case "info":
      displayOption = displayPerson(person);
      break;
    case "family":
      displayOption = displayFamily(person, data)
      break;
    case "descendants":
      displayOption = displayDecendants(person, data);
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}


//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", letterValidation);
  let lastName = promptFor("What is the person's last name?", letterValidation);

  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.firstName === firstName && potentialMatch.lastName === lastName) {
      return true;
    }
    else {
      return false;
    }
  })

  // TODO: find the person single person object using the name they entered.

  return displayPerson(foundPerson);
}

//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people) {

  let eyeColor = promptFor("What is the person's eye color?", letterValidation);

  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.eyeColor === eyeColor) {
      return true;
    } else {
      return false;
    }
  })
  displayPeople(foundPerson);
  return foundPerson;
}

function searchByGender(people) {

  let gender = promptFor("What is the person's gender?", letterValidation);

  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.gender === gender) {
      return true;
    } else {
      return false;
    }
  })
  displayPeople(foundPerson);
  return foundPerson;
}

function searchByDob(people) {

  let dob = promptFor("What is the person's date of birth? EX: 1/11/11", dobValidation);

  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.dob === dob) {
      return true;
    } else {
      return false;
    }
  })
  displayPeople(foundPerson);
  return foundPerson;
}

function searchByHeight(people) {

  let height = promptFor("What is the person's height in inches?", numberValidation);

  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.height === parseInt(height)) {
      return true;
    } else {
      return false;
    }
  })
  displayPeople(foundPerson)
  return foundPerson;
}

function searchByWeight(people) {

  let weight = promptFor("What is the person's weight in pounds?", numberValidation);

  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.weight === parseInt(weight)) {
      return true;
    } else {
      return false;
    }
  })
  displayPeople(foundPerson)
  return foundPerson;
}

function searchByOccupation(people) {

  let occupation = promptFor("What is the person's occupation?", letterValidation);

  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.occupation === occupation) {
      return true;
    } else {
      return false;
    }
  })
  displayPeople(foundPerson);
  return foundPerson;
}


//TODO: add other trait filter functions here.



//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people) {
  alert(people.map(function (person) {
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person, people) {
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person[0].firstName + "\n";
  personInfo += "Last Name: " + person[0].lastName + "\n";
  personInfo += "Gender: " + person[0].gender + "\n";
  personInfo += "DOB: " + person[0].dob + "\n";
  personInfo += "Height: " + person[0].height + "\n";
  personInfo += "Weight: " + person[0].weight + "\n";
  personInfo += "Eye Color: " + person[0].eyeColor + "\n";
  personInfo += "Occupation: " + person[0].occupation + "\n";

  alert(personInfo);
  return mainMenu(person);
}

function displayFamily(person, people) {


  let parents = displayParents(person, people);
  let siblings = displaySiblings(person, people);
  let spouse = displaySpouse(person, people);

}


function displayDecendants(person, people) {
  // print all of the person's Decendants:
  let descendants = []
  let parentID = person[0].id;
  people.filter(function (potentialMatch) {
    let parents = potentialMatch.parents
    for (let i = 0; i < parents.length; i++) {
      if (potentialMatch.parents[0] === parentID) {
        descendants.push(potentialMatch)
      } else

        //alert(descendants);
        return descendants != [];
    }
  })
  displayPeople(descendants);
}

function displaySpouse(person, people) {
  // print all of the person's Decendants:
  let foundSpouse = []
  let spouseID = person[0].id;
  people.filter(function (potentialMatch) {
    if (potentialMatch.currentSpouse === spouseID) {
      foundSpouse.push(potentialMatch)
    } else
      //alert(descendants);
      return foundSpouse != [];
  })
  displayPeople(foundSpouse);
}

function displayParents(person, people) {
  // print all of the person's Parents:
  let foundParents = []
  let parentID = person[0].parents;
  people.filter(function (potentialMatch) {
    if (potentialMatch.id === parentID[0] || potentialMatch.id === parentID[1]) {
      foundParents.push(potentialMatch)
    } else
      //alert(parents);
      return foundParents != [];
  })
  displayPeople(foundParents);
}

function displaySiblings(person, people) {
  // print all of the person's siblings:
  let siblings = []
  let siblingParents = person[0].parents;
  people.filter(function (potentialMatch) {
    if (potentialMatch.parents[0] === siblingParents[0]) {
      siblings.push(potentialMatch)
    } else
      //alert(siblings);
      return siblings != [];
  })
  displayPeople(siblings);
}


//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid) {
  let isValid;
  do {
    var response = prompt(question).trim();
    isValid = valid(response);
  } while (response === "" || isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input) {
  if (input.toLowerCase() == "yes" || input.toLowerCase() == "no") {
    return true;
  }
  else {
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input) {
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.

function letterValidation(input) {
  let letters = /^[A-Za-z]+$/;
  if (input.match(letters)) {
    return true;
  } else {
    alert("Your input was invalid");
    return false;
  }
}

function numberValidation(input) {
  let numbers = /^[0-9]*$/;
  if (input.match(numbers) && input < 350) {
    return true;
  } else {
    alert("Your input was invalid");
    return false;
  }
}

function dobValidation(input) {

     if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(input))
         return false;
     let parts = input.split("/");
     let day = parseInt(parts[1], 10);
     let month = parseInt(parts[0], 10);
     let year = parseInt(parts[2], 10);
     let monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

     if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)){
         monthLength[1] = 29;
     return day > 0 && day <= monthLength[month - 1];
     }else  if(year < 1850 || year > 2075 || month == 0 || month > 12){
      alert("Your input was invalid");
      return false;
     }else{

     return true;
    }
}

//#endregion

//#region

function multiTraitSearch(people) {
  let searchTraitSelection;
  let repeat = "";
  let counter = 0;
  let foundPerson = people;
  while (counter !== 5) {
    searchTraitSelection = prompt("Which of these traits would you like to search by?  Gender , DOB, Height, Weight, EyeColor, Occupation");
    switch (searchTraitSelection) {
      case "gender":
        foundPerson = searchByGender(foundPerson);
        counter++
        break;
      case "dob":
        foundPerson = searchByDob(foundPerson);
        counter++
        break;
      case "height":
        foundPerson = searchByHeight(foundPerson);
        counter++
        break;
      case "weight":
        foundPerson = searchByWeight(foundPerson);
        counter++
        break;
      case "eyecolor":
        foundPerson = searchByEyeColor(foundPerson);
        counter++
        break;
      case "occupation":
        counter++
        foundPerson = searchByOccupation(foundPerson);
      default:
        counter++;
        break;
    }
    repeat = prompt("Would you like to search by another trait? If not type done")
    counter++
    if (repeat === "done") {
      searchByName(people);
      break;
    }
  }
}
// #endregion
