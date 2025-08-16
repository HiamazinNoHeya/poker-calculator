// ===== Poker Calculator (Pot Odds / α / MDF) =====

document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  // --- Core formulas ---
  // betPct: ベットサイズ（%）をpot=100基準で計算
  function calculatePotOdds(betPct) {
    const bet = betPct;
    const pot = 100;
    const denom = pot + 2 * bet;
    return denom > 0 ? bet / denom : 0;
  }

  function calculateAlpha(betPct) {
    const bet = betPct;
    const pot = 100;
    const denom = pot + bet;
    return denom > 0 ? bet / denom : 0;
  }

  function calculateMDF(betPct) {
    const bet = betPct;
    const pot = 100;
    const denom = pot + bet;
    return denom > 0 ? pot / denom : 0;
  }

  // --- Elements ---
  const betInput = $("betInput");
  const potOddsOut = $("potOddsOut");
  const alphaOut = $("alphaOut");
  const mdfOut = $("mdfOut");
  const sqrtAlphaOut = $("sqrtAlphaOut");
  const sqrtAlphaMDFOut = $("sqrtAlphaMDFOut");
  const valueBluffRatioOut = $("valueBluffRatioOut");

  // --- Helpers ---
  const pct = (x) => `${(x * 100).toFixed(2)}%`;
  const num = (el) => {
    const v = parseFloat(el.value);
    return isFinite(v) && v >= 0 ? v : 0;
  };

  function computeAndRender() {
    const betPct = num(betInput);

    const potOdds = calculatePotOdds(betPct);
    const alpha = calculateAlpha(betPct);
    const mdf = calculateMDF(betPct);
    const sqrtAlpha = Math.sqrt(alpha);
    const sqrtAlphaMDF = 1 - sqrtAlpha;
    const valueRatio = ((1 - potOdds) * 100).toFixed(0);
    const bluffRatio = (potOdds * 100).toFixed(0);

    potOddsOut.textContent = pct(potOdds);
    alphaOut.textContent = pct(alpha);
    mdfOut.textContent = pct(mdf);
    sqrtAlphaOut.textContent = pct(sqrtAlpha);
    sqrtAlphaMDFOut.textContent = pct(sqrtAlphaMDF);
    valueBluffRatioOut.textContent = `${valueRatio}:${bluffRatio}`;
  }
  // Init
  computeAndRender();
  // Events
  betInput.addEventListener("input", computeAndRender);
});
