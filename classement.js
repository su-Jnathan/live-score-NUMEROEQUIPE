function calculerClassement(matchs) {
  const equipes = {};
  const get = nom => (equipes[nom] = equipes[nom] || { nom, j: 0, pts: 0, diff: 0 });
  for (const m of matchs) {
    const a = get(m.dom), b = get(m.ext);
    a.j++; b.j++;
    a.diff += m.sd - m.se; b.diff += m.se - m.sd;
    if (m.sd > m.se) a.pts += 3;
    else if (m.sd < m.se) b.pts += 3;
    else { a.pts++; b.pts++; }
  }
  return Object.values(equipes).sort((x, y) => y.pts - x.pts || y.diff - x.diff);
}

function afficher() {
  const lignes = calculerClassement(MATCHS);
  document.querySelector("#classement tbody").innerHTML = lignes.map((e, i) =>
    `<tr><td>${i + 1}</td><td>${e.nom}</td><td>${e.j}</td><td>${e.pts}</td><td>${e.diff}</td></tr>`).join("");
  document.getElementById("leader").textContent = "Leader : " + lignes[0].nom;
}

afficher();
