function Imagenes() {
  return (
    <>
    <section className="py-5" id="acerca-de" style={{ background:'#bebebe7c', width: '100%' }}>
  <div className="container">
    <div className="row">

      <div className="col-md-5 mb-6 mb-md-0 ms-4">
        <img 
                src="../../src/assets/Imgdescripcion.jpg"
          alt="Triu Raclette Cheese" 
          className="img-fluid rounded shadow-lg "
        
        />
      </div>
      <div className="col-md-6 ms-auto"  style={{color: '#050735' }}>
      <h2 className="display-4" style={{ color: '#ffbb00' }}>Acerca de Triu Raclette Cheese</h2>
  <p className="lead " style={{ color: '#000127' }}>
    Triu Raclette Cheese es una empresa dedicada a la producción y comercialización de quesos artesanales de alta calidad, especializada en la Raclette, un queso suizo famoso por su suavidad, sabor cremoso y versatilidad para ser derretido. 
  </p>
  <p className="" style={{ color: '#000127' }}>
    Desde nuestro negocio, hemos mantenido un compromiso con la excelencia en la producción de quesos, utilizando ingredientes frescos y técnicas tradicionales para ofrecer un producto único en el mercado. Cada paso de nuestra producción está cuidadosamente supervisado para garantizar un queso auténtico, ideal para compartir en una raclette, derretido sobre papas, verduras o carnes, en cualquier ocasión especial.
  </p>
  <p className="" style={{ color: '#000127' }}>
    Nuestro equipo de expertos sigue fielmente las tradiciones de la fabricación de quesos, mientras incorporamos innovación para satisfacer las expectativas de nuestros clientes. En Triu Raclette, nos enorgullece ofrecer productos que representan la calidad, el sabor y la tradición en cada bocado.
  </p>
</div>

    </div>
  </div>
</section>

    </>
  );
}

export default Imagenes;
