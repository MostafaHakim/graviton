import React, { useEffect, useState } from "react";
import uploadPhotoToCloudinary from "../utils/cloudinery";
import { useDispatch, useSelector } from "react-redux";
import { getClasses } from "../store/features/auth/classesSlice";

const TalentForm = ({ handleAddTalent }) => {
  const [loading, setLoading] = useState(false);
  const { classes } = useSelector((state) => state.classes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);
  const [formData, setFormData] = useState({
    title: "",
    bannerUrl: "",
    public_id: "",

    feilds: [{ lable: "", value: "" }],

    examDetails: [
      {
        className: "",
        vanue: "",
        date: "",
        time: "",
        imageUrl: "",
        public_id: "",
      },
    ],

    contacts: [{ name: "", dasignation: "", mobile: "" }],

    rules: [{ name: "", rule: "" }],
  });

  // title change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Banner Upload
  const handleBannerUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    const data = await uploadPhotoToCloudinary(file);

    setFormData({
      ...formData,
      bannerUrl: data.url,
      public_id: data.public_id,
    });

    setLoading(false);
  };

  // Fields
  const handleFieldChange = (index, e) => {
    const values = [...formData.feilds];
    values[index][e.target.name] = e.target.value;

    setFormData({ ...formData, feilds: values });
  };

  const addField = () => {
    setFormData({
      ...formData,
      feilds: [...formData.feilds, { lable: "", value: "" }],
    });
  };

  // Rules
  const handleRuleChange = (index, e) => {
    const values = [...formData.rules];
    values[index][e.target.name] = e.target.value;

    setFormData({ ...formData, rules: values });
  };

  const addRule = () => {
    setFormData({
      ...formData,
      rules: [...formData.rules, { name: "", rule: "" }],
    });
  };

  // Contacts
  const handleContactChange = (index, e) => {
    const values = [...formData.contacts];
    values[index][e.target.name] = e.target.value;

    setFormData({ ...formData, contacts: values });
  };

  const addContact = () => {
    setFormData({
      ...formData,
      contacts: [
        ...formData.contacts,
        { name: "", dasignation: "", mobile: "" },
      ],
    });
  };

  // Exam change
  const handleExamChange = (index, e) => {
    const values = [...formData.examDetails];
    values[index][e.target.name] = e.target.value;

    setFormData({
      ...formData,
      examDetails: values,
    });
  };

  // Add exam
  const addExam = () => {
    setFormData({
      ...formData,
      examDetails: [
        ...formData.examDetails,
        {
          className: "",
          vanue: "",
          date: "",
          time: "",
          imageUrl: "",
          public_id: "",
        },
      ],
    });
  };

  // Exam Image Upload
  const handleExamImageUpload = async (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = await uploadPhotoToCloudinary(file);

    const values = [...formData.examDetails];
    values[index].imageUrl = data.url;
    values[index].public_id = data.public_id;

    setFormData({
      ...formData,
      examDetails: values,
    });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleAddTalent(formData);

    alert("Talent Hunt Created");

    setFormData({
      title: "",
      bannerUrl: "",
      public_id: "",
      feilds: [{ lable: "", value: "" }],
      examDetails: [
        {
          className: "",
          vanue: "",
          date: "",
          time: "",
          imageUrl: "",
          public_id: "",
        },
      ],
      contacts: [{ name: "", dasignation: "", mobile: "" }],
      rules: [{ name: "", rule: "" }],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Talent Hunt Create</h2>

      {/* Title */}

      <input
        name="title"
        placeholder="Title"
        className="border p-2 w-full"
        onChange={handleChange}
      />

      {/* Banner */}

      <h3 className="font-semibold">Banner</h3>

      <input type="file" onChange={handleBannerUpload} />

      {formData.bannerUrl && <img src={formData.bannerUrl} className="w-60" />}

      {/* Fields */}

      <h3 className="font-semibold">Fields</h3>

      {formData.feilds.map((field, index) => (
        <div key={index} className="flex gap-2">
          <input
            name="lable"
            placeholder="Label"
            className="border p-2"
            onChange={(e) => handleFieldChange(index, e)}
          />

          <input
            name="value"
            placeholder="Value"
            className="border p-2"
            onChange={(e) => handleFieldChange(index, e)}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addField}
        className="bg-gray-200 px-3 py-1"
      >
        Add Field
      </button>

      {/* Exam Details */}

      <h3 className="font-semibold">Exam Details</h3>

      {formData.examDetails.map((exam, index) => (
        <div key={index} className="border p-3 space-y-2">
          <select
            name="className"
            className="border p-2 w-full capitalize"
            onChange={(e) => handleExamChange(index, e)}
            id=""
          >
            <option value="">--একটি শ্রেণী সিলেক্ট করুন--</option>
            {classes &&
              classes.map((cls) => (
                <option className="text-black capitalize" value={cls.name}>
                  {cls.name}
                </option>
              ))}
          </select>

          <input
            name="vanue"
            placeholder="Venue"
            className="border p-2 w-full"
            onChange={(e) => handleExamChange(index, e)}
          />

          <input
            type="date"
            name="date"
            className="border p-2 w-full"
            onChange={(e) => handleExamChange(index, e)}
          />

          <input
            name="time"
            placeholder="Time"
            className="border p-2 w-full"
            onChange={(e) => handleExamChange(index, e)}
          />

          <input
            type="file"
            onChange={(e) => handleExamImageUpload(index, e)}
          />

          {exam.imageUrl && <img src={exam.imageUrl} className="w-32" />}
        </div>
      ))}

      <button type="button" onClick={addExam} className="bg-gray-200 px-3 py-1">
        Add Exam
      </button>

      {/* Contacts */}

      <h3 className="font-semibold">Contacts</h3>

      {formData.contacts.map((contact, index) => (
        <div key={index} className="flex gap-2">
          <input
            name="name"
            placeholder="Name"
            className="border p-2"
            onChange={(e) => handleContactChange(index, e)}
          />

          <input
            name="dasignation"
            placeholder="Designation"
            className="border p-2"
            onChange={(e) => handleContactChange(index, e)}
          />

          <input
            name="mobile"
            placeholder="Mobile"
            className="border p-2"
            onChange={(e) => handleContactChange(index, e)}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addContact}
        className="bg-gray-200 px-3 py-1"
      >
        Add Contact
      </button>

      {/* Rules */}

      <h3 className="font-semibold">Rules</h3>

      {formData.rules.map((rule, index) => (
        <div key={index} className="space-y-2">
          <input
            name="name"
            placeholder="Rule Name"
            className="border p-2 w-full"
            onChange={(e) => handleRuleChange(index, e)}
          />

          <textarea
            name="rule"
            placeholder="Rule"
            className="border p-2 w-full"
            onChange={(e) => handleRuleChange(index, e)}
          />
        </div>
      ))}

      <button type="button" onClick={addRule} className="bg-gray-200 px-3 py-1">
        Add Rule
      </button>

      <br />

      <button className="bg-blue-500 text-white px-6 py-2">Submit</button>
    </form>
  );
};

export default TalentForm;
