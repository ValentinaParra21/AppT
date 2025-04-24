function Productos() {
  return (
      <>
<section className="container py-5" style={{ width: '180%' }}>
<h2 className="text-center mb-4">Nuestros Productos</h2>
<div className="row">

  <div className="col-md-3 mb-4">
    <div className="card">
      <img 
        src="../../src/assets/clasico.jpg" 
        alt="Raclette Clásico"
        className="card-img-top img-fluid" // Ajuste para que las imágenes sean fluidas y se mantengan al mismo tamaño
        style={{ height: '300px', objectFit: 'cover' }} // Establecer una altura fija y ajustar la imagen
      />
      <div className="card-body">
        <h5 className="card-title">Raclette Clásico</h5>
        <p className="card-text">
          El queso Raclette tradicional, ideal para fundir y disfrutar en diversas preparaciones.
        </p>
      </div>
    </div>
  </div>

  <div className="col-md-3 mb-4">
    <div className="card"  style={{ background: '#000127', color:'white'}}>
      <img 
        src="../../src/assets/Ahumado.png" 
        alt="Raclette Ahumada"
        className="card-img-top img-fluid"
        style={{ height: '300px', objectFit: 'cover' }}
      />
      <div className="card-body">
        <h5 className="card-title" style={{ color:'#ffbb00'}}>Raclette Ahumada</h5>
        <p className="card-text">
          Una variante con un toque ahumado que agrega profundidad y sabor único a tus platos.
        </p>
      </div>
    </div>
  </div>

 
  <div className="col-md-3 mb-4">
    <div className="card">
      <img 
        src="../../src/assets/especias.png"
        alt="Raclette con Especias"
        className="card-img-top img-fluid"
        style={{ height: '300px', objectFit: 'cover' }}
      />
      <div className="card-body">
        <h5 className="card-title">Raclette con Especias</h5>
        <p className="card-text">
          Queso Raclette con una mezcla especial de especias para un sabor más audaz.
        </p>
      </div>
    </div>
  </div>

 
  <div className="col-md-3 mb-4">
    <div className="card"  style={{ background: '#000127', color:'white'}}>
      <img 
        src="../../src/assets/derretido.png"
        alt="Queso Derretido"
        className="card-img-top img-fluid"
        style={{ height: '300px', objectFit: 'cover'}}
      />
      <div className="card-body">
        <h5 className="card-title " style={{ color:'#ffbb00'}}>Queso Derretido</h5>
        <p className="card-text">
          Un queso diseñado específicamente para derretirse fácilmente, perfecto para acompañar platos como fondue.
        </p>
      </div>
    </div>
  </div>
</div>
</section>

      </>
  );
}

export default Productos;
