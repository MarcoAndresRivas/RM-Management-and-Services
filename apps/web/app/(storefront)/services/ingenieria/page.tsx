import Link from "next/link";
import { ArrowLeft, Wrench, Phone, Mail, CheckCircle2 } from "lucide-react";

const services = [
    "Ingeniería Civil y de Proyectos",
    "Desarrollo de Software e Informática",
    "Instalaciones Eléctricas Residenciales y Comerciales",
    "Consultoría Técnica y Normativa",
    "Proyectos de Automatización Industrial",
    "Certificaciones y Peritajes Técnicos",
];

export default function IngenieriaServicePage() {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
            <section className="relative flex h-72 items-end overflow-hidden bg-gradient-to-br from-orange-500 to-amber-800 px-6 pb-10">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_#fff,_transparent)]" />
                <div className="relative z-10 flex flex-col gap-4">
                    <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 uppercase tracking-widest hover:text-white transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5" /> RM Holding
                    </Link>
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-orange-200">Ingeniería & Consultoría</span>
                        <h1 className="text-4xl font-black text-white tracking-tight mt-1">RM Ingeniería</h1>
                        <p className="text-orange-200 mt-2">Soluciones técnicas de excelencia para cada desafío.</p>
                    </div>
                </div>
            </section>

            <section className="container mx-auto max-w-5xl px-4 py-16 grid md:grid-cols-2 gap-10">
                <div>
                    <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-white">Nuestros Servicios</h2>
                    <ul className="space-y-3">
                        {services.map(service => (
                            <li key={service} className="flex items-center gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                                <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                                {service}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 shadow-sm">
                    <Wrench className="h-8 w-8 text-orange-500 mb-4" />
                    <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">Solicita una Cotización</h3>
                    <form className="space-y-4">
                        <input name="name" placeholder="Nombre Completo / Empresa" required className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500" />
                        <input name="email" type="email" placeholder="Correo Electrónico" required className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500" />
                        <textarea name="message" placeholder="Describe tu proyecto o necesidad..." rows={4} className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500" />
                        <button type="submit" className="w-full rounded-full bg-orange-600 py-3 text-sm font-bold text-white hover:bg-orange-700 transition-colors">
                            Enviar Solicitud
                        </button>
                    </form>
                    <div className="mt-6 flex flex-col gap-2 text-sm text-neutral-500">
                        <a href="tel:+56900000000" className="flex items-center gap-2 hover:text-orange-500 transition-colors"><Phone className="w-4 h-4" /> +56 9 0000 0000</a>
                        <a href="mailto:ingenieria@rm-holding.cl" className="flex items-center gap-2 hover:text-orange-500 transition-colors"><Mail className="w-4 h-4" /> ingenieria@rm-holding.cl</a>
                    </div>
                </div>
            </section>
        </div>
    );
}
