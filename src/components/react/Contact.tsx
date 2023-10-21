import { useState } from 'react'
import { Input, Button, TextArea } from '@/components/react/ui'

const initialState = {
	name: '',
	email: '',
	phone: '',
	message: '',
}

export default function Contact() {
	const [state, setState] = useState<typeof initialState>(initialState)
	const [submitted, setSubmitted] = useState(false)

	/**
	 * Connects an input to state
	 * @param key key of the state entry to reference
	 * @returns props to apply to the input
	 */
	function connectInput(key: keyof typeof initialState) {
		return {
			name: key,
			value: state[key],
			onChange: (value: string) =>
				setState((oldState) => ({ ...oldState, [key]: value })),
		}
	}

	/**
	 * Form submission handler
	 */
	function handleSubmit(e: any) {
		e.preventDefault()

		console.log('submitted', JSON.stringify(state))
		setSubmitted(true)
	}

	function handleReset() {
		setState(initialState)
	}

	if (submitted) {
		return (
			<div>
				<h1 className="mb-2 text-2xl tracking-wider">
					We hear you loud and clear.
				</h1>
				<p className="mb-4">
					Our experts will get back to you as soon as possible.
				</p>
			</div>
		)
	}

	return (
		<>
			<h1 className="mb-2 text-2xl tracking-wider">Send us a message</h1>
			<p className="mb-4">
				Our experts will get back to you as soon as possible.
			</p>
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col gap-4">
					<Input
						label="Name *"
						inputProps={{ required: true }}
						{...connectInput('name')}
					/>
					<Input
						label="Email *"
						inputProps={{ required: true }}
						{...connectInput('email')}
					/>
					<Input
						label="Phone *"
						inputProps={{ required: true }}
						{...connectInput('phone')}
					/>
					<TextArea
						label="Message *"
						textareaProps={{ required: true }}
						{...connectInput('message')}
					/>
					<div className="mt-4 flex flex-col gap-4 lg:flex-row">
						<Button
							onClick={handleReset}
							classes={{
								button: 'bg-transparent hover:bg-neutral-700 grow px-4 py-2',
							}}
						>
							clear
						</Button>
						<Button
							type="submit"
							classes={{ button: 'bg-red-600 hover:bg-red-700 grow px-4 py-2' }}
						>
							submit
						</Button>
					</div>
				</div>
			</form>
		</>
	)
}
