import Link from "next/link";
import { ArrowLeft, Smile, CheckCircle2, Phone, Mail } from "lucide-react";

const services = [
    "Implantología Dental y Oseointegración",
    "Ortodoncia y Alineadores Invisibles",
    "Estética Dental (Blanqueamiento, Carillas)",
    "Cirugía Oral y Exodoncias Complejas",
    "Periodoncia y Tratamientos de Encías",
    "Odontopediatría (Niños)",
];

export default function DentalServicePage() {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
            <section className="relative flex h-72 items-end overflow-hidden bg-gradient-to-br from-cyan-500 to-teal-800 px-6 pb-10">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_70%_30%,_#fff,_transparent)]" />
                <div className="relative z-10 flex flex-col gap-4">
                    <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 uppercase tracking-widest hover:text-white transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5" /> RM Holding
                    </Link>
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-cyan-200">Clínica Dental</span>
                        <h1 className="text-4xl font-black text-white tracking-tight mt-1">RM Dental</h1>
                        <p className="text-cyan-200 mt-2">Tu sonrisa es nuestra razón de ser.</p>
                    </div>
                </div>
            </section>

            <section className="container mx-auto max-w-5xl px-4 py-16 grid md:grid-cols-2 gap-10">
                <div>
                    <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-white">Especialidades</h2>
                    <ul className="space-y-3">
                        {services.map(service => (
                            <li key={service} className="flex items-center gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                                <CheckCircle2 className="w-5 h-5 text-cyan-500 shrink-0" />
                                {service}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 shadow-sm">
                    <Smile className="h-8 w-8 text-cyan-500 mb-4" />
                    <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">Agenda tu Consulta</h3>
                    <form className="space-y-4">
                        <input name="name" placeholder="Nombre Completo" required className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-500" />
                        <input name="phone" type="tel" placeholder="Teléfono de contacto" required className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-500" />
                        <textarea name="message" placeholder="¿En qué podemos ayudarte?" rows={3} className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-500" />
                        <button type="submit" className="w-full rounded-full bg-cyan-600 py-3 text-sm font-bold text-white hover:bg-cyan-700 transition-colors">
                            Solicitar Hora
                        </button>
                    </form>
                    <div className="mt-6 flex flex-col gap-2 text-sm text-neutral-500">
                        <a href="tel:+56900000000" className="flex items-center gap-2 hover:text-cyan-500 transition-colors"><Phone className="w-4 h-4" /> +56 9 0000 0000</a>
                        <a href="mailto:dental@rm-holding.cl" className="flex items-center gap-2 hover:text-cyan-500 transition-colors"><Mail className="w-4 h-4" /> dental@rm-holding.cl</a>
                    </div>
                </div>
            </section>
        </div>
    );
}
