// Write your helper functions here!
require("isomorphic-fetch");

function addDestinationInfo(
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) {
  let output = document.getElementById("missionTarget");
  // Here is the HTML formatting for our mission target div.
  /*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">
   */
  output.innerHTML = `<h2>Mission Destination</h2>
                    <ol>
                        <li>Name:    \t  ${name}</li>
                        <li>Diameter: \t    ${diameter}</li>
                        <li>Star:   \t   ${star}</li>
                        <li>Distance from Earth:   \t    ${distance}</li>
                        <li>Number of Moons:  \t   ${moons}</li>
                    </ol>    
                    <img src="${imageUrl}">
                `;
}
function validateInput(testInput) {
  if (testInput === "" || testInput.length === 0 || testInput === "Empty") {
    return "Empty";
  } else if (isNaN(testInput)) {
    return "Not a Number";
  } else if (!isNaN(testInput)) {
    return "Is a Number";
  } else {
    return "null";
  }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
  let mainStatus = document.getElementById("launchStatus");
  let pilotStatus = document.getElementById("pilotStatus");
  let copilotStatus = document.getElementById("copilotStatus");
  let fuelStatus = document.getElementById("fuelStatus");
  let cargoStatus = document.getElementById("cargoStatus");

  let validArray = ["Empty", "Not a Number", "Is a Number"];

  let inputArray = [
    validateInput(pilot),
    validateInput(copilot),
    validateInput(fuelLevel),
    validateInput(cargoLevel),
  ];

  let i = 0;
  let j = 1;
  while (i < inputArray.length && j < 3) {
    if (inputArray[i] === validArray[j]) {
      if (i === 1) {
        j++;
      }
      i++;
    } else if (inputArray.indexOf("Empty") >= 0) {
      return alert("All fields are requried!");
    } else if (
      inputArray[i] === "null" ||
      inputArray[i] === "Not a Number" ||
      inputArray[i] === "Is a Number"
    ) {
      return alert("Make sure to enter valid information for each field!");
    }
  }
  if (fuelLevel < 10000 && cargoLevel < 10000) {
    list.style.visibility = "visible";
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    fuelStatus.innerHTML = `Fuel level too low for launch`;
    cargoStatus.innerHTML = `Cargo mass low enough for launch`;
    mainStatus.textContent = "Shuttle Not Ready for Launch";
    mainStatus.style.color = "rgb(199, 37, 78)";
  } else if (fuelLevel < 10000 && cargoLevel >= 10000) {
    list.style.visibility = "visible";
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    fuelStatus.innerHTML = `Fuel level too low for launch`;
    cargoStatus.innerHTML = `Cargo mass too heavy for launch`;
    mainStatus.textContent = "Shuttle Not Ready for Launch";
    mainStatus.style.color = "rgb(199, 37, 78)";
  } else if (fuelLevel >= 10000 && cargoLevel >= 10000) {
    list.style.visibility = "visible";
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    fuelStatus.innerHTML = `Fuel level high enough for launch`;
    cargoStatus.innerHTML = `Cargo mass too heavy for launch`;
    mainStatus.textContent = "Shuttle Not Ready for Launch";
    mainStatus.style.color = "rgb(199, 37, 78)";
  } else if (fuelLevel >= 10000 && cargoLevel < 10000) {
    list.style.visibility = "visible";
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    fuelStatus.innerHTML = `Fuel level high enough for launch`;
    cargoStatus.innerHTML = `Cargo mass low enough for launch`;
    mainStatus.textContent = "Shuttle is Ready for Launch";
    mainStatus.style.color = "rgb(65, 159, 106)";
  }
}

async function myFetch() {
  let planetsReturned;
  planetsReturned = await fetch(
    "https://handlers.education.launchcode.org/static/planets.json"
  ).then(function (response) {
    let jsonPromise = response.json();
    return jsonPromise;
  });

  return planetsReturned;
}

function pickPlanet(planets) {
  return planets[Math.floor(Math.random() * planets.length)];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
