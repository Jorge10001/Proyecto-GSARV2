import { useMemo } from "react";
import PageHeader from "../../../components/common/PageHeader.jsx";
import { buildDemoExport } from "../../../utils/security.js";

export default function JsonPanel({ usuarios, solicitudes, mensajes }) {
  const payload = useMemo(
    () => JSON.stringify(buildDemoExport({ usuarios, solicitudes, mensajes }), null, 2),
    [usuarios, solicitudes, mensajes]
  );

  function downloadJSON() {
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "gsar-demo-datos.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <PageHeader
        title="Datos JSON"
        text="Exportación saneada de la demo. No incluye contraseñas, hashes ni secretos."
        actions={
          <span className="count-pill">
            <i className="fa-solid fa-shield-halved" aria-hidden="true"></i>
            Datos saneados
          </span>
        }
      />

      <section className="json-panel" aria-label="Exportación JSON de la demo">
        <div className="code-toolbar">
          <div>
            <span className="eyebrow">Vista previa</span>
            <strong className="code-title">gsar-demo-datos.json</strong>
          </div>
          <div className="json-actions">
            <span className="code-badge">
              <i className="fa-solid fa-lock" aria-hidden="true"></i>
              Sin secretos
            </span>
            <button className="primary-button" type="button" onClick={downloadJSON}>
              <i className="fa-solid fa-download" aria-hidden="true"></i>
              Descargar JSON
            </button>
          </div>
        </div>
        <pre>{payload}</pre>
      </section>
    </>
  );
}
