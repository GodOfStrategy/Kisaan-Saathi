document.addEventListener("DOMContentLoaded", () => {
  const phInput = document.getElementById("ph");
  const lengthInput = document.getElementById("length");
  const widthInput = document.getElementById("width");
  const cropSelect = document.getElementById("crop");
  const langSelect = document.getElementById("language");
  const output = document.getElementById("recommendation");
  const form = document.getElementById("soilForm");

  // Translation dictionary
  const translations = {
    en: {
      recommendationTitle: "Recommendation",
      preferredTitle: "Your preferred choice",
      cost: "Cost of seed",
      yield: "Estimated yield",
      advice: "Advice",
      production: "Estimated production",
      limeAdvice: (amount) => `Add about ${amount} tonnes of lime to raise pH.`,
      sulfurAdvice: (amount) => `Add about ${amount} tonnes of sulfur to lower pH.`,
      suitableAdvice: "Soil pH is suitable for your selected crop.",
      phLabel: "Soil pH:",
      lengthLabel: "Field Length (m):",
      widthLabel: "Field Width (m):",
      cropLabel: "Preferred Crop:",
      buttonText: "Get Recommendation",
      header: "Enter Soil details"
    },
    hi: {
      recommendationTitle: "सिफारिश",
      preferredTitle: "आपकी पसंद",
      cost: "बीज की लागत",
      yield: "अनुमानित उपज",
      advice: "सलाह",
      production: "अनुमानित उत्पादन",
      limeAdvice: (amount) => `pH बढ़ाने के लिए लगभग ${amount} टन चूना डालें।`,
      sulfurAdvice: (amount) => `pH घटाने के लिए लगभग ${amount} टन गंधक डालें।`,
      suitableAdvice: "मिट्टी का pH आपकी चुनी हुई फसल के लिए उपयुक्त है।",
      phLabel: "मिट्टी का pH:",
      lengthLabel: "खेत की लंबाई (मीटर):",
      widthLabel: "खेत की चौड़ाई (मीटर):",
      cropLabel: "पसंदीदा फसल:",
      buttonText: "सिफारिश प्राप्त करें",
      header: "मिट्टी का विवरण दर्ज करें"
    },
    mr: {
      recommendationTitle: "शिफारस",
      preferredTitle: "तुमची पसंती",
      cost: "बियाण्याचा खर्च",
      yield: "अंदाजे उत्पादन",
      advice: "सल्ला",
      production: "अंदाजे उत्पादन",
      limeAdvice: (amount) => `pH वाढवण्यासाठी अंदाजे ${amount} टन चुनखडी घाला.`,
      sulfurAdvice: (amount) => `pH कमी करण्यासाठी अंदाजे ${amount} टन गंधक घाला.`,
      suitableAdvice: "मातीचा pH तुमच्या निवडलेल्या पिकासाठी योग्य आहे.",
      phLabel: "मातीचा pH:",
      lengthLabel: "शेताची लांबी (मीटर):",
      widthLabel: "शेताची रुंदी (मीटर):",
      cropLabel: "पसंत केलेले पीक:",
      buttonText: "शिफारस मिळवा",
      header: "मातीचे तपशील भरा"
    }
  };

  // Example dataset (expand with all crops)
  const cropData = {
  // --- CEREALS ---
  "wheat_bread": { cost: 7050, yield: 20, phRange: [6.0, 7.5] },
  "wheat_durum_dicoccum": { cost: 7880, yield: 16, phRange: [6.0, 7.5] },
  "wheat_desi": { cost: 7880, yield: 16, phRange: [6.0, 7.5] },
  "barley": { cost: 7600, yield: 15, phRange: [6.0, 7.5] },
  "malt_barley": { cost: 8500, yield: 15, phRange: [6.0, 7.5] },
  "paddy_coarse": { cost: 7260, yield: 23, phRange: [5.5, 6.5] },
  "paddy_medium": { cost: 7780, yield: 24, phRange: [5.5, 6.5] },
  "paddy_pusa44": { cost: 7750, yield: 24, phRange: [5.5, 6.5] },
  "paddy_basmati": { cost: 12700, yield: 13, phRange: [5.5, 6.5] },
  "paddy_hybrid_A": { cost: 50500, yield: 28, phRange: [5.5, 6.5] },
  "paddy_hybrid_BR": { cost: 10000, yield: 28, phRange: [5.5, 6.5] },
  "maize_inbred": { cost: 37000, yield: 23, phRange: [5.5, 7.5] },
  "maize_varieties": { cost: 7600, yield: 23, phRange: [5.5, 7.5] },
  "sorghum_A": { cost: 36600, yield: 11, phRange: [6.0, 7.5] },
  "sorghum_BR": { cost: 25300, yield: 11, phRange: [6.0, 7.5] },
  "sorghum_varieties": { cost: 12300, yield: 11, phRange: [6.0, 7.5] },
  "bajra_A": { cost: 58200, yield: 9, phRange: [6.0, 7.5] },
  "bajra_BR": { cost: 20200, yield: 9, phRange: [6.0, 7.5] },
  "bajra_varieties": { cost: 15200, yield: 9, phRange: [6.0, 7.5] },
  "finger_millet": { cost: 6800, yield: 9, phRange: [5.5, 7.0] },
  "foxtail_millet": { cost: 5700, yield: 7, phRange: [5.5, 7.0] },
  "kodo_millet": { cost: 5700, yield: 7, phRange: [5.5, 7.0] },
  "proso_millet": { cost: 5700, yield: 7, phRange: [5.5, 7.0] },
  "little_millet": { cost: 5700, yield: 7, phRange: [5.5, 7.0] },

  // --- PULSES ---
  "moong": { cost: 22700, yield: 5, phRange: [6.0, 7.5] },
  "urd": { cost: 24700, yield: 5, phRange: [6.0, 7.5] },
  "arhar_varieties": { cost: 20900, yield: 7, phRange: [6.0, 7.5] },
  "arhar_hybrid_A": { cost: 32900, yield: 8, phRange: [6.0, 7.5] },
  "arhar_hybrid_BR": { cost: 22700, yield: 8, phRange: [6.0, 7.5] },
  "cowpea": { cost: 13600, yield: 6, phRange: [6.0, 7.5] },
  "gram_kabuli": { cost: 17900, yield: 7, phRange: [6.0, 7.5] },
  "gram_desi": { cost: 13000, yield: 7, phRange: [6.0, 7.5] },
  "lentil": { cost: 15400, yield: 7, phRange: [6.0, 7.5] },
  "pea": { cost: 9100, yield: 7, phRange: [6.0, 7.5] },
  "mothbean": { cost: 16100, yield: 5, phRange: [6.0, 7.5] },
  "rajmash": { cost: 15200, yield: 7, phRange: [6.0, 7.5] },
  "horsegram": { cost: 7600, yield: 5, phRange: [6.0, 7.5] },

  // --- OILSEEDS ---
  "groundnut": { cost: 17000, yield: 9, phRange: [6.0, 7.5] },
  "soybean": { cost: 12800, yield: 9, phRange: [6.0, 7.0] },
  "sunflower_varieties": { cost: 17000, yield: 7, phRange: [6.0, 7.5] },
  "sunflower_hybrid_A": { cost: 78500, yield: 8, phRange: [6.0, 7.5] },
  "sunflower_hybrid_BR": { cost: 38000, yield: 8, phRange: [6.0, 7.5] },
  "castor_varieties": { cost: 15400, yield: 7, phRange: [6.0, 7.5] },
  "castor_hybrid_A": { cost: 72400, yield: 8, phRange: [6.0, 7.5] },
  "castor_hybrid_BR": { cost: 26500, yield: 8, phRange: [6.0, 7.5] },
  "sesame": { cost: 25500, yield: 3.5, phRange: [6.0, 7.5] },
  "niger": { cost: 14500, yield: 3.5, phRange: [6.0, 7.5] },
  "rapeseed_varieties": { cost: 13550, yield: 7, phRange: [6.0, 7.5] },
  "rapeseed_hybrid_A": { cost: 36200, yield: 8, phRange: [6.0, 7.5] },
  "rapeseed_hybrid_BR": { cost: 16900, yield: 8, phRange: [6.0, 7.5] },
  "toria": { cost: 12700, yield: 6.5, phRange: [6.0, 7.5] },
  "taramira": { cost: 12700, yield: 6.5, phRange: [6.0, 7.5] },
  "safflower_varieties": { cost: 10000, yield: 5.5, phRange: [6.0, 7.5] },
  "safflower_hybrid_female": { cost: 30400, yield: 5.5, phRange: [6.0, 7.5] },
  "safflower_hybrid_male": { cost: 13300, yield: 5.5, phRange: [6.0, 7.5] },
  "linseed": { cost: 8300, yield: 5.5, phRange: [6.0, 7.5] },

  // --- FIBRE CROPS ---
  "jute": { cost: 24000, yield: 28, phRange: [5.0, 7.0] },
  "mesta": { cost: 11400, yield: 11, phRange: [6.0, 7.5] },
  "sunhemp": { cost: 11400, yield: 11, phRange: [6.0, 7.5] },
  "cotton_arboreum": { cost: 25850, yield: 9, phRange: [6.0, 7.5] },
  "cotton_hirsutum": { cost: 29300, yield: 9, phRange: [6.0, 7.5] },
  "cotton_barbadense": { cost: 29300, yield: 9, phRange: [6.0, 7.5] },
  "cotton_hybrid_two_female": { cost: 126500, yield: 11, phRange: [6.0, 7.5] },
  "cotton_hybrid_two_male": { cost: 126500, yield: 11, phRange: [6.0, 7.5] },
  "cotton_hybrid_three_A": { cost: 138000, yield: 11, phRange: [6.0, 7.5] },
  "cotton_hybrid_three_RB": { cost: 138000, yield: 11, phRange: [6.0, 7.5] },

  // --- FORAGE / FODDER CROPS ---
  "guar": { cost: 22700, yield: 9, phRange: [6.0, 7.5] }, // seed yield avg
  "teosinte": { cost: 4300, yield: 23, phRange: [6.0, 7.5] }, // green fodder quintals/acre
  "lucerne": { cost: 58800, yield: 90, phRange: [6.5, 7.5] }, // green fodder
  "berseem": { cost: 49400, yield: 90, phRange: [6.5, 7.5] }, // green fodder
  "oat": { cost: 8000, yield: 23, phRange: [5.5, 7.0] }, // grain or green fodder avg
  "fodder_cowpea": { cost: 14200, yield: 23, phRange: [6.0, 7.5] }, // green fodder
  "fodder_maize": { cost: 7600, yield: 28, phRange: [5.5, 7.5] }, // green fodder
  "fodder_jowar_single": { cost: 15200, yield: 23, phRange: [6.0, 7.5] }, // green fodder
  "fodder_jowar_multi": { cost: 22800, yield: 30, phRange: [6.0, 7.5] }, // green fodder
  "fodder_bajra": { cost: 14200, yield: 23, phRange: [6.0, 7.5] }, // green fodder
  "dhaincha": { cost: 9400, yield: 23, phRange: [6.0, 7.5] } // green manure/fodder avg
};


  function getBestCrop(ph) {
    let bestKey = null;
    let bestScore = Infinity;
    for (const key in cropData) {
      const [low, high] = cropData[key].phRange;
      if (ph >= low && ph <= high) {
        const center = (low + high) / 2;
        const score = Math.abs(ph - center);
        if (score < bestScore) {
          bestScore = score;
          bestKey = key;
        }
      }
    }
    return bestKey;
  }

  function getAdvice(ph, range, areaAcres, t) {
    if (ph < range[0]) {
      const diff = range[0] - ph;
      const lime = (2 * diff * areaAcres).toFixed(1);
      return t.limeAdvice(lime);
    }
    if (ph > range[1]) {
      const diff = ph - range[1];
      const sulfur = (0.5 * diff * areaAcres).toFixed(1);
      return t.sulfurAdvice(sulfur);
    }
    return t.suitableAdvice;
  }

  // Update static labels instantly when language changes
  function updateLabels(lang) {
    const t = translations[lang];
    document.querySelector("h2").textContent = t.header;
    document.querySelector("label[for='ph']").textContent = t.phLabel;
    document.querySelector("label[for='length']").textContent = t.lengthLabel;
    document.querySelector("label[for='width']").textContent = t.widthLabel;
    document.querySelector("label[for='crop']").textContent = t.cropLabel;
    document.querySelector("button[type='submit']").textContent = t.buttonText;
  }

  langSelect.addEventListener("change", () => {
    updateLabels(langSelect.value);
    // Regenerate recommendation if it exists
    if (output.classList.contains("active")) {
      const ph = parseFloat(phInput.value);
      const length = parseFloat(lengthInput.value);
      const width = parseFloat(widthInput.value);
      const cropKey = cropSelect.value;
      const lang = langSelect.value;
      const t = translations[lang];

      if (!isNaN(ph) && !isNaN(length) && !isNaN(width) && cropKey) {
        const areaSqM = length * width;
        const areaAcres = areaSqM / 4046.86;

        const preferred = cropData[cropKey];
        const bestKey = getBestCrop(ph);
        const best = bestKey ? cropData[bestKey] : null;

        const recommendationHtml = `
          <h3>${t.recommendationTitle}</h3>
          <p>
            Crop: ${bestKey || "None"}<br>
            ${t.cost}: ₹${best ? best.cost : "N/A"} per quintal<br>
            ${t.yield}: ${best ? best.yield : "N/A"} quintals/acre<br>
            ${t.production}: ${best ? (best.yield * areaAcres).toFixed(1) : "N/A"} quintals total
          </p>
        `;

        const advice = getAdvice(ph, preferred.phRange, areaAcres, t);
        const preferredHtml = `
          <h3>${t.preferredTitle}</h3>
          <p>
            Crop: ${cropKey}<br>
            ${t.cost}: ₹${preferred.cost} per quintal<br>
            ${t.yield}: ${preferred.yield} quintals/acre<br>
            ${t.production}: ${(preferred.yield * areaAcres).toFixed(1)} quintals total<br>
            ${t.advice}: ${advice}
          </p>
        `;

        output.innerHTML = recommendationHtml + preferredHtml;
      }
    }
  });
  updateLabels(langSelect.value); // initial load

  // Form submit handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const ph = parseFloat(phInput.value);
    const length = parseFloat(lengthInput.value);
    const width = parseFloat(widthInput.value);
    const cropKey = cropSelect.value;
    const lang = langSelect.value;
    const t = translations[lang];

    if (isNaN(ph) || isNaN(length) || isNaN(width) || !cropKey) {
      output.innerHTML = "<p>Please enter soil pH, field dimensions, and select a crop.</p>";
      return; 
    }

    // Convert area to acres (1 acre = 4046.86 m²)
    const areaSqM = length * width;
    const areaAcres = areaSqM / 4046.86

    const preferred = cropData[cropKey]
    const bestKey = getBestCrop(ph);
    const best = bestKey ? cropData[bestKey] : null;

    const recommendationHtml = `
      <h3>${t.recommendationTitle}</h3>
      <p>
        Crop: ${bestKey || "None"}<br>
        ${t.cost}: ₹${best ? best.cost : "N/A"} per quintal<br>
        ${t.yield}: ${best ? best.yield : "N/A"} quintals/acre<br>
        ${t.production}: ${best ? (best.yield * areaAcres).toFixed(1) : "N/A"} quintals total
      </p>
    `;

    const advice = getAdvice(ph, preferred.phRange, areaAcres, t);
    const preferredHtml = `
      <h3>${t.preferredTitle}</h3>
      <p>
        Crop: ${cropKey}<br>
        ${t.cost}: ₹${preferred.cost} per quintal<br>
        ${t.yield}: ${preferred.yield} quintals/acre<br>
        ${t.production}: ${(preferred.yield * areaAcres).toFixed(1)} quintals total<br>
        ${t.advice}: ${advice}
      </p>
    `;

    output.innerHTML = recommendationHtml + preferredHtml;
    output.classList.add("active");
  });
});
