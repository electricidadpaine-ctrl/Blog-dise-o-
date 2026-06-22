import React, { useState } from "react";
import { Zap, HelpCircle, Activity, Heart, CheckCircle2, AlertTriangle, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Service } from "../types";

// SEC TE1 Calculator
export function SecCalculator() {
  const [power, setPower] = useState<number>(3.5); // kW
  const [phases, setPhases] = useState<"monofasico" | "trifasico">("monofasico");
  const [conductorSize, setConductorSize] = useState<number>(2.5); // mm²
  const [length, setLength] = useState<number>(20); // meters
  const [calculated, setCalculated] = useState<any>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    // Resistivity of Copper is roughly 0.018 ohm / mm² / m
    const rho = 0.018; 
    let voltage = phases === "monofasico" ? 220 : 380;
    
    // Power (W) = V * I * cos(fi). Under simplified pure active load cos(fi) = 1
    // I = P / (V * sqrt(phases_index))
    const powerW = power * 1000;
    let current = 0;
    if (phases === "monofasico") {
      current = powerW / voltage;
    } else {
      current = powerW / (voltage * Math.sqrt(3));
    }

    // Voltage drop calculation (simplified base formulas for copper lines):
    // dV = 2 * L * I * rho / S (monofasico)
    // dV = sqrt(3) * L * I * rho / S (trifasico)
    let voltageDrop = 0;
    if (phases === "monofasico") {
      voltageDrop = (2 * length * current * rho) / conductorSize;
    } else {
      voltageDrop = (Math.sqrt(3) * length * current * rho) / conductorSize;
    }

    const dropPercentage = (voltageDrop / voltage) * 100;
    
    // SEC limits: max 3% for feeders and max 3% for subfeeders. Let's use 3% limit.
    const isApproved = dropPercentage <= 3.0;
    
    // Recommend size
    let recommendedSize = conductorSize;
    if (!isApproved) {
      const sizes = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50];
      for (let size of sizes) {
        let testDrop = 0;
        if (phases === "monofasico") {
          testDrop = ((2 * length * current * rho) / size) / voltage * 100;
        } else {
          testDrop = ((Math.sqrt(3) * length * current * rho) / size) / voltage * 100;
        }
        if (testDrop <= 3.0) {
          recommendedSize = size;
          break;
        }
      }
    }

    setCalculated({
      current: current.toFixed(2),
      voltageDrop: voltageDrop.toFixed(2),
      dropPercentage: dropPercentage.toFixed(2),
      isApproved,
      recommendedSize,
      minRequiredDiff: current * 1.25 // Standard safety rule 125%
    });
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-xs max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-amber-50 text-amber-500 rounded-lg">
          <Activity className="w-5 h-5" id="act-icon" />
        </div>
        <div>
          <h4 className="font-sans font-semibold text-gray-950 text-lg">Simulador de Caída de Tensión SEC</h4>
          <p className="font-sans text-xs text-gray-500">Verifica si tu diseño eléctrico aprueba los límites de los pliegos RIC chilenos.</p>
        </div>
      </div>

      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Potencia Total (kW)
            </label>
            <input
              type="number"
              step="0.1"
              min="0.5"
              max="150"
              value={power}
              onChange={(e) => setPower(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-slate-blue"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Tipo de Red
            </label>
            <select
              value={phases}
              onChange={(e: any) => setPhases(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-slate-blue"
            >
              <option value="monofasico">Monofásico (220V)</option>
              <option value="trifasico">Trifásico (380V)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Sección Conductor (mm²)
            </label>
            <select
              value={conductorSize}
              onChange={(e) => setConductorSize(parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-slate-blue"
            >
              <option value="1.5">1.5 mm² (Alumbrado)</option>
              <option value="2.5">2.5 mm² (Enchufes domésticos)</option>
              <option value="4.0">4.0 mm² (Fuerza básica)</option>
              <option value="6.0">6.0 mm² (Cocina / Clima)</option>
              <option value="10.0">10 mm² (Alimentador básico)</option>
              <option value="16.0">16 mm² (Alimentador grande)</option>
              <option value="25.0">25 mm² (Industrial)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Largo del Tramo (m)
            </label>
            <input
              type="number"
              min="1"
              max="500"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-slate-blue"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer bg-slate-blue hover:bg-slate-blue-light text-white text-xs font-semibold py-2.5 px-4 rounded-lg tracking-wider uppercase transition-colors"
        >
          Calcular y Auditar
        </button>
      </form>

      <AnimatePresence mode="wait">
        {calculated && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-5 pt-5 border-t border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500 font-medium font-mono">ESTADO DECLARACIÓN:</span>
              {calculated.isApproved ? (
                <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> APROBADO (Pliego RIC)
                </span>
              ) : (
                <span className="px-2.5 py-1 bg-red-50 text-red-700 rounded-full text-xs font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> RECHAZADO SEC
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2 text-center p-3 bg-gray-50 rounded-lg mb-4">
              <div>
                <p className="text-[10px] text-gray-400 font-semibold font-mono uppercase">Amperaje total</p>
                <p className="text-sm font-bold text-gray-800 font-mono">{calculated.current} A</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-semibold font-mono uppercase">V. de Caída</p>
                <p className="text-sm font-bold text-gray-800 font-mono">{calculated.voltageDrop} V</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-semibold font-mono uppercase">Porcentaje</p>
                <p className={`text-sm font-bold font-mono ${calculated.isApproved ? "text-green-600" : "text-red-500"}`}>
                  {calculated.dropPercentage}%
                </p>
              </div>
            </div>

            <div className="text-xs space-y-2 text-gray-600 leading-relaxed">
              {calculated.isApproved ? (
                <p>
                  ✅ La sección del conductor de <strong>{conductorSize} mm²</strong> es adecuada para la carga propuesta. La caída de tensión de {calculated.dropPercentage}% está bajo el límite máximo del 3% establecido en Chile.
                </p>
              ) : (
                <p className="text-red-600">
                  ⚠️ <strong>¡Falla crítica de Caída de Tensión!</strong> El diseño actual causa un pérdida de {calculated.dropPercentage}%, lo que excedería el limite máximo de la SEC. Electricidad Paine recomienda cambiar a un conductor de mínimo <strong>{calculated.recommendedSize} mm²</strong>.
                </p>
              )}
              <p className="text-[11px] text-gray-500 border-t border-dashed border-gray-200 pt-2 font-mono">
                💡 Disyuntor recomendado para cabecera: min {Math.ceil(calculated.minRequiredDiff)}A (Sobrecarga regulada).
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Technical Expert Form / Consultation Simulator (Gemini API server model alternative or advanced rules)
interface ConsultationModalProps {
  services: Service[];
  onClose: () => void;
}

export function ConsultationModal({ services, onClose }: ConsultationModalProps) {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    serviceId: services[0]?.id || "instalaciones",
    urgency: "media",
    details: "",
    powerDemand: "10",
    phaseType: "monofasico"
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [diagnostic, setDiagnostic] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Generate highly specific engineering diagnostic based on input values!
    setTimeout(() => {
      let advice = "";
      let secRequirement = "";
      
      const selService = services.find(s => s.id === formData.serviceId)?.name || "Servicio General";

      if (formData.serviceId === "instalaciones") {
        const kwVal = parseFloat(formData.powerDemand) || 10;
        if (kwVal > 10 || formData.phaseType === "trifasico") {
          advice = `Al superar los 10 kW o poseer red Trifásica, la SEC le exigirá un empalme de gran escala con mallas de tierra robustas certificadas (con resistencia < 5 ohms). Electricidad Paine recomienda agendar un diseño de malla de tierra e instalar un disyuntor omnipolar trifásico de al menos 25A en el gabinete de distribución.`;
          secRequirement = "Pliegos RIC Nº2 y Nº4 - Mallas de tierra e instalaciones críticas residenciales/comerciales.";
        } else {
          advice = `Su potencia de ${kwVal} kW es admisible para un empalme monofásico estándar (tb. llamado A-9 o A-15 doméstico). Sin embargo, bajo la norma RIC actual, es estricto tener diferenciales Clase A y conductores libres de halógenos si tiene alta circulación de personas en el predio.`;
          secRequirement = "Gabinete unilineal regularizado por Instalador Autorizado SEC Clase C, B o A.";
        }
      } else if (formData.serviceId === "domotica") {
        advice = `Para acometer la automatización del proyecto que describes ("${formData.details.slice(0, 40)}..."), sugerimos consolidar un procesador local Home Assistant en un hub estable de carril DIN, sincronizando periféricos mediante repetidores cableados en zonas húmedas y Zigbee en recámaras. Esto garantiza seguridad de datos y una respuesta de latencia millisecond offline.`;
        secRequirement = "Estándares internacionales de control local (KNX) y baja tensión segura (SELV/PELV < 50V AC).";
      } else if (formData.serviceId === "certificaciones") {
        advice = `La regularización de su trámite TE1 para "${selService}" requiere una inspección preventiva obligatoria por parte de nuestro ingeniero SEC. Estaremos auditando rigurosamente que los materiales cuenten con el código QR de certificación chilena y que no haya circuitos mixtos de Alumbrado y Enchufes compartiendo la misma protección diferencial.`;
        secRequirement = "Inscripción en portal e-declaraciones de la SEC. Aprobación oficial en un lapso estimado de 5 a 10 días hábiles en Santiago.";
      } else {
        advice = `Para el mantenimiento industrial preventivo que necesita, el primer paso que daremos será realizar una auditoría termográfica infrarroja bajo carga plena. Esto revelará de inmediato micro-puntos calientes invisibles en bornes de disyuntores mecánicos previniendo costosas detenciones operativas.`;
        secRequirement = "Pliego Técnico RIC N° 10 y normas de seguridad en tableros de potencia industrial.";
      }

      setDiagnostic({
        secRequirement,
        advice,
        technician: "Juan Pablo Silva",
        technicianRole: "Director Eléctrico Principal (SEC Clase A)",
        estimatedTimeline: formData.urgency === "alta" ? "Contacto inmediato (menos de 2 horas)" : "Contacto en un máximo de 24 horas hábiles",
        ticketNumber: `EP-${Math.floor(100000 + Math.random() * 900000)}`
      });

      // Save inquiries locally
      const existingInquiries = JSON.parse(localStorage.getItem("paine_inquiries") || "[]");
      existingInquiries.push({ ...formData, id: Date.now(), status: "Nuevo" });
      localStorage.setItem("paine_inquiries", JSON.stringify(existingInquiries));

      setSubmitting(false);
      setStep(3);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-deep-charcoal/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="bg-slate-blue text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap className="text-electric-gold w-5 h-5" id="header-zap-icon" />
            <div>
              <h3 className="font-sans font-bold text-lg">Asesoría Técnica Especializada</h3>
              <p className="text-xs text-white/70">Asistente de Ingeniería Eléctrica y Normas SEC</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-electric-gold text-lg transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 1 && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3 text-sm text-blue-900 leading-normal">
                <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p>
                  Cuéntanos brevemente sobre tu proyecto urbano, industrial o residencial en Chile. Nuestro equipo generará un diagnóstico de viabilidad y cumplimiento normativo inmediato.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-sm text-gray-800">Selecciona el Servicio Requerido:</h4>
                <div className="grid grid-cols-2 gap-3">
                  {services.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setFormData({ ...formData, serviceId: s.id })}
                      className={`text-left p-3 border rounded-lg transition-all cursor-pointer ${
                        formData.serviceId === s.id
                          ? "border-slate-blue bg-slate-blue/5 text-slate-blue-light"
                          : "border-gray-200 hover:border-gray-300 text-gray-600 bg-white"
                      }`}
                    >
                      <span className="block font-bold text-xs font-sans tracking-wide uppercase">{s.name}</span>
                      <span className="block text-[10px] text-gray-400 font-sans mt-1 line-clamp-1">{s.shortDesc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  onClick={() => setStep(2)}
                  className="bg-slate-blue hover:bg-slate-blue-light text-white text-xs font-bold py-2.5 px-6 rounded-lg uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Tu Nombre
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-slate-blue"
                    placeholder="Ej. Carlos Pérez"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-slate-blue"
                    placeholder="carlos@correo.cl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Urgencia del Proyecto
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-slate-blue animate-none"
                  >
                    <option value="baja">Baja (Solo cotización)</option>
                    <option value="media">Media (Próximas semanas)</option>
                    <option value="alta">Alta (Urgente / Emergencia)</option>
                  </select>
                </div>
                {formData.serviceId === "instalaciones" ? (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Potencia Estimada (kW)
                    </label>
                    <input
                      type="number"
                      value={formData.powerDemand}
                      onChange={(e) => setFormData({ ...formData, powerDemand: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-slate-blue"
                      placeholder="Ej. 15"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Fases del Empalme
                    </label>
                    <select
                      value={formData.phaseType}
                      onChange={(e) => setFormData({ ...formData, phaseType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-slate-blue animate-none"
                    >
                      <option value="monofasico">Monofásico (220V)</option>
                      <option value="trifasico">Trifásico (380V)</option>
                    </select>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Breve descripción del problema o requerimiento
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-slate-blue resize-none"
                  placeholder="Ej. Necesito certificar un aumento de empalme comercial y realizar planos..."
                />
              </div>

              <div className="flex justify-between pt-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="border border-gray-300 hover:border-gray-400 text-gray-600 text-xs font-bold py-2.5 px-6 rounded-lg uppercase tracking-wider transition-colors cursor-pointer font-sans"
                >
                  Atrás
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-slate-blue hover:bg-slate-blue-light text-white text-xs font-bold py-2.5 px-6 rounded-lg uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
                >
                  {submitting ? "Procesando..." : (
                    <>
                      Solicitar Asesoría <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {step === 3 && diagnostic && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="text-center py-4 bg-green-50 rounded-xl border border-green-100">
                <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <h4 className="font-bold text-green-900 text-base">¡Solicitud Procesada Exitosamente!</h4>
                <p className="text-xs text-green-700 mt-1">Ticket de seguimiento: <strong>{diagnostic.ticketNumber}</strong></p>
              </div>

              <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50 space-y-3">
                <h5 className="font-sans font-bold text-xs uppercase text-gray-500 tracking-wider">
                  🩺 Diagnóstico Técnico Inicial Normativo:
                </h5>
                <p className="text-sm text-gray-800 leading-relaxed font-serif bg-white border border-gray-100 rounded-lg p-3">
                  {diagnostic.advice}
                </p>

                <div className="text-xs space-y-1 pt-2">
                  <p className="text-gray-600">
                    📂 <strong>Exigencia SEC:</strong> <span className="font-mono text-[11px] text-slate-blue bg-slate-blue/5 px-1.5 py-0.5 rounded">{diagnostic.secRequirement}</span>
                  </p>
                  <p className="text-gray-600">
                    ⏱️ <strong>Plazo Estimado:</strong> <span className="text-amber-700 font-semibold">{diagnostic.estimatedTimeline}</span>
                  </p>
                  <p className="text-gray-600">
                    🧑‍💼 <strong>Ingeniero Asignado:</strong> <span className="text-gray-900 font-semibold">{diagnostic.technician}</span> ({diagnostic.technicianRole})
                  </p>
                </div>
              </div>

              <div className="flex justify-center pt-3">
                <button
                  onClick={onClose}
                  className="bg-slate-blue hover:bg-slate-blue-light text-white text-xs font-bold py-2.5 px-8 rounded-lg uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Finalizar e ir al Inicio
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
