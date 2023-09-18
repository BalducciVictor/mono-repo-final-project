type InputProps = {
    label: string;
    type: string;
    placeholder: string;
};

export const FormularInput = ({ label, type, placeholder }: InputProps) => {
    return (
        <div>
            <label>{ label }</label>
            <input type={type} placeholder={placeholder}/>
        </div>
    )
}