import React from 'react';

const Loader = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        flexDirection: 'column',
        backgroundColor: '#141414',
      }}
    >
      <div
        style={{
          border: '5px solid #f3f3f3',
          borderTop: '5px solid #555',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          animation: 'spin 1s linear infinite',
        }}
      />
      <p
        style={{
          fontSize: 14,
          color: '#F1F1F1',
          fontWeight: 800,
          marginTop: 40,
        }}
      >
        Cargando...
      </p>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
