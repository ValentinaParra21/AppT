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
              src="https://scontent.fbog5-1.fna.fbcdn.net/v/t39.30808-6/232873065_334323495021976_1367471279343893510_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=3a1ebe&_nc_eui2=AeExQS-oW3qbtg3Yy7UkoF56kx-5bI5rkKuTH7lsjmuQq1A6DVXIFgGiv7ZA5pEfqf3x60U6O48HlqW0gZsXso3q&_nc_ohc=3exvm5H97cEQ7kNvgFKgUZx&_nc_zt=23&_nc_ht=scontent.fbog5-1.fna&_nc_gid=AjZffSvI5TDuR1Dvx_zL1zS&oh=00_AYAZR8Hv2ZzOj27pWtJ2fONk26TitFQk1NNSsdGzsDLzsA&oe=675BF75B"
              className="d-block w-100"
              style={{ objectFit: 'cover', height: '100%' }}
              alt="..."
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
              src="https://scontent.fbog5-1.fna.fbcdn.net/v/t1.6435-9/165869881_248141656973494_1956207615330703447_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=3a1ebe&_nc_eui2=AeESJU2Om3feba2gm_oGPEUNjNwgX4RKQbyM3CBfhEpBvPlO5Um1SkOHplO5pWcd5so0NC0b50bTzJvi4NpjyiYs&_nc_ohc=LUiZ94Se7JkQ7kNvgF2m0rd&_nc_zt=23&_nc_ht=scontent.fbog5-1.fna&_nc_gid=A2IRl8L-mhuGwj6LJP1PTyA&oh=00_AYC5Tv1bfQV3iY5avsdRZey258pwXS1YQuoV8HY7wEfUlQ&oe=677D8473"
              className="d-block w-100"
              style={{ objectFit: 'cover', height: '100%' }}
              alt="..."
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
              src="https://scontent.fbog5-1.fna.fbcdn.net/v/t39.30808-6/246715766_382497213537937_9180493580614727225_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=3a1ebe&_nc_eui2=AeGkRaIxvUqsLdus0sPvhJpsciO2_qmPbeRyI7b-qY9t5PH0lT8aK0DbPSJG0Fzn1BCvUhgAk2JVfQ6rGxUaFORu&_nc_ohc=8MVgGUrkP68Q7kNvgEFN6Ym&_nc_zt=23&_nc_ht=scontent.fbog5-1.fna&_nc_gid=AzhZyAYKqz82SN4PSqwMjKq&oh=00_AYCHfDQUd8N6YyipGR9SOjp7Z05iycorO7SLQjTN-5YvIg&oe=675C18D3"
              className="d-block w-100"
              style={{ objectFit: 'cover', height: '100%' }}
              alt="..."
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
