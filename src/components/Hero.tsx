import React from "react";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Article } from "../types";

interface HeroProps {
  article: Article;
  onReadArticle: (article: Article) => void;
}

export default function Hero({ article, onReadArticle }: HeroProps) {
  return (
    <section className="relative w-full min-h-[500px] md:min-h-[560px] bg-slate-blue overflow-hidden flex items-center">
      {/* Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover object-center opacity-45 scale-105 transform hover:scale-100 transition-transform duration-7000"
          referrerPolicy="no-referrer"
        />
        {/* Gradients to match the deep, moody technical look of the original image */}
        <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal via-deep-charcoal/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-charcoal/80 via-transparent to-transparent z-10 hidden md:block" />
      </div>

      {/* Featured Header Contents */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-white">
        <div className="max-w-3xl space-y-6">
          {/* Badge */}
          <div>
            <span className="inline-block bg-electric-gold text-deep-charcoal text-[11px] font-extrabold px-3 py-1.5 rounded uppercase tracking-widest shadow-xs">
              {article.category}
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight text-white drop-shadow-sm">
            {article.title}
          </h2>

          {/* Description */}
          <p className="font-serif text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed font-light drop-shadow-xs max-w-2xl">
            {article.description}
          </p>

          {/* Meta details & Action */}
          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-gray-300 font-mono">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-electric-gold" />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-electric-gold" />
              {article.readingTime}
            </span>
            <span className="hidden sm:inline-block text-gray-400">|</span>
            <span className="text-gray-200">
              Por <strong className="text-white hover:text-electric-gold transition-colors">{article.author.name}</strong>
            </span>
          </div>

          <div className="pt-4">
            <button
              onClick={() => onReadArticle(article)}
              className="inline-flex items-center gap-2 text-electric-gold hover:text-white font-mono text-[13px] font-bold tracking-wider uppercase transition-colors group cursor-pointer"
            >
              Read full article{" "}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
