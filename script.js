// Write your JavaScript code here!

window.addEventListener("load", function () {
  let mainStatus = document.getElementById("launchStatus");
  let pilotStatus = document.getElementById("pilotStatus");
  let copilotStatus = document.getElementById("copilotStatus");
  let fuelStatus = document.getElementById("fuelStatus");
  let cargoStatus = document.getElementById("cargoStatus");
  let list = document.getElementById("faultyItems");
  let form = document.querySelector("form");
  let inputValues = document.querySelectorAll("input[type=text]");
  let number = inputValues.length - inputValues.length;

  form.addEventListener("submit", function (event) {
      formSubmission(
      window.document,
      list,
      inputValues[number].value,
      inputValues[number + 1].value,
      inputValues[number + 2].value,
      inputValues[number + 3].value
    );
    event.preventDefault()
    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse
      .then(function (result) {
        listedPlanets = result;
      })
      .then(function () {
        // Below this comment call the appropriate helper functions to pick a planet from the list of planets and add that information to your destination.
        let result = pickPlanet(listedPlanets);
        addDestinationInfo(
          document,
          result.name,
          result.diameter,
          result.star,
          result.distance,
          result.moons,
          result.image
        );
      });
  });
});
