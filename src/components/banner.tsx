// src/components/Banner.tsx
const Banner = () => {
  return (
    <div
      style={{
        maxWidth: "400px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        src="/images/twelveCelebrity.jpg"
        alt="Twelve Celebrity"
        style={{
          width: "100px",
          height: "100px",
          objectFit: "cover",
          borderRadius: "50%",
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
          marginBottom: "1rem",
          transition: "transform 0.3s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />

      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: 600,
          margin: 0,
          color: "#2c3e50",
          textAlign: "center",
        }}
      >
        Twelve Celebrity
      </h2>
      <p
        style={{
          fontSize: "0.8rem",
          fontWeight: 400,
          color: "#808080",
          margin: 0,
          textAlign: "center",
        }}
      >
        Checking System...
      </p>
    </div>
  );
};

export default Banner;
