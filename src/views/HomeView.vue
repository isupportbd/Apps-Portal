<script setup lang="ts">
import { ref } from 'vue';

const isMenuOpen = ref(false);
const activeFaq = ref<number | null>(null);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const toggleFaq = (index: number) => {
  activeFaq.value = activeFaq.value === index ? null : index;
};

// --- DYNAMIC DATA ---

// 1. Dynamic Features
const features = [
  {
    id: 1,
    title: 'Lightning Fast',
    description: 'Our applications are built on modern stacks ensuring ultra-fast loading times and seamless interactions.',
    icon: '⚡'
  },
  {
    id: 2,
    title: 'Bank-Grade Security',
    description: 'We prioritize your data security with end-to-end encryption and stateless JWT authentication.',
    icon: '🛡️'
  },
  {
    id: 3,
    title: '24/7 Reliability',
    description: 'Hosted on robust infrastructure guaranteeing 99.9% uptime for your business critical tools.',
    icon: '🌐'
  }
];

// 4. Dynamic CTA (Call To Action)
const ctaData = {
  title: 'Ready to Transform Your Business?',
  description: 'Join hundreds of users leveraging iSupportBD digital solutions to streamline their workflow and maximize productivity.',
  primaryButtonText: 'Get Started Now',
  primaryButtonLink: '#contact',
  secondaryButtonText: 'Explore Apps',
  secondaryButtonLink: '#apps'
};

// Apps List
const apps = [
  {
    id: 1,
    name: 'BIN Checker',
    description: 'Verify and check BIN information efficiently and securely.',
    icon: '🔍',
    url: 'https://bin.isupportbd.com',
    status: 'Live',
    color: '#00d2ff'
  },
  {
    id: 2,
    name: 'IDP',
    description: 'Intelligent Document Processing and management system.',
    icon: '📄',
    url: 'https://idp.isupportbd.com',
    status: 'Live',
    color: '#a855f7'
  },
  {
    id: 3,
    name: 'ব্যবসায়ী',
    description: 'Complete business management and tracking solution.',
    icon: '💼',
    url: '#',
    status: 'Coming Soon',
    color: '#f59e0b'
  },
  {
    id: 11,
    name: 'বিদ্যাপীঠ',
    description: 'Modern educational management and learning platform.',
    icon: '🎓',
    url: '#',
    status: 'Coming Soon',
    color: '#3b82f6'
  },
  {
    id: 12,
    name: 'মসজিদ',
    description: 'Complete mosque management and donation tracking system.',
    icon: '🕌',
    url: '#',
    status: 'Coming Soon',
    color: '#10b981'
  },
  {
    id: 4,
    name: 'Non-Filler Analysis',
    description: 'Advanced analytics and reporting for non-filler data.',
    icon: '📊',
    url: '#',
    status: 'Coming Soon',
    color: '#10b981'
  },
  {
    id: 5,
    name: 'ZeroVAT',
    description: 'Automated VAT calculation and compliance management.',
    icon: '💰',
    url: '#',
    status: 'Coming Soon',
    color: '#ef4444'
  },
  {
    id: 6,
    name: 'Password Manager',
    description: 'Secure, encrypted vault for managing your credentials.',
    icon: '🔐',
    url: '#',
    status: 'Coming Soon',
    color: '#6366f1'
  },
  {
    id: 7,
    name: 'VAT Audit',
    description: 'Comprehensive VAT auditing and reporting tool.',
    icon: '📑',
    url: '#',
    status: 'Coming Soon',
    color: '#14b8a6'
  },
  {
    id: 8,
    name: 'VAT Calculator',
    description: 'Quick and accurate calculator for complex VAT scenarios.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="1em" height="1em"><rect x="8" y="4" width="48" height="56" rx="6" fill="#ec4899"/><rect x="14" y="10" width="36" height="12" rx="2" fill="#fbcfe8"/><rect x="14" y="28" width="8" height="8" rx="2" fill="#fde047"/><rect x="28" y="28" width="8" height="8" rx="2" fill="#fde047"/><rect x="42" y="28" width="8" height="8" rx="2" fill="#f87171"/><rect x="14" y="42" width="8" height="8" rx="2" fill="#fde047"/><rect x="28" y="42" width="8" height="8" rx="2" fill="#fde047"/><rect x="42" y="42" width="8" height="8" rx="2" fill="#34d399"/></svg>',
    url: '/vat-calculator',
    status: 'Live',
    isFree: true,
    color: '#ec4899'
  },
  {
    id: 9,
    name: 'VAT Documentation',
    description: 'Centralized repository for VAT forms and documentation.',
    icon: '📁',
    url: '#',
    status: 'Coming Soon',
    color: '#8b5cf6'
  },
  {
    id: 10,
    name: 'Amar Account',
    description: 'Your personalized central accounting and management dashboard.',
    icon: '👤',
    url: '#',
    status: 'Coming Soon',
    color: '#f43f5e'
  }
];

</script>

<template>
  <div class="website-container">
    <!-- Animated Background Orbs -->
    <div class="bg-orb orb-1"></div>
    <div class="bg-orb orb-2"></div>
    <div class="bg-orb orb-3"></div>

    <!-- Navbar -->
    <nav class="navbar">
      <div class="nav-content">
        <div class="logo-wrapper">
          <div class="logo-icon">iS</div>
          <span class="logo-text">iSupport BD</span>
        </div>
        
        <!-- Mobile Menu Toggle -->
        <button class="mobile-menu-btn" @click="toggleMenu" aria-label="Toggle Menu">
          <span class="hamburger" :class="{ 'active': isMenuOpen }"></span>
        </button>

        <div class="nav-links" :class="{ 'mobile-active': isMenuOpen }" @click="isMenuOpen = false">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#apps">Apps</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero-section">
      <div class="hero-content">
        <h1>Welcome to <span>iSupport BD</span></h1>
        <p class="hero-subtitle">Your central hub for powerful digital solutions. We build efficient, fast, and reliable applications to power your business.</p>
        <div class="hero-buttons">
          <a href="#apps" class="primary-btn">Explore Apps</a>
          <a href="#contact" class="secondary-btn">Contact Us</a>
        </div>
      </div>
    </section>

    <!-- 1. Features Section (Dynamic) -->
    <section id="features" class="features-section">
      <div class="section-container">
        <div class="section-header">
          <h2>Why Choose Us</h2>
          <p>We deliver excellence through cutting-edge technology</p>
        </div>
        <div class="features-grid">
          <div v-for="feature in features" :key="feature.id" class="feature-card">
            <div class="feature-icon">{{ feature.icon }}</div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. Stats Section (Demo) -->
    <section id="stats" class="stats-section">
      <div class="section-container stats-grid">
        <div class="stat-item">
          <h3>10K+</h3>
          <p>API Requests</p>
        </div>
        <div class="stat-item">
          <h3>99.9%</h3>
          <p>Uptime</p>
        </div>
        <div class="stat-item">
          <h3>500+</h3>
          <p>Happy Users</p>
        </div>
        <div class="stat-item">
          <h3>24/7</h3>
          <p>System Monitoring</p>
        </div>
      </div>
    </section>

    <!-- Apps Portal Section -->
    <section id="apps" class="apps-section">
      <div class="section-container">
        <div class="portal-main-card">
          <div class="section-header">
            <h2>Apps Portal</h2>
            <p>Access our suite of business applications below</p>
          </div>
          
          <div class="apps-grid">
            <template v-for="app in apps" :key="app.id">
              <router-link v-if="app.url.startsWith('/')" :to="app.url" class="app-card" :class="{'disabled': app.status === 'Coming Soon'}">
                <div class="card-glow" :style="{'--glow-color': app.color}"></div>
                <div class="card-content">
                  <div class="app-header">
                    <span class="app-icon" v-html="app.icon"></span>
                    <div style="display: flex; gap: 0.5rem;">
                      <span v-if="app.isFree" class="status-badge free">Free</span>
                      <span class="status-badge" :class="app.status.toLowerCase().replace(' ', '-')">{{ app.status }}</span>
                    </div>
                  </div>
                  <h3>{{ app.name }}</h3>
                  <p>{{ app.description }}</p>
                  <div class="card-action">
                    <span v-if="app.status !== 'Coming Soon'">Open App →</span>
                    <span v-else>In Development</span>
                  </div>
                </div>
              </router-link>
              <a v-else :href="app.url" class="app-card" :class="{'disabled': app.status === 'Coming Soon'}">
                <div class="card-glow" :style="{'--glow-color': app.color}"></div>
                <div class="card-content">
                  <div class="app-header">
                    <span class="app-icon" v-html="app.icon"></span>
                    <div style="display: flex; gap: 0.5rem;">
                      <span v-if="app.isFree" class="status-badge free">Free</span>
                      <span class="status-badge" :class="app.status.toLowerCase().replace(' ', '-')">{{ app.status }}</span>
                    </div>
                  </div>
                  <h3>{{ app.name }}</h3>
                  <p>{{ app.description }}</p>
                  <div class="card-action">
                    <span v-if="app.status !== 'Coming Soon'">Open App →</span>
                    <span v-else>In Development</span>
                  </div>
                </div>
              </a>
            </template>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. FAQ Section (Demo) -->
    <section id="faq" class="faq-section">
      <div class="section-container">
        <div class="section-header">
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about our services</p>
        </div>
        <div class="faq-list">
          <div class="faq-item" :class="{ 'active': activeFaq === 1 }" @click="toggleFaq(1)">
            <div class="faq-question">
              <h4>How do I use the BIN Checker?</h4>
              <span class="faq-toggle">{{ activeFaq === 1 ? '−' : '+' }}</span>
            </div>
            <div class="faq-answer">
              <p>Simply navigate to the BIN Checker app from the portal, log in or sign up, and upload your CSV file containing the BINs. The system will automatically process and verify them.</p>
            </div>
          </div>
          <div class="faq-item" :class="{ 'active': activeFaq === 2 }" @click="toggleFaq(2)">
            <div class="faq-question">
              <h4>Are the services free to use?</h4>
              <span class="faq-toggle">{{ activeFaq === 2 ? '−' : '+' }}</span>
            </div>
            <div class="faq-answer">
              <p>Basic features are available for all registered users. Premium API access and bulk processing may require a subscription plan.</p>
            </div>
          </div>
          <div class="faq-item" :class="{ 'active': activeFaq === 3 }" @click="toggleFaq(3)">
            <div class="faq-question">
              <h4>Is my data secure?</h4>
              <span class="faq-toggle">{{ activeFaq === 3 ? '−' : '+' }}</span>
            </div>
            <div class="faq-answer">
              <p>Yes, absolutely. We use industry-standard encryption and do not store sensitive payment information permanently on our servers.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. CTA Section (Dynamic) -->
    <section id="cta" class="cta-section">
      <div class="section-container">
        <div class="cta-box">
          <h2>{{ ctaData.title }}</h2>
          <p>{{ ctaData.description }}</p>
          <div class="hero-buttons">
            <a :href="ctaData.primaryButtonLink" class="primary-btn">{{ ctaData.primaryButtonText }}</a>
            <a :href="ctaData.secondaryButtonLink" class="secondary-btn">{{ ctaData.secondaryButtonText }}</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer id="contact" class="footer">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="logo-wrapper">
            <div class="logo-icon small">iS</div>
            <span class="logo-text">iSupport BD</span>
          </div>
          <p>Empowering businesses through technology.</p>
          
          <!-- 5. Social Links (Demo) -->
          <div class="social-links">
            <a href="#" class="social-icon fb-icon" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" class="social-icon in-icon" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="#" class="social-icon tw-icon" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
            <a href="#" class="social-icon yt-icon" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
          </div>
        </div>
        
        <div class="footer-contact">
          <h4>Contact</h4>
          <p>Mobile: +8809658069188</p>
          <p>Email: admin@isupportbd.com</p>
        </div>
      </div>
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
}

/* Background Orbs */
.bg-orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(80px);
  z-index: -1;
  animation: float 20s infinite ease-in-out alternate;
  opacity: 0.5;
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: rgba(0, 210, 255, 0.15);
  top: -10%;
  left: -10%;
}

.orb-2 {
  width: 500px;
  height: 500px;
  background: rgba(58, 123, 213, 0.15);
  bottom: -20%;
  right: -10%;
  animation-delay: -5s;
}

.orb-3 {
  width: 300px;
  height: 300px;
  background: rgba(165, 180, 252, 0.1);
  top: 40%;
  left: 40%;
  animation-delay: -10s;
}

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

.logo-icon.small {
  width: 30px;
  height: 30px;
  font-size: 1rem;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: #fff;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-links a {
  color: #94a3b8;
  font-weight: 500;
  transition: color 0.3s ease;
  font-size: 0.95rem;
}

.nav-links a:hover {
  color: #fff;
}

/* Sections Common */
section {
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-container {
  max-width: 1200px;
  width: 100%;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
  color: #fff;
}

.section-header p {
  color: #94a3b8;
  font-size: 1.1rem;
  margin: 0;
}

/* Hero Section */
.hero-section {
  min-height: 100vh;
  justify-content: center;
  text-align: center;
  padding-top: 8rem;
}

.hero-content {
  max-width: 800px;
  animation: fadeInUp 1s ease-out;
}

.hero-content h1 {
  font-size: 4rem;
  font-weight: 800;
  margin: 0 0 1.5rem 0;
  line-height: 1.1;
  color: #fff;
}

.hero-content h1 span {
  background: linear-gradient(to right, #00d2ff, #3a7bd5, #00d2ff);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textShine 5s linear infinite;
}

@keyframes textShine {
  to {
    background-position: 200% center;
  }
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #94a3b8;
  margin-bottom: 3rem;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

.primary-btn, .secondary-btn {
  position: relative;
  overflow: hidden;
  padding: 0.8rem 2.5rem;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  z-index: 1;
}

.primary-btn {
  background: linear-gradient(135deg, #00d2ff, #3a7bd5);
  color: white;
  box-shadow: 0 10px 20px rgba(0, 210, 255, 0.2);
  border: none;
}

.primary-btn::after {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 50%; height: 100%;
  background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
  transform: skewX(-25deg);
  transition: all 0.6s ease;
  z-index: -1;
}

.primary-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(0, 210, 255, 0.4);
}

.primary-btn:hover::after {
  left: 200%;
}

.secondary-btn {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px);
}

/* Features Section */
.features-section {
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  text-align: center;
  transition: transform 0.3s ease, background 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.05);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.feature-card h3 {
  color: #fff;
  font-size: 1.4rem;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #94a3b8;
  line-height: 1.6;
}

/* Stats Section */
.stats-section {
  padding: 6rem 2rem;
}

.stats-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 2rem;
  text-align: center;
}

.stat-item h3 {
  font-size: 3.5rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(135deg, #00d2ff, #3a7bd5);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-item p {
  color: #94a3b8;
  font-size: 1.1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 0.5rem;
}

/* Apps Grid and Main Card */
.portal-main-card {
  background: rgba(13, 17, 23, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 4rem 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  width: 100%;
}

.apps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.app-card {
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.5rem;
  text-align: left;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  overflow: hidden;
}

.app-card.disabled {
  pointer-events: none;
  opacity: 0.7;
}

.card-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at center, var(--glow-color) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 0;
}

.app-card:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}

.app-card:hover .card-glow {
  opacity: 0.15;
}

.card-content {
  position: relative;
  z-index: 1;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.app-icon {
  font-size: 2rem;
  background: rgba(255, 255, 255, 0.05);
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.status-badge {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-badge.live {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  border: 1px solid rgba(52, 211, 153, 0.3);
}

.status-badge.coming-soon {
  background: rgba(245, 158, 11, 0.15);
  color: #fbbf24;
  border: 1px solid rgba(251, 191, 36, 0.3);
}

.card-content h3 {
  font-size: 1.25rem;
  margin: 0 0 0.5rem 0;
  color: #fff;
}

.card-content p {
  color: #94a3b8;
  font-size: 0.9rem;
  margin: 0 0 1.5rem 0;
  line-height: 1.5;
}

.card-action {
  font-size: 0.95rem;
  font-weight: 500;
  color: #a5b4fc;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
}

.app-card:hover .card-action {
  color: #fff;
  transform: translateX(5px);
}

/* FAQ Section */
.faq-section {
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.faq-list {
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-item {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.faq-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.faq-item.active {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
}

.faq-question h4 {
  margin: 0;
  font-size: 1.1rem;
  color: #fff;
}

.faq-toggle {
  font-size: 1.5rem;
  color: #3a7bd5;
  font-weight: 300;
  transition: transform 0.3s ease;
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease, padding 0.4s ease;
  padding: 0 1.5rem;
}

.faq-item.active .faq-answer {
  max-height: 200px;
  padding: 0 1.5rem 1.5rem 1.5rem;
}

.faq-answer p {
  margin: 0;
  color: #94a3b8;
  line-height: 1.6;
}

/* CTA Section */
.cta-section {
  padding: 6rem 2rem;
}

.cta-box {
  background: linear-gradient(135deg, rgba(0, 210, 255, 0.1), rgba(58, 123, 213, 0.1));
  border: 1px solid rgba(0, 210, 255, 0.2);
  border-radius: 24px;
  padding: 4rem 2rem;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
}

.cta-box h2 {
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 1rem;
}

.cta-box p {
  color: #94a3b8;
  font-size: 1.15rem;
  margin: 0 auto 3rem auto;
  max-width: 600px;
  line-height: 1.6;
}

/* Footer */
.footer {
  background: rgba(0, 0, 0, 0.3);
  padding: 2.5rem 2rem 1.5rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  width: 100%;
  text-align: left;
}

.footer-content {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.footer-brand p {
  color: #94a3b8;
  margin-top: 1rem;
  line-height: 1.6;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.social-icon {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.fb-icon { color: #1877F2; }
.in-icon { color: #0A66C2; }
.tw-icon { color: #1DA1F2; }
.yt-icon { color: #FF0000; }

.social-icon:hover {
  border-color: transparent;
  transform: translateY(-3px);
  color: #fff;
}

.fb-icon:hover { background: #1877F2; box-shadow: 0 4px 10px rgba(24, 119, 242, 0.4); }
.in-icon:hover { background: #0A66C2; box-shadow: 0 4px 10px rgba(10, 102, 194, 0.4); }
.tw-icon:hover { background: #1DA1F2; box-shadow: 0 4px 10px rgba(29, 161, 242, 0.4); }
.yt-icon:hover { background: #FF0000; box-shadow: 0 4px 10px rgba(255, 0, 0, 0.4); }

.footer h4 {
  color: #fff;
  font-size: 1.1rem;
  margin: 0 0 1.5rem 0;
}

.footer-contact p {
  color: #94a3b8;
  margin: 0 0 0.8rem 0;
}

.footer-bottom {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  color: #64748b;
  font-size: 0.9rem;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

html {
  scroll-behavior: smooth;
}

/* Mobile Menu Styles */
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;
}

.hamburger {
  display: block;
  width: 24px;
  height: 2px;
  background-color: #fff;
  position: relative;
  transition: background-color 0.3s;
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background-color: #fff;
  left: 0;
  transition: transform 0.3s ease;
}

.hamburger::before { transform: translateY(-8px); }
.hamburger::after { transform: translateY(8px); }

.hamburger.active { background-color: transparent; }
.hamburger.active::before { transform: translateY(0) rotate(45deg); }
.hamburger.active::after { transform: translateY(0) rotate(-45deg); }

@media (max-width: 768px) {
  /* Navbar */
  .mobile-menu-btn {
    display: block;
  }
  
  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    width: 250px;
    height: 100vh;
    background: rgba(13, 17, 23, 0.95);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    flex-direction: column;
    padding: 6rem 2rem 2rem;
    transition: right 0.3s ease-in-out;
    border-left: 1px solid rgba(255, 255, 255, 0.05);
  }

  .nav-links.mobile-active {
    right: 0;
  }

  /* Typography & Spacing */
  section { padding: 3rem 1.5rem; }
  .hero-section { padding-top: 5rem; min-height: 80vh; }
  .hero-content h1 { font-size: 2.2rem; }
  .hero-subtitle { font-size: 1rem; margin-bottom: 2rem; }
  .section-header h2, .about-section h2 { font-size: 2rem; }
  
  /* Buttons */
  .hero-buttons { flex-direction: column; width: 100%; }
  .primary-btn, .secondary-btn { width: 100%; }
  
  /* Footer */
  .footer { padding: 2rem 1.5rem 1rem; }
  .footer-content { flex-direction: column; gap: 1.5rem; }

  /* Apps Grid Mobile */
  .apps-grid { grid-template-columns: 1fr; }
}

@media (max-width: 480px) {
  .hero-content h1 { font-size: 1.8rem; }
  .logo-text { font-size: 1.1rem; }
  .app-card { padding: 1.5rem; }
  .stat-item h3 { font-size: 2.5rem; }
}
</style>
