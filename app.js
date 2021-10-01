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

  let displayOption = promptFor("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch (displayOption) {
    case "info":
      displayOption = displayPerson(person);
      break;
    case "family":
      displayOption = displaySiblings(person, data)
      break;
    case "descendants":
      displayOption = displayDescendants(person, data);
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
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

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

  let eyeColor = promptFor("What is the person's eye color?", autoValid);

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

  let gender = promptFor("What is the person's gender?", autoValid);

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

  let dob = promptFor("What is the person's date of birth? EX: 1/11/11", autoValid);

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

  let height = promptFor("What is the person's height in inches?", autoValid);

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

  let weight = promptFor("What is the person's weight in pounds?", autoValid);

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

  let occupation = promptFor("What is the person's occupation?", autoValid);

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

function displayPerson(person) {
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
  personInfo += "Parents: " + person[0].parents + "\n"; 
  personInfo += "Spouse: " + person[0].currentSpouse + "\n";

  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
  return mainMenu(person);
}

 function displayFamily(person, people){
let parents = displayParents(person, people);
let spouse = displaySpouse(person, people);
let siblings = displaySiblings(person, people)


let familyInfo = "Parents: " = parents + "\n";
familyInfo += "Spouse: " = foundSpouse + "\n";
familyInfo += "Siblings: " = siblings + "\n";

alert(familyInfo);
return mainMenu(people); 
}


function displayDescendants(person, people) {
  // print all of the person's Decendants:
  let descendants = [];
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

function displaySiblings(person, people){
 // print all of the person's siblings:
 let siblings = [];
 let parentID = person[0].id;
 people.filter(function (potentialMatch) {
   let parents = potentialMatch.parents
     if (potentialMatch.parents[0] === parentID) {
       descendants.push(potentialMatch)
     } else

       //alert(descendants);
       return siblings != [];
 })
 displayPeople(descendants);
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
function customValidation(input) {

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
        console.log("Whoops, try again!");
        counter++
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
