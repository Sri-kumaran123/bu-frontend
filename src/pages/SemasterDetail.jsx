import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Printer } from 'lucide-react';

const SemesterDetails = () => {
  const [activeSemester, setActiveSemester] = useState('III');
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const semesters = ['I', 'II', 'III', 'IV'];

  const semesterCourses = {
    'III': [
      { code: '33A', name: 'WEB TECHNOLOGIES', marks: 75 },
      { code: '33B', name: 'BIG DATA ANALYTICS', marks: 85 },
      { code: '33C', name: 'INTERNET OF THINGS', marks: 90 },
      { code: '33D', name: 'CRYPTOGRAPHY AND INFORMATION SECURITY', marks: 80 },
      { code: '37V', name: 'MINI PROJECT AND VIVA VOICE', marks: 100 },
      { code: '3EE', name: 'ELECTIVE IV : PROGRESSIVE WEB APPLICATION DEVELOPMENT', marks: 75 },
      { code: '3EF', name: 'ELECTIVE V: SOFT COMPUTING', marks: 82 },
    ],
    'I': [],
    'II': [],
    'IV': [],
  };

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
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Marks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {semesterCourses[activeSemester]?.map((course, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-600">{course.code}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{course.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 text-right">
                        <input
                          {...register(`marks.${index}`, {
                            required: 'Marks are required',
                            min: { value: 0, message: 'Marks cannot be negative' },
                            max: { value: 100, message: 'Marks cannot exceed 100' }
                          })}
                          type="number"
                          defaultValue={course.marks}
                          className="w-16 p-1 border border-gray-300 rounded-md text-center"
                        />
                        {errors.marks?.[index] && (
                          <p className="text-red-500 text-xs mt-1">{errors.marks[index].message}</p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Save Marks
              </button>
            </div>
          </form>
        </div>

        <div className="border-t p-6 bg-gray-50">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-gray-600">{activeSemester} Semester fees</span>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition-colors">
              <Printer size={18} />
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SemesterDetails;