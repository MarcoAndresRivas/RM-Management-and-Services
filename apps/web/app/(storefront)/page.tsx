import Link from "next/link";
import {
    ArrowRight,
    ShoppingCart,
    Cpu,
    Wrench,
    Smile,
    Sparkles,
    LogIn,
    LayoutDashboard,

    ChevronRight,
    Building2,
    FileText,
    ShieldCheck,
    Users,
} from "lucide-react";

/* ——— Datos de unidades de negocio ——— */
const businessUnits = [
    {
        id: "conveniencia",
        name: "RM Conveniencia",
        tagline: "Retail & Supermercados",
        description: "Supermercados de proximidad con delivery express y gestión de inventario en tiempo real.",
        icon: ShoppingCart,
        href: "/stores/conveniencia",
        badge: "E-Commerce",
    },
    {
        id: "tech",
        name: "RM Tech & Electronics",
        tagline: "Vanguardia Tecnológica",
        description: "Distribución de componentes electrónicos y soluciones IT de alta gama.",
        icon: Cpu,
        href: "/stores/tech",
        badge: "E-Commerce",
    },
    {
        id: "ingenieria",
        name: "RM Ingeniería",
        tagline: "Ingeniería Civil & IT",
        description: "Ingeniería Civil, Informática y Eléctrica aplicada a proyectos de gran escala.",
        icon: Wrench,
        href: "/services/ingenieria",
        badge: "Servicios B2B",
    },
    {
        id: "dental",
        name: "RM Dental",
        tagline: "Salud Digital",
        description: "Clínica odontológica digitalizada con procedimientos de alta precisión.",
        icon: Smile,
        href: "/services/dental",
        badge: "Clínica",
    },
    {
        id: "estetica",
        name: "RM Estética",
        tagline: "Bienestar & HealthTech",
        description: "Infraestructura de salud estética y arriendo de pabellones quirúrgicos.",
        icon: Sparkles,
        href: "/services/estetica",
        badge: "HealthTech",
    },
];

/* ——— Links de servicios rápidos ——— */
const quickServices = [
    {
        icon: LayoutDashboard,
        title: "Portal Corporativo",
        description: "Accede al Panel de Control para gestionar tu organización.",
        href: "/dashboard",
    },
    {
        icon: FileText,
        title: "Documentos Tributarios (DTE)",
        description: "Emite y consulta boletas, facturas y guías de despacho electrónicas.",
        href: "/dashboard",
    },
    {
        icon: Users,
        title: "Gestión de Clientes",
        description: "Administra tu CRM, historial de pedidos y datos de clientes.",
        href: "/dashboard/customers",
    },
    {
        icon: ShieldCheck,
        title: "Seguridad y Accesos",
        description: "Control de roles, RBAC y permisos por sucursal.",
        href: "/dashboard",
    },
    {
        icon: Building2,
        title: "Organizaciones",
        description: "Registra y gestiona las empresas de tu holding.",
        href: "/dashboard/organizations",
    },
];

/* ——— Estadísticas del hero ——— */
const stats = [
    { value: "5", label: "Unidades de Negocio" },
    { value: "100%", label: "Cloud & DTE" },
    { value: "24/7", label: "Disponibilidad" },
    { value: "ERP", label: "Centralizado" },
];

export default function HoldingHomePage() {
    return (
        <div style={{ fontFamily: "'Inter', sans-serif", color: "var(--color-gray-800)", background: "var(--color-white)" }}>

            {/* ===================== NAVBAR ===================== */}
            <header style={{
                position: "sticky",
                top: 0,
                zIndex: 100,
                background: "#ffffff",
                borderBottom: "1px solid #E5EAF0",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}>
                <div style={{
                    maxWidth: 1100,
                    margin: "0 auto",
                    padding: "0 1.5rem",
                    height: 64,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                    {/* Logo */}
                    <Link href="/" style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        textDecoration: "none",
                        fontWeight: 900,
                        fontSize: "1.2rem",
                        color: "#005FB8",
                    }}>
                        <div style={{
                            background: "#005FB8",
                            color: "white",
                            width: 36,
                            height: 36,
                            borderRadius: 8,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.85rem",
                            fontWeight: 900,
                        }}>RM</div>
                        <span>Management</span>
                        <span style={{ color: "#9CA3AF", fontWeight: 400, fontSize: "0.9rem" }}>& Services</span>
                    </Link>

                    {/* Acciones */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <Link href="/login" className="btn-nav-outline">
                            <LogIn size={15} />
                            Iniciar sesión
                        </Link>
                        <Link href="/register" className="btn-nav-solid">
                            Registrarse
                        </Link>
                    </div>
                </div>
            </header>

            {/* ===================== HERO ===================== */}
            <section style={{
                background: "linear-gradient(135deg, #004080 0%, #005FB8 60%, #0074D9 100%)",
                color: "white",
                padding: "5rem 1.5rem",
                textAlign: "center",
            }}>
                <div style={{ maxWidth: 800, margin: "0 auto" }}>
                    {/* Badge */}
                    <div style={{
                        display: "inline-block",
                        background: "rgba(255,255,255,0.15)",
                        border: "1px solid rgba(255,255,255,0.25)",
                        borderRadius: 999,
                        padding: "0.3rem 1rem",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: "1.5rem",
                        color: "rgba(255,255,255,0.9)",
                    }}>
                        Ecosistema RM Holding · Chile
                    </div>

                    <h1 style={{
                        fontSize: "clamp(2rem, 5vw, 3.25rem)",
                        fontWeight: 800,
                        lineHeight: 1.15,
                        marginBottom: "1.25rem",
                        color: "white",
                    }}>
                        Gestiona tu empresa con{" "}
                        <span style={{ color: "#7DD3FC" }}>tecnología integrada</span>
                    </h1>

                    <p style={{
                        fontSize: "1.1rem",
                        color: "rgba(255,255,255,0.8)",
                        lineHeight: 1.7,
                        marginBottom: "2.5rem",
                        maxWidth: 580,
                        margin: "0 auto 2.5rem",
                    }}>
                        Una plataforma unificada para gestionar retail, servicios, salud, logística y cumplimiento tributario SII desde un solo lugar.
                    </p>

                    <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                        <a href="#unidades" style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            background: "white",
                            color: "#005FB8",
                            borderRadius: 6,
                            padding: "0.75rem 1.75rem",
                            fontWeight: 700,
                            fontSize: "0.95rem",
                            textDecoration: "none",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        }}>
                            Ver Unidades de Negocio
                            <ArrowRight size={16} />
                        </a>
                        <Link href="/dashboard" style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            background: "rgba(255,255,255,0.15)",
                            border: "1.5px solid rgba(255,255,255,0.4)",
                            color: "white",
                            borderRadius: 6,
                            padding: "0.75rem 1.75rem",
                            fontWeight: 700,
                            fontSize: "0.95rem",
                            textDecoration: "none",
                        }}>
                            Portal Corporativo
                        </Link>
                    </div>
                </div>

                {/* Estadísticas */}
                <div style={{
                    maxWidth: 900,
                    margin: "4rem auto 0",
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 12,
                    backdropFilter: "blur(8px)",
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                }}>
                    {stats.map((s, i) => (
                        <div key={s.label} style={{
                            padding: "1.5rem 1rem",
                            textAlign: "center",
                            borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.15)" : "none",
                        }}>
                            <div style={{ fontSize: "1.75rem", fontWeight: 900, color: "white", lineHeight: 1 }}>{s.value}</div>
                            <div style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.65)", marginTop: "0.4rem" }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===================== UNIDADES DE NEGOCIO ===================== */}
            <section id="unidades" style={{ background: "#D1E6F9", padding: "4rem 1.5rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ marginBottom: "2.5rem" }}>
                        <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#004080", marginBottom: "0.5rem" }}>
                            ¿Qué necesitas?
                        </h2>
                        <p style={{ color: "#4B5563", fontSize: "0.95rem" }}>
                            Selecciona la unidad de negocio que deseas gestionar o visitar.
                        </p>
                    </div>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                        gap: "1.25rem",
                    }}>
                        {businessUnits.map((unit) => {
                            const Icon = unit.icon;
                            return (
                                <div key={unit.id} style={{
                                    background: "white",
                                    borderRadius: 12,
                                    padding: "1.75rem",
                                    boxShadow: "0 2px 8px rgba(0,95,184,0.10)",
                                    border: "1px solid #E5EAF0",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.75rem",
                                }}>
                                    {/* Icono + Badge */}
                                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                                        <div style={{
                                            width: 52,
                                            height: 52,
                                            borderRadius: 10,
                                            background: "#EBF4FD",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "#005FB8",
                                        }}>
                                            <Icon size={24} />
                                        </div>
                                        <span style={{
                                            fontSize: "0.65rem",
                                            fontWeight: 700,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.07em",
                                            padding: "0.2rem 0.55rem",
                                            borderRadius: 4,
                                            background: "#D1E6F9",
                                            color: "#005FB8",
                                        }}>{unit.badge}</span>
                                    </div>

                                    {/* Contenido */}
                                    <div>
                                        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1A1A1A", marginBottom: "0.25rem" }}>{unit.name}</h3>
                                        <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#005FB8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>{unit.tagline}</p>
                                        <p style={{ fontSize: "0.875rem", color: "#6B7280", lineHeight: 1.6 }}>{unit.description}</p>
                                    </div>

                                    {/* CTA */}
                                    <Link href={unit.href} style={{
                                        marginTop: "auto",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "0.4rem",
                                        background: "#333333",
                                        color: "white",
                                        borderRadius: 6,
                                        padding: "0.55rem 1rem",
                                        fontSize: "0.875rem",
                                        fontWeight: 600,
                                        textDecoration: "none",
                                        width: "100%",
                                        textAlign: "center" as const,
                                    }}>
                                        Comenzar
                                        <ChevronRight size={15} />
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===================== SERVICIOS RÁPIDOS ===================== */}
            <section style={{ background: "white", padding: "4rem 1.5rem", borderTop: "1px solid #E5EAF0" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#1A1A1A", marginBottom: "2rem" }}>
                        Servicios:
                    </h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                        {quickServices.map((svc, i) => {
                            const Icon = svc.icon;
                            return (
                                <div key={svc.title}>
                                    {i > 0 && <hr style={{ border: "none", borderTop: "1px solid #E5EAF0" }} />}
                                    <Link href={svc.href} style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "1.25rem",
                                        padding: "1.25rem 0.5rem",
                                        textDecoration: "none",
                                        color: "inherit",
                                        transition: "background 0.15s",
                                        borderRadius: 8,
                                    }}>
                                        <div style={{
                                            width: 42,
                                            height: 42,
                                            borderRadius: 8,
                                            background: "#EBF4FD",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "#005FB8",
                                            flexShrink: 0,
                                        }}>
                                            <Icon size={20} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{
                                                fontWeight: 700,
                                                fontSize: "0.95rem",
                                                color: "#005FB8",
                                                marginBottom: "0.2rem",
                                                textDecoration: "underline",
                                            }}>{svc.title}</div>
                                            <div style={{ fontSize: "0.875rem", color: "#6B7280", lineHeight: 1.5 }}>{svc.description}</div>
                                        </div>
                                        <ChevronRight size={18} style={{ color: "#9CA3AF", flexShrink: 0 }} />
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===================== FOOTER ===================== */}
            <footer style={{
                background: "#1A1A1A",
                color: "#9CA3AF",
                padding: "2.5rem 1.5rem",
                marginTop: 0,
            }}>
                <div style={{
                    maxWidth: 1100,
                    margin: "0 auto",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem",
                }}>
                    <div>
                        <div style={{ fontWeight: 900, color: "white", fontSize: "1rem", marginBottom: "0.3rem" }}>
                            RM <span style={{ color: "#005FB8" }}>Management & Services</span>
                        </div>
                        <div style={{ fontSize: "0.8rem" }}>© 2026 · Santiago, Chile · Todos los derechos reservados</div>
                    </div>
                    <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.8rem" }}>
                        <Link href="#" style={{ color: "#9CA3AF", textDecoration: "none" }}>Privacidad</Link>
                        <Link href="#" style={{ color: "#9CA3AF", textDecoration: "none" }}>Términos de uso</Link>
                        <Link href="/dashboard" style={{ color: "#005FB8", fontWeight: 600, textDecoration: "none" }}>Portal Corporativo</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
