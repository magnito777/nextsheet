'use client';

import { useState } from 'react';

export default function MyForm() {
  const [formData, setFormData] = useState({
    patientnumber: '',
    studyNumber: '',
    xraynumber: '',
    age: '',
    sex: '',
    residence: '',
    // add more fields as necessary
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit form');

      const result = await response.json();
      console.log('Form submitted successfully:', result);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="patientnumber"
        placeholder="Patient Number"
        value={formData.patientnumber}
        onChange={handleChange}
      />
      <input
        type="text"
        name="studyNumber"
        placeholder="Study Number"
        value={formData.studyNumber}
        onChange={handleChange}
      />
      <input
        type="text"
        name="xraynumber"
        placeholder="X-ray Number"
        value={formData.xraynumber}
        onChange={handleChange}
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
      />
      <input
        type="text"
        name="sex"
        placeholder="Sex"
        value={formData.sex}
        onChange={handleChange}
      />
      <input
        type="text"
        name="residence"
        placeholder="Area of Residence"
        value={formData.residence}
        onChange={handleChange}
      />
      {/* Add more fields as needed */}
      <button type="submit">Submit</button>
    </form>
  );
}
