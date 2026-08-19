"use client";

import { useState } from "react";
import type { FormEvent } from "react";

const FORM_ENDPOINT = "https://formsubmit.co/celephais.labs@gmail.com";
const AJAX_FORM_ENDPOINT = "https://formsubmit.co/ajax/celephais.labs@gmail.com";

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
	const [status, setStatus] = useState<SubmissionStatus>("idle");

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const form = event.currentTarget;
		const formData = new FormData(form);

		if (formData.get("_honey")) {
			form.reset();
			setStatus("success");
			return;
		}

		setStatus("submitting");

		try {
			const response = await fetch(AJAX_FORM_ENDPOINT, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(Object.fromEntries(formData.entries())),
			});

			const result = await response.json().catch(() => null) as { success?: boolean | string } | null;

			if (!response.ok || result?.success === false || result?.success === "false") {
				throw new Error("The contact form submission was rejected.");
			}

			form.reset();
			setStatus("success");
		} catch {
			setStatus("error");
		}
	}

	return (
		<form
			className="contact-form"
			action={FORM_ENDPOINT}
			method="POST"
			onSubmit={handleSubmit}
		>
			<input type="hidden" name="_subject" value="New project enquiry — Celephais Labs" />
			<input type="hidden" name="_template" value="table" />

			<div className="contact-honeypot" aria-hidden="true">
				<label htmlFor="contact-website">Website</label>
				<input id="contact-website" name="_honey" type="text" tabIndex={-1} autoComplete="off" />
			</div>

			<div className="contact-form-row">
				<div className="contact-field">
					<label htmlFor="contact-name">Name</label>
					<input
						id="contact-name"
						name="name"
						type="text"
						autoComplete="name"
						placeholder="Your name"
						maxLength={120}
						required
					/>
				</div>

				<div className="contact-field">
					<label htmlFor="contact-email">Email</label>
					<input
						id="contact-email"
						name="email"
						type="email"
						autoComplete="email"
						placeholder="you@company.com"
						required
					/>
				</div>
			</div>

			<div className="contact-field">
				<label htmlFor="contact-organisation">Company or organisation <span>Optional</span></label>
				<input
					id="contact-organisation"
					name="organisation"
					type="text"
					autoComplete="organization"
					placeholder="Who are you building for?"
					maxLength={160}
				/>
			</div>

			<div className="contact-field">
				<label htmlFor="contact-message">Project details</label>
				<textarea
					id="contact-message"
					name="message"
					placeholder="Tell us about the problem, the intended outcome, and any important constraints."
					minLength={20}
					maxLength={5000}
					required
				/>
			</div>

			<button className="button button-primary contact-submit" type="submit" disabled={status === "submitting"}>
				{status === "submitting" ? "Sending…" : "Send enquiry"}
				<span aria-hidden="true">↗</span>
			</button>

			<p className="contact-form-note">
				Your message is relayed through FormSubmit to Celephais Labs.
			</p>

			<div className="contact-form-status" aria-live="polite" aria-atomic="true">
				{status === "success" ? (
					<p className="contact-form-success">Thank you. Your message has been sent.</p>
				) : null}
				{status === "error" ? (
					<p className="contact-form-error">The message could not be sent. Please check your connection and try again.</p>
				) : null}
			</div>
		</form>
	);
}
