import React, { useEffect, useState, useRef } from "react";
import { ArrowLeft, Share2, Facebook, Twitter, Linkedin, Link, Check, Heart, MessageSquare } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import { Article } from "../types";
import { SecCalculator } from "./InteractiveSimulators";

interface ReadingViewProps {
  article: Article;
  onBack: () => void;
}

export default function ReadingView({ article, onBack }: ReadingViewProps) {
  const [likes, setLikes] = useState(14);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Progress Bar using Framer Motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Ensure scroll resets to top when opening an article
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [article]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    if (liked) {
      setLikes(l => l - 1);
    } else {
      setLikes(l => l + 1);
    }
    setLiked(!liked);
  };

  // Convert markdown-style content to styled HTML elements with beautiful typography
  const renderParagraphs = (content: string) => {
    return content.split("\n\n").map((p, idx) => {
      const trimmed = p.trim();
      if (!trimmed) return null;

      // Render headings
      if (trimmed.startsWith("### ")) {
        return (
          <h3 key={idx} className="font-sans font-bold text-gray-950 text-2xl mt-8 mb-4 tracking-tight leading-tight">
            {trimmed.replace("### ", "")}
          </h3>
        );
      }
      if (trimmed.startsWith("## ")) {
        return (
          <h2 key={idx} className="font-sans font-extrabold text-gray-950 text-3xl mt-12 mb-6 tracking-tight leading-snug pb-2 border-b border-gray-100">
            {trimmed.replace("## ", "")}
          </h2>
        );
      }

      // Render list items
      if (trimmed.startsWith("- ") || trimmed.startsWith("1. ")) {
        const items = trimmed.split("\n");
        const listType = trimmed.startsWith("1. ") ? "ol" : "ul";
        
        const listItems = items.map((item, idy) => {
          const contentText = item.replace(/^(\d+\.\s+|-\s+)/, "");
          
          // Support simple bold ** markdown inside lists
          const parts = contentText.split("**");
          const parsedContent = parts.map((part, partIdx) => 
            partIdx % 2 === 1 ? <strong key={partIdx} className="font-semibold text-gray-950">{part}</strong> : part
          );

          if (listType === "ol") {
            return (
              <li key={idy} className="ml-5 list-decimal text-gray-700 leading-relaxed font-serif font-light text-base sm:text-lg mb-2">
                {parsedContent}
              </li>
            );
          } else {
            return (
              <li key={idy} className="relative pl-6 text-gray-700 leading-relaxed font-serif font-light text-base sm:text-lg mb-2.5 before:content-[''] before:absolute before:left-1 before:top-[12px] before:w-1.5 before:h-1.5 before:bg-electric-gold before:rounded-full">
                {parsedContent}
              </li>
            );
          }
        });

        return listType === "ol" ? (
          <ol key={idx} className="space-y-1 my-5">{listItems}</ol>
        ) : (
          <ul key={idx} className="space-y-1 my-5">{listItems}</ul>
        );
      }

      // Render standard paragraph with support for bold ** emphasis
      const parts = trimmed.split("**");
      const parsedParagraph = parts.map((part, partIdx) => 
        partIdx % 2 === 1 ? <strong key={partIdx} className="font-semibold text-gray-950">{part}</strong> : part
      );

      return (
        <p key={idx} className="font-serif text-gray-700 font-light text-base sm:text-lg leading-relaxed mb-6">
          {parsedParagraph}
        </p>
      );
    });
  };

  const isTe1Article = article.id === "1" || article.id === "5";

  return (
    <div ref={containerRef} className="min-h-screen bg-bg-soft pb-16">
      {/* Scroll progress indicator bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-slate-blue z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Floating Action Header Bar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 h-15 flex items-center justify-between">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-slate-blue transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Volver a Publicaciones</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-gray-400 capitalize hidden sm:inline-block">
              Leyendo: {article.category.toLowerCase()}
            </span>
            <button
              onClick={handleCopyLink}
              className="p-2 border border-gray-100 bg-white rounded-lg hover:border-slate-blue/30 text-gray-400 hover:text-slate-blue transition-all cursor-pointer"
              title="Copiar link"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Link className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Hero Banner Section for the article */}
      <div className="max-w-4xl mx-auto px-4 pt-8 md:pt-12">
        <div className="space-y-6">
          {/* Metadata category */}
          <div>
            <span className="font-sans text-[11px] font-extrabold tracking-widest text-slate-blue-light uppercase bg-slate-blue/10 px-3 py-1.5 rounded-md">
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl text-gray-950 leading-tight tracking-tight">
            {article.title}
          </h1>

          {/* Intro line / description */}
          <p className="font-sans font-light text-base sm:text-lg text-gray-500 leading-relaxed border-l-3 border-electric-gold pl-4 italic">
            {article.description}
          </p>

          {/* Author metadata panel */}
          <div className="flex items-center gap-4 py-4 border-y border-gray-100">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-11 h-11 rounded-full object-cover border border-gray-100"
              referrerPolicy="no-referrer"
            />
            <div>
              <p className="font-sans font-bold text-sm text-gray-900">{article.author.name}</p>
              <p className="font-sans text-xs text-gray-500">{article.author.role} • {article.date}</p>
            </div>
            <div className="ml-auto font-sans text-xs text-gray-400 font-mono">
              {article.readingTime}
            </div>
          </div>
        </div>
      </div>

      {/* Main Body - limited to exactly 720px width for supreme readability as per guidelines */}
      <main className="max-w-4xl mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-[64px_1fr] gap-6">
        {/* Left Side: Floating reaction rail (visible-md) */}
        <aside className="hidden md:flex flex-col items-center gap-4 sticky top-28 h-fit">
          <button
            onClick={handleLike}
            className={`p-2.5 rounded-full border transition-all cursor-pointer ${
              liked 
                ? "bg-red-50 text-red-500 border-red-200 shadow-xs" 
                : "bg-white text-gray-400 border-gray-100 hover:text-red-500 hover:border-red-100"
            }`}
            title="Me gusta"
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
          </button>
          <span className="font-mono text-xs font-bold text-gray-500">{likes}</span>

          <span className="w-px h-6 bg-gray-100 my-1" />

          {/* Low contrast sticky shares */}
          <div className="flex flex-col gap-2.5">
            <button 
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`)}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-slate-blue transition-colors cursor-pointer"
            >
              <Facebook className="w-4 h-4" />
            </button>
            <button 
              onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`)}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-sky-500 transition-colors cursor-pointer"
            >
              <Twitter className="w-4 h-4" />
            </button>
            <button 
              onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`)}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-amber-500 transition-colors cursor-pointer"
            >
              <Linkedin className="w-4 h-4" />
            </button>
          </div>
        </aside>

        {/* Center/Right: Article Text Body */}
        <div className="w-full">
          {/* Post cover photo breaking out to full 1200px equivalent on big screens */}
          <div className="rounded-xl overflow-hidden mb-8 shadow-xs border border-gray-100">
            <img
              src={article.image}
              alt="Ilustración técnica"
              className="w-full h-auto object-cover max-h-[420px]"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Narrative paragraphs */}
          <div className="prose prose-slate max-w-[720px] mx-auto text-justify">
            {renderParagraphs(article.fullContent)}
          </div>

          {/* Embed the interactive SEC TE1 compliance tool if this is the TE1 article! */}
          {isTe1Article && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 bg-gray-50 rounded-2xl p-4 sm:p-8 border border-gray-100"
            >
              <h3 className="font-sans font-extrabold text-slate-blue text-xl mb-2 text-center">
                📊 Herramienta de Cumplimiento Técnico
              </h3>
              <p className="font-sans text-xs text-gray-500 text-center mb-6 max-w-md mx-auto">
                ¿Trabajando en una instalación eléctrica? Audita tu diseño enseguida ingresando tus configuraciones.
              </p>
              
              <SecCalculator />
            </motion.div>
          )}

          {/* Interactive Rating Module for non-TE1 articles */}
          {!isTe1Article && (
            <div className="mt-12 border border-gray-100 bg-white rounded-xl p-6 shadow-xs max-w-xl mx-auto">
              <h4 className="font-sans font-bold text-gray-900 text-sm tracking-wide uppercase mb-2">
                ¿Te pareció útil este artículo técnico?
              </h4>
              <p className="text-xs text-gray-500 mb-4">Tu evaluación anónima nos ayuda a calibrar la calidad técnica editorial.</p>
              <div className="flex gap-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <button
                    key={stars}
                    onClick={() => alert(`¡Gracias por calificar este artículo con ${stars} estrellas!`)}
                    className="flex-1 cursor-pointer py-1.5 px-3 border border-gray-100 hover:border-slate-blue hover:bg-slate-blue/5 rounded text-xs transition-all font-mono font-bold text-gray-600 hover:text-slate-blue"
                  >
                    ⭐ {stars}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Mobile Reactions rail */}
          <div className="flex items-center justify-between py-6 mt-12 border-t border-gray-100 md:hidden">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 py-2 px-4 rounded-xl border transition-all ${
                liked 
                  ? "bg-red-50 text-red-500 border-red-100" 
                  : "bg-white text-gray-500 border-gray-100"
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
              <span className="font-sans text-xs font-bold">{likes} Me gusta</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-mono uppercase">Compartir:</span>
              <button 
                onClick={handleCopyLink} 
                className="p-2 border border-gray-100 rounded-full hover:bg-gray-50"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Share2 className="w-3.5 h-3.5 text-gray-400" />}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
