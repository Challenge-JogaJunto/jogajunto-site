import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { CalendarDays, Trophy, Users, Bell, Clock, CheckCircle, UserPlus } from "lucide-react"

export default function Dashboard() {
  const dataPie = [
    { name: "Sub-14", value: 35 },
    { name: "Sub-17", value: 45 },
    { name: "Adulto", value: 20 },
  ]

  const COLORS = ["#A855F7", "#7C3AED", "#6D28D9"]

  const dataLine = [
    { name: "Jan", inscritos: 30 },
    { name: "Feb", inscritos: 40 },
    { name: "Mar", inscritos: 45 },
    { name: "Apr", inscritos: 55 },
  ]

  return (
    <div className="flex flex-col gap-6 p-6 bg-[#faf9fc] min-h-screen">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Visão geral do clube</h1>
        <p className="text-gray-500">Resumo das suas atividades e estatísticas importantes</p>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col items-center justify-center">
          <Users className="text-purple-600 w-6 h-6 mb-1" />
          <p className="text-3xl font-bold text-gray-800">56</p>
          <p className="text-gray-500 text-sm text-center">Jogadoras inscritas</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col items-center justify-center">
          <Trophy className="text-purple-600 w-6 h-6 mb-1" />
          <p className="text-3xl font-bold text-gray-800">4</p>
          <p className="text-gray-500 text-sm text-center">Campeonatos ativos</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col items-center justify-center">
          <CalendarDays className="text-purple-600 w-6 h-6 mb-1" />
          <p className="text-3xl font-bold text-gray-800">3</p>
          <p className="text-gray-500 text-sm text-center">Próximas peneiras</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col items-center justify-center">
          <Bell className="text-purple-600 w-6 h-6 mb-1" />
          <p className="text-3xl font-bold text-gray-800">3</p>
          <p className="text-gray-500 text-sm text-center">Alertas</p>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="col-span-2 bg-white rounded-2xl shadow-sm p-5">
          <h2 className="font-semibold text-gray-700 mb-4">Atividades recentes</h2>
          <ul className="space-y-3 text-gray-600 text-sm">

            <li className="flex flex-wrap items-center gap-2"><UserPlus className="text-purple-600 w-4 h-4" /> O clube abriu inscrições para uma nova peneira <span className="text-gray-400 ml-auto">há 2 horas</span></li>
            <li className="flex flex-wrap items-center gap-2"><CheckCircle className="text-purple-600 w-4 h-4" /> Jogadora Ana Silva se inscreveu em uma peneira <span className="text-gray-400 ml-auto">há 5 horas</span></li>
            <li className="flex flex-wrap items-center gap-2"><Trophy className="text-purple-600 w-4 h-4" /> Atualização do campeonato Sub-17 <span className="text-gray-400 ml-auto">há 1 dia</span></li>
            <li className="flex flex-wrap items-center gap-2"><Clock className="text-purple-600 w-4 h-4" /> O clube criou uma nova competição <span className="text-gray-400 ml-auto">há 2 dias</span></li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="font-semibold text-gray-700 mb-4">Abril 2025</h2>
          <div className="grid grid-cols-7 gap-1 text-center text-gray-600 text-sm">
            {["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"].map((d, i) => (
              <div key={i} className="font-medium text-gray-400">{d}</div>
            ))}
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className={`p-2 rounded-full ${
                  i + 1 === 9 ? "bg-purple-600 text-white font-semibold" : "hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="font-semibold text-gray-700 mb-4">Participação de jogadoras por categoria</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={dataPie} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={4}>
                <Cell fill={COLORS[0]} />
                <Cell fill={COLORS[1]} />
                <Cell fill={COLORS[2]} />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center flex-wrap gap-4 text-sm mt-3">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ background: COLORS[0] }}></div>
              <span className="text-gray-600">Sub-14</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ background: COLORS[1] }}></div>
              <span className="text-gray-600">Sub-17</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ background: COLORS[2] }}></div>
              <span className="text-gray-600">Adulto</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="font-semibold text-gray-700 mb-4">Crescimento de inscrição</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={dataLine}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Line type="monotone" dataKey="inscritos" stroke="#7C3AED" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
