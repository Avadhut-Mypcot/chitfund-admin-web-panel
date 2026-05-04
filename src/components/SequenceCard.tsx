import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "reactstrap";
import { requiredFieldAsteriskSpan } from "./CommonUiComponents";

interface SequenceInputCardProps {
    label?: string;
    value: number;
    error?: string;
    touched?: boolean;
    onChange: (value: number) => void;
    disabled?: boolean;
    required?: boolean;
}

const SequenceInputCard: React.FC<SequenceInputCardProps> = ({
    label,
    value,
    error,
    touched,
    onChange,
    disabled,
    required = true,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const { t } = useTranslation();

    const increment = () => {
        const newValue = value + 1;
        onChange(newValue);
        if (inputRef.current) inputRef.current.value = newValue.toString();
    };

    const decrement = () => {
        const newValue = Math.max(0, value - 1);
        onChange(newValue);
        if (inputRef.current) inputRef.current.value = newValue.toString();
    };

    return (
        <div className="card h-100">
            <div className="card-header">
                <h5 className="card-title mb-0">
                    {t(label || "")} {required && requiredFieldAsteriskSpan}
                </h5>
            </div>
            <div className="card-body">
                <div
                    className="sequence-card-div"
                    style={{
                        border: `1px solid ${touched && error ? "#dc3545" : "#ddd"}`,
                    }}
                >
                    <button
                        type="button"
                        className="minus sequence-card-btn-red"
                        onClick={decrement}
                        disabled={disabled}
                    >
                        –
                    </button>

                    <Input
                        name="sequence"
                        id="sequence-field"
                        className="form-control border-0 text-center"
                        placeholder="Enter sequence"
                        type="number"
                        value={value}
                        innerRef={inputRef}
                        disabled={disabled}
                        readOnly
                    />

                    <button
                        type="button"
                        className="plus sequence-card-btn-green"
                        onClick={increment}
                        disabled={disabled}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SequenceInputCard;
