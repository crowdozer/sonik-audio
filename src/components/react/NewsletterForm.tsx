import { useState } from 'react'
import { Input, Button } from '@/components/react/ui'

export default function NewsletterForm() {
	const [email, setEmail] = useState('')
	const [submitted, setSubmitted] = useState(false)

	/**
	 * Form submission handler
	 */
	function handleSubmit(e: any) {
		e.preventDefault()

		console.log('submitted', JSON.stringify({ email }))
		setSubmitted(true)
	}

	if (submitted) {
		return (
			<div className="mx-auto max-w-5xl px-4 py-8 lg:px-0">
				<h1 className="mb-2 text-2xl tracking-wider">You're in!</h1>
				<p>Stay tuned for future promotionals.</p>
			</div>
		)
	}

	return (
		<div className="mx-auto max-w-5xl px-4 py-8 lg:px-0">
			<h2 className="mb-4 text-2xl">Sign up for our Newsletter</h2>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:flex-row">
				<div className="grow">
					<Input
						name="email"
						value={email}
						placeholder="Email"
						onChange={(value) => setEmail(value)}
						inputProps={{ required: true }}
						type="email"
						classes={{
							input:
								'px-8 py-4 border-transparent border-b-neutral-700 hover:border-neutral-700',
						}}
					/>
				</div>
				<Button
					type="submit"
					classes={{
						button:
							'lg:px-8 lg:py-4 bg-red-600 hover:bg-red-700 border-transparent',
					}}
				>
					Sign up
				</Button>
			</form>
		</div>
	)
}
