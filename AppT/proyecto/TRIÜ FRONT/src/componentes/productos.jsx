function Productos() {
  return (
      <>
<section className="container py-5" style={{ width: '180%' }}>
<h2 className="text-center mb-4">Nuestros Productos</h2>
<div className="row">

  <div className="col-md-3 mb-4">
    <div className="card">
      <img 
                src="https://scontent.fbog5-1.fna.fbcdn.net/v/t39.30808-6/275002443_468910858229905_8450448991415654041_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=3a1ebe&_nc_eui2=AeGpjm98tsaPmbR2sTdCOmYJlG9Fp2iuYJGUb0WnaK5gkRmINHXPXgxHnL2n5KWyF0N0Uuv5NI5qU18iUeWHu9tM&_nc_ohc=W5MglOeunDoQ7kNvgGUzEVi&_nc_zt=23&_nc_ht=scontent.fbog5-1.fna&_nc_gid=AgfAlvCwIhmne2zvg0rTZCg&oh=00_AYAqoRwOPhZ-q3bd-oFmCBIf8mEoE9qul9zcD35twHTN3Q&oe=675C0778" 
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
                src="https://scontent.fbog5-1.fna.fbcdn.net/v/t39.30808-6/252534860_390686119385713_1923023735748083278_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=3a1ebe&_nc_eui2=AeG24ZiwaCl2OIDx3SphP9R4xmOvvr3uYzXGY6--ve5jNYvUeOmuOx_m6kMd2RrGfPfA5F7fGqbeLl8DXCPcx5s6&_nc_ohc=r9JKN4uPJqAQ7kNvgG6W5DF&_nc_zt=23&_nc_ht=scontent.fbog5-1.fna&_nc_gid=AihZ2VJrlFWZkeOQeW3iF2l&oh=00_AYD8VYGGe1EZk2uI3auljnmfMvfn3JAXegTo7Gd3P9Wp5w&oe=675BEA5B" 
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
                src="https://scontent.fbog5-1.fna.fbcdn.net/v/t39.30808-6/280076262_505602117894112_7588734962112820905_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=3a1ebe&_nc_eui2=AeHhIoPhcA0Xqfzd3XwWgAi8iv_eBHVOinCK_94EdU6KcFW1CU3issRXv67DX3ij46ApHQEmiZ0AR17WSWa6yhTI&_nc_ohc=yroZWtsJfEkQ7kNvgFaAivv&_nc_zt=23&_nc_ht=scontent.fbog5-1.fna&_nc_gid=Aegh0npavXNpctmd0KFasSu&oh=00_AYA7WQcLf9AerPlH51Yb7Ud8nvvd8mTEVWyRIc55emlgng&oe=675C0BFB" 
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
                src="https://scontent.fbog5-1.fna.fbcdn.net/v/t39.30808-6/278610411_491377139316610_3353066303585601532_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=3a1ebe&_nc_eui2=AeEKsI9jLLpqVIer_IKqZGiiTBt87fI1guRMG3zt8jWC5IT9aut-zkStiMH4-Ow42ZZymRoJchi4PtX9M_Uu8VOU&_nc_ohc=OWrYofzrFYAQ7kNvgEg_InB&_nc_zt=23&_nc_ht=scontent.fbog5-1.fna&_nc_gid=AqeySqY-3RvrUGrRt4NpiD7&oh=00_AYBnQx40JwlXmJVVEQvdgLojGAmQkoY2kLcYIG8rOdS_sg&oe=675C1519" 
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
