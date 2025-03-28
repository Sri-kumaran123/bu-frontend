import { useState } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllCircularsApi } from "../api/circular.api";

export default function Circularpage() {
    
    const [viewedCircular, setViewedCircular] = useState(null);
    const [circulardata, setCirculardata] = useState([]);
    useState(()=>{
        getAllCircularsApi()
        .then(res=>{
            console.log(res);
            setCirculardata(_=>res);
        })
    },[]);
    const circulars = [
        { date: '15/03/2025', type: 'Circular', content: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop' },
        { date: '10/03/2025', type: 'Circular', content: 'https://images.unsplash.com/photo-1586281380117-8c2eadb2d094?w=800&h=600&fit=crop' },
    ];

    const notifications = [
        { date: '15/03/2025', type: 'Notification', content: 'End Semester Examination Schedule Released' },
        { date: '10/03/2025', type: 'Notification', content: 'Fee Payment Deadline Extended' },
        { date: '09/03/2025', type: 'Notification', content: 'Workshop on Advanced Web Technologies' },
        { date: '05/03/2025', type: 'Notification', content: 'Internal Assessment Marks Published' },
        { date: '14/02/2025', type: 'Notification', content: 'Holiday Notice - University Foundation Day' },
    ];

    

    const cricular_show = circulardata.map((circular, index) => (
        <div key={index} className="flex flex-col py-2 border-b last:border-0">
            <div className="flex justify-between items-center">
                <span className="text-gray-600">{"date"}</span>
                <a
    className="text-blue-600 hover:underline cursor-pointer"
    onClick={() => setViewedCircular(index === viewedCircular ? null : index)}
    href={`http://localhost:3000/file/download/${circular.file}`} // Fixed missing slash
    download // Ensures file is downloaded instead of opening
>
    {viewedCircular === index ? "Hide" : "View"}
</a>
            </div>
            <p className="mt-1">{circular.content}</p>
            
        </div>
    ));

    

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Circular</h2>
                {cricular_show}
            </div>

            
        </div>
    );
}
