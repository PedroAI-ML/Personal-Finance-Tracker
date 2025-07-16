import { useState } from 'react';

export default function AjoutDepense() {
  const [titre, setTitre] = useState('');
  const [montant, setMontant] = useState('');
  const [categorie, setCategorie] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation simple
    if (!titre || !montant || Number(montant) <= 0) {
      setMessage('Remplis tous les champs correctement');
      return;
    }

    const depense = { titre, montant, categorie, date };

    try {
      const res = await fetch('https://ehnl7f6m16.execute-api.eu-north-1.amazonaws.com/depenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(depense),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('✅ Dépense ajoutée !');
        // Reset les champs
        setTitre('');
        setMontant('');
        setCategorie('');
        setDate('');
      } else {
        setMessage('❌ Erreur : ' + data.message);
      }
    } catch (err) {
      setMessage('❌ Erreur réseau');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Ajouter une dépense</h2>
      <form onSubmit={handleSubmit}>
        <input value={titre} onChange={e => setTitre(e.target.value)} placeholder="Titre" /><br />
        <input value={montant} onChange={e => setMontant(e.target.value)} placeholder="Montant" type="number" /><br />
        <select value={categorie} onChange={e => setCategorie(e.target.value)}>
          <option value="">Catégorie</option>
          <option value="Courses">Courses</option>
          <option value="Transport">Transport</option>
          <option value="Loisirs">Loisirs</option>
        </select><br />
        <input value={date} onChange={e => setDate(e.target.value)} type="date" /><br />
        <button type="submit">Ajouter</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
