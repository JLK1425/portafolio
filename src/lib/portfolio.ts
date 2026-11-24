import data from "../../content/portfolio.json";

export type EstadoSkill = "autodeclarado" | "demostrado" | "verificado";

export interface Skill {
  nombre: string;
  nivel: string;
  estado: EstadoSkill;
  evidencia: string[];
  /** Solo para skills verificadas con prueba */
  prueba?: { fecha: string; puntaje?: string; nota?: string };
}

export interface Gestion {
  id: string;
  titulo: string;
  organizacion: string;
  periodo: string;
  categoria: string;
  contexto: string;
  accion: string;
  resultado: string;
  tags: string[];
}

export interface Proyecto {
  id: string;
  nombre: string;
  cliente: string;
  descripcion: string;
  estado: string;
  stack: string[];
  destacado: boolean;
  repo: string;
  demo: string;
}

export interface Portfolio {
  perfil: {
    nombre: string;
    nombreCorto: string;
    titulo: string;
    subtitulo: string;
    roles: string[];
    pitch: string;
    ubicacion: string;
    email: string;
    github: string;
    linkedin: string;
    foto: string;
    fotoPerfil?: string;
    cv: string;
    idiomas: string[];
    disponible: string;
    sobreMi: string[];
    cifras: { valor: string; etiqueta: string }[];
  };
  gestiones: Gestion[];
  proyectos: Proyecto[];
  skills: {
    escala: string[];
    dominios: { nombre: string; items: Skill[] }[];
    pruebasPlanificadas: string[];
  };
  formacion: { titulo: string; institucion: string; periodo: string }[];
}

export const portfolio = data as Portfolio;

/** Nombre legible de una evidencia (gestión o proyecto) por su id */
export function nombreEvidencia(id: string): string {
  const g = portfolio.gestiones.find((x) => x.id === id);
  if (g) return g.titulo;
  const p = portfolio.proyectos.find((x) => x.id === id);
  return p ? p.nombre : id;
}

export interface Repo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  pushed_at: string;
  fork: boolean;
}

/** Repos públicos de GitHub, leídos al compilar. Si falla, la sección se oculta. */
export async function getRepos(user: string): Promise<Repo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${user}/repos?sort=pushed&per_page=100`,
      { headers: { Accept: "application/vnd.github+json" } },
    );
    if (!res.ok) return [];
    const repos = (await res.json()) as Repo[];
    return repos.filter((r) => !r.fork && r.name.toLowerCase() !== user.toLowerCase());
  } catch {
    return [];
  }
}

/** Antepone la ruta base (GitHub Pages) a archivos de /public */
export function asset(path: string): string {
  if (!path || /^https?:\/\//.test(path)) return path;
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
