const shippingRates = {
  1896: { name: "City Bell", price: 2000 },
  1897: { name: "Manuel B. Gonnet", price: 2000 },
  1901: { name: "Ringuelet", price: 2000 },
  1900: { name: "La Plata (Centro)", price: 2000 },
  1902: { name: "Los Hornos", price: 2500 },
  1904: { name: "Tolosa", price: 2000 },
  1906: { name: "San Carlos", price: 2000 },
  1903: { name: "Villa Elvira / Melchor Romero", price: 2500 },
  1909: { name: "Arana", price: 3500 },
  1898: { name: "Joaquín Gorina", price: 2000 },
  1894: { name: "Villa Elisa", price: 2000 },
  1933: { name: "Abasto", price: 2500 },
  1923: { name: "Berisso", price: 2500 },
  1925: { name: "Ensenada", price: 2500 },
  1895: { name: "Arturo Segui", price: 2000 }
};

export default function getShippingRate(postalCode) {
  return shippingRates[postalCode] || { name: "Zona no cubierta", price: -1 };
}
