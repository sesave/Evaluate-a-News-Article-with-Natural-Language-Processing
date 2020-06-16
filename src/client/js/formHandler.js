function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formTextValue = document.getElementById("name").value;
  if (!formTextValue) return;
  Client.checkForName(formTextValue);
  let reqBody = {
    text: formTextValue,
  };
  console.log("::: Form has been Submitted :::");

  fetch("http://localhost:8080/textApi", {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then(function (res) {
      document.getElementById("results").innerHTML = res.polarity;
      console.log(res);
    })
    .catch(function (error) {
      console.log(error.message);
    });
}

export { handleSubmit };
