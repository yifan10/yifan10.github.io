let dataOne = sendApiRequest("first");
let dataTwo = sendApiRequest("second");
async function sendApiRequest(temp) {
  const username = "tNm4ifUUtta2vX0AwsqvWE7aCnGkhKHGrVbyVfcU";
  const response = await fetch(
    "https://api.nasa.gov/planetary/apod?api_key=" + username + "&count=1"
  );
  const dataArray = await response.json();
  const data = dataArray[0];
  useApiData(data, temp);
  return data;
}

function useApiData(data, temp) {
  document.querySelector("#" + temp + "MyImg").src = data.url;
  document.querySelector("#" + temp + "Description").innerHTML =
    data.explanation;
  document.querySelector("#" + temp + "Date").innerHTML = data.date;
  document.querySelector("#" + temp + "Title").innerHTML = data.title;
}

function myFunction(temp) {
  const name = "#" + temp + "B";
  if (document.querySelector(name).innerHTML == "Unlike") {
    document.querySelector(name).innerHTML = "Like";
  } else {
    document.querySelector(name).innerHTML = "Unlike";
  }
}
const facebook = document.querySelector("#facebook");
const today = new Date();
console.log(today.get);

async function share(temp) {
  let url = "";
  if (temp == "first") {
    url = (await dataOne).url;
  } else {
    url = (await dataTwo).url;
  }
  const shareUrl = "http://www.facebook.com/sharer/sharer.php?u=" + url;
  window.open(shareUrl, "NewWindow");
}
function submit() {
  const startDate = document.querySelector("#startdate").value;
  sendApiRequestDate(startDate);
}
async function sendApiRequestDate(startDate) {
  const username = "tNm4ifUUtta2vX0AwsqvWE7aCnGkhKHGrVbyVfcU";
  const today = new Date();
  const response = await fetch(
    "https://api.nasa.gov/planetary/apod?api_key=" +
      username +
      "&start_date=" +
      startDate +
      "&end_date=" +
      today.getFullYear() +
      "-" +
      (today.getUTCMonth() + 1) +
      "-" +
      today.getDate()
  );

  const dataArray = await response.json();
  dataOne = dataArray[0];
  dataTwo = dataArray[0];
  if (dataArray.length != 1) {
    dataTwo = dataArray[1];
  }
  useApiData(dataOne, "first");
  useApiData(dataTwo, "second");
}
