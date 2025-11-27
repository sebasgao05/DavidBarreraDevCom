import React from "react";

export default function ImageTest() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Test de Imagenes</h2>
      
      <div style={{ marginBottom: "20px" }}>
        <h3>Imagen de perfil (JPG original):</h3>
        <img 
          src="/profile-david.jpg" 
          alt="Profile JPG" 
          style={{ width: "200px", height: "200px", objectFit: "cover" }}
          onError={(e) => {
            console.error("Error loading JPG:", e);
            (e.target as HTMLImageElement).style.border = "2px solid red";
          }}
          onLoad={() => console.log("JPG loaded successfully")}
        />
      </div>
      
      <div style={{ marginBottom: "20px" }}>
        <h3>Imagen de perfil (WebP):</h3>
        <img 
          src="/profile-david.webp" 
          alt="Profile WebP" 
          style={{ width: "200px", height: "200px", objectFit: "cover" }}
          onError={(e) => {
            console.error("Error loading WebP:", e);
            (e.target as HTMLImageElement).style.border = "2px solid red";
          }}
          onLoad={() => console.log("WebP loaded successfully")}
        />
      </div>
      
      <div style={{ marginBottom: "20px" }}>
        <h3>Proyecto AWS IoT (JPG):</h3>
        <img 
          src="/project-aws-iot.jpg" 
          alt="Project AWS IoT" 
          style={{ width: "300px", height: "200px", objectFit: "cover" }}
          onError={(e) => {
            console.error("Error loading project JPG:", e);
            (e.target as HTMLImageElement).style.border = "2px solid red";
          }}
          onLoad={() => console.log("Project JPG loaded successfully")}
        />
      </div>
      
      <div style={{ marginBottom: "20px" }}>
        <h3>Proyecto Portfolio (JPG):</h3>
        <img 
          src="/project-portfolio.jpg" 
          alt="Project Portfolio" 
          style={{ width: "300px", height: "200px", objectFit: "cover" }}
          onError={(e) => {
            console.error("Error loading portfolio JPG:", e);
            (e.target as HTMLImageElement).style.border = "2px solid red";
          }}
          onLoad={() => console.log("Portfolio JPG loaded successfully")}
        />
      </div>
      
      <div style={{ marginBottom: "20px" }}>
        <h3>Proyecto 2048 (WebP):</h3>
        <img 
          src="/project-2048.webp" 
          alt="Project 2048" 
          style={{ width: "300px", height: "200px", objectFit: "cover" }}
          onError={(e) => {
            console.error("Error loading 2048 WebP:", e);
            (e.target as HTMLImageElement).style.border = "2px solid red";
          }}
          onLoad={() => console.log("2048 WebP loaded successfully")}
        />
      </div>
      
      <div style={{ marginBottom: "20px" }}>
        <h3>Favicon test:</h3>
        <img 
          src="/favicon.webp" 
          alt="Favicon" 
          style={{ width: "64px", height: "64px" }}
          onError={(e) => {
            console.error("Error loading favicon:", e);
            (e.target as HTMLImageElement).style.border = "2px solid red";
          }}
          onLoad={() => console.log("Favicon loaded successfully")}
        />
      </div>
    </div>
  );
}