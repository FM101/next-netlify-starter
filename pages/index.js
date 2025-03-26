// deepseek.js
class DeepSeekApp {
  constructor(config) {
    this.config = {
      container: '#app',
      navContainer: '.nav-container .container',
      ...config
    };
    this.sections = configData.sections;
    this.init();
  }

  init() {
    this.renderNavigation();
    this.renderSections();
    this.setupEventListeners();
    this.observeAnimations();
  }

  renderNavigation() {
    const navHTML = `
      <ul class="nav-list">
        ${this.sections.map(section => `
          <li><a href="#${section.id}">${section.title}</a></li>
        `).join('')}
      </ul>
    `;
    document.querySelector(this.config.navContainer).innerHTML = navHTML;
  }

  renderSections() {
    const mainContainer = document.querySelector(this.config.container);
    mainContainer.innerHTML = this.sections.map(section => `
      <section id="${section.id}" class="section-${section.type}">
        <div class="container">
          ${section.content.title ? `<h2 class="section-title">${section.content.title}</h2>` : ''}
          ${this[`render${this.capitalize(section.type)}Section`](section.content)}
        </div>
      </section>
    `).join('');
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  renderHeroSection(content) {
    return `
      <div class="hero-content">
        <h1>${content.heading}</h1>
        <p class="hero-subtitle">${content.subtitle}</p>
        <button class="cta-button">${content.cta}</button>
      </div>
    `;
  }

  renderGridSection(content) {
    return `
      <div class="architecture-grid">
        ${content.items.map(item => `
          <div class="card">
            <div class="card-icon">${item.icon}</div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  setupEventListeners() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
          const offset = 80;
          const targetPosition = target.offsetTop - offset;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  observeAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card').forEach(card => {
      card.style.opacity = 0;
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      observer.observe(card);
    });
  }
}

// 配置数据
const configData = {
  sections: [
    {
      id: 'home',
      title: '首页',
      type: 'hero',
      content: {
        heading: 'DeepSeek 智能平台',
        subtitle: '融合先进算法与分布式计算架构',
        cta: '立即体验'
      }
    },
    {
      id: 'products',
      title: '核心产品',
      type: 'grid',
      content: {
        title: '技术解决方案',
        items: [
          {
            title: '智能模型工厂',
            icon: '🧠',
            description: '支持从训练到部署的全生命周期管理'
          },
          {
            title: '算力调度引擎',
            icon: '⚡',
            description: '智能分配计算资源，提升利用率30%+'
          },
          {
            title: '数据可视化',
            icon: '📊',
            description: '多维数据分析与实时监控看板'
          }
        ]
      }
    }
  ]
};

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
  new DeepSeekApp({
    container: '#app',
    navContainer: '.nav-container .container'
  });
});
