// ===== Poker Calculator (Pot Odds / α / MDF) =====

document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  // --- Core formulas ---
  function calculatePotOdds(betSize, potSize) {
    if (!isFinite(betSize) || !isFinite(potSize) || betSize < 0 || potSize < 0)
      return 0;
    const denom = potSize + betSize;
    return denom > 0 ? betSize / denom : 0;
  }

  function calculateAlpha(betSize, potSize) {
    if (!isFinite(betSize) || !isFinite(potSize) || betSize < 0 || potSize < 0)
      return 0;
    const denom = potSize + betSize;
    return denom > 0 ? betSize / denom : 0;
  }

  function calculateMDF(betSize, potSize) {
    if (!isFinite(betSize) || !isFinite(potSize) || betSize < 0 || potSize < 0)
      return 0;
    const denom = potSize + betSize;
    return denom > 0 ? potSize / denom : 0;
  }

  // --- Elements ---
  const potInput = $("potInput");
  const betInput = $("betInput");
  const potOddsOut = $("potOddsOut");
  const alphaOut = $("alphaOut");
  const mdfOut = $("mdfOut");
  const sqrtAlphaOut = $("sqrtAlphaOut");
  const sqrtAlphaMDFOut = $("sqrtAlphaMDFOut");
  const valueBluffRatioOut = $("valueBluffRatioOut");
  const resetBtn = $("resetBtn");

  // --- Helpers ---
  const pct = (x) => `${(x * 100).toFixed(2)}%`;
  const num = (el) => {
    const v = parseFloat(el.value);
    return isFinite(v) && v >= 0 ? v : 0;
  };

  function computeAndRender() {
    const pot = num(potInput);
    const bet = num(betInput);

    const potOdds = calculatePotOdds(bet, pot);
    const alpha = calculateAlpha(bet, pot);
    const mdf = calculateMDF(bet, pot);
    const sqrtAlphaMDF = 1 - Math.sqrt(alpha);

    potOddsOut.textContent = pct(potOdds);
    alphaOut.textContent = pct(alpha);
    mdfOut.textContent = pct(mdf);
    sqrtAlphaOut.textContent = pct(Math.sqrt(alpha));
    sqrtAlphaMDFOut.textContent = pct(sqrtAlphaMDF);
    valueBluffRatioOut.textContent = `${pct(1 - potOdds)} : ${pct(potOdds)}`;
  }

  // Init
  computeAndRender();

  // Events
  [potInput, betInput].forEach((el) =>
    el.addEventListener("input", computeAndRender)
  );

  resetBtn.addEventListener("click", () => {
    potInput.value = "150";
    betInput.value = "100";
    computeAndRender();
  });
});
