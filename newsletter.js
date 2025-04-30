app.post("/newsletter", (req, res) => {
  const email = req.body.email;

  // Simula un'operazione di salvataggio email (ad esempio, salvataggio in un database)
  console.log(`Email ricevuta: ${email}`);

  // Reindirizza alla pagina di ringraziamento
  res.redirect("/thank-you");
});
