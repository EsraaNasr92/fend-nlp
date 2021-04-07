function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/test', {
      method: "POST",
      credentials: 'same-origin',
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
          formText: formText
      }),
    })
    .then(res => res.json())
    .then(function(res) {

      console.log('res ======> ', res)
      document.getElementById('results').innerHTML = res.agreement;
      document.getElementById('polarity').innerHTML = res.irony;
      document.getElementById("score_tag").innerHTML = res.score_tag;
      document.getElementById("confidence").innerHTML = res.confidence;
    })
}

export { handleSubmit }
