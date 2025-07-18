// popup.js
document.getElementById("findSimilar").addEventListener("click", async () => {
  // 1. Grab current tab’s product data
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const product = await chrome.tabs.sendMessage(tab.id, { type: "GET_PRODUCT" });
  if (!product?.title) return alert("No product found on this page.");

  // 2. Call backend for 5 similar items
  const res = await fetch("https://your-api.com/similar", {
    method: "POST",
    headers: { "Content-Type":"application/json" },
    body: JSON.stringify(product)
  });
  const items = await res.json();

  // 3. Render them with thumbs
  const container = document.getElementById("results");
  container.innerHTML = "";
  items.slice(0,5).forEach(item => {
    const el = document.createElement("div");
    el.innerHTML = `
      <img src="${item.img}" width="50" style="vertical-align:middle"/>
      <a href="${item.url}" target="_blank">${item.title}</a>
      <button class="up" data-id="${item.id}">👍</button>
      <button class="down" data-id="${item.id}">👎</button>
    `;
    container.append(el);
  });
});

document.getElementById("results").addEventListener("click", e => {
  if (!e.target.dataset.id) return;
  const liked = e.target.classList.contains("up");
  fetch("https://your-api.com/feedback", {
    method: "POST",
    headers: { "Content-Type":"application/json" },
    body: JSON.stringify({ itemId: e.target.dataset.id, liked })
  });
  e.target.disabled = true;
});
