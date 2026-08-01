import Antigravity from "./Antigravity";

const projects: Array<{
	number: string;
	type: string;
	title: string;
	description: string;
	tags: string[];
	featured?: boolean;
	logo?: string;
	href?: string;
	linkLabel?: string;
}> = [
	{
		number: "01",
		type: "Privacy infrastructure",
		title: "SailCat VPN",
		description:
			"A privacy-focused VPN service developed end to end—from the product experience to the systems required to deliver a dependable connection.",
		tags: ["Product engineering", "Infrastructure", "UX"],
		featured: true,
		logo: "/sailcat-icon.png",
		href: "https://sailcat.space",
		linkLabel: "Visit SailCat",
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
		title: "Websites for artists",
		description:
			"Distinctive portfolio and booking experiences for independent creatives, including Art by Heart Boner Tattoos in Hiroshima.",
		tags: ["Web development", "Product design", "Systems"],
		href: "https://heartboner-tattoos.com/",
		linkLabel: "View Heart Boner Tattoos",
	},
	{
		number: "04",
		type: "Language technology",
		title: "Offline translation tools",
		description:
			"On-device translation workflows for captured screen content, including Snap! Screen Translator, designed for privacy and practical everyday use.",
		tags: ["Desktop tooling", "OCR", "Privacy"],
		href: "https://jpbreuer.com/snapscreentranslator/",
		linkLabel: "View Snap! Screen Translator",
	},
	{
		number: "05",
		type: "Business systems",
		title: "CRM & project management",
		description:
			"Custom operational tools that bring client relationships, project tracking, and day-to-day workflows into one focused system.",
		tags: ["CRM", "Workflow design", "Operations"],
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

export default function Home() {
	return (
		<main>
			<header className="site-header">
				<a className="brand" href="#top" aria-label="Celephais Labs home">
					<img src="/brand-symbol.png" alt="" />
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

			<section className="hero" id="top">
				<Antigravity
					count={1000}
					magnetRadius={8.5}
					ringRadius={5.8}
					waveSpeed={0.34}
					waveAmplitude={0.85}
					particleSize={1.15}
					lerpSpeed={0.085}
					color="#9dddff"
					autoAnimate
					particleVariance={0.7}
					rotationSpeed={0.06}
					depthFactor={0.9}
					pulseSpeed={2.2}
					particleShape="sphere"
					fieldStrength={12}
				/>
				<div className="hero-inner section-shell">
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
						<div className="hero-identity">
							<img src="/brand-symbol.png" alt="" />
							<div className="hero-wordmark">
								<strong>Celephais</strong>
								<span>Laboratories</span>
							</div>
						</div>
						<p>Software engineering · simulation · digital products</p>
					</div>
				</div>
			</section>

			<section className="experience-section" aria-label="Previous consulting experience">
				<div className="experience-shell section-shell">
					<div className="experience-row">
						<p>Previously consulted for science and research organisations such as…</p>
						<div className="brand-tiles">
							<a className="brand-tile" href="https://www.nasa.gov/" target="_blank" rel="noreferrer" aria-label="NASA">
								<img className="nasa-logo" src="/nasa-logo.svg" alt="NASA" />
							</a>
							<a className="brand-tile" href="https://www.thermofisher.com/" target="_blank" rel="noreferrer" aria-label="Thermo Fisher Scientific">
								<img className="thermo-logo" src="/thermo-fisher-logo.svg" alt="Thermo Fisher Scientific" />
							</a>
							<a className="brand-tile brand-name brand-name-long" href="https://www.esa.int/" target="_blank" rel="noreferrer">
								European Space Agency
							</a>
						</div>
					</div>
					<div className="experience-row">
						<p>Industry and logistics companies, such as…</p>
						<div className="brand-tiles">
							<a className="brand-tile brand-name" href="https://www.maersk.com/" target="_blank" rel="noreferrer">Maersk</a>
							<a className="brand-tile" href="https://axisray.com/" target="_blank" rel="noreferrer" aria-label="Axis Ray International Trading">
								<img className="axisray-logo" src="/axisray-logo.png" alt="Axis Ray International Trading" />
							</a>
						</div>
					</div>
				</div>
			</section>

			<section className="work-section" id="work">
				<div className="work-inner section-shell">
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
								{project.logo ? (
									<div className="project-logo">
										<img src={project.logo} alt="SailCat" />
									</div>
								) : null}
								<div className="project-body">
									<h3>{project.title}</h3>
									<p>{project.description}</p>
								</div>
								<ul aria-label={`${project.title} disciplines`}>
									{project.tags.map((tag) => <li key={tag}>{tag}</li>)}
								</ul>
								{project.href && project.linkLabel ? (
									<a className="project-link" href={project.href} target="_blank" rel="noreferrer">
										{project.linkLabel} <span aria-hidden="true">↗</span>
									</a>
								) : null}
							</article>
						))}
					</div>
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
						Before forming Celephais Labs, the founder consulted across science, research, industry, and logistics—including NASA, the European Space Agency, Thermo Fisher Scientific, Maersk, and Axis Ray International Trading.
					</p>
					<div className="principles">
						<div><span>01</span><strong>Understand the system</strong><p>Clarify the problem, constraints, and measure of success.</p></div>
						<div><span>02</span><strong>Engineer with intent</strong><p>Choose practical architecture and make progress visible.</p></div>
						<div><span>03</span><strong>Deliver for use</strong><p>Ship maintainable work that performs beyond the demo.</p></div>
					</div>
				</div>
			</section>

			<section className="contact-section section-shell">
				<div className="contact-copy">
					<p className="eyebrow"><span /> Start a conversation</p>
					<h2>Have a difficult idea<br />worth building?</h2>
					<p>Tell us what you are working on. We will reply with a clear view of where Celephais Labs can help.</p>
					<a className="button button-primary" href="mailto:celephais.labs@gmail.com?subject=Project%20enquiry">
						celephais.labs@gmail.com <span aria-hidden="true">↗</span>
					</a>
				</div>
				<div className="contact-visual" aria-hidden="true">
					<img src="/contact-globe.png" alt="" />
				</div>
			</section>

			<footer>
				<a className="brand" href="#top" aria-label="Back to top">
					<img src="/brand-symbol.png" alt="" />
					<span>Celephais <b>Labs</b></span>
				</a>
				<p>Founder-led software engineering & scientific computing.</p>
				<p>© {new Date().getFullYear()} Celephais Laboratories</p>
			</footer>
		</main>
	);
}
