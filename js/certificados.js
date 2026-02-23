(function(){
  let previewMap = {}; // key: index -> {src, type, title, meta}
  let keysOrdered = [];
  let currentKey = null;

  function buildPreviewMap(){
    previewMap = {};
    keysOrdered = [];

    const cards = document.querySelectorAll('.cert-grid .card');
    cards.forEach(card => {
      const previewBtn = card.querySelector('.btn-preview');
      if(!previewBtn) return;
      // try to extract inline onclick index if present
      let onclick = previewBtn.getAttribute('onclick') || '';
      const m = onclick.match(/openLightbox\((\d+)\)/);
      let key = null;
      if(m) key = m[1];
      // find a credential link inside the same card (if exists)
      const credLink = card.querySelector('a.btn-credential');
      let href = credLink ? credLink.getAttribute('href') : null;
      // buscar atributo data-preview para imagen específica de vista previa
      let previewSrc = card.getAttribute('data-preview') || null;
      // metadata and title
      const title = (card.querySelector('.cert-name')||{textContent:''}).textContent.trim();
      const meta = Array.from(card.querySelectorAll('.cert-details span')).map(s=>s.textContent.trim()).join(' • ');

      if(key !== null){
        let type = 'unknown';
        if(href){
          const lower = href.toLowerCase();
          if(lower.startsWith('http') && !(location.hostname && href.indexOf(location.hostname) !== -1)){
            // external link
            type = 'external';
          } else if(lower.endsWith('.pdf')){
            type = 'pdf';
          } else if(lower.match(/\.(png|jpe?g|gif|webp)$/)){
            type = 'image';
          } else if(lower.startsWith('http')){
            type = 'external';
          } else {
            // relative path without extension - assume pdf
            type = 'pdf';
          }
        } else {
          // no link: try to find an <img> inside card (none in current markup)
          type = 'missing';
        }

        previewMap[key] = { src: href, type, title, meta, previewSrc };
        keysOrdered.push(key);
      }
    });
    // sort numeric keys ascending
    keysOrdered.sort((a,b)=>Number(a)-Number(b));
  }

  function showLightboxForKey(key){
    const map = previewMap[key];
    if(!map){
      console.warn('No preview available for', key);
      return;
    }
    currentKey = key;
    const container = document.getElementById('lightbox-media');
    container.innerHTML = '';
    
    // si el preview es una imagen, mostrarla
    if(map.previewSrc){
      const img = document.createElement('img');
      img.src = map.previewSrc;
      img.alt = map.title || 'Certificado';
      img.style.maxWidth = '100%';
      img.style.maxHeight = '80vh';
      container.appendChild(img);
    } else if(map.type === 'pdf'){
      // pdf en iframe
      const iframe = document.createElement('iframe');
      iframe.src = map.src;
      iframe.style.width = '100%';
      iframe.style.height = '80vh';
      iframe.setAttribute('title','Vista previa del certificado (PDF)');
      container.appendChild(iframe);
    } else if(map.type === 'image'){
      const img = document.createElement('img');
      img.src = map.src;
      img.alt = map.title || 'Certificado';
      img.style.maxWidth = '100%';
      img.style.maxHeight = '80vh';
      container.appendChild(img);
    } else if(map.type === 'missing'){
      const p = document.createElement('p');
      p.textContent = 'Vista previa no disponible. Usa el enlace de credencial o descarga para ver el certificado.';
      container.appendChild(p);
    }

    document.getElementById('lightbox-title').textContent = map.title || '';
    document.getElementById('lightbox-meta').textContent = map.meta || '';
    document.getElementById('lightbox').style.display = 'block';
  }

  // Expose global openLightbox so inline onclick still works
  window.openLightbox = function(key){
    // ensure map built
    if(Object.keys(previewMap).length === 0) buildPreviewMap();
    // if the key does not exist but key is numeric, try stringified
    const k = String(key);
    if(!previewMap[k]){
      // try to find the preview button that had this inline onclick and derive href dynamically
      const btn = Array.from(document.querySelectorAll('.btn-preview')).find(b=>{
        const o = b.getAttribute('onclick')||'';
        return o.indexOf('openLightbox('+k+')') !== -1;
      });
      if(btn){
        // attempt to find nearby credential link
        const card = btn.closest('.card');
        const cred = card ? card.querySelector('a.btn-credential') : null;
        const href = cred ? cred.getAttribute('href') : null;
        const title = card ? (card.querySelector('.cert-name')||{textContent:''}).textContent.trim() : '';
        const meta = card ? Array.from(card.querySelectorAll('.cert-details span')).map(s=>s.textContent.trim()).join(' • ') : '';
        let type = 'missing';
        if(href){
          const lower = href.toLowerCase();
          if(lower.endsWith('.pdf')) type = 'pdf';
          else if(lower.match(/\.(png|jpe?g|gif|webp)$/)) type = 'image';
          else if(lower.startsWith('http')) type = 'external';
          else type = 'pdf';
        }
        previewMap[k] = { src: href, type, title, meta };
        keysOrdered.push(k);
        keysOrdered.sort((a,b)=>Number(a)-Number(b));
      }
    }
    showLightboxForKey(String(key));
  };

  window.closeLightbox = function(){
    document.getElementById('lightbox').style.display = 'none';
    const container = document.getElementById('lightbox-media');
    container.innerHTML = '';
    currentKey = null;
  };

  window.changeImage = function(delta){
    if(!currentKey){
      console.warn('No image open');
      return;
    }
    const idx = keysOrdered.indexOf(String(currentKey));
    if(idx === -1) return;
    let nextIdx = idx + delta;
    if(nextIdx < 0) nextIdx = keysOrdered.length - 1;
    if(nextIdx >= keysOrdered.length) nextIdx = 0;
    const nextKey = keysOrdered[nextIdx];
    if(nextKey) openLightbox(nextKey);
  };

  function setupFilters(){
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.cert-grid .card').forEach(card => {
          if(filter === 'all'){
            card.style.display = '';
          } else {
            card.style.display = (card.dataset.type === filter) ? '' : 'none';
          }
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    // build map
    buildPreviewMap();
    setupFilters();

    // Close lightbox when clicking close button or background already handled in HTML, but ensure keyboard escape works
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') closeLightbox();
      if(e.key === 'ArrowLeft') changeImage(-1);
      if(e.key === 'ArrowRight') changeImage(1);
    });

    // set year
    const y = new Date().getFullYear();
    const yearEl = document.getElementById('year');
    if(yearEl) yearEl.textContent = y;

    // Observar cambios de idioma para actualizar dinámicamente
    observeLanguageChanges();
    
    // Aplicar traducciones iniciales de nombres de certificados
    updateCertNameTranslations();
  });

  function observeLanguageChanges(){
    // Cuando cambia el idioma, re-renderizar las tarjetas
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // pequeño delay para que i18n termine
        setTimeout(updateCertCardTexts, 100);
        setTimeout(updateButtonTranslations, 150);
        setTimeout(updateCertNameTranslations, 150);
      });
    });
  }

  function updateButtonTranslations(){
    // Obtener idioma actual
    const lang = localStorage.getItem('site-lang') || 'es';
    const translations = {
      es: {
        'cert.btn.preview': '👁️ Vista previa',
        'cert.btn.credential': '🔗 Credencial',
        'cert.btn.download': '📥 Descargar PDF'
      },
      en: {
        'cert.btn.preview': '👁️ Preview',
        'cert.btn.credential': '🔗 Credential',
        'cert.btn.download': '📥 Download PDF'
      }
    };
    const trans = translations[lang] || translations.es;

    // Actualizar botones de preview
    document.querySelectorAll('.btn-preview').forEach(btn => {
      btn.textContent = trans['cert.btn.preview'];
    });

    // Actualizar enlaces de credencial
    document.querySelectorAll('.btn-credential').forEach(btn => {
      const key = btn.getAttribute('download') ? 'cert.btn.download' : 'cert.btn.credential';
      btn.textContent = trans[key];
    });
  }

  function updateCertNameTranslations(){
    // Obtener idioma actual
    const lang = localStorage.getItem('site-lang') || 'es';
    const translations = {
      es: {
        'cert.name.azure.az900': 'Microsoft Certified: Azure Fundamentals (AZ-900)',
        'cert.name.azure.dp900': 'Microsoft Certified: Azure Data Fundamentals (DP-900)',
        'cert.name.azure.ai900': 'Microsoft Certified: Azure AI Fundamentals (AI-900)',
        'cert.name.stratio.fabric': 'Stratio Generative AI Data Fabric Basics (v14.1)',
        'cert.name.stratio.governance': 'Stratio Generative AI Data Governance Certification (14.6)',
        'cert.name.stratio.processing': 'Stratio Generative AI Data Processing (v14.1)',
        'cert.name.diplomado': 'Diplomado: Data Science &amp; Business Analytics (90h)',
        'cert.fullname.usability': 'Introducción a las Pruebas de Usabilidad, UX y Accesibilidad',
        'cert.fullname.exploratory': 'Testing exploratorio para agilizar tus pruebas',
        'cert.fullname.serenity': 'Automatización de pruebas web con Serenity BDD y Java',
        'cert.fullname.softtesting': 'Software Testing desde Cero',
        'cert.fullname.ctfl': 'Certified Tester ISTQB Foundation Level (CTFL)',
        'cert.fullname.karate': 'Karate DSL: API Automation and Performance from Zero to Hero',
        'cert.fullname.k6': 'K6: Pruebas de Rendimiento y Carga para Principiantes',
        'cert.fullname.strategy': 'Strategy Implementation (6h)',
        'cert.fullname.powerbi': 'Getting Started with Power BI Desktop (8h)',
        'cert.fullname.streamlit': 'Create Interactive Dashboards with Streamlit and Python (12h)',
        'cert.fullname.devops': 'DevOps con Docker, Jenkins, Kubernetes, git, GitFlow CI y CD — Udemy (14h)',
        'cert.fullname.sql': 'SQL para Principiantes — Udemy (5h)',
        'cert.fullname.aks': 'Azure Kubernetes Service (AKS) Todo sobre AKS — Udemy (6.5h)',
        'cert.fullname.uml': 'Introduccion a UML, Lenguaje Unificado de Modelado — Udemy (2.5h)'
      },
      en: {
        'cert.name.azure.az900': 'Microsoft Certified: Azure Fundamentals (AZ-900)',
        'cert.name.azure.dp900': 'Microsoft Certified: Azure Data Fundamentals (DP-900)',
        'cert.name.azure.ai900': 'Microsoft Certified: Azure AI Fundamentals (AI-900)',
        'cert.name.stratio.fabric': 'Stratio Generative AI Data Fabric Basics (v14.1)',
        'cert.name.stratio.governance': 'Stratio Generative AI Data Governance Certification (14.6)',
        'cert.name.stratio.processing': 'Stratio Generative AI Data Processing (v14.1)',
        'cert.name.diplomado': 'Diploma: Data Science &amp; Business Analytics (90h)',
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
        'cert.fullname.uml': 'Introduction to UML, Unified Modeling Language — Udemy (2.5h)'
      }
    };
    const trans = translations[lang] || translations.es;

    // Actualizar nombres de certificados
    document.querySelectorAll('.cert-name[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (trans[key]) {
        el.textContent = trans[key];
      }
    });
  }

  function updateCertCardTexts(){
    // Traducir dinámicamente los textos de "Emitido:", "Emisor:", etc.
    const lang = localStorage.getItem('site-lang') || 'es';
    const translations = {
      es: { issued: 'Emitido:', issuer: 'Emisor:', period: 'Período:' },
      en: { issued: 'Issued:', issuer: 'Issuer:', period: 'Period:' }
    };
    const trans = translations[lang] || translations.es;

    // Actualizar todos los .cert-details
    document.querySelectorAll('.cert-details').forEach(detail => {
      const spans = detail.querySelectorAll('span');
      spans.forEach(span => {
        const text = span.textContent.trim();
        if(text.startsWith('Emitido:') || text.startsWith('Issued:')){
          const dateInfo = text.split(':')[1].trim();
          span.textContent = trans.issued + ' ' + dateInfo;
        } else if(text.includes('Emisor:') || text.includes('Issuer:')){
          const issuerInfo = text.split(':')[1].trim();
          span.textContent = '• ' + trans.issuer + ' ' + issuerInfo;
        } else if(text.startsWith('Período:') || text.startsWith('Period:')){
          const periodInfo = text.split(':')[1].trim();
          span.textContent = trans.period + ' ' + periodInfo;
        }
      });
    });
  }

})();
