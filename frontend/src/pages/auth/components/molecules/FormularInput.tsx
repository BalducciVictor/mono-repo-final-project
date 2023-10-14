import styled, { css } from 'styled-components';
import { space } from '../../../../styles/const';

type InputProps = {
  label: string;
  type: string;
  placeholder?: string;
  options?: string[]; // Tableau des options pour les boutons radio
  selectedOption?: string; // Option sélectionnée
  onChange?: (value: string) => void;
  value?: string;
  inputStyle?: React.CSSProperties;
};

export const FormularInput = ({
  label,
  type,
  placeholder,
  options,
  selectedOption,
  onChange,
  inputStyle,
  value,
}: InputProps) => {
  return (
    <WrapperInput>
      <LabelText>{label}</LabelText>
      {type === 'radio' ? (
        <RadioGroup>
          {options?.map((option, index) => (
            <RadioLabel key={index}>
              <RadioInput
                type="radio"
                name={label} // Utilisez le nom du label comme nom du groupe de boutons radio
                value={option}
                checked={option === selectedOption}
                onChange={e => onChange && onChange(e.target.value)}
                style={inputStyle}
              />
              {option}
            </RadioLabel>
          ))}
        </RadioGroup>
      ) : type === 'textarea' ? (
        <TextArea
          value={value}
          onChange={e => onChange && onChange(e.target.value)}
          style={inputStyle}
        />
      ) : (
        <Input
          value={value}
          type={type}
          placeholder={placeholder}
          onChange={e => onChange && onChange(e.target.value)}
          style={inputStyle}
        />
      )}
    </WrapperInput>
  );
};

const WrapperInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

const LabelText = styled.label`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const InputStyles = css`
  min-width: 348px;
  padding: ${space.s} ${space.s};
  border-radius: 4px;
  border: 1px solid #31b898;
`;

const Input = styled.input`
  ${InputStyles}
`;

const TextArea = styled.textarea`
  ${InputStyles}
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RadioInput = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #31b898;
  border-radius: 50%;
  margin-right: 8px;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;

  &:checked::before {
    content: '';
    width: 8px;
    height: 8px;
    background-color: #31b898;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: background-color 0.2s ease;
  }
`;
