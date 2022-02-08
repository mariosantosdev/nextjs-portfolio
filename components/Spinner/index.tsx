interface ISpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: 'indigo' | 'yellow' | 'green' | 'white';
}

export default function Spinner({ size, color }: ISpinnerProps) {
    function getSize() {
        switch (size) {
            case 'sm':
                return 'w-6 h-6'

            case 'md':
                return 'w-8 h-8'

            case 'lg':
                return 'w-12 h-12'

            case 'xl':
                return 'w-16 h-16'

            default:
                return 'w-6 h-6';
        }
    }

    function getColor() {
        switch (color) {
            case 'green':
                return 'border-t-green-500';

            case 'indigo':
                return 'border-t-indigo-500';

            case 'white':
                return 'border-t-white-500';

            case 'yellow':
                return 'border-t-yellow-500'

            default:
                return 'border-t-white-500';
        }
    }

    return (
        <div
            className={`
            border rounded-full animate-spin
            ${getColor()}
            ${getSize()}

            `}
        />
    )
}