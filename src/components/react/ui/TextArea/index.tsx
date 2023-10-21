import { cn, useValue } from '../utils'

export interface TextAreaProps {
	/**
	 * ID of the textareaa (optional)
	 * If none is provided, one is generated
	 */
	id?: string
	/**
	 * Label shown above the textarea (optional)
	 */
	label?: string
	/**
	 * Name of the textarea
	 */
	name: string
	/**
	 * Placeholder value
	 */
	placeholder?: string
	/**
	 * Value for the textarea
	 */
	value: HTMLTextAreaElement['value']
	/**
	 * Executed on textarea change
	 *
	 * @param value Value from the event
	 * @param event The event
	 */
	onChange: (value: any, event: any) => void

	disabled?: boolean

	/**
	 * Class specifying width (i.e w-full, max-w-6xl, etc)
	 */
	width?: string

	/**
	 * Various classes to be applied
	 */
	classes?: {
		/**
		 * Applied to the wrapper
		 */
		wrapper?: string

		/**
		 * Applied to the textarea element
		 */
		textarea?: string

		/**
		 * Applied to the textarea label
		 */
		label?: string
	}

	/**
	 * Textarea HTML props to include, excluding ones already handled by standard props
	 */
	textareaProps?: Omit<
		React.TextareaHTMLAttributes<HTMLTextAreaElement>,
		| 'id'
		| 'value'
		| 'name'
		| 'placeholder'
		| 'className'
		| 'disabled'
		| 'onChange'
	>

	/**
	 * Label HTML props to include, excluding ones already handled by standard props
	 */
	labelProps?: Omit<
		React.HTMLAttributes<HTMLLabelElement>,
		'className' | 'htmlFor'
	>
}

export function TextArea(props: TextAreaProps) {
	const {
		disabled = false,
		id = `input-${Math.random().toString(36)}`,
		label = undefined,
		name,
		onChange,
		placeholder = undefined,
		value: initialValue = '',
		width = 'max-w-full',
		textareaProps = {},
		labelProps = {},
	} = props
	const textareaClasses = props.classes?.textarea || ''
	const wrapperClasses = props.classes?.wrapper || ''
	const labelClasses = props.classes?.label || ''

	const [value, setValue] = useValue<HTMLTextAreaElement['value']>(initialValue)

	function handleChange(event: any) {
		let value = event.target.value
		setValue(value)
		onChange(value, event)
	}

	return (
		<div className={width}>
			<div className={cn('flex flex-col gap-1', wrapperClasses)}>
				{label && (
					<label
						htmlFor={id}
						className={cn('ml-1 text-sm font-bold', labelClasses)}
						{...labelProps}
					>
						{label}
					</label>
				)}
				<textarea
					id={id}
					value={value}
					name={name}
					placeholder={placeholder}
					className={cn(
						// base styles
						'border border-neutral-700 bg-transparent px-2 py-1',
						// a11y
						'focus:border-blue-500 focus:outline-none',
						// conditional styles
						{
							'cursor-not-allowed opacity-50': disabled,
						},
						// user styles
						textareaClasses,
					)}
					disabled={disabled}
					onChange={handleChange}
					{...textareaProps}
				/>
			</div>
		</div>
	)
}
