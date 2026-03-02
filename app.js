async function send() {

  const input = document.getElementById("message");
  const message = input.value;

  const chat = document.getElementById("chat");

  chat.innerHTML += `<p><b>You:</b> ${message}</p>`;
  chat.innerHTML += `<p><b>AI:</b> <span id="stream"></span></p>`;

  const response = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify({ message })
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let result = "";

  while(true) {

    const { done, value } = await reader.read();

    if(done) break;

    const chunk = decoder.decode(value);

    result += chunk;

    document.getElementById("stream").innerText = result;
  }

}

function toggleTheme() {

  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");

}