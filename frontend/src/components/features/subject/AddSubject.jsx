import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSubject,
  resetSubject,
} from "../../../store/features/auth/subjectSlice";

const AddSubject = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((s) => s.subject);

  const [subject, setSubject] = useState({
    name: "",
    description: "",
    color: "",
    icon: "",
    classes: [],
  });

  const addClass = () => {
    setSubject({
      ...subject,
      classes: [
        ...subject.classes,
        { classId: "", name: "", hasPaper: true, papers: [], chapters: [] },
      ],
    });
  };

  const addPaper = (cIndex) => {
    const updated = [...subject.classes];
    updated[cIndex].papers.push({
      paperId: "",
      name: "",
      hasPaper: true,
      chapters: [],
    });
    setSubject({ ...subject, classes: updated });
  };

  const addChapter = (cIndex, pIndex) => {
    const updated = [...subject.classes];
    updated[cIndex].papers[pIndex].chapters.push({ name: "" });
    setSubject({ ...subject, classes: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createSubject(subject));
  };

  useEffect(() => {
    if (success) {
      alert("Subject Created!");
      dispatch(resetSubject());
      setSubject({
        name: "",
        description: "",
        color: "",
        icon: "",
        classes: [],
      });
    }
  }, [success]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Subject</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Subject Name"
          className="input"
          onChange={(e) => setSubject({ ...subject, name: e.target.value })}
        />

        <input
          placeholder="Description"
          className="input"
          onChange={(e) =>
            setSubject({ ...subject, description: e.target.value })
          }
        />

        <input
          placeholder="Tailwind Color (from-green-500 to-blue-500)"
          className="input"
          onChange={(e) => setSubject({ ...subject, color: e.target.value })}
        />

        <input
          placeholder="Icon (BookOpen, Globe etc)"
          className="input"
          onChange={(e) => setSubject({ ...subject, icon: e.target.value })}
        />

        {/* Classes */}
        <button
          type="button"
          onClick={addClass}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          ➕ Add Class
        </button>

        {subject.classes.map((cls, cIndex) => (
          <div key={cIndex} className="border p-4 rounded mt-4">
            <input
              placeholder="Class ID (class-9)"
              className="input"
              onChange={(e) => {
                const updated = [...subject.classes];
                updated[cIndex].classId = e.target.value;
                setSubject({ ...subject, classes: updated });
              }}
            />

            <input
              placeholder="Class Name"
              className="input mt-2"
              onChange={(e) => {
                const updated = [...subject.classes];
                updated[cIndex].name = e.target.value;
                setSubject({ ...subject, classes: updated });
              }}
            />

            <button
              type="button"
              onClick={() => addPaper(cIndex)}
              className="bg-green-500 text-white px-3 py-1 mt-2 rounded"
            >
              ➕ Add Paper
            </button>

            {cls.papers.map((paper, pIndex) => (
              <div key={pIndex} className="ml-4 mt-3 border p-3 rounded">
                <input
                  placeholder="Paper ID"
                  className="input"
                  onChange={(e) => {
                    const updated = [...subject.classes];
                    updated[cIndex].papers[pIndex].paperId = e.target.value;
                    setSubject({ ...subject, classes: updated });
                  }}
                />

                <input
                  placeholder="Paper Name"
                  className="input mt-2"
                  onChange={(e) => {
                    const updated = [...subject.classes];
                    updated[cIndex].papers[pIndex].name = e.target.value;
                    setSubject({ ...subject, classes: updated });
                  }}
                />

                <button
                  type="button"
                  onClick={() => addChapter(cIndex, pIndex)}
                  className="bg-purple-500 text-white px-2 py-1 mt-2 rounded"
                >
                  ➕ Add Chapter
                </button>

                {paper.chapters.map((ch, chIndex) => (
                  <input
                    key={chIndex}
                    placeholder="Chapter Name"
                    className="input mt-2"
                    onChange={(e) => {
                      const updated = [...subject.classes];
                      updated[cIndex].papers[pIndex].chapters[chIndex].name =
                        e.target.value;
                      setSubject({ ...subject, classes: updated });
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded"
        >
          {loading ? "Saving..." : "Save Subject"}
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default AddSubject;
