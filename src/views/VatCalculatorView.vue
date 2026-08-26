<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

const amount = ref('');
const rate = ref(15);
const sdRate = ref(0);
const mode = ref('exclusive');

const results = ref({
  baseAmount: 0,
  sdAmount: 0,
  vatAmount: 0,
  totalAmount: 0
});

const vatRates = [5, 7.5, 10, 15];

const calculateVat = () => {
  const val = parseFloat(amount.value);
  if (isNaN(val) || val < 0) {
    results.value = { baseAmount: 0, sdAmount: 0, vatAmount: 0, totalAmount: 0 };
    return;
  }

  const currentVatRate = parseFloat(rate.value as any) || 0;
  const currentSdRate = parseFloat(sdRate.value as any) || 0;

  if (mode.value === 'exclusive') {
    const sd = val * (currentSdRate / 100);
    const valueForVat = val + sd;
    const vat = valueForVat * (currentVatRate / 100);
    const total = valueForVat + vat;
    
    results.value = {
      baseAmount: val,
      sdAmount: sd,
      vatAmount: vat,
      totalAmount: total
    };
  } else if (mode.value === 'inclusive') {
    const valueForVat = val / (1 + (currentVatRate / 100));
    const vat = val - valueForVat;
    const base = valueForVat / (1 + (currentSdRate / 100));
    const sd = valueForVat - base;

    results.value = {
      baseAmount: base,
      sdAmount: sd,
      vatAmount: vat,
      totalAmount: val
    };
  } else {
    if (currentVatRate === 0) {
      results.value = { baseAmount: 0, sdAmount: 0, vatAmount: val, totalAmount: val };
      return;
    }
    const base = val / ((1 + currentSdRate / 100) * (currentVatRate / 100));
    const sd = base * (currentSdRate / 100);
    const valueForVat = base + sd;
    const total = valueForVat + val;

    results.value = {
      baseAmount: base,
      sdAmount: sd,
      vatAmount: val,
      totalAmount: total
    };
  }
};

watch([amount, rate, sdRate, mode], () => {
  calculateVat();
});

onMounted(() => {
  calculateVat();
});

const formatCurrency = (num: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
};

const reset = () => {
  amount.value = '';
  rate.value = 15;
  sdRate.value = 0;
  mode.value = 'exclusive';
};
</script>

<template>
  <div class="website-container vat-calc-page-wrap">
    <!-- Navbar -->
    <nav class="navbar">
      <div class="nav-content">
        <router-link to="/" class="logo-wrapper" style="text-decoration: none;">
          <div class="logo-icon">iS</div>
          <span class="logo-text">iSupportBD <span class="text-highlight">Portal</span></span>
        </router-link>
        <div class="nav-links">
          <router-link to="/" class="secondary-btn" style="padding: 0.5rem 1rem; border-radius: 8px;">Back to Home</router-link>
        </div>
      </div>
    </nav>

    <div class="vat-calc-page">

      <div class="container">
        <div class="vat-calc-wrapper animate-fade-in delay-100">
          
          <!-- Controls Section -->
          <div class="calc-controls">
            
            <div class="calc-group">
              <label>Calculation Mode</label>
              <div class="mode-tabs">
                <button 
                  class="mode-btn" :class="{ active: mode === 'exclusive' }"
                  @click="mode = 'exclusive'"
                >
                  Exclusive
                </button>
                <button 
                  class="mode-btn" :class="{ active: mode === 'inclusive' }"
                  @click="mode = 'inclusive'"
                >
                  Inclusive
                </button>
                <button 
                  class="mode-btn" :class="{ active: mode === 'taxToValue' }"
                  @click="mode = 'taxToValue'"
                >
                  Tax → Value
                </button>
              </div>
            </div>

            <div class="calc-group">
              <label>{{ mode === 'exclusive' ? 'Base Value (Excluding VAT)' : mode === 'inclusive' ? 'Total Amount (Including VAT)' : 'VAT Amount' }}</label>
              <div class="amount-input-wrapper">
                <span class="currency-symbol">৳</span>
                <input 
                  type="number" 
                  class="amount-input"
                  placeholder="0.00"
                  v-model="amount"
                  min="0"
                />
              </div>
            </div>

            <div class="calc-group">
              <label>VAT Rate (%)</label>
              <div class="rate-selector">
                <button 
                  v-for="r in vatRates" :key="r"
                  class="rate-btn" :class="{ active: rate === r }"
                  @click="rate = r"
                >
                  {{ r }}%
                </button>
                <div class="custom-rate">
                  <input 
                    type="number" 
                    placeholder="Custom" 
                    v-model="rate"
                  />
                  <span>%</span>
                </div>
              </div>
            </div>

            <div class="calc-group">
              <label>SD Rate (%) - Optional</label>
              <div class="amount-input-wrapper">
                <input 
                  type="number" 
                  class="amount-input"
                  style="padding-left: 1rem"
                  placeholder="0"
                  v-model="sdRate"
                  min="0"
                />
                <span class="currency-symbol" style="right: 1rem; left: auto">%</span>
              </div>
            </div>

            <button class="btn btn-outline reset-btn" @click="reset">
              🔄 Reset
            </button>

          </div>

          <!-- Results Section -->
          <div class="calc-results">
            <h3>Calculation Summary</h3>
            
            <div class="receipt-list">
              <div class="receipt-item">
                <span class="receipt-label">Base Amount</span>
                <span class="receipt-value">{{ formatCurrency(results.baseAmount) }}</span>
              </div>
              
              <div class="receipt-item sd" v-if="results.sdAmount > 0">
                <span class="receipt-label">SD ({{ sdRate || 0 }}%)</span>
                <span class="receipt-value">{{ formatCurrency(results.sdAmount) }}</span>
              </div>
              
              <div class="receipt-item vat">
                <span class="receipt-label">VAT ({{ rate || 0 }}%)</span>
                <span class="receipt-value">{{ formatCurrency(results.vatAmount) }}</span>
              </div>
              
              <div class="receipt-divider"></div>
              
              <div class="receipt-total">
                <span class="receipt-label">Total Amount</span>
                <span class="receipt-value">{{ formatCurrency(results.totalAmount) }}</span>
              </div>
            </div>

            <div class="result-summary">
              <p v-if="mode === 'exclusive'">
                The total includes <strong>{{ formatCurrency(results.baseAmount) }}</strong> base, <span v-if="results.sdAmount > 0"><strong>{{ formatCurrency(results.sdAmount) }}</strong> SD, and </span> <strong>{{ formatCurrency(results.vatAmount) }}</strong> VAT.
              </p>
              <p v-else>
                The total amount of <strong>{{ formatCurrency(results.totalAmount) }}</strong> includes <span v-if="results.sdAmount > 0"><strong>{{ formatCurrency(results.sdAmount) }}</strong> SD and </span> <strong>{{ formatCurrency(results.vatAmount) }}</strong> VAT.
              </p>
            </div>

          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vat-calc-page-wrap {
  min-height: 100vh;
}
.vat-calc-page {
  padding: 80px 0 60px;
  min-height: calc(100vh - 80px);
}

/* Header */
.vat-calc-header {
  margin-bottom: 2.5rem;
  text-align: center;
}

.vat-calc-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  font-weight: 700;
  color: #fff;
}

.vat-calc-header p {
  color: #94A3B8;
  font-size: 1.1rem;
  max-width: 500px;
  margin: 0 auto;
}

.inline-icon {
  font-size: 2rem;
}

/* Two separate cards with gap */
.vat-calc-wrapper {
  display: flex;
  flex-direction: column;
  max-width: 920px;
  margin: 0 auto;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .vat-calc-wrapper {
    flex-direction: row;
  }
}

/* Shared card base */
.calc-controls,
.calc-results {
  background: rgba(13, 17, 23, 0.7);
  border-radius: 1rem;
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  backdrop-filter: blur(10px);
}

/* Left Card */
.calc-controls {
  flex: 1.15;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.calc-group label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #94A3B8;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

/* Segmented Control */
.mode-tabs {
  display: flex;
  background: rgba(0,0,0,0.3);
  padding: 4px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.05);
  gap: 4px;
}

.mode-btn {
  flex: 1;
  padding: 0.6rem 0.6rem;
  border-radius: 8px;
  background: transparent;
  color: #94A3B8;
  font-weight: 600;
  font-size: 0.85rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.mode-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
}

.mode-btn.active {
  background: rgba(0, 210, 255, 0.15);
  color: #00d2ff;
  border: 1px solid rgba(0, 210, 255, 0.3);
}

/* Input Fields */
.amount-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.currency-symbol {
  position: absolute;
  left: 1rem;
  font-size: 1.1rem;
  color: #94A3B8;
  font-weight: 500;
}

.amount-input {
  width: 100%;
  padding: 0.85rem 1rem 0.85rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  color: #fff;
  transition: all 0.2s ease;
  background: rgba(0,0,0,0.2);
  font-family: inherit;
}

.amount-input:focus {
  outline: none;
  border-color: #00d2ff;
  box-shadow: 0 0 0 3px rgba(0, 210, 255, 0.2);
}

input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  appearance: none;
  margin: 0; 
}
input[type=number] {
  -moz-appearance: textfield;
  appearance: textfield;
}

/* Rate Selector */
.rate-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.rate-btn {
  padding: 0.6rem 1.2rem;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  background: rgba(0,0,0,0.2);
  font-weight: 600;
  font-size: 0.9rem;
  color: #94A3B8;
  transition: all 0.2s ease;
  cursor: pointer;
}

.rate-btn:hover {
  border-color: #00d2ff;
  color: #fff;
}

.rate-btn.active {
  border-color: rgba(0, 210, 255, 0.3);
  background: rgba(0, 210, 255, 0.15);
  color: #00d2ff;
}

.custom-rate {
  display: flex;
  align-items: center;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  padding: 0 0.8rem;
  background: rgba(0,0,0,0.2);
  flex: 1;
  min-width: 100px;
  transition: all 0.2s ease;
}

.custom-rate:focus-within {
  border-color: #00d2ff;
  box-shadow: 0 0 0 3px rgba(0, 210, 255, 0.2);
}

.custom-rate input {
  width: 100%;
  border: none;
  background: transparent;
  padding: 0.6rem 0;
  font-weight: 600;
  font-size: 0.9rem;
  color: #fff;
  font-family: inherit;
}

.custom-rate input:focus {
  outline: none;
}

.custom-rate span {
  color: #94A3B8;
  font-weight: 500;
  font-size: 0.9rem;
}

.reset-btn {
  align-self: flex-start;
  font-weight: 600;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-size: 0.9rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.reset-btn:hover {
  background: rgba(255,255,255,0.1);
}

/* ═══════════════════════════════════════════════
   Right Card — Results
   ═══════════════════════════════════════════════ */
.calc-results {
  flex: 0.85;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
}

.calc-results h3 {
  font-size: 0.85rem;
  color: #94A3B8;
  margin-bottom: 2rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.receipt-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  flex: 1;
}

.receipt-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background: rgba(0,0,0,0.2);
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.05);
}

.receipt-label {
  color: #94A3B8;
  font-weight: 500;
  font-size: 0.95rem;
}

.receipt-value {
  color: #fff;
  font-weight: 600;
  font-size: 1.1rem;
  font-variant-numeric: tabular-nums;
}

.receipt-item.vat .receipt-label::before {
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ec4899;
  margin-right: 0.5rem;
  vertical-align: middle;
}

.receipt-item.vat .receipt-value {
  color: #ec4899;
}

.receipt-item.sd .receipt-label::before {
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #f59e0b;
  margin-right: 0.5rem;
  vertical-align: middle;
}

.receipt-item.sd .receipt-value {
  color: #f59e0b;
}

.receipt-divider {
  display: none;
}

/* Total Box */
.receipt-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  padding: 1rem 1.25rem;
  background: rgba(0, 210, 255, 0.1);
  border: 1px solid rgba(0, 210, 255, 0.3);
  border-radius: 8px;
  box-shadow: none;
}

.receipt-total .receipt-label {
  color: #00d2ff;
  font-weight: 600;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.receipt-total .receipt-value {
  color: #00d2ff;
  font-size: 1.2rem;
  font-weight: 700;
}

/* Summary text */
.result-summary {
  margin-top: auto;
  padding-top: 2rem;
  font-size: 0.9rem;
  color: #94A3B8;
  line-height: 1.6;
  text-align: center;
}

.result-summary strong {
  color: #fff;
}

/* Navbar specific for VatCalculator */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem 0;
  background: rgba(13, 17, 23, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  z-index: 1000;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  width: 35px;
  height: 35px;
  background: linear-gradient(135deg, #00d2ff, #3a7bd5);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 210, 255, 0.3);
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: #fff;
}

.text-highlight {
  color: #00d2ff;
}

.secondary-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  font-weight: 500;
  transition: all 0.3s ease;
  text-decoration: none;
}
.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}
</style>
