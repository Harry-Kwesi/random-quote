const text = document.querySelector(".quoteText p");
const author = document.querySelector(".quoteAuthor p");
const randomButton = document.getElementById("randomButton");
const tweetButton = document.getElementById("tweetButton");

async function fetchData() {
  try {
    const response = await fetch("https://type.fit/api/quotes");
    const data = await response.json();

    if (data && data.length > 0) {
      // Pick a random quote from the response
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomQuote = data[randomIndex];

      // Update the text and author elements with the quote data
      text.textContent = randomQuote.text;
      author.textContent = randomQuote.author || "Unknown Author"; // Handle cases where there is no author

      // Update the tweetButton to include the quote
      const tweetText = `"${randomQuote.text}" - ${
        randomQuote.author || "Unknown Author"
      }`;
      tweetButton.setAttribute("data-text", tweetText);
    } else {
      // Handle the case where the API response is empty or there was an issue with the data
      text.textContent = "No quotes available";
      author.textContent = "Unknown Author";
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation", error);
  }
}

function postTweet(width = 800, height = 250) {
  const left = (screen.width - width) / 2;
  const top = (screen.height - height) / 2;

  const tweetText = encodeURIComponent(
    tweetButton.getAttribute("data-text") || ""
  );
  const twitterURL = `https://twitter.com/intent/tweet?text=${tweetText}`;

  const features = [
    "menubar=no",
    "toolbar=no",
    "resizable=yes",
    "scrollbars=yes",
    `height=${height}`,
    `width=${width}`,
    `left=${left}`,
    `top=${top}`,
  ].join(",");

  // Open a new window to the Twitter intent URL
  const popupWindow = window.open(twitterURL, "", features);

  // Check if the popup was blocked
  if (
    !popupWindow ||
    popupWindow.closed ||
    typeof popupWindow.closed === "undefined"
  ) {
    alert(
      "The popup was blocked by the browser. Please enable popups for this site."
    );
  }
}

fetchData();

// Button to fetch and display a new random quote
randomButton.addEventListener("click", fetchData);

// Button to tweet the quote
tweetButton.addEventListener("click", postTweet);
