import React, { useState, useMemo } from 'react';
import { Layout } from './components/Layout';
import { Button } from './components/Button';
import { SliderInput } from './components/SliderInput';
import { ResultsChart } from './components/ResultsChart';
import { Step, UserInput } from './types';
import { calculateProjection, formatCurrency } from './utils/calculations';
import { COPY } from './constants';
import { ArrowRight, TrendingUp, ShieldCheck, PieChart, CheckCircle2, Lock, Coins, Landmark, Phone, Target } from 'lucide-react';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.INTRO);
  const [userInput, setUserInput] = useState<UserInput>({
    age: 40,
    initialInvestment: 10000,
    monthlyContribution: 250,
    profile: 'balanced',
    name: '',
    email: '',
    phone: '',
    goal: 'retirement',
    situation: 'cash'
  });

  const [activeTab, setActiveTab] = useState<'wealth' | 'profit'>('wealth');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Memoize calculations
  const projectionData = useMemo(() => calculateProjection(userInput), [userInput]);
  
  // Get final values for summary
  const finalYear = projectionData[projectionData.length - 1];
  const totalProfit = finalYear.totalProfit;
  const multiplier = (finalYear.projectedValueOptimized / finalYear.investedAmount).toFixed(1);

  const handleStart = () => setCurrentStep(Step.INPUTS);

  const handleInputComplete = () => {
    setCurrentStep(Step.ANALYSIS);
    setTimeout(() => setCurrentStep(Step.GATE), 1500);
  };

  const handleGateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep(Step.RESULTS);
    }, 1000);
  };

  const renderIntro = () => (
    <div className="flex flex-col items-center justify-center py-12 md:py-20 px-4 max-w-4xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 bg-orange-50 text-[#FF7A00] px-4 py-2 rounded-full font-bold text-sm mb-6 border border-orange-100">
        <TrendingUp size={16} />
        <span>Plan de Inversión Creciente</span>
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
        {COPY.hero.title}
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
        {COPY.hero.subtitle}
      </p>

      <Button onClick={handleStart} className="text-lg px-10 py-4 shadow-orange-200 mb-12">
        {COPY.hero.cta} <ArrowRight size={20} />
      </Button>
      
      <div className="grid md:grid-cols-3 gap-6 w-full text-left">
        {[
          { icon: ShieldCheck, title: "Capital Protegido al 80%", desc: "Garantía diaria y creciente: si el mercado sube, tu capital garantizado sube y nunca vuelve a bajar." },
          { icon: PieChart, title: "Inversión Responsable (ESG)", desc: "Tu dinero gestionado activamente por Amundi con criterios ambientales, sociales y de gobernanza." },
          { icon: Landmark, title: "Protección Familiar", desc: "Incluye seguro de vida (+3.000 €) y cobertura por invalidez permanente absoluta." },
        ].map((feat, i) => (
          <div key={i} className="bg-[#F9FAFB] p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-[#FF7A00] shadow-sm mb-4">
              <feat.icon size={20} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{feat.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInputs = () => (
    <div className="max-w-xl mx-auto py-12 px-6">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Personaliza tu plan Contigo Futuro</h2>
        <p className="text-gray-500">Necesitamos estos datos para proyectar cómo crecería tu inversión hasta los 65 años.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <SliderInput
          label="Tu Edad"
          value={userInput.age}
          min={25}
          max={60}
          step={1}
          unit="años"
          helperText="Determina tu horizonte de inversión hasta los 65 años: a más años, mayor potencial de crecimiento."
          onChange={(v) => setUserInput({...userInput, age: v})}
        />

        <SliderInput
          label="Capital Inicial Disponible"
          value={userInput.initialInvestment}
          min={0}
          max={100000}
          step={1000}
          unit="€"
          helperText="¿Tienes ahorros en cuenta o depósitos que podrías mover a una inversión con mayor potencial?"
          onChange={(v) => setUserInput({...userInput, initialInvestment: v})}
        />

        <SliderInput
          label="Ahorro Mensual"
          value={userInput.monthlyContribution}
          min={75}
          max={3000}
          step={25}
          unit="€"
          helperText="Contigo Futuro permite aportaciones desde 75 €/mes. Puedes modificarlas o hacer extras cuando quieras."
          onChange={(v) => setUserInput({...userInput, monthlyContribution: v})}
        />

        <div className="mb-8">
          <label className="text-lg font-semibold text-gray-900 mb-3 block">¿Con qué escenario te identificas?</label>
          <p className="text-sm text-gray-500 mb-3">Comparamos tu elección con dejar el dinero en el banco al tipo actual (~2%).</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'conservative', label: 'Prudente', desc: 'Priorizo seguridad' },
              { id: 'balanced', label: 'Equilibrado', desc: 'Seguridad + Crecimiento' },
              { id: 'dynamic', label: 'Decidido', desc: 'Priorizo rentabilidad' }
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setUserInput({...userInput, profile: p.id as any})}
                className={`p-3 rounded-lg border-2 text-left transition-all ${
                  userInput.profile === p.id 
                    ? 'border-[#FF7A00] bg-orange-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`font-bold text-sm ${userInput.profile === p.id ? 'text-[#FF7A00]' : 'text-gray-900'}`}>
                  {p.label}
                </div>
                <div className="text-xs text-gray-500 mt-1">{p.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <Button fullWidth onClick={handleInputComplete} className="text-lg">
          Calcular Rentabilidad <ArrowRight size={20} />
        </Button>
      </div>
    </div>
  );

  const renderAnalysis = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-[#FF7A00] rounded-full border-t-transparent animate-spin"></div>
        <Coins className="absolute inset-0 m-auto text-[#FF7A00]" size={32} />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Calculando tu proyección...</h2>
      <p className="text-gray-500">Comparando cuenta bancaria vs. Contigo Futuro con tu perfil.</p>
    </div>
  );

  const renderGate = () => (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-gray-900 p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">{COPY.gate.title}</h2>
          <p className="text-gray-300 text-sm">{COPY.gate.subtitle}</p>
        </div>
        
        <div className="p-8">
            <form onSubmit={handleGateSubmit} className="space-y-6">
              
              <div className="bg-orange-50 p-5 rounded-lg border border-orange-100 mb-6">
                 <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Target size={18} className="text-[#FF7A00]"/>
                    Cuéntanos un poco más
                 </h3>
                 <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Objetivo Principal</label>
                        <select 
                            className="w-full px-3 py-2 bg-white rounded border border-gray-300 focus:border-[#FF7A00] outline-none"
                            value={userInput.goal}
                            onChange={(e) => setUserInput({...userInput, goal: e.target.value as any})}
                        >
                            <option value="retirement">Complementar Jubilación</option>
                            <option value="wealth">Crear Patrimonio</option>
                            <option value="housing">Comprar Vivienda</option>
                            <option value="children">Estudios Hijos</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Situación Actual</label>
                        <select 
                            className="w-full px-3 py-2 bg-white rounded border border-gray-300 focus:border-[#FF7A00] outline-none"
                            value={userInput.situation}
                            onChange={(e) => setUserInput({...userInput, situation: e.target.value as any})}
                        >
                            <option value="cash">Tengo dinero en cuenta (0%)</option>
                            <option value="deposits">Tengo Depósitos/Letras</option>
                            <option value="investor">Ya invierto en fondos</option>
                        </select>
                    </div>
                 </div>
              </div>

              <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                    <input 
                    required
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#FF7A00] focus:border-[#FF7A00] outline-none"
                    placeholder="Tu nombre"
                    value={userInput.name}
                    onChange={(e) => setUserInput({...userInput, name: e.target.value})}
                    />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                        required
                        type="email" 
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#FF7A00] focus:border-[#FF7A00] outline-none"
                        placeholder="tu@email.com"
                        value={userInput.email}
                        onChange={(e) => setUserInput({...userInput, email: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                        <input 
                        required
                        type="tel" 
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#FF7A00] focus:border-[#FF7A00] outline-none"
                        placeholder="600 000 000"
                        value={userInput.phone}
                        onChange={(e) => setUserInput({...userInput, phone: e.target.value})}
                        />
                    </div>
                </div>
              </div>

              <Button type="submit" fullWidth disabled={isSubmitting} className="mt-4 text-lg">
                {isSubmitting ? 'Procesando...' : 'Ver Informe de Rentabilidad'} <Lock size={16} />
              </Button>
              
              <p className="text-xs text-center text-gray-400 mt-4">
                {COPY.gate.disclaimer}
              </p>
            </form>
        </div>
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="max-w-6xl mx-auto py-8 px-4 md:px-6">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">Hola, {userInput.name}</h2>
          <p className="text-gray-500 mt-1">Este es el potencial de tu estrategia <span className="font-bold text-[#FF7A00]">{userInput.profile === 'dynamic' ? 'Dinámica' : userInput.profile === 'balanced' ? 'Equilibrada' : 'Conservadora'}</span>.</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('wealth')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'wealth' ? 'bg-white text-[#FF7A00] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Patrimonio
          </button>
          <button 
            onClick={() => setActiveTab('profit')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'profit' ? 'bg-white text-[#FF7A00] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Beneficio Neto
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 min-h-[450px]">
            {activeTab === 'wealth' ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <TrendingUp size={20} className="text-[#FF7A00]" />
                    Crecimiento del Capital
                  </h3>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Valor Estimado a los 65 años</div>
                    <div className="text-3xl font-bold text-gray-900">{formatCurrency(finalYear.projectedValueOptimized)}</div>
                  </div>
                </div>
                <ResultsChart data={projectionData} />
              </>
            ) : (
              <>
                 <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Coins size={20} className="text-[#FF7A00]" />
                    Rendimiento de tu Inversión
                  </h3>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Beneficio Generado</div>
                    <div className="text-3xl font-bold text-green-600">+{formatCurrency(totalProfit)}</div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-6 py-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-center">
                            <div className="text-sm text-gray-500 mb-2">Dinero de tu bolsillo</div>
                            <div className="text-2xl font-bold text-gray-900">{formatCurrency(finalYear.investedAmount)}</div>
                            <div className="text-xs text-gray-400 mt-2">Capital aportado</div>
                        </div>
                        <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 text-center">
                            <div className="text-sm text-gray-600 mb-2">Intereses Generados</div>
                            <div className="text-2xl font-bold text-[#FF7A00]">{formatCurrency(totalProfit)}</div>
                            <div className="text-xs text-orange-400 mt-2">Tu dinero trabajando</div>
                        </div>
                    </div>
                    
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex items-center gap-4">
                        <div className="bg-white p-3 rounded-full text-blue-600 shadow-sm">
                            <Target size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">Multiplicador x{multiplier}</h4>
                            <p className="text-sm text-gray-600">Por cada euro que inviertes, obtienes <strong>{multiplier}€</strong> de vuelta al final del periodo.</p>
                        </div>
                    </div>
                </div>
              </>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
             <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="font-bold mb-2 text-gray-900">Liquidez tras el primer año</h4>
                <p className="text-sm text-gray-500">Después del primer año puedes hacer rescates parciales (hasta el 30%) o totales. Tu dinero es accesible.</p>
             </div>
             <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="font-bold mb-2 text-gray-900">Diferimiento Fiscal</h4>
                <p className="text-sm text-gray-500">Solo tributas cuando rescatas, no durante la vida del plan. Tu dinero crece sin peajes fiscales intermedios.</p>
             </div>
          </div>
        </div>

        {/* Sidebar / CTA */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900 text-white p-6 rounded-2xl sticky top-24 shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Planifica tu Estrategia</h3>
            <p className="text-gray-300 text-sm mb-6">
              Esta simulación es orientativa. Un asesor de Nationale-Nederlanden puede analizar tu caso concreto y explicarte en detalle las garantías, coberturas y fiscalidad de Contigo Futuro.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Garantía del 80% con consolidación de ganancias",
                "Coberturas de vida e invalidez incluidas",
                "Fiscalidad al rescate y opciones de renta vitalicia"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-[#FF7A00] mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Button fullWidth className="mb-3 flex justify-between items-center group">
              <span>Agendar Sesión</span>
              <Phone size={18} className="group-hover:rotate-12 transition-transform"/>
            </Button>
            <Button fullWidth variant="secondary" onClick={() => setCurrentStep(Step.INPUTS)}>
              Ajustar Capital
            </Button>

            <div className="mt-6 pt-6 border-t border-gray-800 text-xs text-gray-500 text-center">
                Sin compromiso. Te llamaremos al {userInput.phone} en las próximas 24h.
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      {currentStep === Step.INTRO && renderIntro()}
      {currentStep === Step.INPUTS && renderInputs()}
      {currentStep === Step.ANALYSIS && renderAnalysis()}
      {currentStep === Step.GATE && renderGate()}
      {currentStep === Step.RESULTS && renderResults()}
    </Layout>
  );
};

export default App;