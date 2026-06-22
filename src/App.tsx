import React, { useState, useEffect } from "react";
import { Zap, HelpCircle, Mail, Phone, Globe, Check, AlertCircle, ArrowRight, ArrowRightCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { Article, Service } from "./types";
import { ARTICLES, EXTRA_ARTICLES, SERVICES } from "./data";

import Header from "./components/Header";
import Hero from "./components/Hero";
import ArticleCard from "./components/ArticleCard";
import Sidebar from "./components/Sidebar";
import ReadingView from "./components/ReadingView";
import { ConsultationModal } from "./components/InteractiveSimulators";

export default function App() {
  const [currentCategory, setCurrentCategory] = useState<string>("all");
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>(ARTICLES);
  const [hasLoadedExtra, setHasLoadedExtra] = useState<boolean>(false);
  const [showInquiryModal, setShowInquiryModal] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Bottom newsletter form states
  const [communityEmail, setCommunityEmail] = useState("");
  const [communitySuccess, setCommunitySuccess] = useState(false);
  const [communityLoading, setCommunityLoading] = useState(false);
  const [communityError, setCommunityError] = useState("");

  // Toast / general notifications
  const [notification, setNotification] = useState<string | null>(null);

  // Synchronize category or direct back triggers
  const handleSelectCategory = (category: string) => {
    setActiveArticle(null);
    setSelectedService(null);
    setCurrentCategory(category);
    
    // Smooth scroll to main publications section if they click a filter
    const targetElement = document.getElementById("nuestras-publicaciones");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleReadArticle = (article: Article) => {
    setActiveArticle(article);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLoadMore = () => {
    if (!hasLoadedExtra) {
      setDisplayedArticles([...ARTICLES, ...EXTRA_ARTICLES]);
      setHasLoadedExtra(true);
      showNotification("¡Se cargaron 3 nuevos artículos técnicos!");
    } else {
      showNotification("Ya se encuentran cargados todos los artículos disponibles.");
    }
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleCommunitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCommunityError("");
    setCommunityLoading(true);

    if (!communityEmail || !communityEmail.includes("@")) {
      setCommunityError("Ingrese un correo profesional válido.");
      setCommunityLoading(false);
      return;
    }

    setTimeout(() => {
      setCommunitySuccess(true);
      setCommunityEmail("");
      setCommunityLoading(false);
      showNotification("¡Bienvenido a la comunidad de Electricidad Paine!");
      setTimeout(() => setCommunitySuccess(false), 5000);
    }, 1200);
  };

  // Filter articles based on active category tabs
  const filteredArticles = displayedArticles.filter((art) => {
    // Exclude the featured article from the main publications search to prevent duplicate
    const isFeatured = art.featured === true;
    if (isFeatured && currentCategory === "all") return false;

    if (currentCategory === "all") return true;
    return art.category === currentCategory;
  });

  const featuredArticle = ARTICLES.find((art) => art.featured) || ARTICLES[0];

  return (
    <div className="min-h-screen bg-bg-soft text-gray-900 selection:bg-electric-gold selection:text-deep-charcoal flex flex-col justify-between">
      {/* Dynamic Toast Alerts */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-22 inset-x-0 mx-auto w-fit z-50 bg-slate-blue text-white py-3 px-6 rounded-xl shadow-xl flex items-center gap-2 border border-white/10"
          >
            <span className="w-2 h-2 rounded-full bg-electric-gold animate-ping" />
            <p className="font-sans text-xs font-bold tracking-wide uppercase">{notification}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        {/* Navigation bar */}
        <Header
          currentCategory={currentCategory}
          onSelectCategory={handleSelectCategory}
          onOpenSubscribe={() => {
            const targetElement = document.getElementById("newsletter-section");
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: "smooth" });
            } else {
              showNotification("Suscríbete en el banner inferior.");
            }
          }}
        />

        {/* Primary Screen Layout Router */}
        <AnimatePresence mode="wait">
          {activeArticle ? (
            <motion.div
              key="reading-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <ReadingView 
                article={activeArticle} 
                onBack={() => setActiveArticle(null)} 
              />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Featured Hero: mirrors top image banner precisely */}
              <Hero article={featuredArticle} onReadArticle={handleReadArticle} />

              {/* Main Content Area */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Publications feed */}
                  <main className="lg:col-span-8 space-y-12">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-4 gap-4" id="nuestras-publicaciones">
                      <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-gray-950 tracking-tight flex items-center gap-2">
                        Nuestras Publicaciones
                        {currentCategory !== "all" && (
                          <span className="text-xs font-mono font-bold bg-slate-blue text-white px-2.5 py-1 rounded-full uppercase scale-90">
                            {currentCategory}
                          </span>
                        )}
                      </h2>
                      
                      {/* Active count indicator */}
                      <span className="text-xs font-mono text-gray-400 font-semibold uppercase">
                        Mostrando {filteredArticles.length} artículos
                      </span>
                    </div>

                    {/* Publications Grid */}
                    {filteredArticles.length === 0 ? (
                      <div className="text-center py-20 bg-white border border-dashed border-gray-200 rounded-2xl p-6">
                        <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="font-sans font-bold text-gray-800 text-base">No se encontraron artículos</h3>
                        <p className="text-xs text-gray-500 mt-1">Intenta seleccionando otra categoría o limpiando los filtros.</p>
                        <button
                          onClick={() => setCurrentCategory("all")}
                          className="mt-4 text-xs font-bold text-slate-blue hover:underline cursor-pointer"
                        >
                          Mostrar todo
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {filteredArticles.map((art) => (
                          <motion.div
                            key={art.id}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                          >
                            <ArticleCard article={art} onReadArticle={handleReadArticle} />
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {/* Ver Más Artículos Button */}
                    <div className="flex justify-center pt-4">
                      <button
                        onClick={handleLoadMore}
                        className={`font-sans text-[13px] font-extrabold tracking-wider uppercase py-3.5 px-10 border-2 rounded-lg transition-all active:scale-97 cursor-pointer ${
                          hasLoadedExtra 
                            ? "border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50/50" 
                            : "border-slate-blue text-slate-blue hover:bg-slate-blue hover:text-white"
                        }`}
                        disabled={hasLoadedExtra}
                      >
                        {hasLoadedExtra ? "No hay más publicaciones" : "Ver Más Artículos"}
                      </button>
                    </div>
                  </main>

                  {/* Right Column: Interaction Sidebar Widget rail */}
                  <div className="lg:col-span-4">
                    <Sidebar
                      services={SERVICES}
                      onSelectService={(service) => {
                        setSelectedService(service);
                        showNotification(`Abriendo detalles: ${service.name}`);
                      }}
                      onOpenConsultation={() => setShowInquiryModal(true)}
                      onSuccessSubscribe={(email) => {
                        showNotification(`¡Suscrito con éxito!: ${email}`);
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Specialty Bottom Full-Width Newsletter Sign-up Block */}
      <section 
        id="newsletter-section" 
        className="w-full bg-[#1e2530] text-white py-16 px-4 md:py-20 relative overflow-hidden"
      >
        {/* Subtle grid backing decoration simulating Chilean safety maps */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <p className="font-sans font-extrabold text-xs text-electric-gold tracking-widest uppercase">
            NEWSLETTER ESPECIALIZADA
          </p>

          <h2 className="font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-tight">
            Sé el primero en saber hacia dónde va la energía
          </h2>

          <p className="font-serif font-light text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Recibe una curaduría de noticias, cambios normativos de la SEC y tutoriales avanzados de automatización.
          </p>

          {communitySuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-300 text-xs flex gap-3 text-left"
            >
              <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              <p>
                <strong>¡Suscrito correctamente!</strong> Te enviaremos el reporte normativo del mes entrante de inmediato. Bienvenido a la comunidad técnica líder de Chile.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleCommunitySubmit} className="max-w-lg mx-auto flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Ingresa tu correo profesional"
                  value={communityEmail}
                  onChange={(e) => {
                    setCommunityEmail(e.target.value);
                    setCommunityError("");
                  }}
                  className="w-full bg-white/10 hover:bg-white/12 border border-white/20 hover:border-white/30 rounded-lg py-3 px-4 text-xs font-sans text-white placeholder-gray-400 focus:outline-none focus:border-electric-gold focus:bg-white/15 transition-all outline-hidden"
                />
                {communityError && (
                  <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1 font-sans text-left">
                    <AlertCircle className="w-3.5 h-3.5" /> {communityError}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={communityLoading}
                className="bg-electric-gold hover:bg-electric-gold-hover text-gray-900 font-sans text-xs font-bold py-3 px-6 rounded-lg uppercase tracking-wider transition-colors active:scale-97 cursor-pointer block text-center"
              >
                {communityLoading ? "Uniendo..." : "Unirse a la Comunidad"}
              </button>
            </form>
          )}

          <p className="font-sans text-[11px] text-gray-400">
            Respetamos tu privacidad. Puedes darte de baja en cualquier momento.
          </p>
        </div>
      </section>

      {/* Detailed Service Dialog / Info sheet popped up when they click left services on sidebar */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 bg-deep-charcoal/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden border border-gray-50"
            >
              <div className="bg-slate-blue p-5 text-white flex justify-between items-center">
                <h3 className="font-sans font-extrabold text-base tracking-wide uppercase flex items-center gap-2">
                  <Zap className="text-electric-gold w-5 h-5" id="dialog-zap" />
                  {selectedService.name}
                </h3>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-white hover:text-electric-gold text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-gray-700 text-sm leading-relaxed font-serif">
                  {selectedService.longDesc}
                </p>

                <div className="bg-amber-50 rounded-lg p-3 border border-amber-100 space-y-1">
                  <span className="text-[10px] font-mono tracking-wider text-amber-800 font-extrabold uppercase">Normativa de Referencia SEC:</span>
                  <p className="text-xs text-gray-800 font-bold">{selectedService.secStandard}</p>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-gray-400 font-bold tracking-wider uppercase">Alcance del servicio técnico:</span>
                  <ul className="space-y-1.5">
                    {selectedService.highlights.map((hlt, idx) => (
                      <li key={idx} className="text-xs text-gray-700 flex items-center gap-2 font-sans">
                        <span className="w-1.5 h-1.5 bg-slate-blue rounded-full" />
                        {hlt}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedService(null);
                      setShowInquiryModal(true);
                    }}
                    className="flex-1 bg-slate-blue hover:bg-slate-blue-light text-white text-xs font-bold py-2.5 px-4 rounded-lg uppercase tracking-wider text-center block cursor-pointer"
                  >
                    Cotizar este Servicio
                  </button>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="py-2.5 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold uppercase transition-colors pointer-events-auto cursor-pointer"
                  >
                    Encerrar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Asesor técnico Consultation Modal */}
      <AnimatePresence>
        {showInquiryModal && (
          <ConsultationModal 
            services={SERVICES} 
            onClose={() => setShowInquiryModal(false)} 
          />
        )}
      </AnimatePresence>

      {/* Styled Footer Block: mirrors footer in wireframe exactly */}
      <footer className="bg-deep-charcoal text-gray-400 pt-16 pb-8 border-t border-gray-800 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            
            {/* Column 1: Electricidad Paine Logo & Desc */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-blue flex items-center justify-center">
                  <span className="text-electric-gold font-extrabold text-base">EP</span>
                </div>
                <h4 className="font-extrabold text-white text-lg tracking-tight">Electricidad Paine</h4>
              </div>
              <p className="text-xs leading-relaxed text-gray-400 max-w-sm">
                Inspirando y educando sobre la intersección entre la ingeniería eléctrica tradicional y el futuro digital inteligente.
              </p>
              
              {/* Social icons */}
              <div className="flex items-center gap-4 pt-2">
                <a href="#web" className="text-gray-500 hover:text-white transition-colors" title="Web Oficial">
                  <Globe className="w-4 h-4" />
                </a>
                <a href="mailto:electricidadpaine@gmail.com" className="text-gray-500 hover:text-white transition-colors" title="Email de Contacto">
                  <Mail className="w-4 h-4" />
                </a>
                <a href="tel:+56912345678" className="text-gray-500 hover:text-white transition-colors" title="Llámanos">
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Explorar */}
            <div className="md:col-span-3.5 space-y-3 ms-0 md:ms-8">
              <h5 className="text-[11px] font-bold text-white tracking-widest uppercase">EXPLORAR</h5>
              <ul className="space-y-2 text-xs">
                {SERVICES.map((s) => (
                  <li key={s.id}>
                    <button 
                      onClick={() => handleSelectCategory(s.id === "instalaciones" ? "SEGURIDAD DIGITAL" : s.id === "domotica" ? "DOMÓTICA" : s.id === "certificaciones" ? "CERTIFICACIONES" : "AUTOMATIZACIÓN")}
                      className="hover:text-white transition-colors text-left cursor-pointer"
                    >
                      {s.name}
                    </button>
                  </li>
                ))}
                <li>
                  <button 
                    onClick={() => handleSelectCategory("all")}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Últimas Novedades
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Legales & Contacto */}
            <div className="md:col-span-3.5 space-y-3">
              <h5 className="text-[11px] font-bold text-white tracking-widest uppercase">LEGALES & CONTACTO</h5>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#privacy" className="hover:text-white transition-colors block">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-white transition-colors block">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#sec" onClick={() => setShowInquiryModal(true)} className="hover:text-white transition-colors block">
                    Certificaciones SEC
                  </a>
                </li>
                <li>
                  <a href="#careers" className="hover:text-white transition-colors block">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            
          </div>

          {/* Footer Bottom info panel */}
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-gray-500 tracking-wider">
            <p className="uppercase font-mono">
              © {new Date().getFullYear()} ELECTRICIDAD PAINE. ALL RIGHTS RESERVED.
            </p>
            <p className="uppercase font-mono flex items-center gap-1">
              Disañado para la Excelencia Técnica <span className="w-1.5 h-1.5 bg-electric-gold rounded-full" />
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
