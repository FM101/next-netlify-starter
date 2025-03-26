import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  return (
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DeepSeek 技术平台</title>
    <style>
        /* 重置样式 + 基础变量 */
        :root {
            --primary-color: #2c3e50;
            --secondary-color: #3498db;
            --accent-color: #e74c3c;
            --text-color: #333;
            --max-width: 1200px;
            --section-padding: 5rem 2rem;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        html {
            scroll-behavior: smooth;
        }

        body {
            font-family: 'Segoe UI', system-ui;
            line-height: 1.6;
            color: var(--text-color);
            overflow-x: hidden;
        }

        /* 通用容器 */
        .container {
            width: 100%;
            max-width: var(--max-width);
            margin: 0 auto;
            padding: 0 1.5rem;
        }

        /* 导航栏优化 */
        .nav-container {
            position: fixed;
            top: 0;
            width: 100%;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
            z-index: 1000;
        }

        .nav-list {
            display: flex;
            gap: 2rem;
            padding: 1rem 0;
            list-style: none;
        }

        .nav-list a {
            text-decoration: none;
            color: var(--primary-color);
            font-weight: 500;
            transition: color 0.3s ease;
        }

        .nav-list a:hover {
            color: var(--secondary-color);
        }

        /* 主内容区域 */
        main {
            margin-top: 80px; /* 为固定导航留出空间 */
        }

        /* 主页英雄模块优化 */
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            padding: var(--section-padding);
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        .hero-content {
            text-align: center;
            max-width: 800px;
            margin: 0 auto;
        }

        .hero h1 {
            font-size: 3.5rem;
            margin-bottom: 1.5rem;
            line-height: 1.2;
        }

        /* 产品卡片布局优化 */
        .architecture-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            padding: var(--section-padding);
        }

        .card {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card-icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }

        /* 响应式设计 */
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2.5rem;
            }

            .nav-list {
                gap: 1rem;
                justify-content: center;
            }

            .architecture-grid {
                grid-template-columns: 1fr;
            }
        }

        @media (max-width: 480px) {
            :root {
                --section-padding: 3rem 1rem;
            }

            .hero h1 {
                font-size: 2rem;
            }

            .card {
                padding: 1.5rem;
            }
        }
    </style>
</head>
<body>
    <nav class="nav-container">
        <div class="container">
            <!-- 导航内容通过JS动态生成 -->
        </div>
    </nav>

    <main id="app">
        <!-- 动态内容渲染 -->
    </main>

<script type="module">
    // 增强数据模型
    const deepseekData = {
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

    class DeepSeekApp {
        constructor() {
            this.appContainer = document.getElementById('app');
            this.navContainer = document.querySelector('.nav-container .container');
            this.init();
        }

        init() {
            this.renderNavigation();
            this.renderSections();
            this.setupEventListeners();
            this.observeAnimations();
        }

        // 改进的导航渲染
        renderNavigation() {
            const navHTML = `
                <ul class="nav-list">
                    ${deepseekData.sections.map(section => `
                        <li><a href="#${section.id}">${section.title}</a></li>
                    `).join('')}
                </ul>
            `;
            this.navContainer.innerHTML = navHTML;
        }

        // 增强的章节渲染
        renderSections() {
            this.appContainer.innerHTML = deepseekData.sections.map(section => `
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
            // 增强的滚动逻辑
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = anchor.getAttribute('href');
                    const target = document.querySelector(targetId);
                    if (target) {
                        const offset = 80; // 导航栏高度
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

    // 初始化应用
    new DeepSeekApp();
</script>
</body>
  )
}
