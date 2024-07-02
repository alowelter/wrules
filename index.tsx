import { useForm } from "react-hook-form";
import { w } from "./WRules"; // Importe sua função w

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("cpf", w().required().cpf('CPF inválido'))} 
      /> 
      {errors.cpfcnpj && <p>{errors.cpf.message}</p>}

      {/* Outros campos do formulário */}

      <button type="submit">Enviar</button>
    </form>
  );
}
