import { cn } from '@/utilities/ui';

type Props = {
  label: string;
  name: string;
  type: 'text' | 'email' | 'password';
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
};

export const Input = (props: Props) => {
  return (
    <div className="flex flex-col gap-1.5 mb-6">
      <label htmlFor={props.name} className="text-sm font-medium text-foreground select-none">
        {props.label}
        {props.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        required={props.required}
        className={cn(
          'flex h-10 w-full rounded border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
        )}
        id={props.name}
        name={props.name}
        placeholder={
          props.placeholder ? props.placeholder : `Enter your ${props.label.toLowerCase()}`
        }
        type={props.type}
        defaultValue={props.defaultValue ? props.defaultValue : ''}
      />
    </div>
  );
};
