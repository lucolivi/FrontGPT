function getRelatedContent(content, n) {
    var promptPromise = new Promise((resolve, reject) => {
        
        getPromptResponse($("#preprompt").val() + " " + content +"'", n, 0.7, $("#apikey").val())
            .then(function(response) {  
                
                var respList = []
                for(var i in response.choices) {
                    respList.push(response.choices[i].message.content)
                }

                resolve(respList)

            })
            .catch(reject)
    });

    return promptPromise
}

function getSystemResponse(prev_response, prompt, n, temperature, apiKey) {

  // Define the API request URL
  var apiUrl = "https://api.openai.com/v1/chat/completions";

  // Set up the prompt for the ChatGPT API
  //var prompt = "Hello, World!";

  messages = []

  if(prev_response != null)
    messages.push({role:"assistant", content: prev_response})

  messages.push({role:"user", content: prompt})

  console.log(messages)

  // Make the API request using jQuery
  return $.ajax({
    url: apiUrl,
    type: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apiKey
    },
    data: JSON.stringify({
      model: "gpt-4o",
      messages: messages,
      // max_tokens: 50,
      n: n,
      // stop: null,
      temperature: temperature
    })
  });

}



function getPromptResponse(prompt, n, temperature, apiKey) {

    // Define the API request URL
    var apiUrl = "https://api.openai.com/v1/chat/completions";
  
    // Set up the prompt for the ChatGPT API
    //var prompt = "Hello, World!";
  
    // Make the API request using jQuery
    return $.ajax({
      url: apiUrl,
      type: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
      },
      data: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{role:"user", content:prompt}],
        max_tokens: 50,
        n: n,
        // stop: null,
        temperature: temperature
      })//,
    //   success: function(response) {
    //     console.log("Response from ChatGPT:", response.choices[0].message.content);
    //   },
    //   error: function(xhr, status, error) {
    //     console.error("Error in ChatGPT API request:", error);
    //   }
    });
  
}
