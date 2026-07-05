function JsonPanel({ usuarios, solicitudes, mensajes }) {
  const payload = useMemo(() => JSON.stringify({ usuarios, solicitudes, mensajes }, null, 2), [usuarios, solicitudes, mensajes]);

  function downloadJSON() {
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "gsar-datos.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <PageHeader title="Datos JSON" text="Representación semiestructurada de la información guardada en localStorage." />
      <section className="json-panel">
        <div className="json-actions">
          <button className="primary-button" onClick={downloadJSON}>
            <i className="fa-solid fa-download"></i>
            Descargar JSON
          </button>
        </div>
        <pre>{payload}</pre>
      </section>
    </>
  );
}
