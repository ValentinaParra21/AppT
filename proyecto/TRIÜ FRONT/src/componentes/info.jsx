function Info() {
  return (
    <>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{ height: '60vh', width: '100vw' }}
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner" style={{ height: '100%' }}>

          <div className="carousel-item active" style={{ height: '100%' }}>
            <img

              src={('../../src/assets/Inicio.1.png')}
              className="d-block w-100"
              style={{
                height: '100%',
                objectFit: 'cover',         // ajusta la imagen al contenedor sin repetirla
                objectPosition: 'center',   // opcional, centra el recorte
              }}

            />
            <div className="carousel-caption">
              <h1 className="custom-text " style={{
                fontFamily: 'Arial, sans-serif',
                fontWeight: 700,
                color: 'white',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}>TRIU</h1>
            </div>
          </div>

          <div className="carousel-item" style={{ height: '100%' }}>
            <img
              src={('../../src/assets/Inicio.2.png')}
              className="d-block w-100"
              style={{
                height: '100%',
                objectFit: 'cover',         // ajusta la imagen al contenedor sin repetirla
                objectPosition: 'center',   // opcional, centra el recorte
              }}

            />
            <div className="carousel-caption">
              <h1 className="custom-text " style={{
                fontFamily: 'Arial, sans-serif',
                fontWeight: 700,
                color: 'white',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}>RACLETTE</h1>
            </div>
          </div>

          <div className="carousel-item" style={{ height: '100%' }}>
            <img
              src={('../../src/assets/Inicio.3.png')}
              className="d-block w-100"
              style={{
                height: '100%',
                objectFit: 'cover',         // ajusta la imagen al contenedor sin repetirla
                objectPosition: 'center',   // opcional, centra el recorte
              }}
            />
            <div className="carousel-caption">
              <h1 className="custom-text " style={{
                fontFamily: 'Arial, sans-serif',
                fontWeight: 700,
                color: 'white',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}>CHEESE</h1>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}

export default Info;
