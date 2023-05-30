module.exports = {
  // Caso um teste falhe, parará de executar os demais testes.
  bail: true,
  // 
  coverageProvider: "v8",
  // Ignora os outros arquivos, indo direto nos arquivos de testes.
  testMatch: [
    "**/*.spec.js"
  ],
}