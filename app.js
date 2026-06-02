'use strict';

// ── MCC rows ──────────────────────────────────────────────────────────────────
const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];

let mccCount = 0;
let peakChart = null;

function buildMccHeaders() {
  const wrap = document.getElementById('mccRows');
  const h = document.createElement('div');
  h.className = 'mcc-headers';
  h.innerHTML = `
    <span class="mcc-col-header">MCC Code</span>
    <span class="mcc-col-header">Description</span>
    <span class="mcc-col-header">Manual Delivery Days</span>
    <span class="mcc-col-header">% of APV</span>
    <span></span>`;
  wrap.appendChild(h);
}

function addMccRow() {
  if (mccCount >= 20) return;
  mccCount++;
  const id = mccCount;
  const wrap = document.getElementById('mccRows');
  const row = document.createElement('div');
  row.className = 'mcc-row';
  row.id = `mccRow${id}`;
  row.innerHTML = `
    <div><input type="text" id="mccCode${id}" placeholder="e.g. 5411" maxlength="4" /></div>
    <div><input type="text" id="mccDesc${id}" placeholder="Description" /></div>
    <div><input type="number" id="mccDays${id}" placeholder="0" min="0" /></div>
    <div><input type="number" id="mccPct${id}" placeholder="0" step="0.1" min="0" max="100" /></div>
    <button class="btn-remove" onclick="removeMccRow(${id})" title="Remove">×</button>`;
  wrap.appendChild(row);
  attachMccListener(id);
}

function removeMccRow(id) {
  const row = document.getElementById(`mccRow${id}`);
  if (row) row.remove();
  validateMccSum();
}

function attachMccListener(id) {
  document.getElementById(`mccPct${id}`).addEventListener('input', validateMccSum);
}

function validateMccSum() {
  const sum = getMccRows().reduce((s, r) => s + (parseFloat(r.pct) || 0), 0);
  const err = document.getElementById('mccSumError');
  const off = Math.abs(sum - 100) > 0.01 && getMccRows().length > 0;
  err.classList.toggle('hidden', !off);
  return !off;
}

function getMccRows() {
  const rows = document.querySelectorAll('.mcc-row');
  return Array.from(rows).map(row => {
    const id = row.id.replace('mccRow', '');
    return {
      code: document.getElementById(`mccCode${id}`)?.value.trim() || '',
      desc: document.getElementById(`mccDesc${id}`)?.value.trim() || '',
      days: parseFloat(document.getElementById(`mccDays${id}`)?.value) || 0,
      pct:  parseFloat(document.getElementById(`mccPct${id}`)?.value)  || 0,
    };
  });
}

// ── Monthly grid ──────────────────────────────────────────────────────────────
function buildMonthlyGrid() {
  const grid = document.getElementById('monthlyGrid');
  MONTHS.forEach(m => {
    const div = document.createElement('div');
    div.className = 'monthly-row';
    div.innerHTML = `<span>${m}</span><input type="number" id="month${m}" placeholder="APV/12" min="0" />`;
    grid.appendChild(div);
    div.querySelector('input').addEventListener('input', updateMonthlyTotal);
  });
}

function updateMonthlyTotal() {
  const total = MONTHS.reduce((s, m) => {
    const v = parseFloat(document.getElementById(`month${m}`)?.value) || 0;
    return s + v;
  }, 0);
  document.getElementById('monthlyTotal').textContent = fmt(total);
}

function getMonthlyValues(apv) {
  return MONTHS.map(m => {
    const v = parseFloat(document.getElementById(`month${m}`)?.value);
    return isNaN(v) || v === 0 ? apv / 12 : v;
  });
}

// ── Number helpers ────────────────────────────────────────────────────────────
function fmt(n) {
  if (n == null || isNaN(n)) return '—';
  return '$' + Math.round(n).toLocaleString('en-US');
}
function fmtPct(n) {
  if (n == null || isNaN(n)) return '—';
  return (n * 100).toFixed(3) + '%';
}
function ceiling(n, sig) { return Math.ceil(n / sig) * sig; }
function mround(n, multiple) { return Math.round(n / multiple) * multiple; }

// ── Peak exposure (sliding window) ───────────────────────────────────────────
function calcPeakMonthly(monthlyVols, ndxDays, isAch, achPct) {
  const vols = monthlyVols.map(v => isAch ? v * (1 - achPct / 100) : v);
  // Repeat months to build a 24-month window (months 0-11 repeated)
  const ext = [...vols, ...vols];
  return ext.map((_, i) => {
    if (i < 1) return 0;
    const daysLeft = ndxDays;
    if (daysLeft <= 30) return daysLeft * ext[i] / 30;
    const fullMonths = Math.floor(daysLeft / 30);
    const rem = daysLeft % 30;
    let sum = 0;
    for (let j = i - fullMonths + 1; j <= i; j++) sum += ext[Math.max(0, j)];
    sum += rem / 30 * (ext[Math.max(0, i - fullMonths)] || 0);
    return sum;
  }).slice(1, 13);
}

// ── Core calculation ──────────────────────────────────────────────────────────
function calculate() {
  const apv            = parseFloat(document.getElementById('apv').value) || 0;
  const netRevenue     = parseFloat(document.getElementById('netRevenue').value) || 0;
  const refundRateRaw  = document.getElementById('refundRate').value;
  const cbRateRaw      = document.getElementById('chargebackRate').value;
  const refundRate     = refundRateRaw === '' ? 0.10 : parseFloat(refundRateRaw) / 100;
  const cbRate         = cbRateRaw     === '' ? 0.005 : parseFloat(cbRateRaw) / 100;
  const isAch          = false;
  const achPct         = 0;
  const isPayfac       = document.getElementById('payfacEnabled').checked;
  const coveragePct    = parseFloat(document.getElementById('exposureCoverage').value) ?? 100;
  const coverage       = coveragePct / 100;
  const rrCaptureDays  = parseFloat(document.getElementById('rrCaptureDays').value) || 180;

  // Validate MCC
  const mccRows = getMccRows();
  const mccSum  = mccRows.reduce((s, r) => s + r.pct, 0);

  // Monthly volumes
  const monthlyVols = getMonthlyValues(apv);
  const monthlyTotal = monthlyVols.reduce((a, b) => a + b, 0);
  const monthlyMismatch = monthlyTotal > 0 && Math.abs(monthlyTotal - apv) > 1;

  // ── NDX (weighted average delivery days) ──
  let ndxDays;
  const ERROR = 'ERROR';
  if (mccRows.length === 0 || Math.abs(mccSum - 100) > 0.01 || monthlyMismatch) {
    ndxDays = ERROR;
  } else {
    ndxDays = mccRows.reduce((s, r) => s + r.days * (r.pct / 100), 0);
  }

  const effectiveAPV = isAch ? apv * (1 - achPct / 100) : apv;

  // ── Peak Exposure (slide window over monthly inputs) ──
  const peakMonthly = ndxDays !== ERROR
    ? calcPeakMonthly(monthlyVols, ndxDays, isAch, achPct)
    : Array(12).fill(0);
  const peakExposure = Math.max(...peakMonthly);

  // ── NDX Exposure ──
  let ndxExposure;
  if (ndxDays === ERROR) {
    ndxExposure = ERROR;
  } else {
    const simple = ceiling(effectiveAPV / 365 * ndxDays, 1000);
    ndxExposure = ceiling(Math.max(simple, peakExposure), 1000);
  }

  // ── Refund Exposure ──
  const REFUND_DAYS = 30;
  let refundExposure = 0;
  if (ndxDays !== ERROR) {
    if (REFUND_DAYS > ndxDays) {
      refundExposure = ceiling(ceiling(apv * refundRate / 365 * (REFUND_DAYS - ndxDays), 1), 1000);
    }
  }

  // ── Chargeback Exposure ──
  const CB_DAYS = 180;
  let cbExposure = 0;
  if (ndxDays !== ERROR) {
    if (CB_DAYS > ndxDays) {
      cbExposure = ceiling(ceiling(apv * cbRate / 365 * (CB_DAYS - ndxDays), 1), 1000);
    }
  }

  // ── Total Card ──
  const totalCardExposure = ndxExposure === ERROR ? ERROR
    : ndxExposure + refundExposure + cbExposure;

  // ── ACH ──
  const achNdxDays   = ndxDays !== ERROR ? Math.min(ndxDays, 60) : 60;
  const achNdxRate   = achHighRisk ? 0.30 : 0.05;
  const achNdxExp    = isAch ? ceiling(Math.min(achNdxDays, 60) * apv * (achPct / 100) * achNdxRate / 365, 1) : 0;
  const achUnauth    = isAch ? ceiling(60 * apv * (achPct / 100) * (achNdxRate) / 365, 1) : 0;
  const achOther     = isAch ? ceiling(2  * apv * (achPct / 100) * (achNdxRate) / 365, 1) : 0;
  const totalAch     = achNdxExp + achUnauth + achOther;

  // ── PayFac ──
  let payfacFundsDue = 0, payfacConc = 0, payfacDiscount = 0, totalPayfac = 0;
  if (isPayfac) {
    const subSettleDays = parseFloat(document.getElementById('subSettleDays').value) || 0;
    const subRRRate     = (parseFloat(document.getElementById('subRRRate').value) || 0) / 100;
    const subRRWeeks    = parseFloat(document.getElementById('subRRWeeks').value) || 0;
    const subFixed      = parseFloat(document.getElementById('subFixedReserve').value) || 0;
    const discRate      = (parseFloat(document.getElementById('discountRate').value) || 0) / 100;
    const subMerchConc  = document.getElementById('subMerchantConc').value === 'Yes';

    payfacFundsDue = apv / 365 * subSettleDays
      + subRRRate * (subRRWeeks * 7 - subSettleDays) * apv / 365
      + subFixed;

    if (subMerchConc) {
      const sm1vol  = parseFloat(document.getElementById('sm1Vol').value) || 0;
      const sm1days = parseFloat(document.getElementById('sm1Days').value) || 0;
      const sm2vol  = parseFloat(document.getElementById('sm2Vol').value) || 0;
      const sm2days = parseFloat(document.getElementById('sm2Days').value) || 0;
      payfacConc = sm1vol * sm1days / 365 + sm2vol * sm2days / 365;
    }

    payfacDiscount = totalCardExposure !== ERROR ? totalCardExposure * (1 - discRate) * -1 + totalCardExposure : 0;
    // Actual formula: payfac discounted exposure = D59*(1-discountRate), applied as reduction
    payfacDiscount = totalCardExposure !== ERROR ? totalCardExposure * discRate : 0;
    totalPayfac = payfacFundsDue + payfacConc + (totalCardExposure !== ERROR ? totalCardExposure * (1 - discRate) - totalCardExposure : 0);
    totalPayfac = payfacFundsDue + payfacConc - payfacDiscount;
  }

  // ── Total Exposure ──
  let totalExposure;
  if (totalCardExposure === ERROR) {
    totalExposure = ERROR;
  } else if (isPayfac) {
    totalExposure = totalAch + totalPayfac;
  } else {
    totalExposure = totalCardExposure + totalAch;
  }

  // ── Reserve Calculator ──
  const fixedReserve = totalExposure !== ERROR ? coverage * totalExposure : 0;
  const rrPct        = totalExposure !== ERROR
    ? mround(fixedReserve / (rrCaptureDays * apv / 365), 0.005)
    : null;
  const rrDaily      = rrPct && apv ? rrPct * apv / 365 : null;
  const rrFull       = rrDaily ? rrDaily * rrCaptureDays : null;

  const t1pct = (parseFloat(document.getElementById('t1pct').value) || 0) / 100;
  const t2pct = (parseFloat(document.getElementById('t2pct').value) || 0) / 100;
  const t3pct = (parseFloat(document.getElementById('t3pct').value) || 0) / 100;

  // ── Break-Even Time ──
  let betStr = '—';
  if (totalExposure !== ERROR && netRevenue > 0 && totalExposure !== null) {
    const betYears = (totalExposure * coverage - coverage) / netRevenue;
    if (betYears >= 0) {
      const yrs  = Math.floor(betYears);
      const mths = Math.ceil((betYears - yrs) * 12);
      betStr = `${yrs} yr${yrs !== 1 ? 's' : ''} ${mths} mth${mths !== 1 ? 's' : ''}`;
    } else {
      betStr = '< 0';
    }
  }

  // ── Per-MCC breakdown ──
  const mccBreakdown = mccRows.map(r => {
    if (ndxDays === ERROR) return { ...r, exposure: ERROR };
    const exp = ceiling(
      Math.max(
        effectiveAPV * (r.pct / 100) / 365 * r.days,
        peakExposure * (r.days / (ndxDays || 1)) * (r.pct / 100)
      ), 1000);
    return { ...r, exposure: exp };
  });

  return {
    ndxDays, ndxExposure, refundRate, cbRate,
    refundExposure, cbExposure, totalCardExposure,
    achNdxExp, achUnauth, achOther, totalAch,
    payfacFundsDue, payfacConc, payfacDiscount, totalPayfac,
    totalExposure, fixedReserve, rrPct, rrDaily, rrFull,
    rrCaptureDays, coverage, netRevenue, betStr,
    t1pct, t2pct, t3pct, isAch, isPayfac,
    peakMonthly, monthlyVols, mccBreakdown,
  };
}

// ── Render results ────────────────────────────────────────────────────────────
function renderResults(r) {
  document.getElementById('resultsPlaceholder').classList.add('hidden');
  document.getElementById('resultsContent').classList.remove('hidden');

  const isErr = r.totalExposure === 'ERROR';

  // KPIs
  document.getElementById('kpiTotalExposure').textContent = isErr ? 'ERROR' : fmt(r.totalExposure);
  document.getElementById('kpiNdx').textContent           = r.ndxDays === 'ERROR' ? 'ERROR' : (r.ndxDays.toFixed(1) + ' days');
  document.getElementById('kpiBet').textContent           = r.betStr;
  document.getElementById('kpiRrPct').textContent         = r.rrPct != null ? (r.rrPct * 100).toFixed(2) + '%' : '—';

  // Exposure breakdown table
  const tbody = document.getElementById('exposureTableBody');
  const tfoot = document.getElementById('exposureTableFoot');
  tbody.innerHTML = '';
  tfoot.innerHTML = '';

  function row(label, days, rate, exposure, cls = '') {
    return `<tr class="${cls}">
      <td>${label}</td>
      <td class="text-right">${days}</td>
      <td class="text-right">${rate}</td>
      <td class="text-right">${exposure === 'ERROR' ? '<span class="text-danger">ERROR</span>' : fmt(exposure)}</td>
    </tr>`;
  }

  // NDX row
  tbody.innerHTML += row(
    'Non-Delivery Exposure (NDX)',
    r.ndxDays === 'ERROR' ? 'ERROR' : r.ndxDays.toFixed(1) + ' days',
    '—',
    r.ndxExposure
  );

  // Per-MCC rows
  r.mccBreakdown.forEach(m => {
    tbody.innerHTML += row(
      `&nbsp;&nbsp;↳ MCC ${m.code || '—'} ${m.desc ? '(' + m.desc + ')' : ''}`,
      m.days + ' days',
      (m.pct).toFixed(1) + '%',
      m.exposure,
      'mcc-sub'
    );
  });

  tbody.innerHTML += row('Refund Exposure',    '30 days', fmtPct(r.refundRate), r.refundExposure);
  tbody.innerHTML += row('Chargeback Exposure','180 days', fmtPct(r.cbRate),    r.cbExposure);

  tfoot.innerHTML += row('Total Card Processing Exposure', '—', '—', r.totalCardExposure, 'row-total');

  if (r.isAch) {
    tbody.innerHTML += row('ACH – Non-Delivery Exposure',  r.ndxDays === 'ERROR' ? '≤60 days' : Math.min(r.ndxDays, 60).toFixed(0) + ' days', '—', r.achNdxExp);
    tbody.innerHTML += row('ACH – Unauthorised Returns',  '60 days', '—', r.achUnauth);
    tbody.innerHTML += row('ACH – Other Returns',         '2 days',  '—', r.achOther);
    tfoot.innerHTML += row('Total ACH Processing Exposure', '—', '—', r.totalAch, 'row-total');
  }

  if (r.isPayfac) {
    tbody.innerHTML += row('PayFac – Funds Due to Merchant Liability', '—', '—', r.payfacFundsDue);
    tbody.innerHTML += row('PayFac – Sub-Merchant Concentration Liability', '—', '—', r.payfacConc);
    tbody.innerHTML += row('PayFac – Discounted Exposure Reduction', '—', '—', -r.payfacDiscount);
    tfoot.innerHTML += row('Total PayFac Exposure', '—', '—', r.totalPayfac, 'row-total');
  }

  tfoot.innerHTML += row('TOTAL EXPOSURE', '—', '—', r.totalExposure, 'row-total');

  // Reserve Calculator
  document.getElementById('rrDays').textContent  = r.rrCaptureDays + ' days';
  document.getElementById('rrPct').textContent   = r.rrPct != null ? (r.rrPct * 100).toFixed(3) + '%' : '—';
  document.getElementById('rrDaily').textContent = r.rrDaily != null ? fmt(r.rrDaily) : '—';
  document.getElementById('rrFull').textContent  = r.rrFull  != null ? fmt(r.rrFull)  : '—';

  document.getElementById('fixedTotal').textContent = fmt(r.fixedReserve);
  document.getElementById('fixedT1').textContent    = r.fixedReserve ? fmt(r.fixedReserve * r.t1pct) : '—';
  document.getElementById('fixedT2').textContent    = r.fixedReserve ? fmt(r.fixedReserve * r.t2pct) : '—';
  document.getElementById('fixedT3').textContent    = r.fixedReserve ? fmt(r.fixedReserve * r.t3pct) : '—';

  // Risk-Reward
  document.getElementById('rraTotalExposure').textContent = isErr ? 'ERROR' : fmt(r.totalExposure);
  document.getElementById('rraCoverage').textContent      = (r.coverage * 100).toFixed(0) + '%';
  document.getElementById('rraNetRev').textContent        = fmt(r.netRevenue);
  document.getElementById('rraBet').textContent           = r.betStr;

  // Peak chart
  renderChart(r.peakMonthly);
}

function renderChart(peakMonthly) {
  const ctx = document.getElementById('peakChart').getContext('2d');
  if (peakChart) peakChart.destroy();
  peakChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: MONTHS,
      datasets: [{
        label: 'Peak Exposure (USD)',
        data: peakMonthly,
        backgroundColor: 'rgba(37,99,235,.2)',
        borderColor: 'rgba(37,99,235,.8)',
        borderWidth: 1.5,
        borderRadius: 4,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          ticks: {
            callback: v => '$' + (v >= 1e6 ? (v/1e6).toFixed(1)+'M' : v >= 1e3 ? (v/1e3).toFixed(0)+'K' : v),
            font: { size: 11 }
          },
          grid: { color: '#F1F5F9' }
        },
        x: { ticks: { font: { size: 11 } }, grid: { display: false } }
      }
    }
  });
}

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildMccHeaders();
  addMccRow(); // start with one MCC row
  buildMonthlyGrid();

  document.getElementById('addMccRow').addEventListener('click', addMccRow);

  document.getElementById('payfacEnabled').addEventListener('change', e => {
    document.getElementById('payfacFields').classList.toggle('hidden', !e.target.checked);
  });

  document.getElementById('calcBtn').addEventListener('click', () => {
    const r = calculate();
    renderResults(r);
  });
});
