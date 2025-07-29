
const HistoryPage = () => {

    const generateEmployees = () => {
        const names = ["Rakoto", "Randria", "Rasoanaivo", "Andry", "Feno", "Toky"];
        const firstnames = ["Jean", "Sitraka", "Hery", "Miora", "Fanilo", "Nirina"];
        const employees = [];

        for (let i = 1; i <= 50; i++) {
            employees.push({
                id: i,
                nom: names[i % names.length],
                prenom: firstnames[i % firstnames.length],
                heureArrivee: `08:${(10 + (i % 50)).toString().padStart(2, "0")}`,
                imageUrl: `https://i.pravatar.cc/150?img=${i}` // Images différentes
            });
        }

        return employees;
    };

    const employees = generateEmployees();

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <h1 className="text-2xl font-bold mb-6">Pointage du personnel</h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <h2 className="text-xl font-semibold">Sélectionner une date :</h2>
                <div className="flex items-center gap-2">
                    <input
                        type="date"
                        className="px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>


            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {employees.map((emp) => (
                    <div key={emp.id} className="bg-white p-4 rounded-2xl shadow hover:shadow-md transition">
                        <div className="flex items-center space-x-4">
                            <img src={emp.imageUrl} alt="Photo" className="w-16 h-16 rounded-full object-cover" />
                            <div>
                                <p className="text-lg font-semibold">{emp.nom}</p>
                                <p className="text-gray-500">{emp.prenom}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm text-gray-600">Heure d'arrivée :</p>
                            <p className="text-xl font-bold text-green-600">{emp.heureArrivee}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HistoryPage;
