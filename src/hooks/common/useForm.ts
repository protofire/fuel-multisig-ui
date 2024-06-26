import { useCallback, useMemo, useState } from "react";

export type ValidationFn<I, K extends keyof I> = (
  value: I[K],
  identifier?: number | string
) => string | string[] | void | Promise<string | void>;

type ValidationMap<T> = {
  [K in keyof T]?: Array<ValidationFn<T, K>>;
};

interface FormState<I> {
  values: I;
  errors: Record<keyof I, string | string[] | null>;
  touched: Record<keyof I, boolean>;
  isLoading: boolean;
}

export interface UseFormReturn<T> {
  register: <K extends keyof T>(
    name: K,
    validations: Array<ValidationFn<T, K>>
  ) => {
    value: T[K];
    onChange: (e: React.BaseSyntheticEvent) => Promise<void>;
  };
  handleSubmit: (callback: (values: T) => void) => (e: React.FormEvent) => void;
  errors: Record<keyof T, string | string[] | null>;
  touched: Record<keyof T, boolean>;
  values: T;
  setValue: <K extends keyof T>(
    name: K,
    value: T[K],
    identifier?: string | number
  ) => Promise<void>;
  isValid: boolean;
  isLoading: boolean;
  reset: (exceptions?: Partial<T>) => void;
}

export function useForm<T extends object>(initialValues: T): UseFormReturn<T> {
  const [formState, setFormState] = useState<FormState<T>>({
    values: initialValues,
    errors: {} as Record<keyof T, string | string[] | null>,
    touched: {} as Record<keyof T, boolean>,
    isLoading: false,
  });

  const fieldValidations: ValidationMap<T> = useMemo(() => ({}), []);

  const validateField = useCallback(
    async <K extends keyof T>(
      name: K,
      value: T[K],
      identifier?: number | string
    ) => {
      if (Array.isArray(value)) {
        const arrayErrors = await Promise.all(
          value.map(async (item, index) => {
            const validations = fieldValidations[name];
            if (!validations) {
              return null;
            }

            for (const validate of validations) {
              const validationResult = await validate(item, index);
              if (validationResult) {
                return validationResult;
              }
            }

            return null;
          })
        );

        return arrayErrors;
      } else {
        const validations = fieldValidations[name];
        if (!validations) {
          return null;
        }

        for (const validate of validations) {
          const validationResult = await validate(value, identifier);
          if (validationResult) {
            return validationResult;
          }
        }

        return null;
      }
    },
    [fieldValidations]
  );

  const reset = (exceptions?: Partial<T>) => {
    setFormState({
      values: {
        ...initialValues,
        ...exceptions,
      },
      errors: {} as Record<keyof T, string | string[] | null>,
      touched: {} as Record<keyof T, boolean>,
      isLoading: false,
    });
  };

  const isValid = useMemo(() => {
    const hasErrors = Object.values(formState.errors).some(
      (error) => error !== null
    );

    const allFieldsTouched = Object.values(formState.touched).every(
      (touched) => touched
    );

    return !hasErrors && allFieldsTouched;
  }, [formState.errors, formState.touched]);

  const register = useCallback(
    <K extends keyof T>(name: K, validations: Array<ValidationFn<T, K>>) => {
      fieldValidations[name] = validations;

      return {
        value: formState.values[name],
        onChange: async (e: React.BaseSyntheticEvent) => {
          const newValue = e.target.value;
          const error = await validateField(name, newValue);

          setFormState((prevState) => ({
            ...prevState,
            values: {
              ...prevState.values,
              [name]: newValue,
            },
            errors: {
              ...prevState.errors,
              [name]: error,
            },
            touched: {
              ...prevState.touched,
              [name]: true,
            },
          }));
        },
      };
    },
    [fieldValidations, formState.values, validateField]
  );

  const setValue = useCallback(
    async <K extends keyof T>(
      name: K,
      value: T[K],
      identifier?: number | string
    ) => {
      const error = await validateField(name, value, identifier);

      setFormState((prevState) => ({
        ...prevState,
        values: {
          ...prevState.values,
          [name]: value,
        },
        errors: {
          ...prevState.errors,
          [name]: error,
        },
        touched: {
          ...prevState.touched,
          [name]: true,
        },
      }));
    },
    [validateField]
  );

  const handleSubmit = (callback: (values: T) => void) => {
    return (e: React.FormEvent) => {
      e.preventDefault();
      if (!Object.values(formState.errors).some((error) => error !== null)) {
        callback(formState.values);
      }
    };
  };

  return {
    register,
    handleSubmit,
    errors: formState.errors,
    values: formState.values,
    touched: formState.touched,
    setValue,
    isValid,
    isLoading: formState.isLoading,
    reset,
  };
}
