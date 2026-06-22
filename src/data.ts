import { Article, Service } from "./types";

export const SERVICES: Service[] = [
  {
    id: "instalaciones",
    name: "Instalaciones Eléctricas",
    iconName: "Zap",
    shortDesc: "Montaje, cableado y diseño de tableros eléctricos bajo normas SEC.",
    longDesc: "Diseñamos y ejecutamos proyectos de ingeniería eléctrica para el sector residencial, comercial e industrial chileno. Cumplimos rigurosamente con el Decreto Supremo 8 de la SEC, asegurando instalaciones duraderas, seguras y eficientes.",
    secStandard: "Pliego Técnico Normativo RIC (Nch Elect. 4/2003)",
    highlights: [
      "Canalizaciones embutidas, sobrepuestas y subterráneas",
      "Cálculo y dimensionamiento de alimentadores y protecciones",
      "Diseño y balanceo de tableros generales y de distribución",
      "Medición de resistencia de puesta a tierra (mallas de tierra)"
    ]
  },
  {
    id: "domotica",
    name: "Domótica y IoT",
    iconName: "Home",
    shortDesc: "Casas inteligentes con sistemas KNX, Modbus y Home Assistant.",
    longDesc: "Integramos tecnologías de control automático y monitoreo para convertir espacios comunes en entornos inteligentes y eficientes. Monitorea el consumo de energía en tiempo real, controla iluminación de forma adaptativa y gestiona accesos remotamente con máxima ciberseguridad.",
    secStandard: "Estándar KNX e IoT seguro (Ciberseguridad OWASP)",
    highlights: [
      "Integración de protocolos de automatización residencial y de edificios (KNX, Zigbee, Z-Wave)",
      "Creación de servidores locales dedicados mediante Home Assistant",
      "Programación de escenarios automatizados de iluminación y climatización",
      "Sensores de presencia y calidad de aire con alertas móviles instantáneas"
    ]
  },
  {
    id: "certificaciones",
    name: "Certificaciones SEC (TE1 y TE6)",
    iconName: "FileCheck",
    shortDesc: "Tramitación de declaraciones SEC TE1 y TE6 para conexión formal.",
    longDesc: "Declaramos instalaciones eléctricas residenciales e industriales (TE1) y cargadores de vehículos eléctricos (TE6) ante la Superintendencia de Electricidad y Combustibles (SEC). Habilitamos de forma 100% formal la recepción de obras y contratos con distribuidoras como Enel o CGE.",
    secStandard: "Leyes SEC 18.410, Trámites TE1 y TE6 en línea",
    highlights: [
      "Visitas técnicas e informes de diagnóstico pre-certificación",
      "Levantamiento de planos eléctricos digitales firmados por instalador SEC autorizado",
      "Tramitación y seguimiento en la plataforma e-Declaraciones de la SEC",
      "Habilitación formal para empalmes definitivos y aumento de capacidad"
    ]
  },
  {
    id: "mantenimiento",
    name: "Mantenimiento Industrial",
    iconName: "Cpu",
    shortDesc: "Termografía, corrección de factor de potencia y mallas a tierra.",
    longDesc: "Mantenimiento preventivo, predictivo y correctivo para instalaciones industriales y comerciales de mediana/alta complejidad. Evitamos paradas críticas mediante análisis avanzados y corrigiendo ineficiencias como el bajo factor de potencia.",
    secStandard: "RIC N° 10 (Puesta a Tierra y Enlace Equipotencial)",
    highlights: [
      "Análisis termográfico infrarrojo de tableros eléctricos en carga",
      "Diseño e instalación de bancos de condensadores para corregir factor de potencia (cosfí)",
      "Remodelación y mantención de mallas de puesta a tierra",
      "Análisis de calidad de energía (armónicos, peaks de corriente y caídas de tensión)"
    ]
  }
];

export const ARTICLES: Article[] = [
  {
    id: "1",
    slug: "revolucion-certificado-te1",
    title: "Certificado TE1: Garantizando la Seguridad Eléctrica en Chile",
    category: "Featured Insight",
    description: "Descubre por qué la certificación SEC es el pilar fundamental de cualquier proyecto eléctrico moderno y cómo Electricidad Paine facilita este proceso crítico.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1200",
    date: "Jun 22, 2026",
    readingTime: "5 MIN READ",
    featured: true,
    author: {
      name: "Juan Pablo Silva",
      role: "Ingeniero Eléctrico SEC Clase A",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
    },
    fullContent: `
El **Certificado TE1**, emitido por la Superintendencia de Electricidad y Combustibles (SEC), es el documento oficial definitivo de declaración de una instalación eléctrica interior en Chile. Más que un mero trámite administrativo, este documento representa la garantía máxima de que el diseño y la ejecución de la instalación cumplen fehacientemente con las normativas chilenas vigentes, protegiendo tanto vidas como activos de eventos críticos como cortocircuitos o incendios provocados por fallas eléctricas.

Tras implementar el nuevo Reglamento de Seguridad de Instalaciones de Consumo de Energía Eléctrica (Decreto Supremo Nº 8), la obtención de este certificado exige una rigidez técnica superior, donde los pliegos técnicos RIC han transformado completamente los estándares de cálculo.

### ¿Por qué es vital tener el Certificado TE1?

1. **Conexión Formal de Energía:** Las empresas distribuidoras (Enel, CGE, Chilquinta, etc.) exigen obligatoriamente la presentación de un TE1 debidamente tramitado para otorgar empalmes nuevos o aumentos de capacidad.
2. **Recepción Municipal:** Las Direcciones de Obras Municipales (DOM) de todo el país condicionan de manera perentoria la recepción definitiva de una edificación a la entrega del comprobante del TE1.
3. **Seguridad y Seguros:** En caso de siniestro, contar con la inscripción SEC vigente libera de responsabilidades directas al propietario por negligencia técnica, y las aseguradoras suelen exigir este documento para indemnizar daños.

### Lo que exige Electricidad Paine en cada evaluación

Para que Electricidad Paine garantice el paso perfecto por la inspección obligatoria de la SEC, auditamos exhaustivamente:
- **Resistencia de puesta a tierra:** Que bajo ninguna circunstancia debe sobrepasar el valor establecido por el pliego normativo RIC o el estándar del diseño original, utilizando telurómetros certificados de calibración vigente.
- **Seccionamiento de Protecciones:** El uso estricto de interruptores termomagnéticos e interruptores diferenciales con su sensibilidad adecuada (usualmente ≤ 30mA para circuitos húmedos y de enchufes de uso general).
- **Esquema de Conductores:** Cumplimiento tajante del código de colores (Fase: Azul, Negro o Rojo; Neutro: Blanco; Tierra: Verde/Amarillo) y uso estricto de materiales libres de halógenos en recintos con alta concentración académica o de público (RIC N° 4).

### Etapas de Tramitación con Electricidad Paine
Con nuestro equipo, el proceso es simple y transparente: realizamos la visita técnica preliminar, desarrollamos los diagramas unilineales bajo estándares CAD rigurosos, medimos el terreno con la instrumentación pertinente y tramitamos todo vía oficina virtual de la SEC. El resultado es un certificado aprobado sin demoras que le permite operar con total tranquilidad.
    `
  },
  {
    id: "2",
    slug: "seguridad-internet-de-las-cosas-iot",
    title: "Seguridad en el Internet de las Cosas (IoT)",
    category: "SEGURIDAD DIGITAL",
    description: "Los riesgos de seguridad en dispositivos IoT y cómo proteger tu hogar inteligente frente a vulnerabilidades externas.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    date: "May 15, 2024",
    readingTime: "5 MIN READ",
    author: {
      name: "Andrés Delgado",
      role: "Especialista en Automatización y Cibersguridad",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
    },
    fullContent: `
La llegada masiva de dispositivos inteligentes para el control del hogar, desde termostatos hasta bombillas inteligentes, ha revolucionado nuestra cotidianidad. Sin embargo, su conexión directa a Internet abre vectores de ataque únicos si los aspectos de ciberseguridad se desestiman.

### Vulnerabilidades más recurrentes

- **Credenciales por defecto:** Muchos dispositivos genéricos se venden con usuarios y claves que no obligan a cambiar al encender por primera vez, siendo rastreados fácilmente por atacantes automáticos.
- **Falta de actualizaciones de firmware:** Los fabricantes de bajo presupuesto descontinúan rápidamente el soporte de parches, dejando abiertos exploits conocidos vulnerando las redes locales.
- **Fuga de datos locales:** Cámaras y micrófonos que envían información a la nube mediante canales HTTP no encriptados, permitiendo interceptar el contenido multimedia privado.

### Lista de mejores prácticas para proteger tu hogar inteligente

Para contrarrestar estos riesgos, recomendamos implementar de inmediato un plan de seguridad perimetral doméstico:

1. **Crear una VLAN Separada:** Configura tu enrutador principal para colocar todos los dispositivos inteligentes en una red de invitados con aislamiento habilitado, evitando que un foco comprometido otorgue acceso a tus computadores de trabajo o cuentas bancarias.
2. **Utilizar Home Assistant Local:** Prioriza una plataforma de control local que no dependa obligatoriamente de nubes externas chinas o norteamericanas para procesar comandos.
3. **Establecer Contraseñas Fuertes y WPA3:** Sustituye inmediatamente las configuraciones generales del módem ISP por algoritmos de encriptado modernos.
    `
  },
  {
    id: "3",
    slug: "sensores-en-domotica-moderna",
    title: "Sensores en la Domótica Moderna",
    category: "DOMÓTICA",
    description: "Desde movimiento hasta calidad de aire: la guía definitiva sobre los sensores que hacen tu vida más fácil.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=600",
    date: "May 12, 2024",
    readingTime: "8 MIN READ",
    author: {
      name: "Mariana Rojas",
      role: "Diseñadora de Soluciones Smart Home",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
    },
    fullContent: `
Un sistema domótico carente de sensores está incompleto; se limitaría a ser un control remoto digital muy costoso. Son los sensores los encargados de recolectar la información periférica física del entorno y traducirla en variables ejecutables para nuestro hogar.

### Sensores Clave y Sus Funciones en Chile

El diseño de un departamento o casa automatizada eficiente involucra una planificación meticulosa de diferentes familias de sensores:

- **Sensores de presencia y ocupación:** A diferencia de los sensores de movimiento infrarrojos convencionales, los nuevos sensores basados en microondas de onda milimétrica (mmWave) detectan micromovimientos de respiración, sabiendo si hay alguien sentado leyendo un libro inmóvil, automatizando apagados de luz milimétricos.
- **Sensores de Calidad de Aire (CO2, PM2.5, CO):** Fundamentales para recintos estancos modernos. Al detectar un incremento de CO2, pueden accionar automáticamente extractores de aire forzados o ventiladores inteligentes mejorando el rendimiento cognitivo.
- **Sensores de inundación y fuga de agua:** Sensores pequeños ubicados detrás del refrigerador, lavavajillas o lavadora que impiden desastres al cortar inmediatamente la llave de paso de agua central motorizada si detectan humedad inusual.

### El Reto de la Alimentación

Una gran pregunta técnica con la que lidia todo diseñador es elegir entre sensores cableados (KNX o Modbus) o inalámbricos (Zigbee o Thread). 

En Electricidad Paine recomendamos:
- **Obra Nueva o Remodelaciones mayores:** Instalar redes cableadas KNX, que eliminan permanentemente la necesidad de revisar o reponer baterías y operan con latencias imperceptibles.
- **Propiedades Existentes:** Implementar sensores inalámbricos Zigbee de 3.0, que tienen consumos ultrafinos de energía donde las baterías de botón llegan a durar fácilmente entre 2 y 3 años con un uso diario común.
    `
  },
  {
    id: "4",
    slug: "node-red-programacion-visual-proyectos",
    title: "Node-RED: Programación Visual para Proyectos",
    category: "AUTOMATIZACIÓN",
    description: "Aprende a conectar hardware y servicios online de forma visual y eficiente con la herramienta líder en la industria.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600",
    date: "May 08, 2024",
    readingTime: "12 MIN READ",
    author: {
      name: "Esteban Oyarzún",
      role: "Ingeniero Civil en Control e Instrumentación",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
    },
    fullContent: `
**Node-RED** es una herramienta de programación visual de código abierto que facilita enormemente la conexión de dispositivos de hardware, interfaces de programación de aplicaciones (APIs) y servicios en línea. Creado originalmente por IBM, hoy en día es el motor esencial de integración utilizado tanto por aficionados avanzados como por ingenieros industriales para sistemas SCADA simplificados.

### ¿Cómo Funciona la Programación de Flujos?

A diferencia de escribir líneas interminables de código en Python o JavaScript, en Node-RED arrastras bloques de funciones predefinidos llamados "Nodos" hacia un lienzo digital interactivo, interconectándolos para trazar el flujo de datos.

- **Nodos de Entrada (Input Nodes):** Reciben peticiones HTTP, escuchan tópicos MQTT o consultan bases de datos recurrentemente.
- **Nodos de Función (Function Nodes):** Permiten intercalar pequeños scripts de JavaScript puro si es necesario alterar o enriquecer las cargas de datos (payloads).
- **Nodos de Salida (Output Nodes):** Encargados de ejecutar comandos, enviar correos, enviar mensajes por Telegram u operar actuadores eléctricos directos.

### Casos de Éxito en Proyectos Locales

En Chile, hemos utilizado Node-RED para soluciones de alta eficiencia energética:
1. **Riego Inteligente con Pronóstico del Tiempo:** Un flujo que consulta una API meteorológica gratis cada mañana; si hay pronóstico de lluvia superior a 2mm en Santiago, detiene la electroválvula de riego evitando el desperdicio del agua.
2. **Controlador Tarifario Horario:** Alertas de consumo de energía eléctrica que apagan máquinas de clima en horas de punta tarifarias (18:00 a 22:00 en invierno) logrando rebajar la facturación industrial hasta en un 35%.
    `
  },
  {
    id: "5",
    slug: "todo-sobre-el-certificado-te1",
    title: "Todo sobre el Certificado TE1",
    category: "CERTIFICACIONES",
    description: "Guía completa para la obtención del Certificado de Instalación Eléctrica Interior exigido por la SEC.",
    image: "https://images.unsplash.com/photo-1581092334651-dd3c654acf52?auto=format&fit=crop&q=80&w=600",
    date: "May 03, 2024",
    readingTime: "10 MIN READ",
    author: {
      name: "Juan Pablo Silva",
      role: "Ingeniero Eléctrico SEC Clase A",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
    },
    fullContent: `
El proceso de obtención del Certificado TE1 es meticuloso y requiere de un profesional calificado con licencia SEC. A continuación, desglosamos cada uno de los aspectos claves normativos recopilados en nuestra experiencia empírica.

### La Clasificación de Licencias SEC

No cualquier persona está calificado para declarar cualquier tipo de instalación. La SEC establece un escalafón estricto de licencias habilitantes:
- **Clase A:** Sin límite de potencia instalada. Permite proyectar, ejecutar y declarar instalaciones de alta y baja tensión, incluyendo plantas industriales complejas.
- **Clase B:** Potencia máxima de 500 kW de consumo y subestaciones hasta 150 kVA. Apto para el 95% de los locales comerciales e industrias medianas.
- **Clase C:** Límite hasta 100 kW. Es el estándar para viviendas unifamiliares medianas o conjuntos habitacionales básicos.
- **Clase D:** Límite hasta 10 kW. Limitado exclusivamente a instalaciones domiciliarias básicas de alumbrado y calefacción simple.

### Errores fatales comunes que congelan tu TE1 ante el revisor SEC

Muchos instaladores independientes cometen fallos básicos que terminan ralentizando o rechazando la postulación en la oficina virtual:
1. **Falta de concordancia entre plano y terreno:** Si el revisor descubre contradicciones notorias en los croquis o diagramas de ubicación respecto al tablero de comando, rechazará de inmediato el expediente.
2. **Dimensionamiento erróneo del diferencial:** Cargar circuitos de fuerza con diferenciales domésticos genéricos de mala calidad que gatillan disparos erróneos recurrentes.
3. **Malla de tierra sub-dimensionada:** Presentar mediciones de tierra con instrumental descalibrado, resultando valores falsos en el software de la SEC.

### El Test Técnico Interactivo
Para ayudar a electricistas independientes y dueños de obra, hemos diseñado un simulador básico interactivo que mide rápidamente si tus parámetros mínimos de instalación son admisibles o no bajo los pliegos técnicos chilenos. ¡Pruébalo al final de este artículo!
    `
  }
];

export const EXTRA_ARTICLES: Article[] = [
  {
    id: "6",
    slug: "proteccion-sobretensiones-hogar",
    title: "Protección Contra Sobretensiones en Redes Domésticas",
    category: "SEGURIDAD ELÉCTRICA",
    description: "Aprende a proteger tus electrodomésticos y equipos sensibles de las perturbaciones eléctricas de la red externa.",
    image: "https://images.unsplash.com/photo-1517055729445-2b1a80cf7bc6?auto=format&fit=crop&q=80&w=600",
    date: "Jun 10, 2026",
    readingTime: "6 MIN READ",
    author: {
      name: "Juan Pablo Silva",
      role: "Ingeniero Eléctrico SEC Clase A",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
    },
    fullContent: `
Las sobretensiones y transientes de voltaje son fluctuaciones abruptas de tensión que pueden deteriorar silenciosamente o freír instantáneamente microprocesadores y cargadores de dispositivos de alto valor comercial.

### Origen de las Sobretensiones

Existen dos tipos primordiales que afectan a cualquier instalación conectada en Chile:

1. **Atmosféricas:** Provocadas por caída de rayos directos o indirectos en las líneas aéreas de distribución. Generan peak de alto kilovoltaje en microsegundos.
2. **De Maniobra:** Originadas por la propia distribuidora eléctrica al reubicar cargas, o localmente en el hogar por el arranque súbito de motores de alto consumo de corriente (refrigerador antiguo, bomba de agua, aires acondicionados).

### Supresores de Transientes (DPS)
La nueva norma RIC N° 3 introduce la recomendación de usar protectores de sobretensiones transitorias (DPS o SPD) integrados directamente en el carril DIN de los tableros de distribución:

- **Tipo 1:** Instalado en el medidor principal (para resguardar del impacto atmosférico severo).
- **Tipo 2:** Ubicado en el interior del tablero secundario de la vivienda para amortiguar voltajes residuales que saltaron el primer filtro.
- **Tipo 3:** Supresores en formato enchufe múltiple zapatilla directo para televisores o laptops de trabajo.
    `
  },
  {
    id: "7",
    slug: "normativa-sec-te6-electromovilidad",
    title: "Normativa SEC TE6: Cargadores de Vehículos Eléctricos",
    category: "MOVILIDAD ELÉCTRICA",
    description: "Requisitos técnicos críticos para instalar de manera segura y regulada puntos de carga (EVSE) en tu hogar u oficina.",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=600",
    date: "Jun 02, 2026",
    readingTime: "9 MIN READ",
    author: {
      name: "Andrés Delgado",
      role: "Ingeniero en Electromovilidad",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
    },
    fullContent: `
La electromovilidad avanza de manera incontenible en Chile. Para salvaguardar la integridad de las viviendas ante consumos sostenidos de alta corriente (corrientes nominales superiores a 16A o 32A consecutivas durante varias horas), la SEC reguló estrictamente este ámbito mediante el **Trámite TE6**.

### Requisitos Esenciales bajo la nueva norma

1. **Foco en el Conductor:** El cableado de un cargador inteligente debe dimensionarse calculando una caída de tensión estricta menor a 3% bajo carga plena consecutiva, recomendando además el uso de cables protegidos contra la propagación de flamas.
2. **Diferencial Especial Tipo EV o Tipo B:** El cargador exige un sensor de fuga a tierra de corriente continua (IDD RDC-DD > 6mA) para precaver electrización accidental si el interior del automóvil tiene fugas DC críticas. Un disyuntor AC común de tipo AC no detecta estos incidentes magnéticos y se congela sin lograr activarse ante la emergencia.
3. **Malla de Tierra Única o Interconectada:** Asegurar equipotencialidad para anular arcos o tensiones flotantes peligrosas de contacto de chasis.
    `
  },
  {
    id: "8",
    slug: "sistemas-fotovoltaicos-net-billing",
    title: "Sistemas Fotovoltaicos: Trámites SEC para Net Billing",
    category: "ENERGÍA RENOVABLE",
    description: "Cómo autogenerar tu energía solar e inyectar excedentes a la red pública formalmente amparado por Ley 21.118.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=600",
    date: "May 25, 2026",
    readingTime: "7 MIN READ",
    author: {
      name: "Mariana Rojas",
      role: "Diseñadora de Soluciones Sustentables",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
    },
    fullContent: `
La ley de **Generación Ciudadana (Net Billing o Tarifa 21.118)** faculta legalmente a usuarios chilenos particulares a instalar paneles fotovoltaicos e inyectar directamente la energía excedente autogenerada a la red común de distribución de la empresa de electricidad zonal.

### El Proceso SEC TE4 de Declaración Soler

Declarar el sistema solar es imperativo bajo el trámite formal TE4:

- **Inversores Homologados:** Toda unidad inversor solar interconectado debe figurar expresamente en el inventario de equipos homologados y autorizados de la SEC.
- **Interruptor de Desconexión BIDIRECCIONAL:** Sistemas automáticos de seguridad anti-isla; si se suspende el suministro externo por un choque de poste, el inversor local se desliga inmediatamente en milisegundos cuidando que la cuadrilla de técnicos externos no sea electrocutado operando en mantención.
- **Medidor Inteligente Bidireccional:** El antiguo medidor mecánico debe ser reemplazado por un medidor electrónico capaz de registrar de forma separada los consumos de energía activa de red y los kw inyectados por energía excedente, valorizándose mensualmente en la boleta de servicio.
    `
  }
];
