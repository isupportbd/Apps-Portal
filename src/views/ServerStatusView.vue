<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const goBack = () => {
  router.push('/');
};

// System Stats State
const isOnline = ref(true);
const isLoading = ref(true);

const cpuStats = ref({
  usage: 0,
  cores: 0
});

const ramStats = ref({
  used: 0,
  total: 0,
  percentage: 0
});

const hddStats = ref({
  used: 0,
  total: 0,
  percentage: 0
});

// Fetch Real Data
let intervalId: ReturnType<typeof setInterval>;

const fetchStatus = async () => {
  try {
    const res = await fetch('https://api-idp.isupportbd.com/api/system-status');
    if (res.ok) {
      const data = await res.json();
      cpuStats.value = data.cpu;
      ramStats.value = {
        used: parseFloat((data.ram.used / (1024 ** 3)).toFixed(1)),
        total: parseFloat((data.ram.total / (1024 ** 3)).toFixed(1)),
        percentage: data.ram.percentage
      };
      hddStats.value = {
        used: parseFloat((data.disk.used / (1024 ** 3)).toFixed(1)),
        total: parseFloat((data.disk.total / (1024 ** 3)).toFixed(1)),
        percentage: data.disk.percentage
      };
      isOnline.value = true;
    } else {
      isOnline.value = false;
    }
  } catch (error) {
    isOnline.value = false;
    console.error('Error fetching server status:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchStatus();
  intervalId = setInterval(fetchStatus, 10000); // refresh every 10 seconds
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});

</script>

<template>
  <div class="website-container">
    <!-- Animated Background Orbs (Reused from HomeView) -->
    <div class="bg-orb orb-1"></div>
    <div class="bg-orb orb-2"></div>
    <div class="bg-orb orb-3"></div>

    <nav class="navbar">
      <div class="nav-content">
        <div class="logo-wrapper cursor-pointer" @click="goBack">
          <div class="logo-icon">iS</div>
          <span class="logo-text">iSupport BD</span>
        </div>
        
        <div class="nav-links">
          <a @click.prevent="goBack" href="#" class="back-link">← Back to Home</a>
        </div>
      </div>
    </nav>

    <section class="status-section">
      <div class="section-container">
        <div class="status-header">
          <h2>Server Status</h2>
          <div class="main-status-badge" :class="isOnline ? 'online' : 'offline'">
            <span class="pulse-indicator"></span>
            {{ isOnline ? 'System Online' : 'System Offline' }}
          </div>
          <p>Current resource utilization across all services.</p>
        </div>

        <div class="stats-grid">
          <!-- CPU Card -->
          <div class="stat-card">
            <div class="card-header">
              <span class="icon">🖥️</span>
              <h3>CPU Usage</h3>
            </div>
            <div class="progress-container">
              <div class="progress-bar-bg">
                <div class="progress-bar-fill" :style="{ width: cpuStats.usage + '%', background: cpuStats.usage > 80 ? '#ef4444' : '#3b82f6' }"></div>
              </div>
              <div class="progress-text">
                <span>{{ cpuStats.usage }}%</span>
                <span class="sub-text">{{ cpuStats.cores }} Cores</span>
              </div>
            </div>
          </div>

          <!-- RAM Card -->
          <div class="stat-card">
            <div class="card-header">
              <span class="icon">💾</span>
              <h3>Memory (RAM)</h3>
            </div>
            <div class="progress-container">
              <div class="progress-bar-bg">
                <div class="progress-bar-fill" :style="{ width: ramStats.percentage + '%', background: ramStats.percentage > 85 ? '#ef4444' : '#10b981' }"></div>
              </div>
              <div class="progress-text">
                <span>{{ ramStats.used }} GB / {{ ramStats.total }} GB</span>
                <span class="sub-text">{{ ramStats.percentage }}% Used</span>
              </div>
            </div>
          </div>

          <!-- Disk Card -->
          <div class="stat-card">
            <div class="card-header">
              <span class="icon">💽</span>
              <h3>Hard Disk Space</h3>
            </div>
            <div class="progress-container">
              <div class="progress-bar-bg">
                <div class="progress-bar-fill" :style="{ width: hddStats.percentage + '%', background: hddStats.percentage > 90 ? '#ef4444' : '#8b5cf6' }"></div>
              </div>
              <div class="progress-text">
                <span>{{ hddStats.used }} GB / {{ hddStats.total }} GB</span>
                <span class="sub-text">{{ hddStats.percentage }}% Used</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <footer class="footer">
      <div class="footer-bottom">
        <p>&copy; 2026 iSupport BD. All Rights Reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.website-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.cursor-pointer {
  cursor: pointer;
}

/* Background Orbs */
.bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: -1;
  animation: float 20s infinite ease-in-out alternate;
  opacity: 0.3;
}
.orb-1 { width: 400px; height: 400px; background: rgba(0, 210, 255, 0.15); top: -10%; left: -10%; }
.orb-2 { width: 500px; height: 500px; background: rgba(58, 123, 213, 0.15); bottom: -20%; right: -10%; animation-delay: -5s; }
.orb-3 { width: 300px; height: 300px; background: rgba(16, 185, 129, 0.1); top: 40%; left: 40%; animation-delay: -10s; }

@keyframes float {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0, 0) scale(1); }
}

/* Navbar */
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
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo-wrapper { display: flex; align-items: center; gap: 0.8rem; }
.logo-icon {
  width: 40px; height: 40px;
  background: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 1.2rem; color: #fff;
}
.logo-text { font-size: 1.3rem; font-weight: 700; color: #fff; letter-spacing: -0.5px; }

.back-link {
  color: #a5b4fc;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}
.back-link:hover { color: #fff; }

/* Status Section */
.status-section {
  flex: 1;
  padding: 6rem 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.status-header {
  text-align: center;
  margin-bottom: 4rem;
}
.status-header h2 {
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 1rem;
}
.status-header p {
  color: #94a3b8;
  font-size: 1.1rem;
  margin-top: 1rem;
}

.main-status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.5rem;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.main-status-badge.online {
  color: #34d399;
  border-color: rgba(52, 211, 153, 0.3);
  background: rgba(16, 185, 129, 0.1);
}
.main-status-badge.offline {
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.3);
  background: rgba(239, 68, 68, 0.1);
}

.pulse-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}
.main-status-badge.online .pulse-indicator {
  background-color: #34d399;
  box-shadow: 0 0 10px #34d399;
  animation: pulse-green 2s infinite;
}
.main-status-badge.offline .pulse-indicator {
  background-color: #ef4444;
  box-shadow: 0 0 10px #ef4444;
}

@keyframes pulse-green {
  0% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(52, 211, 153, 0); }
  100% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0); }
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.stat-card {
  background: rgba(30, 41, 59, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
  transition: transform 0.3s, box-shadow 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}
.card-header .icon {
  font-size: 2rem;
}
.card-header h3 {
  color: #f8fafc;
  font-size: 1.3rem;
  margin: 0;
}

.progress-container {
  width: 100%;
}
.progress-bar-bg {
  width: 100%;
  height: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1rem;
}
.progress-bar-fill {
  height: 100%;
  border-radius: 10px;
  transition: width 1s ease-out;
}

.progress-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-weight: 600;
  font-size: 1.1rem;
}
.progress-text .sub-text {
  color: #94a3b8;
  font-size: 0.9rem;
  font-weight: 400;
}

/* Footer */
.footer {
  padding: 2rem;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}
.footer-bottom {
  color: #64748b;
  font-size: 0.9rem;
}
</style>
