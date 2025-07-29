
// import axios from 'axios';
import { useEffect, useState } from 'react';
import Banner from './banner';
import { createClient } from '@supabase/supabase-js'

const apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2aXd2anl0ZXl4enl1emN0dHhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MDk5MDMsImV4cCI6MjA2NzQ4NTkwM30.VTNduqNeKdj0F42TQHGANoq1bhdoVjM_hGSnWOEPcwU';
const supabase = createClient('https://kviwvjyteyxzyuzcttxa.supabase.co', apikey)


const HistoryPage = () => {

    const [students, setStudents] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [date, setDate] = useState<any>(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        setIsLoading(true);

        // supabase.from('student')    
        //     .select(`
        //             id,
        //             name,
        //             checkin (
        //                 id_student,
        //                 created_at
        //             )
        //         `)
        //     .eq('id', 44001)
        //     .order('created_at', {referencedTable : 'checkin', ascending : false})
        //     // .gte('created_at', '2025-07-29T00:00:00')
        //     // .lte('created_at', '2025-07-29T23:59:59')
        //     .limit(1)
        //     .limit(1, {referencedTable: 'checkin'})
        //     .then(response => {
        //         console.log('mahita', response)
        //     })

        supabase.from('student')
         .select(`
                    id,
                    name,
                    firstname,
                    picture,
                    checkin (
                        id_student,
                        created_at
                    )
                `)
        .order('created_at', {referencedTable : 'checkin', ascending : false})
        .limit(1, {referencedTable: 'checkin'})
        .then((response: any) => {
            setIsLoading(false);
            if (response.data.length > 0) {

                const students = []
                for (let i = 0; i < response.data.length; i++) {
                    let time = '';

                    if (response.data[i].checkin.length > 0) {
                        const dateC = new Date(response.data[i].checkin[0].created_at);
                        if (dateC.toISOString().split('T')[0] == date) {
                            // Formatter en heure et minute, fuseau GMT+3 (Africa/Nairobi ou Indian/Antananarivo)
                            time = dateC.toLocaleTimeString('fr-FR', {
                                hour: '2-digit',
                                minute: '2-digit',
                                timeZone: 'Indian/Antananarivo', // GMT+3
                            });
                        }
                    }
                    students.push({...response.data[i], time})
                }
                setStudents(students.sort((a, b) => a.time.localeCompare(b.time)))
            
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
                        value={date}
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
                                <p className="text-md font-semibold truncate w-40">{student.name}</p>
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
