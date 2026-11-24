import { portfolio, getRepos, asset, nombreEvidencia, type EstadoSkill, type Proyecto } from "@/lib/portfolio";

const { perfil, gestiones, proyectos, skills, formacion } = portfolio;

const NAV = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#gestiones", label: "Gestiones" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#skills", label: "Skills" },
  { href: "#contacto", label: "Contacto" },
];

function iniciales(nombre: string) {
  return nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("");
}

const ESTADO: Record<EstadoSkill, { label: string; cls: string; ayuda: string }> = {
  verificado: {
    label: "Verificado",
    cls: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
    ayuda: "Aprobado en una prueba práctica",
  },
  demostrado: {
    label: "Demostrado",
    cls: "bg-accent/15 text-accent-soft ring-accent/30",
    ayuda: "Aplicado en un proyecto o gestión real",
  },
  autodeclarado: {
    label: "Autodeclarado",
    cls: "bg-white/5 text-muted ring-white/10",
    ayuda: "Pendiente de prueba",
  },
};

function SectionTitle({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">{title}</h2>
      {intro && <p className="mt-3 text-muted">{intro}</p>}
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-line bg-white/[0.03] px-2 py-0.5 text-xs text-muted">
      {children}
    </span>
  );
}

function EstadoProyecto({ estado }: { estado: string }) {
  const live = /producción|uso/i.test(estado);
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs text-muted">
      <span className={`h-1.5 w-1.5 rounded-full ${live ? "bg-emerald-400" : "bg-amber-400"}`} />
      {estado}
    </span>
  );
}

function ProyectoCard({ p }: { p: Proyecto }) {
  return (
    <article className="flex flex-col rounded-xl border border-line bg-panel p-6 transition hover:border-accent/50">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{p.nombre}</h3>
          <p className="text-sm text-accent-soft">{p.cliente}</p>
        </div>
        <EstadoProyecto estado={p.estado} />
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.descripcion}</p>
      {p.stack.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      )}
      {(p.repo || p.demo) && (
        <div className="mt-4 flex gap-4 text-sm">
          {p.demo && (
            <a href={p.demo} target="_blank" rel="noreferrer" className="text-accent-soft hover:underline">
              Ver sitio →
            </a>
          )}
          {p.repo && (
            <a href={p.repo} target="_blank" rel="noreferrer" className="text-muted hover:text-white">
              Código
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export default async function Home() {
  const repos = await getRepos(perfil.github);
  const enlazados = new Set(proyectos.map((p) => p.repo.toLowerCase()).filter(Boolean));
  const otrosRepos = repos.filter((r) => !enlazados.has(r.html_url.toLowerCase())).slice(0, 6);
  const destacados = proyectos.filter((p) => p.destacado);
  const resto = proyectos.filter((p) => !p.destacado);

  return (
    <>
      {/* Navegación */}
      <header className="sticky top-0 z-50 border-b border-line/60 bg-ink/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="leading-tight">
            <span className="block font-semibold text-white">
              {perfil.nombreCorto.split(" ")[0]} <span className="text-accent">{perfil.nombreCorto.split(" ").slice(1).join(" ")}</span>
            </span>
            <span className="block text-[11px] uppercase tracking-widest text-muted">{perfil.subtitulo}</span>
          </a>
          <nav className="hidden gap-7 text-sm text-muted md:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-white">
                {n.label}
              </a>
            ))}
          </nav>
          <a href={`mailto:${perfil.email}`} className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">
            Contáctame
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-line">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.18),transparent_60%)]" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-[1.4fr_1fr] md:py-28">
            <div>
              <p className="text-accent-soft">Hola, soy</p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-white md:text-5xl">{perfil.nombreCorto}</h1>
              <p className="mt-3 text-2xl font-semibold text-white md:text-3xl">{perfil.titulo}</p>
              <p className="text-xl text-accent-soft">{perfil.subtitulo}</p>
              <ul className="mt-5 space-y-1 text-sm text-muted">
                {perfil.roles.map((r) => (
                  <li key={r}>▸ {r}</li>
                ))}
              </ul>
              <p className="mt-6 max-w-xl leading-relaxed text-slate-300">{perfil.pitch}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#gestiones" className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500">
                  Ver mi trabajo →
                </a>
                {perfil.cv && (
                  <a href={asset(perfil.cv)} className="rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-white hover:border-accent">
                    Descargar CV
                  </a>
                )}
                <a href={`https://github.com/${perfil.github}`} target="_blank" rel="noreferrer" className="rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-white hover:border-accent">
                  GitHub
                </a>
                {perfil.linkedin && (
                  <a href={perfil.linkedin} target="_blank" rel="noreferrer" className="rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-white hover:border-accent">
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              {perfil.foto ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={asset(perfil.foto)} alt={perfil.nombre} className="aspect-[4/5] w-64 rounded-2xl object-cover shadow-2xl shadow-accent/10 ring-1 ring-line md:w-80" />
              ) : (
                <div className="grid h-72 w-72 place-items-center rounded-2xl bg-gradient-to-br from-accent/30 to-panel text-7xl font-bold text-white ring-1 ring-line">
                  {iniciales(perfil.nombreCorto)}
                </div>
              )}
            </div>
          </div>
          {/* Cifras */}
          <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-px border-t border-line bg-line md:grid-cols-4">
            {perfil.cifras.map((c) => (
              <div key={c.etiqueta} className="bg-ink px-6 py-6">
                <p className="text-3xl font-bold text-white">{c.valor}</p>
                <p className="mt-1 text-sm text-muted">{c.etiqueta}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sobre mí */}
        <section id="sobre-mi" className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-10 md:grid-cols-[1.5fr_1fr]">
            <div>
              <SectionTitle eyebrow="Sobre mí" title="Tecnología que sostiene la operación" />
              <div className="space-y-4 leading-relaxed text-slate-300">
                {perfil.sobreMi.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
            <aside className="h-fit space-y-5 rounded-xl border border-line bg-panel p-6 text-sm">
              {perfil.fotoPerfil && (
                <div className="flex items-center gap-4 border-b border-line pb-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset(perfil.fotoPerfil)} alt="" className="h-16 w-16 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-white">{perfil.nombre}</p>
                    <p className="text-muted">{perfil.titulo}</p>
                  </div>
                </div>
              )}
              <Dato label="Ubicación" valor={perfil.ubicacion} />
              <Dato label="Correo" valor={perfil.email} href={`mailto:${perfil.email}`} />
              {perfil.linkedin && <Dato label="LinkedIn" valor={perfil.linkedin.replace(/^https?:\/\/(www\.)?/, "")} href={perfil.linkedin} />}
              <Dato label="Idiomas" valor={perfil.idiomas.join(", ")} />
              <Dato label="Disponibilidad" valor={perfil.disponible} />
            </aside>
          </div>
        </section>

        {/* Gestiones */}
        <section id="gestiones" className="border-y border-line bg-panel/40">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <SectionTitle
              eyebrow="Centro de Comando TI y Operaciones"
              title="Gestiones de TI"
              intro="Lo que he resuelto como responsable de tecnología de Grupo Corporativo Peguero y desde Twin Mindz. Cada caso: el contexto, lo que hice y el resultado."
            />
            <div className="grid gap-5 md:grid-cols-2">
              {gestiones.map((g) => (
                <article key={g.id} className="rounded-xl border border-line bg-ink p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="eyebrow">{g.categoria}</span>
                    <span className="text-muted">{g.periodo}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-white">{g.titulo}</h3>
                  <p className="text-sm text-accent-soft">{g.organizacion}</p>
                  <dl className="mt-4 space-y-3 text-sm leading-relaxed">
                    <div>
                      <dt className="font-medium text-slate-200">Contexto</dt>
                      <dd className="text-muted">{g.contexto}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-slate-200">Qué hice</dt>
                      <dd className="text-muted">{g.accion}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-slate-200">Resultado</dt>
                      <dd className="text-slate-300">{g.resultado}</dd>
                    </div>
                  </dl>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {g.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Proyectos */}
        <section id="proyectos" className="mx-auto max-w-6xl px-6 py-20">
          <SectionTitle eyebrow="Desarrollo" title="Proyectos destacados" intro="Sistemas que construí y que hoy usan equipos reales." />
          <div className="grid gap-5 md:grid-cols-3">
            {destacados.map((p) => (
              <ProyectoCard key={p.id} p={p} />
            ))}
          </div>
          {resto.length > 0 && (
            <>
              <h3 className="mb-5 mt-14 text-xl font-semibold text-white">Más proyectos</h3>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {resto.map((p) => (
                  <ProyectoCard key={p.id} p={p} />
                ))}
              </div>
            </>
          )}
          {otrosRepos.length > 0 && (
            <>
              <h3 className="mb-5 mt-14 text-xl font-semibold text-white">En GitHub</h3>
              <div className="grid gap-3 md:grid-cols-3">
                {otrosRepos.map((r) => (
                  <a key={r.name} href={r.html_url} target="_blank" rel="noreferrer" className="rounded-lg border border-line bg-panel p-4 text-sm hover:border-accent/50">
                    <p className="font-medium text-white">{r.name}</p>
                    {r.description && <p className="mt-1 text-muted">{r.description}</p>}
                    {r.language && <p className="mt-2 text-xs text-accent-soft">{r.language}</p>}
                  </a>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Skills */}
        <section id="skills" className="border-y border-line bg-panel/40">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <SectionTitle
              eyebrow="Skills"
              title="Dominio técnico, con evidencia"
              intro="Cada skill indica su nivel y cómo se respalda. Los niveles marcados como autodeclarados se confirman con pruebas prácticas."
            />
            <div className="mb-8 flex flex-wrap gap-4 text-xs">
              {(Object.keys(ESTADO) as EstadoSkill[]).map((k) => (
                <span key={k} className="inline-flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 ring-1 ${ESTADO[k].cls}`}>{ESTADO[k].label}</span>
                  <span className="text-muted">{ESTADO[k].ayuda}</span>
                </span>
              ))}
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {skills.dominios.map((d) => (
                <div key={d.nombre} className="rounded-xl border border-line bg-ink p-6">
                  <h3 className="font-semibold text-white">{d.nombre}</h3>
                  <ul className="mt-4 divide-y divide-line">
                    {d.items.map((s) => {
                      const nivelIdx = skills.escala.indexOf(s.nivel);
                      return (
                        <li key={s.nombre} className="py-3">
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-sm text-slate-200">{s.nombre}</span>
                            <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] ring-1 ${ESTADO[s.estado].cls}`}>
                              {ESTADO[s.estado].label}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center gap-3">
                            <div className="flex flex-1 gap-1" aria-label={`Nivel ${s.nivel}`}>
                              {skills.escala.map((_, i) => (
                                <span key={i} className={`h-1.5 flex-1 rounded-full ${i <= nivelIdx ? "bg-accent" : "bg-line"}`} />
                              ))}
                            </div>
                            <span className="w-20 text-right text-xs text-muted">{s.nivel}</span>
                          </div>
                          {s.prueba && (
                            <p className="mt-1 text-xs text-emerald-300">
                              Prueba del {s.prueba.fecha}
                              {s.prueba.puntaje ? ` · ${s.prueba.puntaje}` : ""}
                            </p>
                          )}
                          {s.evidencia.length > 0 && (
                            <p className="mt-1 text-xs text-muted">Evidencia: {s.evidencia.map(nombreEvidencia).join(" · ")}</p>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
            {skills.pruebasPlanificadas.length > 0 && (
              <p className="mt-8 text-sm text-muted">
                <span className="text-slate-300">Próximas verificaciones:</span> {skills.pruebasPlanificadas.join(" · ")}
              </p>
            )}
          </div>
        </section>

        {/* Formación */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <SectionTitle eyebrow="Formación" title="Formación y certificaciones" />
          <div className="grid gap-4 md:grid-cols-4">
            {formacion.map((f) => (
              <div key={f.titulo} className="rounded-xl border border-line bg-panel p-5">
                <p className="font-medium text-white">{f.titulo}</p>
                <p className="mt-1 text-sm text-muted">{f.institucion}</p>
                {f.periodo && <p className="mt-1 text-xs text-accent-soft">{f.periodo}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Contacto */}
        <section id="contacto" className="border-t border-line bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.15),transparent_65%)]">
          <div className="mx-auto max-w-3xl px-6 py-20 text-center">
            <h2 className="text-3xl font-semibold text-white">Trabajemos juntos</h2>
            <p className="mt-3 text-muted">¿Necesitas ordenar la tecnología de tu empresa o construir una herramienta a la medida? Escríbeme.</p>
            <a href={`mailto:${perfil.email}`} className="mt-8 inline-block rounded-lg bg-accent px-6 py-3 font-medium text-white hover:bg-blue-500">
              {perfil.email}
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6 text-sm text-muted">
          <span>© {new Date().getFullYear()} {perfil.nombre}</span>
          <div className="flex gap-5">
            <a href={`https://github.com/${perfil.github}`} target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
            {perfil.linkedin && (
              <a href={perfil.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>
            )}
          </div>
        </div>
      </footer>
    </>
  );
}

function Dato({ label, valor, href }: { label: string; valor: string; href?: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
      {href ? (
        <a href={href} className="text-slate-200 hover:text-accent-soft">{valor}</a>
      ) : (
        <p className="text-slate-200">{valor}</p>
      )}
    </div>
  );
}
