import React from 'react';
import { CCard, CCardBody, CRow, CCol, CButton, CContainer } from '@coreui/react-pro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import './Dashboard.css';

const DashboardMain = () => {
  const handleGenerateCertificate = () => {
    window.open("https://cert.sdgstelkomuniversity.my.id", "_blank");
  };

  return (
    <CContainer className="dashboard-container my-5">
      <div className="text-center mb-5">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">
          Selamat datang di Dashboard SDGs Telkom University. Di sini, Anda dapat memantau kontribusi serta pencapaian dalam mendukung Tujuan Pembangunan Berkelanjutan. Unggah karya ilmiah Anda untuk berkolaborasi dalam menciptakan masa depan yang lebih hijau dan raih sertifikat resmi sebagai bukti komitmen.
        </p>
      </div>
      <CCard className="mb-5 shadow-lg custom-card">
        <CCardBody className="custom-card-body">
          <CRow className="align-items-center">
            <CCol md="5" className="text-center">
              <img
                src="https://dinaspmd.kalselprov.go.id/wp-content/uploads/2023/11/SDGs-Indonesia.jpg"
                alt="SDGs Indonesia"
                className="img-fluid rounded custom-image"
              />
            </CCol>
            <CCol md="7">
              <h3 className="card-title">Peroleh Sertifikat SDGs Anda</h3>
              <p className="card-text">
                Unggah karya ilmiah Anda dan bergabunglah dalam gerakan berkelanjutan. Sertifikat resmi ini mencerminkan dedikasi Anda dalam mendukung pembangunan berkelanjutan dan komitmen terhadap masa depan yang lebih hijau.
              </p>
              <p className="card-text">
                Klik tombol di bawah ini untuk melihat detail sertifikat serta informasi kontribusi Anda secara menyeluruh.
              </p>
              <div className="text-center text-md-start mt-4">
                <CButton 
                  color="success" 
                  onClick={handleGenerateCertificate} 
                  className="px-4 certificate-button text-white d-flex align-items-center"
                >
                  <FontAwesomeIcon icon={faCertificate} className="me-2" />
                  Buka Halaman Sertifikat
                  <motion.div 
                    className="ms-2"
                    animate={{ x: [0, 5, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.6 }}
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </motion.div>
                </CButton>
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default DashboardMain;
