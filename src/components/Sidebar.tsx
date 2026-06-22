import React, { useState } from "react";
import { Zap, Home, FileCheck, Cpu, ChevronRight, Mail, AlertCircle, CheckCircle } from "lucide-react";
import { Service } from "../types";

interface SidebarProps {
  services: Service[];
  onSelectService: (service: Service) => void;
  onOpenConsultation: () => void;
  onSuccessSubscribe: (email: string) => void;
}

export default function Sidebar({
  services,
  onSelectService,
  onOpenConsultation,
  onSuccessSubscribe
}: SidebarProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Zap": return <Zap className="w-5 h-5 text-slate-blue" />;
      case "Home": return <Home className="w-5 h-5 text-slate-blue" />;
      case "FileCheck": return <FileCheck className="w-5 h-5 text-slate-blue" />;
      case "Cpu": return <Cpu className="w-5 h-5 text-slate-blue" />;
      default: return <Zap className="w-5 h-5 text-slate-blue" />;
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    if (!email || !email.includes("@")) {
      setErrorMsg("Por favor, ingrese un correo válido.");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      onSuccessSubscribe(email);
      setSuccess(true);
      setEmail("");
      setLoading(false);
      // reset success banner after a few seconds
      setTimeout(() => setSuccess(false), 5000);
    }, 1000);
  };

  return (
    <aside className="space-y-8 lg:sticky lg:top-24">
      {/* Box 1: Nuestros Servicios */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-xs relative overflow-hidden">
        <h3 className="font-sans font-bold text-gray-900 text-lg mb-4 pb-2 border-b border-gray-50 flex items-center justify-between">
          <span>Nuestros Servicios</span>
          <span className="w-1.5 h-1.5 bg-electric-gold rounded-full" />
        </h3>
        <ul className="space-y-3.5">
          {services.map((service) => (
            <li key={service.id}>
              <button
                onClick={() => onSelectService(service)}
                className="w-full text-left flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:border-slate-blue/30 hover:bg-slate-blue/5 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-white group-hover:shadow-xs transition-colors">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-gray-950 text-sm">{service.name}</h4>
                    <p className="font-sans text-gray-400 text-[10px] hidden sm:block">Ver normas y alcance</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-slate-blue group-hover:translate-x-0.5 transition-all" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Box 2: ¿Necesitas asesoría técnica? */}
      <div className="bg-slate-blue text-white rounded-xl p-6 shadow-lg relative overflow-hidden group">
        {/* Subtle decorative circuit path lines background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />

        <h3 className="font-sans font-extrabold text-xl mb-3 leading-snug">
          ¿Necesitas asesoría técnica?
        </h3>
        <p className="font-sans text-[13px] text-gray-200 leading-normal mb-5">
          Nuestros ingenieros expertos están listos para ayudarte con tu próximo gran proyecto tecnológico.
        </p>
        <button
          onClick={onOpenConsultation}
          className="w-full bg-electric-gold hover:bg-electric-gold-hover text-gray-900 text-xs font-bold py-3.5 px-4 rounded-lg uppercase tracking-wider transition-all shadow-xs active:scale-97 cursor-pointer text-center block"
        >
          Contactar Ahora
        </button>
      </div>

      {/* Box 3: Tendencias Mensuales */}
      <div className="bg-[#e8eeff] border border-slate-blue/10 rounded-xl p-6 shadow-xs">
        <h3 className="font-sans font-extrabold text-slate-blue text-lg mb-2">
          Tendencias Mensuales
        </h3>
        <p className="font-sans text-xs text-slate-blue/80 leading-normal mb-4">
          Suscríbete para recibir lo último en IoT y normativa eléctrica directamente en tu inbox.
        </p>

        {success ? (
          <div className="bg-green-50 text-green-800 text-xs p-3.5 rounded-lg border border-green-100 flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
            <p>
              <strong>¡Suscrito con éxito!</strong> Revisa tu correo electrónico para confirmar la suscripción al boletín mensual de Electricidad Paine.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-2.5">
            <div>
              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMsg("");
                }}
                className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-xs font-sans text-gray-800 placeholder-gray-400 focus:outline-none focus:border-slate-blue"
              />
              {errorMsg && (
                <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1 font-sans">
                  <AlertCircle className="w-3.5 h-3.5" /> {errorMsg}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-blue hover:bg-slate-blue-light transition-colors text-white text-xs font-bold py-3 px-4 rounded-lg uppercase tracking-wider cursor-pointer"
            >
              {loading ? "Procesando..." : "Suscribirse"}
            </button>
          </form>
        )}
      </div>
    </aside>
  );
}
