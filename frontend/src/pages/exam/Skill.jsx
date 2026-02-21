import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Skill = () => {
  const { examSlug, skillSlug } = useParams();
  useEffect(() => {
    const res = axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/tests/examSlug=${examSlug}&skillSlug=${skillSlug}`,
    );
    const data = res.data;
    console.log(data);
  }, []);

  return (
    <div>
      <h2>Skill</h2>
      <h2>{examSlug}</h2>
    </div>
  );
};

export default Skill;
