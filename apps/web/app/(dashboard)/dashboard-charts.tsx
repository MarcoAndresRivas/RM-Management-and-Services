"use client";

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

const COLORS = ["#6366f1", "#0ea5e9", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6"];

const formatCLP = (value: number) =>
    new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(value);

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">{label}</p>
                {payload.map((entry: any) => (
                    <p key={entry.name} className="text-sm font-semibold" style={{ color: entry.color }}>
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
        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight="bold">
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
            <div className="col-span-4 rounded-2xl bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-neutral-800/50 p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-lg text-neutral-900 dark:text-white">Ventas Mensuales</h3>
                        <p className="text-xs text-neutral-500 mt-0.5">Revenue de los últimos 6 meses (CLP)</p>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 rounded-full px-3 py-1">
                        Revenue
                    </span>
                </div>
                {hasMonthlySales ? (
                    <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={monthlySales} margin={{ left: 0, right: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} className="dark:stroke-neutral-800" />
                            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                            <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={50} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="total" name="total" fill="#6366f1" radius={[8, 8, 0, 0]} maxBarSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-[240px] flex flex-col items-center justify-center gap-3">
                        <div className="text-4xl">📊</div>
                        <p className="text-sm text-neutral-400 text-center">
                            No hay datos de ventas aún.<br />Completa tu primera compra en el E-Commerce.
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
                            <Tooltip formatter={(value: number) => formatCLP(value)} />
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
