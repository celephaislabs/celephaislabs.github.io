const projects = [
	{
		number: "01",
		type: "Privacy infrastructure",
		title: "SailCat VPN",
		description:
			"A privacy-focused VPN service developed end to end—from the product experience to the systems required to deliver a dependable connection.",
		tags: ["Product engineering", "Infrastructure", "UX"],
		featured: true,
	},
	{
		number: "02",
		type: "Scientific computing",
		title: "Geant4 & MEGAlib simulations",
		description:
			"Reproducible particle-interaction and instrument simulation workflows, turning complex research questions into practical software.",
		tags: ["Simulation", "Research software", "Data"],
	},
	{
		number: "03",
		type: "Digital products",
		title: "Web platforms",
		description:
			"Purpose-built web experiences that balance clear interaction design with maintainable, production-ready engineering.",
		tags: ["Web development", "Product design", "Systems"],
	},
];

const capabilities = [
	{
		number: "01",
		title: "Product engineering",
		copy: "From technical direction and architecture through implementation, deployment, and iteration.",
	},
	{
		number: "02",
		title: "Scientific computing",
		copy: "Simulation, analysis tooling, and research software designed for correctness and reproducibility.",
	},
	{
		number: "03",
		title: "Technical web",
		copy: "Fast, focused websites and applications that make sophisticated work clear and compelling.",
	},
];

const experience = ["NASA", "Thermo Fisher Scientific", "DTU Space"];

export default function Home() {
	return (
		<main>
			<header className="site-header">
				<a className="brand" href="#top" aria-label="Celephais Labs home">
					<img src="/brand-mark.png" alt="" />
					<span>
						Celephais <b>Labs</b>
					</span>
				</a>
				<nav aria-label="Primary navigation">
					<a href="#work">Work</a>
					<a href="#capabilities">Capabilities</a>
					<a href="#studio">Studio</a>
				</nav>
				<a className="header-cta" href="mailto:celephais.labs@gmail.com?subject=Project%20enquiry">
					Start a project <span aria-hidden="true">↗</span>
				</a>
			</header>

			<section className="hero section-shell" id="top">
				<div className="hero-copy">
					<p className="eyebrow"><span /> Independent software & scientific computing studio</p>
					<h1>Engineering for<br />ambitious ideas.</h1>
					<p className="hero-intro">
						Celephais Labs builds dependable digital products, infrastructure, and simulation tools for technically demanding teams.
					</p>
					<div className="hero-actions">
						<a className="button button-primary" href="mailto:celephais.labs@gmail.com?subject=Project%20enquiry">
							Discuss your project <span aria-hidden="true">↗</span>
						</a>
						<a className="button button-secondary" href="#work">
							Explore selected work <span aria-hidden="true">↓</span>
						</a>
					</div>
				</div>

				<div className="hero-visual" aria-label="Celephais Labs orbital identity">
					<div className="orbital-field" aria-hidden="true">
						<div className="orbit orbit-one" />
						<div className="orbit orbit-two" />
						<div className="orbit orbit-three" />
						<span className="satellite satellite-one" />
						<span className="satellite satellite-two" />
					</div>
					<img src="/celephais-labs.png" alt="Celephais Labs" />
					<p>Software engineering · simulation · digital products</p>
				</div>
			</section>

			<section className="experience-strip" aria-label="Selected founder experience">
				<p>Selected founder experience</p>
				<div>
					{experience.map((name) => <span key={name}>{name}</span>)}
				</div>
			</section>

			<section className="section-shell work-section" id="work">
				<div className="section-heading">
					<div>
						<p className="eyebrow"><span /> Selected work</p>
						<h2>Built where software<br />meets the real world.</h2>
					</div>
					<p>
						A portfolio spanning secure services, scientific simulation, and modern web products—united by careful engineering and direct ownership.
					</p>
				</div>

				<div className="project-grid">
					{projects.map((project) => (
						<article className={`project-card${project.featured ? " project-featured" : ""}`} key={project.title}>
							<div className="project-topline">
								<span>{project.number}</span>
								<p>{project.type}</p>
							</div>
							<div className="project-body">
								<h3>{project.title}</h3>
								<p>{project.description}</p>
							</div>
							<ul aria-label={`${project.title} disciplines`}>
								{project.tags.map((tag) => <li key={tag}>{tag}</li>)}
							</ul>
						</article>
					))}
				</div>
			</section>

			<section className="capabilities-section" id="capabilities">
				<div className="section-shell">
					<div className="section-heading section-heading-light">
						<div>
							<p className="eyebrow"><span /> Capabilities</p>
							<h2>One studio.<br />Deep technical range.</h2>
						</div>
						<p>
							Senior-level thinking stays close to the work, from the first technical question to a production-ready result.
						</p>
					</div>

					<div className="capability-list">
						{capabilities.map((capability) => (
							<article key={capability.title}>
								<span>{capability.number}</span>
								<h3>{capability.title}</h3>
								<p>{capability.copy}</p>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="studio-section section-shell" id="studio">
				<div className="studio-copy">
					<p className="eyebrow"><span /> The studio</p>
					<h2>Independent by design.<br />Serious about the work.</h2>
				</div>
				<div className="studio-detail">
					<p>
						Celephais Labs is a founder-led development company for organizations with demanding technical problems. You work directly with the person responsible for strategy, architecture, and delivery—without layers of handoff.
					</p>
					<p>
						The studio brings experience from software, research, and industrial environments, including work associated with NASA, Thermo Fisher Scientific, and DTU Space.
					</p>
					<div className="principles">
						<div><span>01</span><strong>Understand the system</strong><p>Clarify the problem, constraints, and measure of success.</p></div>
						<div><span>02</span><strong>Engineer with intent</strong><p>Choose practical architecture and make progress visible.</p></div>
						<div><span>03</span><strong>Deliver for use</strong><p>Ship maintainable work that performs beyond the demo.</p></div>
					</div>
				</div>
			</section>

			<section className="contact-section section-shell">
				<div className="contact-orbit" aria-hidden="true"><span /></div>
				<p className="eyebrow"><span /> Start a conversation</p>
				<h2>Have a difficult idea<br />worth building?</h2>
				<p>Tell us what you are working on. We will reply with a clear view of where Celephais Labs can help.</p>
				<a className="button button-primary" href="mailto:celephais.labs@gmail.com?subject=Project%20enquiry">
					celephais.labs@gmail.com <span aria-hidden="true">↗</span>
				</a>
			</section>

			<footer>
				<a className="brand" href="#top" aria-label="Back to top">
					<img src="/brand-mark.png" alt="" />
					<span>Celephais <b>Labs</b></span>
				</a>
				<p>Founder-led software engineering & scientific computing.</p>
				<p>© {new Date().getFullYear()} Celephais Laboratories</p>
			</footer>
		</main>
	);
}
