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
        <div className="min-h-screen bg-white dark:bg-neutral-950">
            {/* Hero Section */}
            <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden bg-neutral-950 px-4 py-32 text-white">
                {/* Gradient abstract blobs */}
                <div className="absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none" />
                <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />

                <div className="relative z-10 text-center max-w-5xl mx-auto">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-neutral-300 backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                        Holding Empresarial · Chile
                    </div>

                    <h1 className="mb-6 text-5xl md:text-7xl font-black tracking-tighter leading-none">
                        <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                            RM Management
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            & Services
                        </span>
                    </h1>

                    <p className="mx-auto mb-10 max-w-2xl text-lg text-neutral-400 leading-relaxed">
                        Un holding empresarial creado para transformar la experiencia del consumidor chileno
                        a través de servicios integrados de comercio, salud y tecnología.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="#subsidiaries"
                            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-black transition-all hover:scale-105 hover:shadow-xl hover:shadow-white/20 active:scale-95"
                        >
                            Ver Nuestras Empresas <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:scale-105"
                        >
                            Portal Administrativo
                        </Link>
                    </div>
                </div>

                {/* Stats bar */}
                <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 bg-white/[0.02] backdrop-blur-sm">
                    <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5 py-4">
                        {[
                            { value: "5", label: "Empresas del Grupo" },
                            { value: "2", label: "Tiendas Online" },
                            { value: "3", label: "Servicios Clínicos & Técnicos" },
                            { value: "100%", label: "Digital & Integrado" },
                        ].map((stat) => (
                            <div key={stat.label} className="flex flex-col items-center py-3 px-4">
                                <span className="text-2xl font-black text-white">{stat.value}</span>
                                <span className="text-[11px] uppercase tracking-wider text-neutral-500 mt-1">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Subsidiaries Grid */}
            <section id="subsidiaries" className="container mx-auto max-w-7xl px-4 py-24">
                <div className="mb-16 text-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">Nuestras Empresas</span>
                    <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
                        Un ecosistema de<br />servicios integrados
                    </h2>
                    <p className="mt-4 max-w-xl mx-auto text-neutral-500 dark:text-neutral-400">
                        Cada subsidiaria está diseñada para entregar experiencias de calidad en su rubro, conectadas bajo un mismo grupo corporativo.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {subsidiaries.map((sub) => {
                        const Icon = sub.icon;
                        return (
                            <Link
                                key={sub.id}
                                href={sub.href}
                                className={`group relative flex flex-col overflow-hidden rounded-3xl border p-8 transition-all hover:-translate-y-2 hover:shadow-2xl dark:hover:shadow-black/50 ${sub.bgLight} ${sub.borderColor}`}
                            >
                                {/* Badge */}
                                <div className="absolute top-6 right-6">
                                    <span className={`inline-flex items-center rounded-full bg-gradient-to-r ${sub.color} px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow`}>
                                        {sub.badge}
                                    </span>
                                </div>

                                {/* Icon */}
                                <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white dark:bg-neutral-900 shadow-sm border ${sub.borderColor}`}>
                                    <Icon className={`h-7 w-7 ${sub.iconColor}`} />
                                </div>

                                <h3 className="mb-2 text-xl font-bold text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    {sub.name}
                                </h3>
                                <p className={`mb-3 text-sm font-semibold ${sub.iconColor}`}>
                                    {sub.tagline}
                                </p>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400 flex-1 leading-relaxed">
                                    {sub.description}
                                </p>

                                <div className={`mt-8 flex items-center gap-2 text-sm font-bold ${sub.iconColor} group-hover:gap-4 transition-all`}>
                                    {sub.hasStore ? "Ir a la Tienda" : "Ver Servicios"}
                                    <ArrowRight className="w-4 h-4" />
                                </div>
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
