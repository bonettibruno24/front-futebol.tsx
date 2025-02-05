import { ComponentProps, forwardRef } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const inputVariants = tv({
  base: 'w-full bg-white/5 border rounded-lg text-white placeholder-white/60 focus:outline-none',

  variants: {
    variant: {
      green: 'border-white/10 focus:border-green-400',
      supergreen: 'border-dark/10 focus:border-green-600 text-black font-medium',
      error: 'border-red-500 focus:border-red-500',
    },
    size: {
      default: 'py-2 pl-10 pr-36',
      large: 'py-3 pl-12 pr-5',
      medium: 'p-2 '
    },
    defaultConfig: {
      variant: 'default',
      size: 'large'
    }
  }
})

interface InputProps extends ComponentProps<'input'>, VariantProps<typeof inputVariants> {
    size?: 'default' | 'large' | 'medium'; // Garantindo que size seja do tipo correto
  }

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant, size, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={inputVariants({ variant, size, className })}
        {...props}
      />
    );
  }
);
