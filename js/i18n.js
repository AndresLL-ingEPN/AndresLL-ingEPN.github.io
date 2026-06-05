(function(){
  // Cache para almacenar el contenido original en español del HTML
  const originalContent = new Map();
  
  // Solo mantener traducciones al inglés (no duplicar el español del HTML)
  const translations = {
    en: {
      'lang.spanish': 'Español',
      'lang.english': 'English',
      'header.role': 'QE Senior • Automation • Data Quality • AI Agents • MCP • Performance • Big Data',
      'header.email': 'Email:',
      'header.phone': 'Phone:',
      'header.city': 'City:',
      'header.location': 'Quito, Ecuador',
      'header.linkedin': 'LinkedIn:',
      'header.linkedin.text': 'Visit my profile',
      'header.lastupdate': 'Last update:',
      'section.summary': 'Summary',
      'summary.text': 'Senior QA with +4 years of experience specializing in test automation and data quality in Big Data and distributed environments. Expert in modern frameworks (Karate, Serenity BDD, k6) and CI/CD pipeline implementation that optimize testing processes. Currently leading at NTT DATA AI initiatives for intelligent automation through conversational agents and MCP frameworks, designing risk-oriented test strategies that ensure quality and scalability in critical financial sector projects.',
      'section.skills': 'Technical Skills',
      'skills.automation': 'QA & Automation',
      'skills.languages': 'Languages',
      'skills.data': 'Data & DB',
      'skills.ide': 'IDE & Version Control',
      'skills.cloud': 'Cloud & DevOps',
      'skills.spoken': 'Languages',
      'skills.english': 'Intermediate English',
      'section.experience': 'Experience',
      'job1.title': 'QE Senior (QE SR) — NTT DATA / Banco Pichincha',
      'job1.period': 'May 2026 – Present • Quito, EC',
      'job1.desc1': 'Technical leadership in quality assurance: design of risk-oriented test strategies, definition of quality policies and alignment with business objectives.',
      'job1.desc2': 'AI Innovation: Creation and orchestration of conversational agents and MCP (Model Context Protocol) frameworks for intelligent testing automation and technical support.',
      'job1.desc2b': '<strong>Key Achievement:</strong> Development of MCP agent with GitHub Copilot for automated test management in JIRA/Xray, reducing manual generation time from 40-60 minutes to <1 minute through optimized prompts (98% time reduction).',
      'job1.desc3': 'Mentoring and knowledge management: Team training on automation best practices, testing architecture design and adoption of new technologies.',
      'job1.desc4': 'Testing solutions architecture: Implementation of scalable CI/CD pipelines, reusable frameworks and metrics analysis for continuous improvement.',
      'job1.desc5': 'Data governance: Leadership in data quality strategies on Stratio, standards definition and integrity validation in Big Data environments.',
      'job1.desc6': 'Strategic collaboration with ML/DevOps/Development teams to ensure end-to-end quality in critical financial sector systems.',
      'job2.title': 'QA Engineer (QA Semi - Senior) — NTT DATA / Banco Pichincha',
      'job2.period': 'August 2023 – April 2026 • 2 years 9 months • Quito, EC',
      'job2.desc1': 'Test strategy execution: Practical implementation of API, E2E and Performance test cases following established quality standards.',
      'job2.desc2': 'Test automation with Karate Framework, Serenity BDD (Screenplay pattern), Cucumber/Gherkin for RESTful APIs and k6 for load testing.',
      'job2.desc2b': '<strong>Key Achievement:</strong> End-to-end automation of bank statement generation with Python (migrated to Serenity BDD/Java): file generation, SFTP upload, DB ingestion validation and PDF verification. Reduced testing time from 6-7 days to 15 minutes (99.6% optimization), improving volume testing capacity.',
      'job2.desc2c': '<strong>Key Achievement:</strong> Automation of critical operation flows with Python + UV package manager: complete process from entry to file generation with automatic captures. Reduced execution time from 1 day to 6 minutes (99.6% reduction), enabling more frequent validations.',
      'job2.desc3': 'Data quality validation on Stratio Data: Ingestion, ETL transformation and storage testing, ensuring integrity and consistency in data flows.',
      'job2.desc4': 'Development of automated suites for ETL pipelines and real-time processes; business rules verification in distributed Big Data environments.',
      'job2.desc5': 'Defect management in JIRA: Detailed documentation of incidents, resolution tracking and active collaboration with development teams.',
      'job3.title': 'Support Engineer & QA — Bayteq (Pronaca)',
      'job3.period': 'April 2022 – August 2023 • 1 year 5 months • Quito, EC',
      'job3.desc1': 'Support for database incidents and data filtering on Oracle 19c.',
      'job3.desc2': 'Manual testing and migration support; JIRA management.',
      'job4.title': 'Junior Programmer / QA Automation — Devsu',
      'job4.period': 'January 2022 – March 2022 • 3 months • Quito, EC',
      'job4.desc1': 'UI automation with Selenium (Java); test case design.',
      'job5.title': 'Technical Support — Seguros Alianza',
      'job5.period': 'June 2020 – August 2020 • 3 months (Internship) • Quito, EC',
      'job5.desc1': 'User support; software/hardware maintenance; database record upload.',
      'job6.title': 'Junior Programmer — Escuela Politécnica Nacional',
      'job6.period': 'June 2019 – May 2020 • 11 months (Internship) • Quito, EC',
      'job6.desc1': 'Development of inventory, item creation and collision correction (internal Unity projects).',
      'section.education': 'Education',
      'edu1': 'Master\'s Degree in Big Data and Massive Data Visualization',
      'edu1.inst': 'UNIR (Fourth level - In progress)',
      'edu2': 'Software Engineering',
      'edu2.inst': 'Escuela Politécnica Nacional (Third level)',
      'edu3': 'Diploma: Data Science & Business Analytics (90h)',
      'edu3.inst': 'Universidad de los Hemisferios',
      'edu4': 'High School',
      'edu4.inst': 'Instituto Superior Policía Nacional Sur',
      'section.certifications': 'Certifications',
      'cert.list.stratio.governance': 'Stratio Generative AI Data Governance',
      'cert.list.stratio.processing': 'Stratio Generative AI Data Processing',
      'cert.list.stratio.fabric': 'Stratio Generative AI Data Fabric Basics',
      'cert.list.azure.ai900': 'Microsoft Certified: Azure AI Fundamentals (AI-900)',
      'cert.list.azure.dp900': 'Microsoft Certified: Azure Data Fundamentals (DP-900)',
      'cert.list.azure.az900': 'Microsoft Certified: Azure Fundamentals (AZ-900)',
      'cert.list.scrum': 'SCRUM Foundation Professional Certificate',
      'cert.link': 'View all certificates and evidence »',
      'cert.page.title': 'Certificates',
      'cert.page.subtitle': 'Evidence of certifications and courses',
      'cert.section.filter': 'Filter by category',
      'cert.filter.all': 'All',
      'cert.filter.azure': 'Azure',
      'cert.filter.stratio': 'Stratio',
      'cert.filter.qa': 'QA / Testing',
      'cert.filter.curso': 'Courses',
      'cert.section.gallery': 'Gallery',
      'cert.footer.title': 'Certificates',
      'cert.footer.back': '← Back to CV',
      'cert.issued': 'Issued:',
      'cert.obtained': 'Obtained:',
      'cert.issuer': 'Issuer:',
      'cert.period': 'Period:',
      'cert.btn.preview': '👁️ Preview',
      'cert.btn.credential': '🔗 Credential',
      'cert.btn.download': '📥 Download PDF',
      'cert.name.azure.az900': 'Microsoft Certified: Azure Fundamentals (AZ-900)',
      'cert.name.azure.dp900': 'Microsoft Certified: Azure Data Fundamentals (DP-900)',
      'cert.name.azure.ai900': 'Microsoft Certified: Azure AI Fundamentals (AI-900)',
      'cert.name.stratio.fabric': 'Stratio Generative AI Data Fabric Basics (v14.1)',
      'cert.name.stratio.governance': 'Stratio Generative AI Data Governance Certification (14.6)',
      'cert.name.stratio.processing': 'Stratio Generative AI Data Processing (v14.1)',
      'cert.name.diplomado': 'Diploma: Data Science &amp; Business Analytics (90h)',
      'course1': 'Azure Kubernets Service (AKS)',
      'course2': 'Introduction to UML, Unified Modeling Language',
      'course3': 'Introduction to Usability Testing, UX and Accessibility',
      'course4': 'Web Test Automation with Serenity BDD and Java',
      'course5': 'SQL for Beginners',
      'course6': 'Exploratory Testing to Speed Up Your Testing',
      'course7': 'K6: Performance and Load Testing for Beginners',
      'course8': 'Karate DSL: API Automation and Performance from Zero to Hero',
      'course9': 'Certified Tester ISTQB Foundation Level (CTFL)',
      'course10': 'DevOps with Docker, Jenkins, Kubernetes, git, GitFlow CI and CD',
      'course11': 'Software Testing from Zero',
      'course12': 'Create Interactive Dashboards with Streamlit and Python',
      'course13': 'Getting Started with Power BI Desktop',
      'course14': 'Strategy Implementation',
      'cert.fullname.usability': 'Introduction to Usability Testing, UX and Accessibility',
      'cert.fullname.exploratory': 'Exploratory Testing to Speed Up Your Testing',
      'cert.fullname.serenity': 'Web Test Automation with Serenity BDD and Java',
      'cert.fullname.softtesting': 'Software Testing from Zero',
      'cert.fullname.ctfl': 'Certified Tester ISTQB Foundation Level (CTFL)',
      'cert.fullname.karate': 'Karate DSL: API Automation and Performance from Zero to Hero',
      'cert.fullname.k6': 'K6: Performance and Load Testing for Beginners',
      'cert.fullname.strategy': 'Strategy Implementation (6h)',
      'cert.fullname.powerbi': 'Getting Started with Power BI Desktop (8h)',
      'cert.fullname.streamlit': 'Create Interactive Dashboards with Streamlit and Python (12h)',
      'cert.fullname.devops': 'DevOps with Docker, Jenkins, Kubernetes, git, GitFlow CI and CD — Udemy (14h)',
      'cert.fullname.sql': 'SQL for Beginners — Udemy (5h)',
      'cert.fullname.aks': 'Azure Kubernetes Service (AKS) Everything about AKS — Udemy (6.5h)',
      'cert.fullname.uml': 'Introduction to UML, Unified Modeling Language — Udemy (2.5h)',
      'section.courses': 'Continuing Education',
      'footer.text': 'CV for professional use'
    }
  };

  /**
   * Guarda el contenido original en español del DOM
   * Se ejecuta solo una vez al cargar la página
   */
  function cacheOriginalContent() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      
      // Guardar el contenido original del HTML (en español)
      if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea') {
        originalContent.set(key, el.placeholder);
      } else {
        originalContent.set(key, el.textContent);
      }
    });
  }

  /**
   * Aplica las traducciones según el idioma seleccionado
   * @param {string} lang - Código del idioma ('es' o 'en')
   */
  function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      
      let text;
      if (lang === 'es') {
        // Restaurar contenido original del HTML
        text = originalContent.get(key);
      } else if (lang === 'en') {
        // Aplicar traducción al inglés
        text = translations.en[key];
      }
      
      // Si no hay traducción disponible, mantener el contenido actual
      if (typeof text === 'undefined') return;
      
      // Aplicar el texto según el tipo de elemento
      if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea') {
        el.placeholder = text;
      } else {
        el.textContent = text;
      }
    });
  }

  /**
   * Actualiza el estado visual de los botones de idioma
   * @param {string} lang - Código del idioma activo
   */
  function setActiveLangButton(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  // Inicialización al cargar el DOM
  document.addEventListener('DOMContentLoaded', function() {
    // 1. Guardar el contenido original en español del HTML
    cacheOriginalContent();
    
    // 2. Obtener el idioma guardado o usar español por defecto
    const savedLang = localStorage.getItem('site-lang') || 'es';
    
    // 3. Aplicar traducciones si es necesario
    if (savedLang !== 'es') {
      applyTranslations(savedLang);
    }
    
    // 4. Actualizar botones de idioma
    setActiveLangButton(savedLang);

    // 5. Configurar listeners para cambio de idioma
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang || 'es';
        localStorage.setItem('site-lang', lang);
        applyTranslations(lang);
        setActiveLangButton(lang);
      });
    });
  });
})();
