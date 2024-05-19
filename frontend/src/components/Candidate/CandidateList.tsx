import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../layout/NavBar";
import { Candidate, getCandidates } from "../../services/candidateService";

const Candidates: React.FC = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const handleCreateCandidate = () => {
    navigate("/Candidate/Create");
  };

  useEffect(() => {
    getCandidates().then((candidates) => setCandidates(candidates));
  }, []);

  return (
    <div>
      <NavBar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Candidates</h1>
        <p>
          This section of the website displays a comprehensive list of
          candidates who have applied through our platform. Each entry in the
          table provides detailed information about a candidate, including their
          name, email, phone number, educational background, and work
          experience. This organized format allows recruiters and HR
          professionals to quickly assess and identify the most promising
          candidates for open positions. The table is designed to be
          user-friendly and responsive, ensuring that it can be easily accessed
          from any device. By leveraging advanced filtering and sorting
          capabilities, users can efficiently manage and navigate through the
          candidate data, enhancing the recruitment process.
        </p>

        <div className="flex justify-end my-5">
          <button
            onClick={handleCreateCandidate}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Create Candidate
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Correo</th>
                <th className="px-4 py-2">Teléfono</th>
                <th className="px-4 py-2">Educación</th>
                <th className="px-4 py-2">Experiencia Laboral</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {candidates.map((candidate) => (
                <tr key={candidate.id} className="bg-gray-100 even:bg-white">
                  <td className="border px-4 py-2">
                    {candidate.firstName} {candidate.lastName}
                  </td>
                  <td className="border px-4 py-2">{candidate.email}</td>
                  <td className="border px-4 py-2">{candidate.phone}</td>
                  <td className="border px-4 py-2">{candidate.education}</td>
                  <td className="border px-4 py-2">
                    {candidate.workExperience}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Candidates;
export {};
