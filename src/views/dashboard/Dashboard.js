import React, { useState } from 'react';
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CForm,
  CFormInput,
  CFormTextarea,
  CButton,
  CSpinner,
} from '@coreui/react-pro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css'; // We'll create this file for custom styles

const Dashboard = () => {
  const [formData, setFormData] = useState({
    Judul: '',
    Penulis: '',
    Tahun: '',
    Source: '',
    Abstrak: '',
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:3900/model/paper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSubmittedData(data);
      } else {
        console.error("Error submitting data");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="dashboard-container">
      <CCard className="mb-4">
        <CCardBody>
          <h1 className="text-center mb-4">SDGs</h1>
          <p className="text-center mb-4">Pemetaan 17 Bidang Tujuan Pembangunan Berkelanjutan (SDGs) Dosen Telkom University</p>
          <img
            src="https://dinaspmd.kalselprov.go.id/wp-content/uploads/2023/11/SDGs-Indonesia.jpg"
            alt="SDGs Indonesia"
            className="img-fluid rounded mx-auto d-block"
          />
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardBody>
          <h3 className="text-center mb-4">Submit Paper Data</h3>
          <CForm onSubmit={handleSubmit}>
            <CRow className="mb-3">
              <CCol md="6">
                <CFormInput
                  label="Judul"
                  name="Judul"
                  placeholder="Masukkan judul"
                  value={formData.Judul}
                  onChange={handleChange}
                  required
                />
              </CCol>
              <CCol md="6">
                <CFormInput
                  label="Penulis"
                  name="Penulis"
                  placeholder="Masukkan penulis"
                  value={formData.Penulis}
                  onChange={handleChange}
                  required
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md="6">
                <CFormInput
                  label="Tahun"
                  name="Tahun"
                  type="number"
                  placeholder="Masukkan tahun"
                  value={formData.Tahun}
                  onChange={handleChange}
                  required
                />
              </CCol>
              <CCol md="6">
                <CFormInput
                  label="Source"
                  name="Source"
                  placeholder="Masukkan sumber"
                  value={formData.Source}
                  onChange={handleChange}
                  required
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormTextarea
                  label="Abstrak"
                  name="Abstrak"
                  rows="4"
                  placeholder="Masukkan abstrak"
                  value={formData.Abstrak}
                  onChange={handleChange}
                  required
                />
              </CCol>
            </CRow>
            <div className="text-center">
              <CButton type="submit" color="primary" className="px-4" disabled={isSubmitting}>
                {isSubmitting ? <CSpinner size="sm" /> : 'Submit'}
              </CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>

      {submittedData && (
        <CCard className="mt-4 submitted-data-card">
          <CCardBody>
            <h4 className="text-center mb-4">Submitted Data</h4>
            <div className="submitted-data-content">
              <div className="data-item">
                <h5>Judul:</h5>
                <p>{submittedData.data.Judul}</p>
              </div>
              <div className="data-item">
                <h5>Penulis:</h5>
                <p>{submittedData.data.Penulis}</p>
              </div>
              <div className="data-item">
                <h5>Abstrak:</h5>
                <p>{submittedData.data.Abstrak}</p>
              </div>
              <div className="data-item">
                <h5>Tahun:</h5>
                <p>{submittedData.data.Tahun}</p>
              </div>
              <div className="data-item">
                <h5>SDGs:</h5>
                <ul className="sdgs-list">
                  {submittedData.data.Sdgs.map((sdg, index) => (
                    <li key={index}>
                      <img
                        src={`/images/${sdg}.png`}
                        alt={`SDGS ${sdg}`}
                        className="sdg-icon"
                      />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="data-item">
                <h5>Source:</h5>
                <p>{submittedData.data.Source}</p>
              </div>
              <div className="text-center mt-4">
                <CButton
                  color="success"
                  href="https://cert.sdgstelkomuniversity.my.id"
                  target="_blank"
                  className="px-4 print-certificate-button"
                >
                  <FontAwesomeIcon icon={faPrint} className="me-2" />
                  Print Certificate
                </CButton>
              </div>
            </div>
          </CCardBody>
        </CCard>
      )}
    </div>
  );
};

export default Dashboard;

