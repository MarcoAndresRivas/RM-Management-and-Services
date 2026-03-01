"use client";

import { Database, Activity } from "lucide-react";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";

interface MonthlySale {
    month: string;
    total: number;
    orders: number;
}

interface CategorySale {
    name: string;
    value: number;
}

interface DashboardChartsProps {
    monthlySales: MonthlySale[];
    categorySales: CategorySale[];
}

// Deep Tech Palette
const COLORS = ["#0EA5E9", "#10B981", "#334155", "#F8FAFC", "#0F172A"];

const formatCLP = (value: number) =>
    new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(value);

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-2xl bg-brand-blue/90 backdrop-blur-2xl border border-white/10 shadow-2xl p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-slate mb-3">{label}</p>
                {payload.map((entry: any) => (
                    <p key={entry.name} className="text-sm font-black" style={{ color: entry.color }}>
                        {entry.name === "total" ? formatCLP(entry.value) : `${entry.value} órdenes`}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const PieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    if (percent < 0.05) return null;
    return (
        <text x={x} y={y} fill="#0F172A" textAnchor="middle" dominantBaseline="central" fontSize={10} fontWeight="900" className="font-black">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export function DashboardCharts({ monthlySales, categorySales }: DashboardChartsProps) {
    const hasMonthlySales = monthlySales.length > 0 && monthlySales.some(m => m.total > 0);
    const hasCategorySales = categorySales.length > 0;

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            {/* Bar chart - Revenue by month */}
            <div className="col-span-4 rounded-[2rem] bg-white/[0.03] backdrop-blur-3xl border border-white/5 p-8 shadow-2xl overflow-hidden group">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-black text-brand-white tracking-tight">Evolución de Ventas</h3>
                        <p className="text-xs font-bold text-brand-slate mt-1 opacity-70 tracking-wide">Performance de los últimos 6 meses</p>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-cyan bg-brand-cyan/10 rounded-full px-4 py-1.5 border border-brand-cyan/20">
                        Logística & Cashflow
                    </span>
                </div>
                {hasMonthlySales ? (
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={monthlySales} margin={{ left: 0, right: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
                            <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8", fontWeight: 700 }} axisLine={false} tickLine={false} />
                            <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 9, fill: "#94a3b8", fontWeight: 700 }} axisLine={false} tickLine={false} width={45} />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff05' }} />
                            <Bar dataKey="total" name="total" fill="#0EA5E9" radius={[10, 10, 2, 2]} maxBarSize={32} />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-[280px] flex flex-col items-center justify-center gap-4">
                        <div className="p-4 rounded-full bg-white/5 border border-dashed border-white/10 group-hover:scale-110 transition-transform duration-500">
                            <Activity className="w-8 h-8 text-brand-slate" />
                        </div>
                        <p className="text-xs font-bold text-brand-slate uppercase tracking-widest text-center opacity-50">
                            Aún no hay registros de ventas
                        </p>
                    </div>
                )}
            </div>

            {/* Donut chart - Sales by category */}
            <div className="col-span-3 rounded-2xl bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-neutral-800/50 p-6 shadow-sm">
                <div className="mb-6">
                    <h3 className="font-bold text-lg text-neutral-900 dark:text-white">Por Categoría</h3>
                    <p className="text-xs text-neutral-500 mt-0.5">Distribución de ventas por rubro</p>
                </div>
                {hasCategorySales ? (
                    <ResponsiveContainer width="100%" height={240}>
                        <PieChart>
                            <Pie
                                data={categorySales}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={3}
                                dataKey="value"
                                labelLine={false}
                                label={<PieLabel />}
                            >
                                {categorySales.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend
                                formatter={(value) => <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">{value}</span>}
                                iconType="circle"
                                iconSize={8}
                            />
                            <Tooltip formatter={(value: any) => formatCLP(Number(value) || 0)} contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #ffffff1a', borderRadius: '1rem', fontWeight: 'bold' }} />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-[240px] flex flex-col items-center justify-center gap-3">
                        <div className="text-4xl">🍩</div>
                        <p className="text-sm text-neutral-400 text-center">
                            Sin datos por categoría.<br />Agrega productos con categorías.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
