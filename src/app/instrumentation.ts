console.log("🧪 instrumentation.ts is loaded at top level");

export function register() {
  console.log("✅ instrumentation.ts register() called");

  window.addEventListener("load", () => {
    console.log("✅ window.load triggered");

    const start = performance.timeOrigin;
    const end = performance.now();
    console.log(`⏱️ App load time: ${end - start}ms`);
  });
}
