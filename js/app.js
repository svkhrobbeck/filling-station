// elements
const elSelect = document.querySelector("#select");
const elInput = document.querySelector("#input");
const elFuelTBody = document.querySelector("#fuel-table tbody");
const elPrice = document.querySelector("#price");
const elWarn = document.querySelector("#warn");
const elForm = document.querySelector("#form");
const elPurchasesTable = document.querySelector("#purchases-table");
const elPurchasesTBody = document.querySelector("#purchases-table tbody");

// variables
const fuels = [
  { name: "80", type: "ai80", price: 10000, base: 1000 },
  { name: "92", type: "ai92", price: 7000, base: 1000 },
  { name: "95", type: "ai95", price: 8000, base: 1000 },
  { name: "Dizel", type: "dizel", price: 5000, base: 1000 },
];

const purchases = [];

// render select options
const renderSelectOptions = (data, elSelect) => {
  elSelect.innerHTML = `<option value="" selected hidden>Select Fuel Type</option>`;

  data.forEach(item => {
    const disabled = item.base === 0;

    elSelect.innerHTML += `
      <option value="${item.type}" ${disabled && "disabled"}>${item.name}</option>
    `;
  });
};

// render purchases table rows
const renderPurchasesTableRows = (data, tbody) => {
  tbody.innerHTML = "";

  data.forEach((item, idx) => {
    tbody.innerHTML += `
    <tr class="${item.type}">
      <td>${idx + 1}</td>
      <td>${item.type}</td>
      <td>${item.amount.toLocaleString()}</td>
      <td>${item.price.toLocaleString()}</td>
    </tr>
    `;
  });

  tbody.innerHTML += `
  <tr class="total-row">
    <td colspan="2">Total</td>
    <td>${data.reduce((a, b) => a + b.amount, 0).toLocaleString()}</td>
    <td>${data.reduce((a, b) => a + b.price, 0).toLocaleString()}</td>
  </tr>`;
};

// render fuel table rows
const renderTableRows = (data, tbody) => {
  tbody.innerHTML = "";

  data.forEach(item => {
    tbody.innerHTML += `
    <tr class="${item.type} ${item.base === 0 && "disabled-row"}">
      <td>${item.type}</td>
      <td>${item.base}</td>
      <td>${item.price.toLocaleString()}</td>
    </tr>
    `;
  });
};

// calculate
const calculate = e => {
  e.preventDefault();
  if (!elSelect.value) {
    elWarn.classList.remove("visually-hidden");
    elWarn.textContent = "Select fuel type!";
    return;
  }
  if (!elInput.value.trim()) return;

  const selectedType = fuels.find(fuel => fuel.type === elSelect.value);
  const amount = +elInput.value;

  if (amount > selectedType.base) {
    const price = selectedType.base * selectedType.price;
    elPrice.textContent = price.toLocaleString();
    elWarn.classList.remove("visually-hidden");

    elWarn.textContent = `You have entered more than all the ${selectedType.type} we have, we can only give you what we have!`;

    purchases.push({ ...selectedType, amount: selectedType.base, price });
    selectedType.base = 0;
  } else {
    const price = amount * selectedType.price;
    elPrice.textContent = price.toLocaleString();
    selectedType.base -= amount;

    purchases.push({ ...selectedType, amount, price });
  }

  if (elPurchasesTable.classList.contains("visually-hidden")) elPurchasesTable.classList.remove("visually-hidden");

  renderPurchasesTableRows(purchases, elPurchasesTBody);
  renderTableRows(fuels, elFuelTBody);
  renderSelectOptions(fuels, elSelect);
  e.target.reset();
};

// content loaded
renderSelectOptions(fuels, elSelect);
renderTableRows(fuels, elFuelTBody);

// events
elForm.addEventListener("submit", calculate);
