// elements
const elSelect = document.querySelector("#select");
const elInput = document.querySelector("#input");
const elTBody = document.querySelector("#table tbody");
const elPrice = document.querySelector("#price");
const elForm = document.querySelector("#form");

// variables
const fuels = [
  { name: "80", type: "ai80", price: 10000, base: 1000 },
  { name: "92", type: "ai92", price: 7000, base: 1000 },
  { name: "95", type: "ai95", price: 8000, base: 1000 },
  { name: "Dizel", type: "dizel", price: 5000, base: 1000 },
];

// render options
const renderSelectOptions = (data, elSelect) => {
  elSelect.innerHTML = "";

  data.forEach(item => {
    const disabled = item.base === 0;

    elSelect.innerHTML += `
      <option value="${item.type}" ${disabled && "disabled"}>${item.name}</option>
    `;
  });
};

// render rows
const renderTableRows = (data, tbody) => {
  tbody.innerHTML = "";

  data.forEach(item => {
    tbody.innerHTML += `
    <tr class="${item.type}">
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
  if (!elInput.value.trim()) return;

  const selectedType = fuels.find(fuel => fuel.type === elSelect.value);
  const value = +elInput.value;

  if (value > selectedType.base) {
    elPrice.textContent = (selectedType.base * selectedType.price).toLocaleString();
    selectedType.base = 0;
  } else {
    elPrice.textContent = (value * selectedType.price).toLocaleString();
    selectedType.base -= value;
  }

  renderTableRows(fuels, elTBody);
  renderSelectOptions(fuels, elSelect);
};

// content loaded
renderSelectOptions(fuels, elSelect);
renderTableRows(fuels, elTBody);

// events
elForm.addEventListener("submit", calculate);