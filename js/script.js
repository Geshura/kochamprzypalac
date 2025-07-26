// PRZYKŁADOWE przepisy - zastąp swoimi lub pobierz z JSON
const recipes = [
  {
    id: "ciasto",
    title: "Ciasto marchewkowe",
    baseMass: 500, // w gramach
    ingredients: [
      { name: "Marchewka", amount: 300, unit: "g" },
      { name: "Mąka", amount: 200, unit: "g" },
      { name: "Cukier", amount: 150, unit: "g" },
      { name: "Jajka", amount: 3, unit: "szt." },
      { name: "Olej", amount: 100, unit: "ml" },
      { name: "Proszek do pieczenia", amount: 10, unit: "g" },
      { name: "Cynamon", amount: 5, unit: "g" }
    ]
  },
  {
    id: "zupa",
    title: "Zupa pomidorowa",
    baseMass: 500,
    ingredients: [
      { name: "Pomidory", amount: 400, unit: "g" },
      { name: "Bulion warzywny", amount: 600, unit: "ml" },
      { name: "Cebula", amount: 100, unit: "g" },
      { name: "Czosnek", amount: 3, unit: "ząbki" },
      { name: "Sól", amount: 5, unit: "g" },
      { name: "Pieprz", amount: 3, unit: "g" },
      { name: "Bazylia", amount: 2, unit: "g" }
    ]
  }
];

// Referencje do DOM
const recipeListEl = document.getElementById("recipe-list");
const contentEl = document.getElementById("content");
const toTopBtn = document.getElementById("toTopBtn");

// Funkcja tworzy menu na górze
function createMenu() {
  recipes.forEach(recipe => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${recipe.id}`;
    a.textContent = recipe.title;
    a.addEventListener("click", () => {
      setActiveLink(recipe.id);
    });
    li.appendChild(a);
    recipeListEl.appendChild(li);
  });
}

// Aktywny link menu (podświetlenie)
function setActiveLink(id) {
  const links = recipeListEl.querySelectorAll("a");
  links.forEach(link => {
    if (link.getAttribute("href") === `#${id}`) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Tworzy przepis na stronie
function createRecipe(recipe) {
  const section = document.createElement("section");
  section.className = "recipe";
  section.id = recipe.id;

  // Tytuł
  const h2 = document.createElement("h2");
  h2.textContent = recipe.title;
  section.appendChild(h2);

  // Kontener składników
  const ul = document.createElement("ul");
  ul.className = "ingredients";

  // Domyślna masa i input do przeliczeń
  const massControl = document.createElement("div");
  massControl.className = "mass-control";

  const label = document.createElement("label");
  label.setAttribute("for", `mass-${recipe.id}`);
  label.textContent = `Podaj masę (g), na którą chcesz przeliczyć składniki (domyślnie ${recipe.baseMass}g):`;

  const input = document.createElement("input");
  input.type = "number";
  input.min = "1";
  input.value = recipe.baseMass;
  input.id = `mass-${recipe.id}`;

  massControl.appendChild(label);
  massControl.appendChild(input);

  // Funkcja aktualizująca składniki wg masy
  function updateIngredients() {
    const newMass = parseFloat(input.value);
    if (isNaN(newMass) || newMass <= 0) return;
    ul.innerHTML = ""; // czyścimy listę

    recipe.ingredients.forEach(ing => {
      const li = document.createElement("li");
      let amount = ing.amount;

      // Jeśli składnik to ilość w sztukach (np. jajka), to przeliczamy proporcjonalnie i zaokrąglamy do 1 miejsca po przecinku lub do 1 sztuki minimalnie
      if (typeof amount === "number") {
        amount = (ing.amount / recipe.baseMass) * newMass;
        if (ing.unit === "szt.") {
          amount = Math.max(1, Math.round(amount));
        } else {
          amount = Math.round(amount * 10) / 10;
        }
      }
      li.textContent = `${amount} ${ing.unit} ${ing.name}`;
      ul.appendChild(li);
    });
  }

  input.addEventListener("input", updateIngredients);
  updateIngredients();

  section.appendChild(massControl);
  section.appendChild(ul);

  return section;
}

// Scroll do góry
toTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Podświetlanie aktywnego przepisu podczas scrollowania (opcjonalne)
window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY || window.pageYOffset;
  let currentId = "";
  recipes.forEach(recipe => {
    const section = document.getElementById(recipe.id);
    if (section.offsetTop <= scrollPos + 100) {
      currentId = recipe.id;
    }
  });
  if (currentId) {
    setActiveLink(currentId);
  }
});

// Inicjalizacja strony
function init() {
  createMenu();
  recipes.forEach(recipe => {
    contentEl.appendChild(createRecipe(recipe));
  });
  setActiveLink(recipes[0].id);
}

init();
