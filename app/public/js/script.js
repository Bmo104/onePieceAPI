document.addEventListener("DOMContentLoaded", async (event) => {
  const lista = document.getElementById("lista");
  const personajes = await getList();
  for (const pj of personajes) {
    const button = document.createElement('button');
    const li = document.createElement('li');
    button.type = 'button';
    button.onclick= () => mostrarCartel(pj.id);
    button.innerText=pj.name;
    li.appendChild(button);
    lista.appendChild(li);
  }
});

async function mostrarCartel(index) {
  const container = document.getElementById("poster");

  const imagen = document.getElementById("imagen");
  const dead = document.getElementById("dead");
  const name = document.getElementById("name");
  const bounty = document.getElementById("bounty");

  const mate = await getMate(index);

  imagen.src = mate[0].imagen;
  dead.innerText = mate[0].dead ? "DEAD OR ALIVE":"ONLY ALIVE";
  name.innerText = mate[0].name.replace(/ /g, '·');
  bounty.innerText = 'B ' + mate[0].bounty;
}

async function getList() {
  try {
    const respuesta = await fetch('/api/crew');
    return await respuesta.json();
  } catch (error) {
    console.error("Error al obtener la lista de personajes" + error);
  }
}

async function getMate(index) {
  try {
    const respuesta = await fetch(`/api/mate/${index}`);
    return await respuesta.json();
  } catch (error) {
    console.error("Error al obtener los datos del personaje" + error);
  }
}

