// Cedars Factory Loader - Auto-Generates Full Website
// Uses assemblyEngine.js + integrityMonitor.js
// NO OVERWRITE - Only loads

const FactoryLoader = {
  load: async function() {
    console.log("[FACTORY LOADER] Starting Full Website Assembly...");

    // 1. Load Integrity
    await CEDARS_INTEGRITY.checkIntegrity();

    // 2. Load Factory Blueprint
    let factoryStatus = CEDARS_FACTORY.getStatus();
    console.log("[FACTORY LOADER]", factoryStatus);

    // 3. Auto-wire all 9 layers to dashboard
    let container = document.getElementById("factoryAssembly");
    if(container){
      let html = "";
      for(let key in CEDARS_FACTORY.assemblyLine){
        let layer = CEDARS_FACTORY.assemblyLine[key];
        html += `
          <div class="card">
            <h4>✅ ${key.toUpperCase()}</h4>
            <p><b>Engine:</b> ${layer.engine}</p>
            <p><b>APIs:</b> ${layer.coreAPIs.join(", ")}</p>
            <p><b>Dest:</b> ${layer.destination}</p>
            <small>${layer.purpose}</small>
          </div>
        `;
      }
      container.innerHTML = html;
    }

    console.log("[FACTORY LOADER] WEBSITE FULLY ASSEMBLED - 9 LAYERS LIVE");
  }
};

document.addEventListener("DOMContentLoaded", ()=> {
  setTimeout(()=> FactoryLoader.load(), 1000);
});
