import Link from "next/link";
import { ArrowRight, ShoppingCart, Cpu, Wrench, Smile, Sparkles } from "lucide-react";

const subsidiaries = [
    {
        id: "conveniencia",
        name: "RM Conveniencia",
        tagline: "Tu supermercado de barrio, siempre cerca.",
        description: "Cadena de supermercados de conveniencia con delivery express y catálogo online.",
        icon: ShoppingCart,
        href: "/stores/conveniencia",
        color: "from-green-500 to-emerald-700",
        bgLight: "bg-green-50 dark:bg-green-950/20",
        borderColor: "border-green-200 dark:border-green-800",
        iconColor: "text-green-600 dark:text-green-400",
        hasStore: true,
        badge: "E-Commerce"
    },
    {
        id: "tech",
        name: "RM Tech & Electronics",
        tagline: "Tecnología premium al mejor precio.",
        description: "Comercializadora de electrónicos, eléctricos y productos del rubro tecnológico.",
        icon: Cpu,
        href: "/stores/tech",
        color: "from-blue-500 to-indigo-700",
        bgLight: "bg-blue-50 dark:bg-blue-950/20",
        borderColor: "border-blue-200 dark:border-blue-800",
        iconColor: "text-blue-600 dark:text-blue-400",
        hasStore: true,
        badge: "E-Commerce"
    },
    {
        id: "ingenieria",
        name: "RM Ingeniería",
        tagline: "Soluciones técnicas de excelencia.",
        description: "Servicios de ingeniería civil, informática y electricidad para proyectos residenciales y corporativos.",
        icon: Wrench,
        href: "/services/ingenieria",
        color: "from-orange-500 to-amber-700",
        bgLight: "bg-orange-50 dark:bg-orange-950/20",
        borderColor: "border-orange-200 dark:border-orange-800",
        iconColor: "text-orange-600 dark:text-orange-400",
        hasStore: false,
        badge: "Servicios"
    },
    {
        id: "dental",
        name: "RM Dental",
        tagline: "Tu sonrisa, nuestra especialidad.",
        description: "Clínica dental integral con atención personalizada, implantología y ortodoncia.",
        icon: Smile,
        href: "/services/dental",
        color: "from-cyan-500 to-teal-700",
        bgLight: "bg-cyan-50 dark:bg-cyan-950/20",
        borderColor: "border-cyan-200 dark:border-cyan-800",
        iconColor: "text-cyan-600 dark:text-cyan-400",
        hasStore: false,
        badge: "Clínica"
    },
    {
        id: "estetica",
        name: "RM Estética",
        tagline: "Excelencia clínica en estética y bienestar.",
        description: "Clínica estética con arriendo de pabellones para médicos especialistas y procedimientos de alta complejidad.",
        icon: Sparkles,
        href: "/services/estetica",
        color: "from-pink-500 to-rose-700",
        bgLight: "bg-pink-50 dark:bg-pink-950/20",
        borderColor: "border-pink-200 dark:border-pink-800",
        iconColor: "text-pink-600 dark:text-pink-400",
        hasStore: false,
        badge: "Clínica"
    }
];

export default function HoldingHomePage() {
    return (
        <div className="min-h-screen bg-neutral-950 text-white selection:bg-primary/30">
            {/* Hero Section with Animated Background */}
            <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-32">
                {/* Background Blobs/Aurora */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[150px] animate-aurora rounded-full" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[150px] animate-aurora rounded-full delay-700" />
                    <div className="absolute top-[30%] left-[40%] w-[30%] h-[30%] bg-cyan-600/10 blur-[120px] animate-pulse rounded-full" />
                </div>

                <div className="relative z-10 text-center max-w-6xl mx-auto space-y-8">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-1000">
                        <span className="h-2 w-2 rounded-full bg-blue-500 animate-glow shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                        Holding Empresarial v2.0 · Chile
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        <span className="bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-transparent">
                            RM Management
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent italic">
                            & Services
                        </span>
                    </h1>

                    <p className="mx-auto max-w-2xl text-lg md:text-xl text-neutral-400 font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
                        Liderando la vanguardia tecnológica y humana en comercio, salud e ingeniería.
                        Un ecosistema diseñado para el futuro de Chile.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-6 pt-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
                        <a
                            href="#subsidiaries"
                            className="group relative inline-flex items-center gap-3 rounded-2xl bg-white px-10 py-4 text-sm font-black text-black transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                        >
                            Explorar Empresas
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </a>
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-10 py-4 text-sm font-black text-white backdrop-blur-xl transition-all hover:bg-white/15 hover:scale-105 active:scale-95"
                        >
                            Logística & ERP
                        </Link>
                    </div>
                </div>

                {/* Glass Bottom Bar */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl">
                    <div className="glass-morphism rounded-3xl p-1 overflow-hidden">
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 py-6 px-4">
                            {[
                                { value: "5", label: "Business Units" },
                                { value: "2", label: "Live Stores" },
                                { value: "24/7", label: "Operations" },
                                { value: "100%", label: "Cloud Native" },
                            ].map((stat, idx) => (
                                <div key={stat.label} className="flex flex-col items-center text-center px-4 group">
                                    <span className="text-3xl font-black text-white group-hover:text-blue-400 transition-colors duration-500">{stat.value}</span>
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 mt-1">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Subsidiaries Grid - Glass Cards */}
            <section id="subsidiaries" className="relative z-10 container mx-auto max-w-7xl px-4 py-32">
                <div className="mb-20 text-center space-y-4">
                    <div className="inline-block px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-[10px] font-bold uppercase tracking-widest text-blue-400">
                        Ecosistema Integrado
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
                        Especialización<br />sin fronteras.
                    </h2>
                    <p className="max-w-xl mx-auto text-neutral-500 text-lg">
                        Cinco pilares estratégicos operando con la más alta tecnología para brindar servicios de clase mundial.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {subsidiaries.map((sub) => {
                        const Icon = sub.icon;
                        return (
                            <Link
                                key={sub.id}
                                href={sub.href}
                                className="group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.03] p-10 transition-all duration-500 hover:-translate-y-3 hover:bg-white/[0.06] hover:border-white/20 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
                            >
                                <div className="mb-8 flex items-center justify-between">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-900 border border-white/10 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-primary/20">
                                        <Icon className={`h-8 w-8 ${sub.iconColor} group-hover:text-white transition-colors duration-500`} />
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-wider text-neutral-400">
                                        {sub.badge}
                                    </span>
                                </div>

                                <div className="space-y-4 flex-1">
                                    <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors duration-500">
                                        {sub.name}
                                    </h3>
                                    <p className={`text-xs font-bold uppercase tracking-widest ${sub.iconColor} opacity-80`}>
                                        {sub.tagline}
                                    </p>
                                    <p className="text-sm text-neutral-500 leading-relaxed font-medium">
                                        {sub.description}
                                    </p>
                                </div>

                                <div className="mt-12 flex items-center justify-between">
                                    <span className="text-xs font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors duration-500">
                                        {sub.hasStore ? "Visitar Tienda" : "Explorar Servicios"}
                                    </span>
                                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 transition-all duration-500 group-hover:bg-white group-hover:text-black">
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>

                                {/* Hover background light */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-transparent to-blue-600/0 opacity-0 group-hover:opacity-10 transition-opacity duration-700" />
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-neutral-200 dark:border-neutral-800 py-12 px-4">
                <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <span className="text-xl font-black tracking-tighter">RM<span className="opacity-50">HOLDING</span></span>
                        <p className="text-sm text-neutral-500 mt-1">Holding Empresarial · Santiago, Chile · 2026</p>
                    </div>
                    <nav className="flex flex-wrap gap-6 text-sm text-neutral-500">
                        <Link href="/dashboard" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Portal Admin</Link>
                        <Link href="/stores/conveniencia" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Supermercado</Link>
                        <Link href="/stores/tech" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Tech</Link>
                        <Link href="/services/ingenieria" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Ingeniería</Link>
                        <Link href="/services/dental" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Dental</Link>
                        <Link href="/services/estetica" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Estética</Link>
                    </nav>
                </div>
            </footer>
        </div>
    );
}
