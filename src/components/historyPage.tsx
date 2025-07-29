
import axios from 'axios';
import { useEffect, useState } from 'react';
import Banner from './banner';

const apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2aXd2anl0ZXl4enl1emN0dHhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MDk5MDMsImV4cCI6MjA2NzQ4NTkwM30.VTNduqNeKdj0F42TQHGANoq1bhdoVjM_hGSnWOEPcwU';

const HistoryPage = () => {

    const [students, setStudents] = useState<[any]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
    }, [])

    axios.get('https://kviwvjyteyxzyuzcttxa.supabase.co/rest/v1/student', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'apikey': apikey
        }
    }).then((response: any) => {
        setIsLoading(false);
        if (response.data.length > 0) {
            setStudents(response.data)
        }
    })

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className='flex justify-center items-center'>
                <Banner />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <h2 className="text-xl font-semibold">Sélectionner une date :</h2>
                <div className="flex items-center gap-2">
                    <input
                        type="date"
                        className="px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>


            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                {students && students.map((student) => (
                    <div key={student.id} className="bg-white p-4 rounded-2xl shadow hover:shadow-md transition">
                        <div className="flex items-center space-x-4">
                            <img src={student.picture} alt="Photo" className="w-16 h-16 rounded-full object-cover" />
                            <div>
                                <p className="text-md font-semibold">{student.name}</p>
                                <p className="text-gray-500">{student.firstname}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm text-gray-600">Heure d'arrivée :</p>
                            <p className="text-xl font-bold text-green-600">08:05</p>
                        </div>
                    </div>
                ))}
            </div>
            {isLoading ? (
                <div className="container-loader">
                    <div className="loader"></div>
                </div>
            ) : <></>}
        </div>
    );
};

export default HistoryPage;
