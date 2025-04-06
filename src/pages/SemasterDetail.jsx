import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Printer } from 'lucide-react';
import { getAllSemesters, getSemester } from '../api/semesterdeatil.api';
import { getOneStudent } from '../api/student.api';

const SemesterDetails = ({user}) => {
  const [activeSemester, setActiveSemester] = useState('III');
  const [studentData, setStudentData] = useState({});
  const [semData, setSemData] = useState([]);

  useEffect(()=>{
    getOneStudent()
    .then((res)=>{
      console.log(res.data)
      setStudentData(_=>res.data);
    })
  },[])
  useEffect(()=>{
    console.log(studentData?.batch?._id,activeSemester)
    getSemester(studentData?.batch?._id,activeSemester)
    .then(res=>{
      console.log(res);
      setSemData(_=>res);
    })
  },[activeSemester]);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const semesters = ['I', 'II', 'III', 'IV'];

 

  const onSubmit = (data) => {
    console.log('Updated Marks:', data);
    alert('Marks updated successfully!');
    reset();
  };

  return (
    <div className="p-8">

      <div className="flex justify-center gap-4 mb-8">
        {semesters.map((semester) => (
          <button
            key={semester}
            onClick={() => setActiveSemester(semester)}
            className={`px-6 py-2 rounded-full transition-colors ${
              activeSemester === semester
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {semester} Semester
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">{activeSemester} Semester</h2>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="overflow-x-auto">
              <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Code</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Course Name</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
  {semData?.subjects?.map((subject, index) => (
    <tr key={index} className="hover:bg-gray-50">
      <td className="px-6 py-4 text-sm text-gray-600">{subject.code}</td>
      <td className="px-6 py-4 text-sm text-gray-900">{subject.name}</td>
    </tr>
  ))}
</tbody>

              </table>
            </div>
            <div className="flex justify-end mt-4">
              {/* <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Save Marks
              </button> */}
            </div>
          </form>
        </div>

        <div className="border-t p-6 bg-gray-50">
          {/* <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-gray-600">{activeSemester} Semester fees</span>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition-colors">
              <Printer size={18} />
              Print
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SemesterDetails;