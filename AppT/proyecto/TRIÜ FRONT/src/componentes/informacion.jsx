function Informacion() {
  return (
    <div
      style={{
        margin: '0',
        padding: '0',
      }}
    >
      <header
        className="hero text-light text-center py-5"
        style={{
          minHeight: '100vh',
          width: '100vw', 
          margin: '0',
          padding: '0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: 'url("https://scontent.fbog5-1.fna.fbcdn.net/v/t1.6435-9/203078913_310858700701789_6434689385345162599_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=3a1ebe&_nc_eui2=AeFclpApiE-MoAgdnUkXyygkEMtUNgDgK3IQy1Q2AOArcqlISQmDq_vu7Jfpvlx4wArCysE0Yjs8GZg_nU2_jRg2&_nc_ohc=mGNRDy85l-MQ7kNvgFWgHwB&_nc_zt=23&_nc_ht=scontent.fbog5-1.fna&_nc_gid=Asg6OMRUSeISXnA7lU_sI8n&oh=00_AYCniZ0FgeUztqJQiSoflwzyrh_tbjSVQ525I4nUdg5iJQ&oe=6769CCBA")', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: '800px',
            textAlign: 'center',
          }}
        >
          <h1 className="display-3 text-black">Bienvenido a Triü Raclette Cheese</h1>
          <p className="lead text-black">
            Es momento de hacer gestion de tu negocio, aqui puedes encontrar todo lo necesario. 
          </p>
          <a
            href="#productos"
            className="btn btn-warning btn-lg"
            style={{
              fontSize: '1.2rem',
              padding: '10px 20px',
            }}
          >
            ADELANTE
          </a>
        </div>
      </header>
    </div>
  );
}

export default Informacion;