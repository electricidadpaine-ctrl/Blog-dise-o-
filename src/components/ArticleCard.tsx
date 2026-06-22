import React from "react";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import { Article } from "../types";

interface ArticleCardProps {
  article: Article;
  onReadArticle: (article: Article) => void;
}

export default function ArticleCard({ article, onReadArticle }: ArticleCardProps) {
  return (
    <article 
      onClick={() => onReadArticle(article)}
      className="group bg-white rounded-xl border border-gray-100 overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg cursor-pointer"
    >
      {/* Top Image Cover */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-50">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Hover arrow indicator */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-1.5 rounded-lg text-slate-blue opacity-0 group-hover:opacity-100 translate-y-[-4px] group-hover:translate-y-0 transition-all duration-300">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      {/* Card Content body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Category Badge metadata */}
          <span className="font-sans text-[10px] font-extrabold tracking-widest text-slate-blue-light uppercase bg-slate-blue/5 px-2.5 py-1 rounded">
            {article.category}
          </span>

          {/* Title */}
          <h3 className="font-sans font-bold text-lg sm:text-xl text-gray-950 leading-snug tracking-tight group-hover:text-slate-blue transition-colors line-clamp-2">
            {article.title}
          </h3>

          {/* Brief Excerpt */}
          <p className="font-serif text-sm text-gray-600 leading-relaxed font-light line-clamp-3">
            {article.description}
          </p>
        </div>

        {/* Card Footer Meta info */}
        <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono pt-3 border-t border-gray-50">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-gray-300" id={`cal-icon-${article.id}`} />
            {article.date}
          </span>
          <span className="flex items-center gap-1 uppercase">
            <Clock className="w-3.5 h-3.5 text-gray-300" id={`clk-icon-${article.id}`} />
            {article.readingTime}
          </span>
        </div>
      </div>
    </article>
  );
}
