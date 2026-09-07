/**
 * ==============================================================================
 * J&R SOLUTION - ARQUITECTURA DE SOFTWARE, CLOUD & CIBERSEGURIDAD
 * Archivo: assets/js/main.js
 * Descripción: Controlador interactivo en Vanilla JavaScript sin dependencias pesadas.
 * Características:
 *  - Cero alert, confirm o prompt (Feedback 100% visual en el DOM con Toasts).
 *  - Filtrado instantáneo y fluido de proyectos SIN saltos de layout ni retrasos.
 *  - Control de ventanas modales estilizadas para proyectos y políticas legales.
 *  - Función de copiado al portapapeles con confirmación visual.
 *  - Validación de formulario con respuestas visuales en el DOM.
 * ==============================================================================
 */

// Esperamos a que todo el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  inicializarNavbar();
  inicializarFiltrosProyectos();
  inicializarModales();
  inicializarCopiadoPortapapeles();
  inicializarFormularioContacto();
});

/* ==========================================================================
   1. DATOS DE LOS PROYECTOS & HABILIDADES
   ========================================================================== */
const PROYECTOS_DATA = {
  'nexus-ai': {
    titulo: 'NexusAI Orchestrator',
    categoria: 'ai',
    herramientas: ['n8n', 'Claude 3.5 Sonnet', 'Gemini 1.5 Pro', 'ChatGPT-4 Turbo', 'Webhooks'],
    imagen: 'assets/img/project-ai.svg',
    descripcionCorta: 'Plataforma de orquestación autónoma de flujos de trabajo e integración multi-LLM.',
    descripcionLarga: 'Diseño y despliegue de una arquitectura de automatización de procesos empresariales impulsada por n8n en conjunto con las APIs de Claude 3.5, Google Gemini y OpenAI ChatGPT-4. Permite la ingestión masiva de documentos, clasificación semántica, síntesis de datos en tiempo real y ejecución de tareas automatizadas con redundancia de modelos.',
    metricas: ['+85% Reducción en tiempos manuales', 'Multi-proveedor LLM con failover', 'Webhook streaming asíncrono'],
    enlaceGithub: 'https://github.com/JSCP-05-03-2025/Jose-Sebastian-Cardenas-Panduro'
  },
  'sentinel-rag': {
    titulo: 'Sentinel RAG Engine',
    categoria: 'ai',
    herramientas: ['LangChain', 'Python', 'Vector DB (ChromaDB)', 'FastAPI', 'Embeddings'],
    imagen: 'assets/img/project-rag.svg',
    descripcionCorta: 'Motor Retrieval-Augmented Generation con LangChain para análisis documental inteligente.',
    descripcionLarga: 'Implementación avanzada de agentes autónomos y pipelines de recuperación de conocimiento utilizando el framework LangChain. Integra memoria conversacional (ConversationBuffer), vectorización de textos en alta dimensionalidad y búsqueda por similitud de coseno para proporcionar respuestas hiper-precisas sobre repositorios corporativos.',
    metricas: ['Latencia de consulta < 160ms', 'Cero alucinaciones con grounding estricto', 'ChromaDB escalable'],
    enlaceGithub: 'https://github.com/JSCP-05-03-2025/Jose-Sebastian-Cardenas-Panduro'
  },
  'omnigate-api': {
    titulo: 'OmniGate Microservices Suite',
    categoria: 'backend',
    herramientas: ['FastAPI', 'Python 3.12', 'Docker', 'Redis', 'JWT', 'OpenAPI'],
    imagen: 'assets/img/project-api.svg',
    descripcionCorta: 'API RESTful asíncrona de alto rendimiento con validación estricta y caching distribuido.',
    descripcionLarga: 'Ecosistema de microservicios backend construido sobre FastAPI y Python asíncrono (async/await). Cuenta con documentación viva interactiva en Swagger/OpenAPI, serialización ultra rápida con Pydantic V2, autenticación centralizada mediante JSON Web Tokens (JWT) y rate-limiting administrado con Redis para resistir tráfico de alta densidad.',
    metricas: ['Capacidad de +12,000 req/min', 'P99 < 45ms en endpoints cacheados', 'Contratos de API autogenerados'],
    enlaceGithub: 'https://github.com/JSCP-05-03-2025/Jose-Sebastian-Cardenas-Panduro'
  },
  'cybershield-pentest': {
    titulo: 'CyberShield Pentest Suite',
    categoria: 'security',
    herramientas: ['Ethical Hacking', 'Kali Linux', 'Nmap', 'Burp Suite', 'Metasploit', 'Wireshark'],
    imagen: 'assets/img/project-security.svg',
    descripcionCorta: 'Auditorías de seguridad ofensiva, pruebas de penetración y hardening de servidores.',
    descripcionLarga: 'Laboratorio y framework de pruebas de intrusión bajo entorno Kali Linux para la detección y remediación proactiva de vulnerabilidades críticas del OWASP Top 10 (Inyecciones SQL, XSS, Broken Access Control, configuraciones erróneas). Incluye elaboración de reportes ejecutivos de pentesting para equipos técnicos y directivos.',
    metricas: ['Auditoría basada en OWASP Top 10', 'Simulación de amenazas APT', 'Planes de remediación técnica'],
    enlaceGithub: 'https://github.com/JSCP-05-03-2025/Jose-Sebastian-Cardenas-Panduro'
  },
  'datasync-platform': {
    titulo: 'Enterprise DataSync Hub',
    categoria: 'backend',
    herramientas: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLAlchemy', 'MongoEngine', 'Redis'],
    imagen: 'assets/img/project-data.svg',
    descripcionCorta: 'Arquitectura híbrida de bases de datos relacionales (SQL) y documentales (NoSQL).',
    descripcionLarga: 'Solución de persistencia de datos distribuida que combina la fiabilidad transaccional ACID de PostgreSQL y MySQL con la escalabilidad y flexibilidad no estructurada de MongoDB. Incorpora sincronización de réplicas, indexación compuesta optimizada, particionamiento de tablas y consultas analíticas de alto rendimiento.',
    metricas: ['Alta disponibilidad multi-nodo', 'Queries analíticos optimizados con EXPLAIN', 'Persistencia heterogénea'],
    enlaceGithub: 'https://github.com/JSCP-05-03-2025/Jose-Sebastian-Cardenas-Panduro'
  },
  'cloudvanguard-aws': {
    titulo: 'CloudVanguard DevOps',
    categoria: 'cloud',
    herramientas: ['AWS', 'Amazon EC2', 'AWS Lambda', 'Amazon S3', 'CloudFront', 'RDS', 'IAM'],
    imagen: 'assets/img/project-cloud.svg',
    descripcionCorta: 'Infraestructura cloud elástica y serverless en Amazon Web Services (AWS).',
    descripcionLarga: 'Diseño e implementación de arquitectura en la nube sobre AWS con enfoque de alta disponibilidad y tolerancia a fallos. Despliegue de funciones serverless en AWS Lambda, distribución global de activos estáticos mediante CloudFront CDN, configuración de buckets S3 con políticas IAM de mínimo privilegio y balanceo de carga en instancias EC2.',
    metricas: ['Disponibilidad 99.99%', 'Arquitectura Serverless costo-eficiente', 'Seguridad con AWS IAM & KMS'],
    enlaceGithub: 'https://github.com/JSCP-05-03-2025/Jose-Sebastian-Cardenas-Panduro'
  },
  'apex-platform': {
    titulo: 'Apex Enterprise SaaS',
    categoria: 'web',
    herramientas: ['React', 'Angular', 'JavaScript ES6+', 'HTML5/CSS3', 'C#', 'Java', 'Python'],
    imagen: 'assets/img/project-web.svg',
    descripcionCorta: 'Aplicación web empresarial responsiva multiplataforma con microfrontends y backend políglota.',
    descripcionLarga: 'Plataforma web modular de alto rendimiento que combina interfaces interactivas en React y Angular con servicios backend políglotas en C# (.NET Core), Java (Spring Boot) y Python. Desarrollada con estándares semánticos HTML5, arquitectura CSS Grid/Flexbox y una experiencia de usuario fluida sin interrupciones.',
    metricas: ['Diseño 100% responsivo y accesible', 'Módulos desacoplados en React/Angular', 'Interoperabilidad C# / Java / Python'],
    enlaceGithub: 'https://github.com/JSCP-05-03-2025/Jose-Sebastian-Cardenas-Panduro'
  }
};

/* ==========================================================================
   2. SISTEMA DE TOASTS & FEEDBACK VISUAL EN EL DOM (SIN ALERT NATIVO)
   ========================================================================== */

/**
 * Despliega una notificación visual en el DOM dentro de #toast-container.
 * @param {string} mensaje Texto o descripción a mostrar.
 * @param {string} tipo Tipo de notificación: 'success', 'info', 'warning', 'error'.
 * @param {string} titulo Título opcional para el Toast.
 * @param {number} duracion Tiempo en ms antes de desaparecer.
 */
function mostrarCyberToast(mensaje, tipo = 'success', titulo = 'Notificación', duracion = 3600) {
  let contenedor = document.getElementById('toast-container');
  if (!contenedor) {
    contenedor = document.createElement('div');
    contenedor.id = 'toast-container';
    document.body.appendChild(contenedor);
  }

  let iconoHtml = '<i class="bi bi-check-circle-fill fs-5"></i>';
  if (tipo === 'info') iconoHtml = '<i class="bi bi-info-circle-fill fs-5"></i>';
  if (tipo === 'warning') iconoHtml = '<i class="bi bi-exclamation-triangle-fill fs-5"></i>';
  if (tipo === 'error') iconoHtml = '<i class="bi bi-x-circle-fill fs-5"></i>';

  const toastEl = document.createElement('div');
  toastEl.className = `cyber-toast toast-${tipo}`;
  toastEl.innerHTML = `
    <div class="toast-icon">${iconoHtml}</div>
    <div class="toast-content flex-grow-1">
      <div class="fw-bold text-white mb-1" style="font-size: 0.92rem;">${titulo}</div>
      <div class="text-secondary" style="font-size: 0.84rem; line-height: 1.4;">${mensaje}</div>
    </div>
    <button type="button" class="btn-close btn-close-white ms-2" style="font-size: 0.68rem;" aria-label="Cerrar"></button>
    <div class="toast-progress-bar"></div>
  `;

  contenedor.appendChild(toastEl);

  requestAnimationFrame(() => {
    toastEl.classList.add('show');
  });

  const cerrarToast = () => {
    toastEl.classList.remove('show');
    setTimeout(() => {
      if (toastEl.parentElement) toastEl.remove();
    }, 350);
  };

  const closeBtn = toastEl.querySelector('.btn-close');
  if (closeBtn) closeBtn.addEventListener('click', cerrarToast);

  setTimeout(cerrarToast, duracion);
}

/* ==========================================================================
   3. BARRA DE NAVEGACIÓN REACTIVA (SCROLL EFFECT)
   ========================================================================== */
function inicializarNavbar() {
  const navbar = document.querySelector('.navbar-custom');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 35) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Cierre automático del menú colapsable en móviles al pulsar enlace
  const navLinks = document.querySelectorAll('.nav-link-custom');
  const navbarCollapse = document.getElementById('navbarContenido');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });
}

/* ==========================================================================
   4. FILTRADO DE PROYECTOS SIN SALTOS DE LAYOUT (CORRECCIÓN PUNTO 5)
   ========================================================================== */
function inicializarFiltrosProyectos() {
  const botonesFiltro = document.querySelectorAll('.filter-btn');
  const tarjetasProyectos = document.querySelectorAll('.project-card-col');

  botonesFiltro.forEach(boton => {
    boton.addEventListener('click', () => {
      botonesFiltro.forEach(b => b.classList.remove('active'));
      boton.classList.add('active');

      const categoriaSeleccionada = boton.getAttribute('data-filter');

      // Ejecución síncrona inmediata: se ocultan los no coincidentes de inmediato
      // para evitar que ocupen espacio en el DOM durante el redibujado de la grilla.
      tarjetasProyectos.forEach(col => {
        const catProyecto = col.getAttribute('data-category');
        const coincide = (categoriaSeleccionada === 'all' || catProyecto === categoriaSeleccionada);

        if (coincide) {
          col.style.display = ''; // Restaura el display natural de Bootstrap (col)
          col.classList.remove('animate-in');
          // Forzar reflujo rápido para reiniciar la animación CSS
          void col.offsetWidth;
          col.classList.add('animate-in');
        } else {
          col.style.display = 'none'; // Ocultación inmediata: cero saltos o desfases
          col.classList.remove('animate-in');
        }
      });
    });
  });
}

/* ==========================================================================
   5. CONTROLADOR DE VENTANAS MODALES (PROYECTOS & LEGALES)
   ========================================================================== */
function inicializarModales() {
  const projectModalBackdrop = document.getElementById('modal-proyecto-backdrop');
  const btnsDetalles = document.querySelectorAll('.btn-project-details');
  const btnCerrarModal = document.getElementById('modal-proyecto-cerrar');

  btnsDetalles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const idProyecto = btn.getAttribute('data-project');
      const data = PROYECTOS_DATA[idProyecto];

      if (!data) return;

      document.getElementById('modal-proj-title').textContent = data.titulo;
      document.getElementById('modal-proj-desc').textContent = data.descripcionLarga;
      document.getElementById('modal-proj-img').src = data.imagen;
      document.getElementById('modal-proj-img').alt = data.titulo;

      const toolsContainer = document.getElementById('modal-proj-tools');
      toolsContainer.innerHTML = '';
      data.herramientas.forEach(h => {
        const span = document.createElement('span');
        span.className = 'tech-badge me-1 mb-1';
        span.textContent = h;
        toolsContainer.appendChild(span);
      });

      const metricsContainer = document.getElementById('modal-proj-metrics');
      metricsContainer.innerHTML = '';
      data.metricas.forEach(m => {
        const li = document.createElement('li');
        li.className = 'mb-1 text-secondary';
        li.innerHTML = `<i class="bi bi-shield-check text-cyan me-2"></i> ${m}`;
        metricsContainer.appendChild(li);
      });

      const repoBtn = document.getElementById('modal-proj-github');
      if (repoBtn) repoBtn.href = data.enlaceGithub;

      abrirModalPersonalizado(projectModalBackdrop);
    });
  });

  if (btnCerrarModal) {
    btnCerrarModal.addEventListener('click', () => cerrarModalPersonalizado(projectModalBackdrop));
  }

  // Modales Legales
  const legalModalBackdrop = document.getElementById('modal-legal-backdrop');
  const btnTerms = document.getElementById('btn-terminos-servicio');
  const btnPrivacy = document.getElementById('btn-politica-privacidad');
  const btnCerrarLegal = document.getElementById('modal-legal-cerrar');

  if (btnTerms) {
    btnTerms.addEventListener('click', (e) => {
      e.preventDefault();
      configurarModalLegal(
        'Términos de Servicio | J&R Solution',
        `
        <p><strong>1. Servicios Profesionales:</strong> J&R Solution ofrece servicios de desarrollo de software empresarial, integración de inteligencia artificial y consultoría en ciberseguridad e infraestructura de redes.</p>
        <p><strong>2. Auditorías de Seguridad:</strong> Todas las pruebas de penetración y metodologías de Hacking Ético se ejecutan estrictamente bajo autorización contractual y acuerdos de confidencialidad (NDA).</p>
        <p><strong>3. Marcas Registradas:</strong> Cisco, CCNA, AWS y demás denominaciones comerciales mencionadas pertenecen a sus respectivos propietarios.</p>
        `
      );
      abrirModalPersonalizado(legalModalBackdrop);
    });
  }

  if (btnPrivacy) {
    btnPrivacy.addEventListener('click', (e) => {
      e.preventDefault();
      configurarModalLegal(
        'Política de Privacidad | J&R Solution',
        `
        <p><strong>1. Tratamiento de Datos:</strong> La información remitida mediante el formulario de contacto se utiliza con el único propósito de responder a solicitudes comerciales y técnicas.</p>
        <p><strong>2. Privacidad Garantizada:</strong> En J&R Solution no compartimos, vendemos ni cedemos datos a terceros.</p>
        <p><strong>3. Canales de Contacto:</strong> Para cualquier requerimiento de privacidad puede escribir a <code>jcardenaspanduro44@gmail.com</code>.</p>
        `
      );
      abrirModalPersonalizado(legalModalBackdrop);
    });
  }

  if (btnCerrarLegal) {
    btnCerrarLegal.addEventListener('click', () => cerrarModalPersonalizado(legalModalBackdrop));
  }

  // Cierre al hacer clic en el backdrop exterior
  [projectModalBackdrop, legalModalBackdrop].forEach(backdrop => {
    if (!backdrop) return;
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        cerrarModalPersonalizado(backdrop);
      }
    });
  });

  // Cierre mediante tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (projectModalBackdrop && projectModalBackdrop.classList.contains('active')) {
        cerrarModalPersonalizado(projectModalBackdrop);
      }
      if (legalModalBackdrop && legalModalBackdrop.classList.contains('active')) {
        cerrarModalPersonalizado(legalModalBackdrop);
      }
    }
  });
}

function abrirModalPersonalizado(modalBackdrop) {
  if (!modalBackdrop) return;
  modalBackdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function cerrarModalPersonalizado(modalBackdrop) {
  if (!modalBackdrop) return;
  modalBackdrop.classList.remove('active');
  document.body.style.overflow = '';
}

function configurarModalLegal(titulo, contenidoHtml) {
  const modalTitulo = document.getElementById('modal-legal-titulo');
  const modalCuerpo = document.getElementById('modal-legal-cuerpo');
  if (modalTitulo) modalTitulo.textContent = titulo;
  if (modalCuerpo) modalCuerpo.innerHTML = contenidoHtml;
}

/* ==========================================================================
   6. COPIADO AL PORTAPAPELES CON FEEDBACK VISUAL EN EL DOM
   ========================================================================== */
function inicializarCopiadoPortapapeles() {
  const botonesCopia = document.querySelectorAll('.contact-copy-btn');

  botonesCopia.forEach(boton => {
    boton.addEventListener('click', () => {
      const valorACopiar = boton.getAttribute('data-copy');
      if (!valorACopiar) return;

      navigator.clipboard.writeText(valorACopiar)
        .then(() => {
          const textoOriginal = boton.innerHTML;
          boton.innerHTML = '<i class="bi bi-check2"></i> ¡Copiado!';
          boton.style.background = 'var(--accent-emerald)';
          boton.style.color = '#ffffff';

          mostrarCyberToast(
            `"${valorACopiar}" copiado correctamente al portapapeles.`,
            'success',
            'Dato Copiado'
          );

          setTimeout(() => {
            boton.innerHTML = textoOriginal;
            boton.style.background = '';
            boton.style.color = '';
          }, 2200);
        })
        .catch(() => {
          mostrarCyberToast(
            'Por favor, selecciona y copia el dato manualmente.',
            'warning',
            'Copiado manual'
          );
        });
    });
  });
}

/* ==========================================================================
   7. VALIDACIÓN DEL FORMULARIO DE CONTACTO
   ========================================================================== */
function inicializarFormularioContacto() {
  const form = document.getElementById('contact-form');
  const alertContainer = document.getElementById('form-feedback-msg');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('form-name')?.value.trim();
    const email = document.getElementById('form-email')?.value.trim();
    const asunto = document.getElementById('form-subject')?.value.trim();
    const mensaje = document.getElementById('form-message')?.value.trim();

    if (alertContainer) {
      alertContainer.innerHTML = '';
      alertContainer.style.display = 'none';
    }

    if (!nombre || !email || !mensaje) {
      mostrarFeedbackEnDOM('Por favor completa todos los campos obligatorios (*).', 'danger');
      mostrarCyberToast('Completa los campos obligatorios del formulario.', 'warning', 'Campos requeridos');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      mostrarFeedbackEnDOM('El correo ingresado no tiene un formato válido.', 'danger');
      mostrarCyberToast('El formato del correo electrónico no es válido.', 'warning', 'Correo inválido');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnContent = submitBtn ? submitBtn.innerHTML : 'Enviar Mensaje';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span> Procesando envío...';
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnContent;
      }

      form.reset();

      mostrarFeedbackEnDOM(
        '¡Gracias por comunicarte con J&R Solution! Tu mensaje ha sido recibido con éxito. Nos pondremos en contacto a la brevedad.',
        'success'
      );

      mostrarCyberToast(
        'Mensaje transmitido correctamente. Gracias por contactar a J&R Solution.',
        'success',
        'Mensaje Enviado'
      );
    }, 1100);
  });
}

function mostrarFeedbackEnDOM(mensaje, tipoAlerta) {
  const alertContainer = document.getElementById('form-feedback-msg');
  if (!alertContainer) return;

  alertContainer.className = `alert alert-${tipoAlerta} mt-3 d-flex align-items-center`;
  alertContainer.style.background = tipoAlerta === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)';
  alertContainer.style.borderColor = tipoAlerta === 'success' ? 'rgba(16, 185, 129, 0.35)' : 'rgba(239, 68, 68, 0.35)';
  alertContainer.style.color = '#ffffff';
  alertContainer.style.borderRadius = '10px';
  alertContainer.style.display = 'flex';
  
  const icon = tipoAlerta === 'success' ? 'bi-check-circle-fill text-emerald' : 'bi-exclamation-octagon-fill text-danger';
  alertContainer.innerHTML = `<i class="bi ${icon} fs-5 me-2"></i> <div>${mensaje}</div>`;
}
