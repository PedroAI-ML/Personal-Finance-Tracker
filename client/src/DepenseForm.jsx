import React, { useState, useEffect } from "react";

const categories = ["Alimentation", "Transport", "Loisirs", "Factures", "Autre"];

export default function DepenseForm() {
  const [titre, setTitre] = useState("");
  const [montant, setMontant] = useState("");
  const [categorie, setCategorie] = useState("");
  const [date, setDate] = useState("");
  const [depenses, setDepenses] = useState([]);

  // 🟢 Charger les dépenses depuis localStorage au démarrage
  useEffect(() => {
    const data = localStorage.getItem("mesDepenses");
    if (data) {
      setDepenses(JSON.parse(data));
    }
  }, []);

  // 🟢 Sauvegarder dans localStorage à chaque changement de dépenses
  useEffect(() => {
    localStorage.setItem("mesDepenses", JSON.stringify(depenses));
  }, [depenses]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titre || !montant || !categorie || !date || montant <= 0) {
      alert("Veuillez remplir tous les champs correctement.");
      return;
    }

    const nouvelleDepense = { titre, montant, categorie, date };
    setDepenses([...depenses, nouvelleDepense]);

    setTitre("");
    setMontant("");
    setCategorie("");
    setDate("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre de la dépense</label>
          <input value={titre} onChange={(e) => setTitre(e.target.value)} />
        </div>
        <div>
          <label>Montant (€)</label>
          <input
            type="number"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
          />
        </div>
        <div>
          <label>Catégorie</label>
          <select value={categorie} onChange={(e) => setCategorie(e.target.value)}>
            <option value="">-- Choisir --</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button type="submit">Ajouter dépense</button>
      </form>

      <h2 style={{ textAlign: "center" }}>Liste des dépenses</h2>
      {depenses.length === 0 ? (
        <p style={{ textAlign: "center" }}>Aucune dépense ajoutée.</p>
      ) : (
        <ul>
  {depenses.map((dep, index) => (
    <li key={index}>
      {dep.date} • {dep.titre} - {dep.montant}€ ({dep.categorie})
      <button
        onClick={() => {
          const nouvellesDepenses = depenses.filter((_, i) => i !== index);
          setDepenses(nouvellesDepenses);
        }}
        style={{
          marginLeft: "10px",
          backgroundColor: "#e74c3c",
          color: "white",
          border: "none",
          padding: "6px 10px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Supprimer
      </button>
    </li>
  ))}
</ul>

      )}
    </>
  );
}
