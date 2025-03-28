import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  addNewSubject,
  deleteSubject,
  getSemester,
  getAllSemesters
} from "../api/semesterdeatil.api";
import { getAllBatch } from "../api/batch.api";
import { getallSubject } from "../api/subject.api";

export default function SemesterUpdate() {
  const { register, handleSubmit } = useForm();
  const [batches, setBatches] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [semesterSubjects, setSemesterSubjects] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("I");
  const [loading, setLoading] = useState(false);
  const semesters = ["I", "II", "III", "IV"];

  // Fetch Batches & Subjects
  useEffect(() => {
    async function fetchData() {
      try {
        const batchData = await getAllBatch();
        const subjectData = await getallSubject();
        setBatches(batchData.data);
        setSubjects(subjectData.data);
      } catch (err) {
        console.error("Error fetching initial data:", err);
      }
    }
    fetchData();
  }, []);

  // Fetch Semester Subjects
  useEffect(() => {
    if (selectedBatch && selectedSemester) {
      async function fetchSemesterData() {
        setLoading(true);
        try {
          const semesterData = await getSemester(selectedBatch, selectedSemester);
          setSemesterSubjects(semesterData.subjects || []);
        } catch (error) {
          console.error("Error fetching semester data:", error);
        } finally {
          setLoading(false);
        }
      }
      fetchSemesterData();
    }
  }, [selectedBatch, selectedSemester]);

  // Add Subject to Semester
  const handleAddSubject = async (subjectId) => {
    if (!selectedBatch || !selectedSemester) {
      alert("Please select batch and semester.");
      return;
    }

    setLoading(true);
    try {
      console.log(selectedBatch, selectedSemester, subjectId)
      await addNewSubject({
        batch: selectedBatch,
        semester: selectedSemester,
        subjectId: subjectId,
      });

      // Update UI
      const addedSubject = subjects.find((s) => s._id === subjectId);
      setSemesterSubjects((prev) => [...prev, addedSubject]);

      alert("Subject added successfully!");
    } catch (error) {
      console.error("Error adding subject:", error);
    } finally {
      setLoading(false);
    }
  };

  // Remove Subject from Semester
  const handleRemoveSubject = async (subjectId) => {
    setLoading(true);
    try {
      await deleteSubject({
        batch: selectedBatch,
        semester: selectedSemester,
        subjectId: subjectId,
      });

      // Remove from UI after successful API call
      setSemesterSubjects((prev) => prev.filter((s) => s._id !== subjectId));

      alert("Subject removed successfully!");
    } catch (error) {
      console.error("Error removing subject:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      {/* Batch Dropdown */}
      <div className="max-w-sm mx-auto mt-6">
        <label htmlFor="batch" className="block text-lg font-medium text-gray-700 mb-2">
          Select Batch:
        </label>
        <select
          id="batch"
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
          className="w-full p-3 border rounded-lg text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a batch</option>
          {batches.map((batch) => (
            <option key={batch._id} value={batch._id}>
              {batch.startYear} - {batch.endYear} ({batch.course})
            </option>
          ))}
        </select>
      </div>

      {/* Semester Selection */}
      <div className="flex justify-center gap-4 mb-8 mt-8">
        {semesters.map((semester) => (
          <button
            key={semester}
            onClick={() => setSelectedSemester(semester)}
            className={`px-6 py-2 rounded-full transition-colors ${
              selectedSemester === semester
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {semester} Semester
          </button>
        ))}
      </div>

      {/* Semester Subjects */}
      <h3 className="text-lg font-semibold mt-4">Subjects in {selectedSemester} Semester</h3>
      {loading ? (
        <p className="text-blue-600">Loading...</p>
      ) : semesterSubjects.length === 0 ? (
        <p className="text-gray-500">No subjects added.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {semesterSubjects.map((subject) => (
            <li key={subject._id} className="flex justify-between bg-gray-100 p-3 rounded-lg">
              <span>{subject.name}</span>
              <button
                onClick={() => handleRemoveSubject(subject._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Add Subject to Semester */}
      <h3 className="text-lg font-semibold mt-8">Add a Subject</h3>
      <select
        onChange={(e) => handleAddSubject(e.target.value)}
        className="w-full p-3 mt-2 border rounded-lg text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select a subject</option>
        {subjects.map((subject) => (
          <option key={subject._id} value={subject._id}>
            {subject.name}
          </option>
        ))}
      </select>
    </div>
  );
}
