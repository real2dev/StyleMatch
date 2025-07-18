// content.js

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_PRODUCT") {
    // Scrape the DOM for the product’s data.
    // You’ll almost certainly need to tweak these selectors per site.
    const title = document.querySelector("h1.product-title")?.innerText || "";
    const img   = document.querySelector("img.product-image")?.src      || "";
    const desc  = document.querySelector(".description")?.innerText     || "";

    // Send it back to popup.js
    sendResponse({ title, img, desc });
  }
  // Return true if you plan to send the response asynchronously.
  return false;
});
