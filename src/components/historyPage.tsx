
import axios from 'axios';
import { useEffect, useState } from 'react';
import Banner from './banner';

const apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2aXd2anl0ZXl4enl1emN0dHhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MDk5MDMsImV4cCI6MjA2NzQ4NTkwM30.VTNduqNeKdj0F42TQHGANoq1bhdoVjM_hGSnWOEPcwU';

const HistoryPage = () => {

    const [students, setStudents] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [date, setDate] = useState<any>(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        setIsLoading(true);

        axios.get('https://kviwvjyteyxzyuzcttxa.supabase.co/rest/v1/student', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'apikey': apikey
            }
        }).then((response: any) => {
            setIsLoading(false);
            if (response.data.length > 0) {

                // setStudents(response.data)

                let newStudent = response.data;
                for (let i = 0; i < response.data.length; i++) {
                    axios.get(`https://kviwvjyteyxzyuzcttxa.supabase.co/rest/v1/checkin?id_student=eq.${response.data[i].id}&created_at=gte.${date}T00:00:00&created_at=lte.${date}T23:59:00&limit=1`,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'apikey': apikey
                            }
                        }
                    )
                        .then((response1: any) => {
                            if (response1.data.length > 0) {
                                newStudent = newStudent.map((s: any) => {
                                    if (s.id == response.data[i].id) {
                                        
                                        const date = new Date(response1.data[0].created_at);

                                        // Formatter en heure et minute, fuseau GMT+3 (Africa/Nairobi ou Indian/Antananarivo)
                                        const time = date.toLocaleTimeString('fr-FR', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            timeZone: 'Indian/Antananarivo', // GMT+3
                                        });

                                        s.time = time;
                                    }
                                    return s;
                                })
                            } else {
                                 
                            }
                            setStudents(newStudent)

                        })
                }
                // setStudents(newStudent)

            }
        })
    }, [date])

  
    const handleChangeDate = (date : any)  => {
        setDate(date);
    }
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
                        onChange={(e) => handleChangeDate(e.target.value)}
                        className="px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>


            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                {students && students.map((student : any) => (
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
                            <p className="text-xl font-bold text-green-600">{student.time}</p>
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
